"use client";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { Header } from "../../components/Header";
import { supabase } from "../../lib/supabaseClient";

// mesmos ids/perguntas usados na página de Mercados, só pra exibir nome bonito no histórico
const marketNames: Record<string, string> = {
  "btc-70k": "BTC acima de $70k?",
  "rm-champions": "Real Madrid vence a Champions?",
  "fed-rate-cut": "Fed corta juros dos EUA?",
};

// dados oficiais da Arc Testnet (Circle) — docs.arc.io
const ARC_TESTNET = {
  chainId: "0x4cef52", // 5042002 em decimal
  chainName: "Arc Testnet",
  nativeCurrency: { name: "USDC", symbol: "USDC", decimals: 18 },
  rpcUrls: ["https://rpc.testnet.arc.io"],
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
  const [networkMessage, setNetworkMessage] = useState("");

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
    if (profile.last_checkin === today) return; // já fez check-in hoje

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
      setCheckinMessage("Não foi possível fazer o check-in. Tente novamente.");
      return;
    }

    setProfile({ xp: newXp, streak_count: newStreak, last_checkin: today });
    setCheckinMessage(`+${xpGained} XP! Sequência: ${newStreak} dia(s).`);
  }

  async function handleAddNetwork() {
    setNetworkMessage("");
    const eth = (window as any).ethereum;
    if (!eth) {
      setNetworkMessage("Nenhuma wallet compatível detectada no navegador.");
      return;
    }
    try {
      await eth.request({
        method: "wallet_addEthereumChain",
        params: [ARC_TESTNET],
      });
      setNetworkMessage("Rede Arc Testnet adicionada com sucesso!");
    } catch (err) {
      setNetworkMessage("Não foi possível adicionar a rede. Tente manualmente na sua wallet.");
    }
  }

  const alreadyCheckedInToday = profile?.last_checkin === todayStr();

  return (
    <main className="profile-page">
      <div style={{ padding: "0 0" }}>
        <Header active="Perfil" />
      </div>

      {!isConnected ? (
        <p style={{ color: "#fff", padding: 24 }}>Conecte sua wallet para ver seu perfil.</p>
      ) : (
        <>
          <div className="profile-header">
            <div className="profile-avatar">
              {address ? address.slice(2, 4).toUpperCase() : "??"}
            </div>
            <div>
              <p style={{ color: "#fff", fontSize: 16, fontWeight: 500, margin: "0 0 2px" }}>
                {address ? short(address) : ""}
              </p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: 0 }}>
                {profile ? `${profile.xp} XP` : "Carregando..."}
              </p>
            </div>
          </div>

          <div className="profile-stats">
            <div className="profile-stat-card">
              <p>{profile?.xp ?? "..."}</p>
              <p>XP total</p>
            </div>
            <div className="profile-stat-card">
              <p>{bets.length}</p>
              <p>Previsões feitas</p>
            </div>
            <div className="profile-stat-card">
              <p>{profile?.streak_count ?? 0}</p>
              <p>Sequência de check-in</p>
            </div>
          </div>

          <div style={{ margin: "20px 0", padding: "0 0" }}>
            <button
              className="btn-primary"
              onClick={handleCheckin}
              disabled={checkingIn || alreadyCheckedInToday || !profile}
            >
              {alreadyCheckedInToday
                ? "Check-in já feito hoje ✓"
                : checkingIn
                ? "Registrando..."
                : "Fazer check-in diário"}
            </button>
            {checkinMessage && (
              <p style={{ color: "#7fc9c4", fontSize: 13, marginTop: 8 }}>{checkinMessage}</p>
            )}
          </div>

          <div
            style={{
              margin: "20px 0",
              padding: 16,
              background: "rgba(255,255,255,0.06)",
              borderRadius: 10,
            }}
          >
            <p style={{ color: "#fff", fontSize: 13, fontWeight: 500, marginBottom: 4 }}>
              Arc Testnet
            </p>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginBottom: 10 }}>
              Adicione a rede de teste da Arc na sua wallet e pegue USDC de teste no faucet oficial da Circle.
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <button
                onClick={handleAddNetwork}
                style={{
                  padding: "8px 12px",
                  fontSize: 13,
                  borderRadius: 6,
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "transparent",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Adicionar Arc Testnet à wallet
              </button>
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
            </div>
            {networkMessage && (
              <p style={{ color: "#7fc9c4", fontSize: 12, marginTop: 8 }}>{networkMessage}</p>
            )}
          </div>

          <div className="profile-history">
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 500, margin: "24px 0 10px" }}>
              HISTÓRICO RECENTE
            </p>
            {bets.length === 0 && (
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13 }}>
                Você ainda não fez nenhuma previsão.
              </p>
            )}
            {bets.map((bet, i) => (
              <div className="profile-history-row" key={i}>
                <span>{marketNames[bet.market_id] || bet.market_id}</span>
                <span style={{ color: "#7fc9c4" }}>
                  {bet.side === "yes" ? "SIM" : "NÃO"} · ${Number(bet.amount).toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </main>
  );
}
