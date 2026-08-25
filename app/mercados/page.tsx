"use client";
import { useEffect, useState } from "react";
import { useAccount, useWriteContract } from "wagmi";
import { Header } from "../../components/Header";
import { supabase } from "../../lib/supabaseClient";

const markets = [
  {
    id: "btc-100k",
    category: "Crypto",
    question: "BTC above $100k by October 31?",
    baseYes: 300,
    baseNo: 700,
    liquidity: "4,200 USDC",
    deadline: "Ends in 2 months",
    xpReward: 120,
  },
  {
    id: "rm-champions",
    category: "Sports",
    question: "Real Madrid wins the Champions League?",
    baseYes: 410,
    baseNo: 590,
    liquidity: "1,850 USDC",
    deadline: "Ends in 12 days",
    xpReward: 120,
  },
  {
    id: "fed-rate-cut",
    category: "Macro",
    question: "Fed cuts US rates by December?",
    baseYes: 350,
    baseNo: 650,
    liquidity: "900 USDC",
    deadline: "Ends in 4 months",
    xpReward: 120,
  },
  {
    id: "pyth-10c",
    category: "Crypto",
    question: "PYTH above $0.10 by Dec 31?",
    baseYes: 250,
    baseNo: 750,
    liquidity: "600 USDC",
    deadline: "Ends in 4 months",
    xpReward: 120,
  },
];

const STARTING_BALANCE = 10;

const BET_LOG_ADDRESS = "0xdb544E960ebB90F49C98b9801CB6e7f5ca1B97ab" as const;
const BET_LOG_ABI = [
  {
    type: "function",
    name: "recordBet",
    stateMutability: "nonpayable",
    inputs: [
      { name: "marketId", type: "string" },
      { name: "side", type: "bool" },
      { name: "amount", type: "uint256" },
    ],
    outputs: [],
  },
] as const;

type Totals = Record<string, { yes: number; no: number }>;

export default function Mercados() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
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
  const [txHash, setTxHash] = useState<string | null>(null);
  const [onchainStatus, setOnchainStatus] = useState<string>("");

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
    setTxHash(null);
    setOnchainStatus("");
    setActiveMarket(marketId);
    setSide(chosenSide);
    setAmount("");
  }

  async function confirmBet() {
    if (!address) {
      setError("Connect your wallet first.");
      return;
    }
    const numericAmount = Number(amount);
    if (!numericAmount || numericAmount <= 0) {
      setError("Enter a valid USDC amount.");
      return;
    }
    if (balance !== null && numericAmount > balance) {
      setError(`Insufficient balance. You have $${balance.toFixed(2)} available.`);
      return;
    }

    const market = markets.find((m) => m.id === activeMarket);
    const xpReward = market?.xpReward ?? 0;

    setSubmitting(true);
    setError("");
    setOnchainStatus("");

    const { error: insertError } = await supabase.from("bets").insert({
      wallet: address,
      market_id: activeMarket,
      side,
      amount: numericAmount,
    });

    if (insertError) {
      setSubmitting(false);
      setError("Couldn't place the bet. Please try again.");
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

    try {
      setOnchainStatus("Recording on-chain on Arc Testnet...");
      const amountInCents = BigInt(Math.round(numericAmount * 100));
      const hash = await writeContractAsync({
        address: BET_LOG_ADDRESS,
        abi: BET_LOG_ABI,
        functionName: "recordBet",
        args: [activeMarket as string, side === "yes", amountInCents],
      });
      setTxHash(hash);
      setOnchainStatus("Recorded on-chain successfully!");
    } catch (err) {
      setOnchainStatus(
        "Bet saved, but the on-chain log failed (check that your wallet is on Arc Testnet with test USDC)."
      );
    }

    setSubmitting(false);
    setSuccessId(activeMarket);
    setActiveMarket(null);
    setSide(null);
    setAmount("");
    loadOdds();
  }

  return (
    <main>
      <div className="page-hero">
        <Header active="Markets" />
        <div className="page-hero-content">
          <h1>Markets</h1>
          <p>Pick a market and make your prediction</p>
        </div>
      </div>

      {isConnected && (
        <div style={{ maxWidth: 720, margin: "0 auto 16px", padding: "0 16px" }}>
          <p style={{ fontSize: 13, color: "#5f5e5a" }}>
            Test balance: <strong>{balance === null ? "..." : `$${balance.toFixed(2)}`}</strong>
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
                  YES · {loadingOdds ? "..." : `${odds.yes}%`}
                </button>
                <button
                  className="no"
                  style={{ border: "none", cursor: "pointer", font: "inherit" }}
                  onClick={() => openBet(m.id, "no")}
                >
                  NO · {loadingOdds ? "..." : `${odds.no}%`}
                </button>
              </div>
              <div className="market-card-meta">
                <span>Liquidity: {m.liquidity}</span>
                <span>+{m.xpReward} XP per prediction</span>
              </div>

              {activeMarket === m.id && (
                <div style={{ marginTop: 12, padding: 12, background: "#f7f7f5", borderRadius: 8 }}>
                  {!isConnected ? (
                    <p style={{ fontSize: 13, color: "#b23b3b" }}>
                      Connect your wallet to place a bet.
                    </p>
                  ) : (
                    <>
                      <p style={{ fontSize: 13, marginBottom: 8 }}>
                        Betting on <strong>{side === "yes" ? "YES" : "NO"}</strong>
                      </p>
                      <input
                        type="number"
                        placeholder="Amount in USDC"
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
                          {submitting ? "Submitting..." : "Confirm bet"}
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
                          Cancel
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
                <div style={{ marginTop: 12 }}>
                  <p style={{ fontSize: 13, color: "#2e7d32" }}>
                    ✓ Bet placed successfully!
                  </p>
                  {onchainStatus && (
                    <p style={{ fontSize: 12, color: "#5f5e5a", marginTop: 4 }}>
                      {onchainStatus}
                      {txHash && (
                        <>
                          {" "}
                          <a
                            href={`https://testnet.arcscan.app/tx/${txHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ color: "#7fc9c4" }}
                          >
                            View on explorer →
                          </a>
                        </>
                      )}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
