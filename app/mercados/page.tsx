import { Header } from "../../components/Header";

const markets = [
  {
    category: "Cripto",
    question: "BTC acima de $120k até 31/08?",
    yes: 64,
    no: 36,
    liquidity: "4.200 USDC",
    deadline: "Encerra em 3 dias",
  },
  {
    category: "Esporte",
    question: "Real Madrid vence a Champions?",
    yes: 41,
    no: 59,
    liquidity: "1.850 USDC",
    deadline: "Encerra em 12 dias",
  },
];

export default function Mercados() {
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
          <div className="market-card" key={m.question}>
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
              <span>+120 XP por previsão</span>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
