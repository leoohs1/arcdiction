import { Header } from "../../components/Header";

export default function Docs() {
  return (
    <main className="docs-page">
      <Header active="Docs" />

      <div className="docs-layout">
        <div className="docs-sidebar">
          <p className="docs-sidebar-label">COMEÇANDO</p>
          <span className="docs-sidebar-item docs-sidebar-item-active">Primeiros passos</span>
          <span className="docs-sidebar-item">Conectar wallet</span>
          <p className="docs-sidebar-label">MERCADOS</p>
          <span className="docs-sidebar-item">Como resolver via Pyth</span>
          <span className="docs-sidebar-item">Disputa e arbitragem</span>
          <p className="docs-sidebar-label">GAMIFICAÇÃO</p>
          <span className="docs-sidebar-item">XP e níveis</span>
          <span className="docs-sidebar-item">Jackpot comunitário</span>
        </div>

        <div className="docs-content">
          <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>COMEÇANDO</p>
          <h1>Primeiros passos</h1>
          <p style={{ marginBottom: 16 }}>
            Arcdiction é um prediction market gamificado construído na Arc, com
            preços resolvidos pela Pyth e liquidez em USDC.
          </p>

          <div className="docs-step">
            <p>1. Conecte sua wallet</p>
            <p>Use uma wallet compatível com EVM na rede Arc (testnet por enquanto).</p>
          </div>
          <div className="docs-step">
            <p>2. Escolha um mercado</p>
            <p>Navegue pelas categorias e veja a probabilidade atual de SIM/NÃO.</p>
          </div>
          <div className="docs-step">
            <p>3. Faça sua previsão</p>
            <p>Deposite USDC na posição escolhida e acompanhe seu XP subir.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
