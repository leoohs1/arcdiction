"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Header } from "../../components/Header";
import { supabase } from "../../lib/supabaseClient";

// baseYes/baseNo simulam a liquidez inicial do mercado (antes de apostas reais).
// Servem só pra as odds não começarem em 0%/0% num mercado novo.
const markets = [
  {
    id: "btc-70k",
    category: "Cripto",
    question: "BTC acima de $70k até 31/08?",
    baseYes: 380,
    baseNo: 620,
    liquidity: "4.200 USDC",
    deadline: "Encerra em 3 dias",
    xpReward: 120,
  },
  {
    id: "rm-champions",
    category: "Esporte",
    question: "Real Madrid vence a Champions?",
    baseYes: 410,
    baseNo: 590,
    liquidity: "1.850 USDC",
    deadline: "Encerra em 12 dias",
    xpReward: 120,
  },
  {
    id: "fed-rate-cut",
    category: "Macro",
    question: "Fed corta juros dos EUA até dezembro?",
    baseYes: 350,
    baseNo: 650,
    liquidity: "900 USDC",
    deadline: "Encerra em 4 meses",
    xpReward: 120,
  },
];

const STARTING_BALANCE = 10;

type Totals = Record<string, { yes: number; no: number }>;

export default function Mercados() {
  const { address, isConnected } = useAccount();
  const [activeMarket, setActiveMarket] = useState<string | null>(null);
  const [side, setSide] = useState<"yes" | "no" | null>(null);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [totals, setTotals] = useState<Totals>({});
  const [loadingOdds, setLoadingOdds] = useState(true);
  const [balance, setBalance] = useState<number | null>(null);
  const [xp, setXp] = useState<number | null>(null);

  async function loadOdds() {
    setLoadingOdds(true);
    const { data, error: fetchError } = await supabase
      .from("bets")
      .select("market_id, side, amount");

    if (fetchError) {
      setLoadingOdds(false);
      return;
    }

    const next: Totals = {};
    for (const m of markets) {
      next[m.id] = { yes: m.baseYes, no: m.baseNo };
    }
    for (const bet of data || []) {
      if (!next[bet.market_id]) continue;
      if (bet.side === "yes") next[bet.market_id].yes += Number(bet.amount);
      else next[bet.market_id].no += Number(bet.amount);
    }
    setTotals(next);
    setLoadingOdds(false);
  }

  async function loadProfile(wallet: string) {
    const { data, error: fetchError } = await supabase
      .from("profiles")
      .select("balance, xp")
      .eq("wallet", wallet)
      .maybeSingle();

    if (fetchError) return;

    if (!data) {
      const { data: created } = await supabase
        .from("profiles")
        .insert({ wallet, balance: STARTING_BALANCE })
        .select("balance, xp")
        .single();
      setBalance(created ? Number(created.balance) : STARTING_BALANCE);
      setXp(created ? Number(created.xp) : 0);
    } else {
      setBalance(Number(data.balance));
      setXp(Number(data.xp));
    }
  }

  useEffect(() => {
    loadOdds();
  }, []);

  useEffect(() => {
    if (address) loadProfile(address);
    else {
      setBalance(null);
      setXp(null);
    }
  }, [address]);

  function oddsFor(marketId: string) {
    const t = totals[marketId];
    if (!t) return { yes: 50, no: 50 };
    const total = t.yes + t.no;
    if (total === 0) return { yes: 50, no: 50 };
    const yes = Math.round((t.yes / total) * 100);
    return { yes, no: 100 - yes };
  }

  function openBet(marketId: string, chosenSide: "yes" | "no") {
    setError("");
    setSuccessId(null);
    setActiveMarket(marketId);
    setSide(chosenSide);
    setAmount("");
  }

  async function confirmBet() {
    if (!address) {
      setError("Conecte sua wallet primeiro.");
      return;
    }
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError("Digite um valor válido em USDC.");
      return;
    }
    if (balance !== null && numericAmount > balance) {
      setError(`Saldo insuficiente. Você tem $${balance.toFixed(2)} disponível.`);
      return;
    }

    const market = markets.find((m) => m.id === activeMarket);
    const xpReward = market?.xpReward ?? 0;

    setSubmitting(true);
    setError("");

    const { error: insertError } = await supabase.from("bets").insert({
      wallet: address,
      market_id: activeMarket,
      side,
      amount: numericAmount,
    });

    if (insertError) {
      setSubmitting(false);
      setError("Não foi possível registrar a aposta. Tente novamente.");
      return;
    }

    const newBalance = (balance ?? STARTING_BALANCE) - numericAmount;
    const newXp = (xp ?? 0) + xpReward;
    await supabase
      .from("profiles")
      .update({ balance: newBalance, xp: newXp })
      .eq("wallet", address);
    setBalance(newBalance);
    setXp(newXp);

    setSubmitting(false);
    setSuccessId(activeMarket);
    setActiveMarket(null);
    setSide(null);
    setAmount("");
    loadOdds(); // recalcula as odds com a nova aposta
  }

  return (
    <main>
      <div className="page-hero">
        <Header active="Mercados" />
        <div className="page-hero-content">
          <h1>Mercados</h1>
          <p>Escolha um mercado e faça sua previsão</p>
        </div>
      </div>

      {isConnected && (
        <div style={{ maxWidth: 720, margin: "0 auto 16px", padding: "0 16px" }}>
          <p style={{ fontSize: 13, color: "#5f5e5a" }}>
            Saldo de teste: <strong>{balance === null ? "..." : `$${balance.toFixed(2)}`}</strong>
            {"  ·  "}
            XP: <strong>{xp === null ? "..." : xp}</strong>
          </p>
        </div>
      )}

      <div className="markets-list">
        {markets.map((m) => {
          const odds = oddsFor(m.id);
          return (
            <div className="market-card" key={m.id}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span className="tag">{m.category.toUpperCase()}</span>
                <span style={{ fontSize: 11, color: "#5f5e5a" }}>{m.deadline}</span>
              </div>
              <p className="question">{m.question}</p>
              <div className="odds">
                <button
                  className="yes"
                  style={{ border: "none", cursor: "pointer", font: "inherit" }}
                  onClick={() => openBet(m.id, "yes")}
                >
                  SIM · {loadingOdds ? "..." : `${odds.yes}%`}
                </button>
                <button
                  className="no"
                  style={{ border: "none", cursor: "pointer", font: "inherit" }}
                  onClick={() => openBet(m.id, "no")}
                >
                  NÃO · {loadingOdds ? "..." : `${odds.no}%`}
                </button>
              </div>
              <div className="market-card-meta">
                <span>Liquidez: {m.liquidity}</span>
                <span>+{m.xpReward} XP por previsão</span>
              </div>

              {activeMarket === m.id && (
                <div style={{ marginTop: 12, padding: 12, background: "#f7f7f5", borderRadius: 8 }}>
                  {!isConnected ? (
                    <p style={{ fontSize: 13, color: "#b23b3b" }}>
                      Conecte sua wallet para apostar.
                    </p>
                  ) : (
                    <>
                      <p style={{ fontSize: 13, marginBottom: 8 }}>
                        Apostando em <strong>{side === "yes" ? "SIM" : "NÃO"}</strong>
                      </p>
                      <input
                        type="number"
                        placeholder="Valor em USDC"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={{
                          width: "100%",
                          padding: "8px 10px",
                          borderRadius: 6,
                          border: "1px solid #ddd",
                          marginBottom: 8,
                          fontSize: 13,
                        }}
                      />
                      <div style={{ display: "flex", gap: 8 }}>
                        <button
                          className="btn-primary"
                          onClick={confirmBet}
                          disabled={submitting}
                          style={{ flex: 1 }}
                        >
                          {submitting ? "Enviando..." : "Confirmar aposta"}
                        </button>
                        <button
                          onClick={() => setActiveMarket(null)}
                          style={{
                            padding: "8px 12px",
                            background: "transparent",
                            border: "1px solid #ddd",
                            borderRadius: 6,
                            cursor: "pointer",
                          }}
                        >
                          Cancelar
                        </button>
                      </div>
                    </>
                  )}
                  {error && (
                    <p style={{ fontSize: 12, color: "#b23b3b", marginTop: 8 }}>{error}</p>
                  )}
                </div>
              )}

              {successId === m.id && (
                <p style={{ marginTop: 12, fontSize: 13, color: "#2e7d32" }}>
                  ✓ Aposta registrada com sucesso!
                </p>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
