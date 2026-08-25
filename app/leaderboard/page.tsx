"use client";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";
import { supabase } from "../../lib/supabaseClient";

const avatarColors = ["#534ab7", "#0f6e56", "#993c1d", "#1c5c8f", "#7a4d9e", "#2e7d32"];

function short(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

function levelFromXp(xp: number) {
  return Math.floor(xp / 200) + 1;
}

type RankedProfile = {
  wallet: string;
  xp: number;
};

export default function Leaderboard() {
  const [ranking, setRanking] = useState<RankedProfile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadRanking() {
      const { data } = await supabase
        .from("profiles")
        .select("wallet, xp")
        .order("xp", { ascending: false })
        .limit(10);
      setRanking((data as RankedProfile[]) || []);
      setLoading(false);
    }
    loadRanking();
  }, []);

  return (
    <main className="leaderboard-page">
      <div className="page-hero" style={{ background: "transparent" }}>
        <Header active="Leaderboard" />
        <div className="page-hero-content">
          <h1>Leaderboard</h1>
          <p>
            Community XP ranking ·{" "}
            <a href="/jackpot" style={{ color: "inherit" }}>
              see weekly jackpot →
            </a>
          </p>
        </div>
      </div>
      <div className="leaderboard-list">
        {loading && <p style={{ padding: 16 }}>Loading ranking...</p>}
        {!loading && ranking.length === 0 && (
          <p style={{ padding: 16 }}>No predictions recorded yet.</p>
        )}
        {ranking.map((r, i) => (
          <div className="leaderboard-row" key={r.wallet}>
            <span className="leaderboard-rank">{i + 1}</span>
            <div
              className="leaderboard-avatar"
              style={{ background: avatarColors[i % avatarColors.length] }}
            >
              {r.wallet.slice(2, 4).toUpperCase()}
            </div>
            <span className="leaderboard-address">{short(r.wallet)}</span>
            <span className="leaderboard-level">Level {levelFromXp(r.xp)}</span>
            <span className="leaderboard-xp">{r.xp} XP</span>
          </div>
        ))}
      </div>
    </main>
  );
}
