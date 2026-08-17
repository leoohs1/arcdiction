import { Header } from "../../components/Header";

export default function Docs() {
  return (
    <main className="docs-page">
      <Header active="Docs" />
      <div className="docs-layout">
        <div className="docs-sidebar">
          <p className="docs-sidebar-label">COMEÇANDO</p>
          <a href="#primeiros-passos" className="docs-sidebar-item docs-sidebar-item-active">Primeiros passos</a>
          <a href="#conectar-wallet" className="docs-sidebar-item">Conectar wallet</a>

          <p className="docs-sidebar-label">SOBRE</p>
          <a href="#visao-geral" className="docs-sidebar-item">Visão geral</a>
          <a href="#tecnologia" className="docs-sidebar-item">Tecnologia</a>

          <p className="docs-sidebar-label">MERCADOS</p>
          <a href="#como-resolver-via-pyth" className="docs-sidebar-item">Como resolver via Pyth</a>
          <a href="#disputa-e-arbitragem" className="docs-sidebar-item">Disputa e arbitragem</a>

          <p className="docs-sidebar-label">GAMIFICAÇÃO</p>
          <a href="#xp-e-niveis" className="docs-sidebar-item">XP e níveis</a>
          <a href="#jackpot-comunitario" className="docs-sidebar-item">Jackpot comunitário</a>

          <p className="docs-sidebar-label">ROADMAP</p>
          <a href="#fase-1" className="docs-sidebar-item">Fase 1 — MVP</a>
          <a href="#fase-2" className="docs-sidebar-item">Fase 2 — Mercados por usuários</a>

          <p className="docs-sidebar-label">SEGURANÇA</p>
          <a href="#seguranca" className="docs-sidebar-item">Segurança e disputas</a>

          <p className="docs-sidebar-label">AJUDA</p>
          <a href="#faq" className="docs-sidebar-item">FAQ</a>
        </div>

        <div className="docs-content">
          {/* COMEÇANDO */}
          <section id="primeiros-passos">
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
          </section>

          <section id="conectar-wallet" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>COMEÇANDO</p>
            <h2>Conectar wallet</h2>
            <p style={{ marginBottom: 16 }}>
              Clique em "Conectar wallet" no topo da página. O Arcdiction suporta as
              principais wallets EVM, como MetaMask e Rabby. Após conectar, sua
              carteira fica vinculada ao seu perfil, XP e histórico de previsões.
            </p>
          </section>

          {/* SOBRE */}
          <section id="visao-geral" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>SOBRE</p>
            <h2>Visão geral</h2>
            <p style={{ marginBottom: 16 }}>
              Usuários fazem previsões sobre eventos reais — do mundo cripto ao
              mundo esportivo — apostando em resultados do tipo "Sim" ou "Não". O
              Arcdiction vai além de um mercado de apostas tradicional: transforma a
              experiência em um jogo, com progressão, competição e recompensas
              contínuas.
            </p>
            <p style={{ marginBottom: 16 }}>
              Diferenciais: resolução via Pyth Network, liquidação em USDC com
              infraestrutura da Circle, e uma camada de gamificação (XP, níveis,
              conquistas, ranking) que torna a experiência recorrente e social.
            </p>
          </section>

          <section id="tecnologia" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>SOBRE</p>
            <h2>Tecnologia</h2>
            <div className="docs-step">
              <p>Arc</p>
              <p>Infraestrutura onchain — base para finanças descentralizadas com stablecoins.</p>
            </div>
            <div className="docs-step">
              <p>Pyth Network</p>
              <p>Oráculo — fornece dados de preço e eventos para resolver mercados de forma objetiva.</p>
            </div>
            <div className="docs-step">
              <p>USDC (Circle)</p>
              <p>Stablecoin usada para apostas, liquidez e pagamentos.</p>
            </div>
          </section>

          {/* MERCADOS */}
          <section id="como-resolver-via-pyth" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>MERCADOS</p>
            <h2>Como resolver via Pyth</h2>
            <p style={{ marginBottom: 16 }}>
              Quando o evento termina, o mercado é resolvido automaticamente com
              base nos dados fornecidos pela Pyth, garantindo um resultado objetivo
              e verificável onchain.
            </p>
          </section>

          <section id="disputa-e-arbitragem" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>MERCADOS</p>
            <h2>Disputa e arbitragem</h2>
            <p style={{ marginBottom: 16 }}>
              Caso haja divergência ou suspeita de erro na resolução, existe um
              mecanismo de disputa, permitindo que o resultado seja contestado e
              revisado antes da liquidação final dos pagamentos.
            </p>
          </section>

          {/* GAMIFICAÇÃO */}
          <section id="xp-e-niveis" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>GAMIFICAÇÃO</p>
            <h2>XP e níveis</h2>
            <p style={{ marginBottom: 16 }}>
              Você ganha XP a cada previsão feita, acertada, ou por engajamento
              diário (login diário). O XP acumulado define seu nível, desbloqueando
              benefícios e reconhecimento, além de conquistas por marcos especiais
              como sequência de acertos ou primeira aposta. Seu desempenho também
              aparece no leaderboard público da plataforma.
            </p>
          </section>

          <section id="jackpot-comunitario" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>GAMIFICAÇÃO</p>
            <h2>Jackpot comunitário</h2>
            <p style={{ marginBottom: 16 }}>
              Um prêmio acumulado, alimentado por uma fração das taxas da
              plataforma, distribuído periodicamente entre os participantes mais
              ativos ou por sorteio entre elegíveis.
            </p>
          </section>

          {/* ROADMAP */}
          <section id="fase-1" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>ROADMAP</p>
            <h2>Fase 1 — MVP (atual)</h2>
            <div className="docs-step">
              <p>Mercados iniciais</p>
              <p>Um mercado de cripto (BTC ou ETH) e um de esporte (ex: Champions League ou NBA).</p>
            </div>
            <div className="docs-step">
              <p>Formato</p>
              <p>Mercados binários (Sim/Não), com liquidez inicial provida pelo próprio criador do mercado.</p>
            </div>
            <div className="docs-step">
              <p>Resolução</p>
              <p>Via Pyth, com mecanismo de disputa/arbitragem.</p>
            </div>
          </section>

          <section id="fase-2" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>ROADMAP</p>
            <h2>Fase 2 — Mercados criados por usuários</h2>
            <p style={{ marginBottom: 16 }}>
              Usuários poderão criar seus próprios mercados de previsão livremente,
              incluindo a definição das odds/porcentagens iniciais. Para evitar o
              problema de resolução subjetiva, a criação de mercados será limitada
              a ativos/dados que a Pyth Network suporta (cripto, ações, índices). O
              criador do mercado recebe uma porcentagem das taxas geradas por ele.
              Eventos totalmente abertos (sem cobertura de oráculo) ficam para uma
              fase futura, ainda em avaliação.
            </p>
          </section>

          {/* SEGURANÇA */}
          <section id="seguranca" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>SEGURANÇA</p>
            <h2>Segurança e resolução de disputas</h2>
            <p style={{ marginBottom: 16 }}>
              Todos os mercados são resolvidos com base em dados verificáveis via
              Pyth, minimizando resultados subjetivos. Existe uma camada de disputa
              para contestar resoluções antes da liquidação definitiva. (Prazo de
              disputa, quem arbitra em caso de contestação e penalidades por
              disputas infundadas ainda estão em definição.)
            </p>
          </section>

          {/* FAQ */}
          <section id="faq" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>AJUDA</p>
            <h2>FAQ</h2>
            <div className="docs-step">
              <p>O que é o Arcdiction?</p>
              <p>Uma plataforma de prediction markets gamificada, construída sobre a Arc.</p>
            </div>
            <div className="docs-step">
              <p>Como os mercados são resolvidos?</p>
              <p>Automaticamente, com base em dados da Pyth Network.</p>
            </div>
            <div className="docs-step">
              <p>Preciso ter USDC para participar?</p>
              <p>Sim, os depósitos e apostas são feitos em USDC.</p>
            </div>
            <div className="docs-step">
              <p>Quais carteiras posso usar?</p>
              <p>Carteiras compatíveis com Web3, como MetaMask e Rabby.</p>
            </div>
            <div className="docs-step">
              <p>Vou poder criar meus próprios mercados?</p>
              <p>Sim — a partir da Fase 2, qualquer usuário poderá criar mercados, desde que baseados em ativos cobertos pela Pyth Network.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
