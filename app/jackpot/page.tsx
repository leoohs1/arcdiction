"use client";
import { useEffect, useState } from "react";
import { Header } from "../../components/Header";

// calcula o tempo até a próxima segunda-feira 00:00 (distribuição semanal)
function getCountdown() {
  const now = new Date();
  const next = new Date(now);
  const daysUntilMonday = (8 - now.getDay()) % 7 || 7;
  next.setDate(now.getDate() + daysUntilMonday);
  next.setHours(0, 0, 0, 0);
  const diff = next.getTime() - now.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  return { days, hours, minutes };
}

const winners = [
  { place: "1º", pct: "25%" },
  { place: "2º", pct: "18%" },
  { place: "3º", pct: "14%" },
  { place: "4º", pct: "10%" },
  { place: "5º", pct: "8%" },
  { place: "6º", pct: "7%" },
  { place: "7º", pct: "6%" },
  { place: "8º", pct: "5%" },
  { place: "9º", pct: "4%" },
  { place: "10º", pct: "3%" },
];

export default function Jackpot() {
  const [countdown, setCountdown] = useState(getCountdown());

  useEffect(() => {
    const interval = setInterval(() => setCountdown(getCountdown()), 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main>
      <div className="page-hero">
        <Header active="Jackpot" />
        <div className="page-hero-content">
          <h1>💰 Jackpot Semanal</h1>
          <p>Predict. Compete. Earn.</p>
        </div>
      </div>

      <section
        style={{
          padding: "56px 24px",
          background: "linear-gradient(135deg, #123a5e 0%, #1c5c8f 100%)",
          color: "#fff",
          textAlign: "center",
        }}
      >
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 24, lineHeight: 1.6 }}>
            Toda semana, você tem uma chance de ganhar o jackpot da
            comunidade — e quanto mais XP você acumula, maiores são suas
            chances. Faça previsões, mantenha sua sequência de check-in e
            suba no ranking pra aumentar suas chances.
          </p>

          <p style={{ fontSize: 40, fontWeight: 700, marginBottom: 8 }}>
            $250 USDC{" "}
            <span style={{ fontSize: 13, fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>
              (prévia)
            </span>
          </p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", marginBottom: 32 }}>
            Uma porcentagem de todas as taxas geradas nas apostas do
            Arcdiction alimenta o jackpot semanal.
          </p>

          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
            Próxima distribuição em {countdown.days}d {countdown.hours}h {countdown.minutes}m
          </p>
        </div>
      </section>

      <section style={{ padding: "48px 24px", maxWidth: 640, margin: "0 auto" }}>
        <h2 style={{ fontSize: 20, marginBottom: 8, textAlign: "center" }}>
          10 ganhadores toda semana
        </h2>
        <p style={{ fontSize: 13, color: "#5f5e5a", textAlign: "center", marginBottom: 24 }}>
          O jackpot é dividido entre os 10 primeiros colocados da semana,
          sorteados com chances proporcionais ao XP de cada um.
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
            gap: 10,
          }}
        >
          {winners.map((w, i) => (
            <div
              key={i}
              style={{
                border: "1px solid #eee",
                borderRadius: 8,
                padding: "12px 8px",
                textAlign: "center",
              }}
            >
              <p style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{w.place}</p>
              <p style={{ fontSize: 13, color: "#5f5e5a" }}>{w.pct}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ padding: "0 24px 40px", maxWidth: 640, margin: "0 auto" }}>
        <p style={{ fontSize: 12, color: "#9aa5b1", textAlign: "center" }}>
          O valor do jackpot ainda é uma prévia ilustrativa e o sorteio
          ponderado por XP ainda não está automatizado — essa é a mecânica
          planejada, que será ativada conforme a plataforma evolui.
        </p>
      </section>
    </main>
  );
}
