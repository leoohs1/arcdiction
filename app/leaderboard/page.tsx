import { Header } from "../../components/Header";

const ranking = [
  { rank: 1, address: "0xMk...4a2", level: 14, xp: "8.420", avatar: "MK", color: "#534ab7" },
  { rank: 2, address: "0xLr...91c", level: 12, xp: "7.180", avatar: "LR", color: "#0f6e56" },
  { rank: 3, address: "0xTs...7f0", level: 11, xp: "6.930", avatar: "TS", color: "#993c1d" },
];

export default function Leaderboard() {
  return (
    <main className="leaderboard-page">
      <div className="page-hero" style={{ background: "transparent" }}>
        <Header active="Leaderboard" />
        <div className="page-hero-content">
          <h1>Leaderboard</h1>
          <p>Jackpot comunitário desta semana: 850 USDC</p>
        </div>
      </div>

      <div className="leaderboard-list">
        {ranking.map((r) => (
          <div className="leaderboard-row" key={r.address}>
            <span className="leaderboard-rank">{r.rank}</span>
            <div className="leaderboard-avatar" style={{ background: r.color }}>
              {r.avatar}
            </div>
            <span className="leaderboard-address">{r.address}</span>
            <span className="leaderboard-level">Nível {r.level}</span>
            <span className="leaderboard-xp">{r.xp} XP</span>
          </div>
        ))}
      </div>
    </main>
  );
}
