"use client";
import { useState } from "react";
import { useAccount } from "wagmi";
import { Header } from "../../components/Header";
import { supabase } from "../../lib/supabaseClient";

const markets = [
  {
    id: "btc-120k",
    category: "Cripto",
    question: "BTC acima de $120k até 31/08?",
    yes: 64,
    no: 36,
    liquidity: "4.200 USDC",
    deadline: "Encerra em 3 dias",
  },
  {
    id: "rm-champions",
    category: "Esporte",
    question: "Real Madrid vence a Champions?",
    yes: 41,
    no: 59,
    liquidity: "1.850 USDC",
    deadline: "Encerra em 12 dias",
  },
];

export default function Mercados() {
  const { address, isConnected } = useAccount();
  const [activeMarket, setActiveMarket] = useState<string | null>(null);
  const [side, setSide] = useState<"yes" | "no" | null>(null);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);
  const [error, setError] = useState("");

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

    setSubmitting(true);
    setError("");

    const { error: insertError } = await supabase.from("bets").insert({
      wallet: address,
      market_id: activeMarket,
      side,
      amount: numericAmount,
    });

    setSubmitting(false);

    if (insertError) {
      setError("Não foi possível registrar a aposta. Tente novamente.");
      return;
    }

    setSuccessId(activeMarket);
    setActiveMarket(null);
    setSide(null);
    setAmount("");
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
      <div className="markets-list">
        {markets.map((m) => (
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
                SIM · {m.yes}%
              </button>
              <button
                className="no"
                style={{ border: "none", cursor: "pointer", font: "inherit" }}
                onClick={() => openBet(m.id, "no")}
              >
                NÃO · {m.no}%
              </button>
            </div>
            <div className="market-card-meta">
              <span>Liquidez: {m.liquidity}</span>
              <span>+120 XP por previsão</span>
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
        ))}
      </div>
    </main>
  );
}
