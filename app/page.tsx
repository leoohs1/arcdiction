"use client";
import { Header } from "../components/Header";

const markets = [
  {
    id: "btc-100k",
    category: "Crypto",
    question: "BTC above $100k by October 31?",
    yes: 30,
    no: 70,
    liquidity: "4,200 USDC",
    deadline: "Ends in 2 months",
  },
  {
    id: "rm-champions",
    category: "Sports",
    question: "Real Madrid wins the Champions League?",
    yes: 41,
    no: 59,
    liquidity: "1,850 USDC",
    deadline: "Ends in 12 days",
  },
  {
    id: "fed-rate-cut",
    category: "Macro",
    question: "Fed cuts US rates by December?",
    yes: 35,
    no: 65,
    liquidity: "900 USDC",
    deadline: "Ends in 4 months",
  },
  {
    id: "pyth-10c",
    category: "Crypto",
    question: "PYTH above $0.10 by Dec 31?",
    yes: 25,
    no: 75,
    liquidity: "600 USDC",
    deadline: "Ends in 4 months",
  },
];

const arcFeatures = [
  {
    icon: "⚡",
    title: "Sub-second finality",
    desc: "Deterministic settlement, no waiting on confirmations.",
  },
  {
    icon: "💵",
    title: "USDC-native",
    desc: "Network fees are paid in USDC itself, no volatile token.",
  },
  {
    icon: "🔗",
    title: "EVM compatible",
    desc: "Familiar infrastructure, battle-tested by Web3 builders.",
  },
  {
    icon: "🎯",
    title: "Built for this",
    desc: "Arc lists prediction markets as one of its native use cases.",
  },
];

const steps = [
  { icon: "🔮", title: "Predict", desc: "Pick a market and decide: YES or NO." },
  { icon: "💰", title: "Bet", desc: "Deposit USDC on your chosen position." },
  { icon: "✅", title: "Resolve", desc: "The market settles using Pyth data." },
  { icon: "🏆", title: "Earn", desc: "Get it right, earn USDC, climb the leaderboard." },
];

const techStack = [
  { label: "PYTH", desc: "Real-time market data and oracle infrastructure." },
  { label: "ARCDICTION", desc: "Contracts that define market logic, transparently." },
  { label: "ARC", desc: "The execution layer powering Arcdiction's settlement." },
  { label: "USDC", desc: "The stablecoin used for participation and settlement." },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <div className="hero">
        <Header active="" />
        <h1>Predict. Earn XP. Climb the ranks.</h1>
        <p>
          Built on Arc. Markets resolved by Pyth, settled in USDC, weekly
          community jackpot.
        </p>
        <a href="/mercados" style={{ textDecoration: "none" }}>
          <button className="btn-primary">Explore markets</button>
        </a>
      </div>

      {/* LIVE MARKETS */}
      <section style={{ padding: "48px 24px", maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#7fc9c4", marginBottom: 4 }}>
          🔥 LIVE
        </p>
        <h2 style={{ fontSize: 26, margin: "0 0 24px" }}>Featured markets</h2>
        <div className="markets">
          {markets.map((m) => (
            <a
              href="/mercados"
              key={m.id}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="market-card">
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span className="tag">{m.category.toUpperCase()}</span>
                  <span style={{ fontSize: 11, color: "#5f5e5a" }}>{m.deadline}</span>
                </div>
                <p className="question">{m.question}</p>
                <div className="odds">
                  <div className="yes">YES · {m.yes}%</div>
                  <div className="no">NO · {m.no}%</div>
                </div>
                <div className="market-card-meta">
                  <span>Liquidity: {m.liquidity}</span>
                  <span style={{ color: "#7fc9c4", fontWeight: 500 }}>Predict →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "48px 24px", maxWidth: 960, margin: "0 auto" }}>
        <h2 style={{ fontSize: 26, margin: "0 0 24px", textAlign: "center" }}>
          How it works
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 16,
          }}
        >
          {steps.map((s, i) => (
            <div key={i} style={{ textAlign: "center", padding: 16 }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>{s.icon}</div>
              <p style={{ fontWeight: 600, marginBottom: 4 }}>{s.title}</p>
              <p style={{ fontSize: 13, color: "#5f5e5a" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POWERED BY ARC */}
      <section
        style={{
          padding: "56px 24px",
          background: "linear-gradient(135deg, #0a2540 0%, #123a5e 100%)",
          color: "#fff",
        }}
      >
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#7fc9c4", marginBottom: 4 }}>
            🌐 INFRASTRUCTURE
          </p>
          <h2 style={{ fontSize: 26, margin: "0 0 8px" }}>Built on Arc</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 32, maxWidth: 560 }}>
            Prediction markets designed for fast, stablecoin-native
            settlement — Arc lists prediction markets as one of the use
            cases its infrastructure was built to support.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
            }}
          >
            {arcFeatures.map((f, i) => (
              <div
                key={i}
                style={{
                  background: "rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: 20,
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 10 }}>{f.icon}</div>
                <p style={{ fontWeight: 600, marginBottom: 6, fontSize: 14 }}>{f.title}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)" }}>{f.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: 32, textAlign: "center" }}>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 12 }}>
              Want to try it with real testnet USDC?
            </p>
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href="https://faucet.circle.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "8px 12px",
                  fontSize: 13,
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Get test USDC (official faucet)
              </a>
              <a
                href="https://docs.arc.io/arc/references/connect-to-arc"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  padding: "8px 12px",
                  fontSize: 13,
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  textDecoration: "none",
                }}
              >
                Add Arc Testnet to wallet
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TECH BEHIND IT */}
      <section style={{ padding: "56px 24px", maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#7fc9c4", marginBottom: 4 }}>
          🔮 UNDER THE HOOD
        </p>
        <h2 style={{ fontSize: 26, margin: "0 0 32px" }}>
          The technology behind Arcdiction
        </h2>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 40,
            fontSize: 13,
            fontWeight: 600,
            color: "#0a2540",
          }}
        >
          {techStack.map((t, i) => (
            <span key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  background: "#eef4fb",
                  padding: "8px 14px",
                  borderRadius: 8,
                  border: "1px solid #d6e4f0",
                }}
              >
                {t.label}
              </span>
              {i < techStack.length - 1 && <span style={{ color: "#9aa5b1" }}>→</span>}
            </span>
          ))}
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
          }}
        >
          {techStack.map((t, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #eee",
                borderRadius: 10,
                padding: 16,
              }}
            >
              <p style={{ fontSize: 11, fontWeight: 700, color: "#7fc9c4", marginBottom: 6 }}>
                {t.label}
              </p>
              <p style={{ fontSize: 13, color: "#5f5e5a" }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
