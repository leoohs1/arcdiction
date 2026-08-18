"use client";
import { Header } from "../components/Header";

const markets = [
  {
    id: "btc-70k",
    category: "Cripto",
    question: "BTC acima de $70k até 31/08?",
    yes: 38,
    no: 62,
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
  {
    id: "fed-rate-cut",
    category: "Macro",
    question: "Fed corta juros dos EUA até dezembro?",
    yes: 35,
    no: 65,
    liquidity: "900 USDC",
    deadline: "Encerra em 4 meses",
  },
];

const arcFeatures = [
  {
    icon: "⚡",
    title: "Finalização em menos de 1s",
    desc: "Liquidação determinística, sem espera por confirmações.",
  },
  {
    icon: "💵",
    title: "USDC-native",
    desc: "As próprias taxas de rede são pagas em USDC, sem token volátil.",
  },
  {
    icon: "🔗",
    title: "Compatível com EVM",
    desc: "Infraestrutura familiar, testada e usada por builders Web3.",
  },
  {
    icon: "🎯",
    title: "Feita pra isso",
    desc: "A Arc lista prediction markets como um dos seus casos de uso nativos.",
  },
];

const steps = [
  { icon: "🔮", title: "Preveja", desc: "Escolha um mercado e decida: SIM ou NÃO." },
  { icon: "💰", title: "Aposte", desc: "Deposite USDC na posição escolhida." },
  { icon: "✅", title: "Resolva", desc: "O mercado é liquidado com dados da Pyth." },
  { icon: "🏆", title: "Ganhe", desc: "Acerte, ganhe USDC e suba no ranking com XP." },
];

const techStack = [
  { label: "PYTH", desc: "Dados de mercado em tempo real e infraestrutura de oráculo." },
  { label: "ARCDICTION", desc: "Contratos que definem a lógica dos mercados, de forma transparente." },
  { label: "ARC", desc: "A camada de execução que dá liquidação rápida ao Arcdiction." },
  { label: "USDC", desc: "A stablecoin usada para participação e liquidação." },
];

export default function Home() {
  return (
    <main>
      {/* HERO */}
      <div className="hero">
        <Header active="" />
        <h1>Preveja. Ganhe XP. Suba no ranking.</h1>
        <p>
          Mercados resolvidos por Pyth, liquidez em USDC, jackpot comunitário
          toda semana.
        </p>
        <a href="/mercados" style={{ textDecoration: "none" }}>
          <button className="btn-primary">Explorar mercados</button>
        </a>
      </div>

      {/* LIVE MARKETS */}
      <section style={{ padding: "48px 24px", maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#7fc9c4", marginBottom: 4 }}>
          🔥 AO VIVO
        </p>
        <h2 style={{ fontSize: 26, margin: "0 0 24px" }}>Mercados em destaque</h2>
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
                  <div className="yes">SIM · {m.yes}%</div>
                  <div className="no">NÃO · {m.no}%</div>
                </div>
                <div className="market-card-meta">
                  <span>Liquidez: {m.liquidity}</span>
                  <span style={{ color: "#7fc9c4", fontWeight: 500 }}>Prever →</span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "48px 24px", maxWidth: 960, margin: "0 auto" }}>
        <h2 style={{ fontSize: 26, margin: "0 0 24px", textAlign: "center" }}>
          Como funciona
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
            🌐 INFRAESTRUTURA
          </p>
          <h2 style={{ fontSize: 26, margin: "0 0 8px" }}>Built on Arc</h2>
          <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: 32, maxWidth: 560 }}>
            Prediction markets desenhados para liquidação rápida e nativa em
            stablecoin — a Arc lista mercados de previsão como um dos casos de
            uso que a sua infraestrutura foi construída para suportar.
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
              Quer testar com USDC de testnet de verdade?
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
                Pegar USDC de teste (faucet oficial)
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
                Adicionar Arc Testnet à wallet
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* TECH BEHIND IT */}
      <section style={{ padding: "56px 24px", maxWidth: 960, margin: "0 auto" }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#7fc9c4", marginBottom: 4 }}>
          🔮 POR BAIXO DO CAPÔ
        </p>
        <h2 style={{ fontSize: 26, margin: "0 0 32px" }}>
          A tecnologia por trás do Arcdiction
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
