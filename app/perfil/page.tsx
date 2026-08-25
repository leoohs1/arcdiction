"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Header } from "../../components/Header";
import { supabase } from "../../lib/supabaseClient";

const marketNames: Record<string, string> = {
  "btc-70k": "BTC above $70k?",
  "rm-champions": "Real Madrid wins the Champions League?",
  "fed-rate-cut": "Fed cuts US rates?",
};

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayStr() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function short(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

type Profile = {
  xp: number;
  streak_count: number;
  last_checkin: string | null;
};

type Bet = {
  market_id: string;
  side: string;
  amount: number;
  created_at: string;
};

export default function Perfil() {
  const { address, isConnected } = useAccount();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bets, setBets] = useState<Bet[]>([]);
  const [checkingIn, setCheckingIn] = useState(false);
  const [checkinMessage, setCheckinMessage] = useState("");

  async function loadProfile(wallet: string) {
    const { data } = await supabase
      .from("profiles")
      .select("xp, streak_count, last_checkin")
      .eq("wallet", wallet)
      .maybeSingle();

    if (data) {
      setProfile(data as Profile);
    } else {
      const { data: created } = await supabase
        .from("profiles")
        .insert({ wallet, balance: 10 })
        .select("xp, streak_count, last_checkin")
        .single();
      if (created) setProfile(created as Profile);
    }
  }

  async function loadBets(wallet: string) {
    const { data } = await supabase
      .from("bets")
      .select("market_id, side, amount, created_at")
      .eq("wallet", wallet)
      .order("created_at", { ascending: false })
      .limit(8);
    setBets((data as Bet[]) || []);
  }

  useEffect(() => {
    if (address) {
      loadProfile(address);
      loadBets(address);
    } else {
      setProfile(null);
      setBets([]);
    }
  }, [address]);

  async function handleCheckin() {
    if (!address || !profile) return;

    const today = todayStr();
    if (profile.last_checkin === today) return;

    setCheckingIn(true);
    setCheckinMessage("");

    const wasYesterday = profile.last_checkin === yesterdayStr();
    const newStreak = wasYesterday ? profile.streak_count + 1 : 1;
    const xpGained = newStreak * 2 - 1;
    const newXp = profile.xp + xpGained;

    const { error } = await supabase
      .from("profiles")
      .update({ xp: newXp, streak_count: newStreak, last_checkin: today })
      .eq("wallet", address);

    setCheckingIn(false);

    if (error) {
      setCheckinMessage("Couldn't check in. Please try again.");
      return;
    }

    setProfile({ xp: newXp, streak_count: newStreak, last_checkin: today });
    setCheckinMessage(`+${xpGained} XP! Streak: ${newStreak} day(s).`);
  }

  const alreadyCheckedInToday = profile?.last_checkin === todayStr();

  return (
    <main className="profile-page">
      <div style={{ padding: "0 0" }}>
        <Header active="Profile" />
      </div>

      {!isConnected ? (
        <p style={{ color: "#fff", padding: 24 }}>Connect your wallet to view your profile.</p>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: 16,
            }}
          >
            <div className="profile-header">
              <div className="profile-avatar">
                {address ? address.slice(2, 4).toUpperCase() : "??"}
              </div>
              <div>
                <p style={{ color: "#fff", fontSize: 16, fontWeight: 500, margin: "0 0 2px" }}>
                  {address ? short(address) : ""}
                </p>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: 0 }}>
                  {profile ? `${profile.xp} XP` : "Loading..."}
                </p>
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <button
                className="btn-primary"
                onClick={handleCheckin}
                disabled={checkingIn || alreadyCheckedInToday || !profile}
              >
                {alreadyCheckedInToday
                  ? "Checked in today ✓"
                  : checkingIn
                  ? "Checking in..."
                  : "Daily check-in"}
              </button>
              {checkinMessage && (
                <p style={{ color: "#7fc9c4", fontSize: 13, marginTop: 8 }}>{checkinMessage}</p>
              )}
            </div>
          </div>

          <div className="profile-stats">
            <div className="profile-stat-card">
              <p>{profile?.xp ?? "..."}</p>
              <p>Total XP</p>
            </div>
            <div className="profile-stat-card">
              <p>{bets.length}</p>
              <p>Predictions made</p>
            </div>
            <div className="profile-stat-card">
              <p>{profile?.streak_count ?? 0}</p>
              <p>Check-in streak</p>
            </div>
          </div>

          <div className="profile-history">
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 500, margin: "24px 0 10px" }}>
              RECENT HISTORY
            </p>
            {bets.length === 0 && (
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                You haven't made any predictions yet.
              </p>
            )}
            {bets.map((bet, i) => (
              <div className="profile-history-row" key={i}>
                <span>{marketNames[bet.market_id] || bet.market_id}</span>
                <span style={{ color: "#7fc9c4" }}>
                  {bet.side === "yes" ? "YES" : "NO"} · ${Number(bet.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
