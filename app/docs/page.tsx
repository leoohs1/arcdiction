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
          <a href="#mercados-atuais" className="docs-sidebar-item">Mercados atuais</a>
          <a href="#como-resolver-via-pyth" className="docs-sidebar-item">Como resolver via Pyth</a>
          <a href="#disputa-e-arbitragem" className="docs-sidebar-item">Disputa e arbitragem</a>

          <p className="docs-sidebar-label">GAMIFICAÇÃO</p>
          <a href="#xp-e-niveis" className="docs-sidebar-item">XP e níveis</a>
          <a href="#check-in-diario" className="docs-sidebar-item">Check-in diário</a>
          <a href="#jackpot-semanal" className="docs-sidebar-item">Jackpot semanal</a>

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
              <p>Deposite USDC (de teste) na posição escolhida e acompanhe seu XP subir.</p>
            </div>
          </section>

          <section id="conectar-wallet" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>COMEÇANDO</p>
            <h2>Conectar wallet</h2>
            <p style={{ marginBottom: 16 }}>
              Clique em "Conectar wallet" no topo da página. O Arcdiction suporta as
              principais wallets EVM, como MetaMask e Rabby. Após conectar, sua
              carteira fica vinculada ao seu perfil, XP e histórico de previsões.
              Na Home, dentro da seção "Built on Arc", você encontra os links
              oficiais para pegar USDC de teste no faucet da Circle e adicionar a
              Arc Testnet na sua wallet.
            </p>
          </section>

          {/* SOBRE */}
          <section id="visao-geral" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>SOBRE</p>
            <h2>Visão geral</h2>
            <p style={{ marginBottom: 16 }}>
              Usuários fazem previsões sobre eventos reais — do mundo cripto ao
              mundo esportivo e macroeconômico — apostando em resultados do tipo
              "Sim" ou "Não". O Arcdiction vai além de um mercado de apostas
              tradicional: transforma a experiência em um jogo, com progressão,
              competição e recompensas contínuas.
            </p>
            <p style={{ marginBottom: 16 }}>
              Diferenciais: resolução via Pyth Network, liquidação em USDC com
              infraestrutura da Circle, e uma camada de gamificação (XP, níveis,
              check-in diário, jackpot semanal, ranking) que torna a experiência
              recorrente e social.
            </p>
          </section>

          <section id="tecnologia" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>SOBRE</p>
            <h2>Tecnologia</h2>
            <div className="docs-step">
              <p>Arc</p>
              <p>Infraestrutura onchain feita para stablecoins — finalização determinística em menos de 1 segundo e USDC como gas nativo.</p>
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
          <section id="mercados-atuais" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>MERCADOS</p>
            <h2>Mercados atuais</h2>
            <div className="docs-step">
              <p>BTC acima de $70k até 31/08?</p>
              <p>Categoria: Cripto</p>
            </div>
            <div className="docs-step">
              <p>Real Madrid vence a Champions?</p>
              <p>Categoria: Esporte</p>
            </div>
            <div className="docs-step">
              <p>Fed corta juros dos EUA até dezembro?</p>
              <p>Categoria: Macro</p>
            </div>
          </section>

          <section id="como-resolver-via-pyth" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>MERCADOS</p>
            <h2>Como resolver via Pyth</h2>
            <p style={{ marginBottom: 16 }}>
              Quando o evento termina, o mercado é resolvido automaticamente com
              base nos dados fornecidos pela Pyth, garantindo um resultado objetivo
              e verificável.
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
              Você ganha XP a cada previsão feita e também fazendo check-in
              diário. O XP acumulado define seu nível e sua posição no
              leaderboard público da plataforma.
            </p>
          </section>

          <section id="check-in-diario" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>GAMIFICAÇÃO</p>
            <h2>Check-in diário</h2>
            <p style={{ marginBottom: 16 }}>
              No seu Perfil, você pode fazer check-in uma vez por dia. O XP
              ganho cresce a cada dia consecutivo (1, 3, 5, 7 XP...) — mas se
              você pular um dia, a sequência volta a começar do zero.
            </p>
          </section>

          <section id="jackpot-semanal" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>GAMIFICAÇÃO</p>
            <h2>Jackpot semanal</h2>
            <p style={{ marginBottom: 16 }}>
              Uma porcentagem das taxas geradas nas apostas do Arcdiction
              alimenta um jackpot comunitário. Toda semana, 10 pessoas são
              premiadas com base no XP acumulado — quanto mais XP, maiores as
              chances. Veja os detalhes na página de{" "}
              <a href="/jackpot">Jackpot</a>.
            </p>
          </section>

          {/* ROADMAP */}
          <section id="fase-1" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>ROADMAP</p>
            <h2>Fase 1 — MVP (atual)</h2>
            <div className="docs-step">
              <p>Mercados iniciais</p>
              <p>Cripto (BTC), Esporte (Champions League) e Macro (Fed), com mais categorias a caminho.</p>
            </div>
            <div className="docs-step">
              <p>Formato</p>
              <p>Mercados binários (Sim/Não), com liquidez inicial provida pela própria plataforma.</p>
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
              Usuários poderão criar seus próprios mercados de previsão
              livremente, incluindo a definição das odds/porcentagens
              iniciais. Para evitar o problema de resolução subjetiva, a
              criação de mercados será limitada a ativos/dados que a Pyth
              Network suporta (cripto, ações, índices). O criador do mercado
              recebe uma porcentagem das taxas geradas por ele. Essa fase
              também traz a liquidação de apostas diretamente via smart
              contract na Arc, substituindo o banco de dados usado nesta
              primeira fase de testes.
            </p>
          </section>

          {/* SEGURANÇA */}
          <section id="seguranca" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>SEGURANÇA</p>
            <h2>Segurança e resolução de disputas</h2>
            <p style={{ marginBottom: 16 }}>
              Nesta fase de testes, os saldos e apostas são simulados (USDC de
              teste), guardados de forma centralizada — não há movimentação
              de fundos reais. Todos os mercados são resolvidos com base em
              dados verificáveis via Pyth, minimizando resultados subjetivos.
              (Prazo de disputa, quem arbitra em caso de contestação e
              penalidades por disputas infundadas ainda estão em definição
              para a fase com contratos on-chain.)
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
              <p>Nesta fase de testes, cada wallet recebe automaticamente $10 de saldo simulado para apostar.</p>
            </div>
            <div className="docs-step">
              <p>Quais carteiras posso usar?</p>
              <p>Carteiras compatíveis com Web3, como MetaMask e Rabby.</p>
            </div>
            <div className="docs-step">
              <p>Como funciona o XP?</p>
              <p>Você ganha XP fazendo previsões e check-in diário. O XP define seu nível e sua posição no leaderboard.</p>
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
