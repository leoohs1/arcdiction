import { Header } from "../../components/Header";

export default function Perfil() {
  return (
    <main className="profile-page">
      <div style={{ padding: "0 0" }}>
        <Header active="Perfil" />
      </div>

      <div className="profile-header">
        <div className="profile-avatar">MK</div>
        <div>
          <p style={{ color: "#fff", fontSize: 16, fontWeight: 500, margin: "0 0 2px" }}>0xMk...4a2</p>
          <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, margin: 0 }}>Nível 14 · Preditor experiente</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="profile-stat-card">
          <p>62%</p>
          <p>Taxa de acerto</p>
        </div>
        <div className="profile-stat-card">
          <p>143</p>
          <p>Previsões feitas</p>
        </div>
        <div className="profile-stat-card">
          <p>7</p>
          <p>Sequência atual</p>
        </div>
      </div>

      <div className="profile-history">
        <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 11, fontWeight: 500, margin: "24px 0 10px" }}>
          HISTÓRICO RECENTE
        </p>
        <div className="profile-history-row">
          <span>BTC acima de $120k?</span>
          <span style={{ color: "#7fc9c4" }}>SIM · aberto</span>
        </div>
        <div className="profile-history-row">
          <span>ETH acima de $4k em julho?</span>
          <span style={{ color: "#97c459" }}>Acertou · +180 XP</span>
        </div>
      </div>
    </main>
  );
}
