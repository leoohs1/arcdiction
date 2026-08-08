const markets = [
  {
    category: "Cripto",
    question: "BTC acima de $120k até 31/08?",
    yes: 64,
    no: 36,
  },
  {
    category: "Esporte",
    question: "Real Madrid vence a Champions?",
    yes: 41,
    no: 59,
  },
];

export default function Home() {
  return (
    <main>
      <div className="hero">
        <nav>
          <span className="logo">Arcdiction</span>
          <button className="btn-primary">Conectar wallet</button>
        </nav>
        <h1>Preveja. Ganhe XP. Suba no ranking.</h1>
        <p>
          Mercados resolvidos por Pyth, liquidez em USDC, jackpot comunitário
          toda semana.
        </p>
        <button className="btn-primary">Explorar mercados</button>
      </div>

      <div className="markets" style={{ marginTop: 24 }}>
        {markets.map((m) => (
          <div className="market-card" key={m.question}>
            <span className="tag">{m.category.toUpperCase()}</span>
            <p className="question">{m.question}</p>
            <div className="odds">
              <div className="yes">SIM · {m.yes}%</div>
              <div className="no">NÃO · {m.no}%</div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
