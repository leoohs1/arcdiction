import { Header } from "../../components/Header";

export default function Docs() {
  return (
    <main className="docs-page">
      <Header active="Docs" />
      <div className="docs-layout">
        <div className="docs-sidebar">
          <p className="docs-sidebar-label">GETTING STARTED</p>
          <a href="#first-steps" className="docs-sidebar-item docs-sidebar-item-active">First steps</a>
          <a href="#connect-wallet" className="docs-sidebar-item">Connect wallet</a>

          <p className="docs-sidebar-label">ABOUT</p>
          <a href="#overview" className="docs-sidebar-item">Overview</a>
          <a href="#technology" className="docs-sidebar-item">Technology</a>

          <p className="docs-sidebar-label">MARKETS</p>
          <a href="#current-markets" className="docs-sidebar-item">Current markets</a>
          <a href="#how-pyth-resolves" className="docs-sidebar-item">How Pyth resolves markets</a>
          <a href="#disputes" className="docs-sidebar-item">Disputes and arbitration</a>

          <p className="docs-sidebar-label">GAMIFICATION</p>
          <a href="#xp-and-levels" className="docs-sidebar-item">XP and levels</a>
          <a href="#daily-checkin" className="docs-sidebar-item">Daily check-in</a>
          <a href="#weekly-jackpot" className="docs-sidebar-item">Weekly jackpot</a>

          <p className="docs-sidebar-label">ROADMAP</p>
          <a href="#phase-1" className="docs-sidebar-item">Phase 1 — MVP</a>
          <a href="#phase-2" className="docs-sidebar-item">Phase 2 — User-created markets</a>

          <p className="docs-sidebar-label">SECURITY</p>
          <a href="#security" className="docs-sidebar-item">Security and disputes</a>

          <p className="docs-sidebar-label">HELP</p>
          <a href="#faq" className="docs-sidebar-item">FAQ</a>
        </div>

        <div className="docs-content">
          {/* GETTING STARTED */}
          <section id="first-steps">
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>GETTING STARTED</p>
            <h1>First steps</h1>
            <p style={{ marginBottom: 16 }}>
              Arcdiction is a gamified prediction market built on Arc, with
              prices resolved by Pyth and USDC liquidity.
            </p>
            <div className="docs-step">
              <p>1. Connect your wallet</p>
              <p>Use an EVM-compatible wallet on the Arc network (testnet for now).</p>
            </div>
            <div className="docs-step">
              <p>2. Pick a market</p>
              <p>Browse categories and see the current YES/NO probability.</p>
            </div>
            <div className="docs-step">
              <p>3. Make your prediction</p>
              <p>Deposit test USDC on your chosen position and watch your XP grow.</p>
            </div>
          </section>

          <section id="connect-wallet" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>GETTING STARTED</p>
            <h2>Connect wallet</h2>
            <p style={{ marginBottom: 16 }}>
              Click "Connect wallet" at the top of the page. Arcdiction
              supports the main EVM wallets, like MetaMask and Rabby. Once
              connected, your wallet is linked to your profile, XP and
              prediction history. On the Home page, inside the "Built on
              Arc" section, you'll find official links to get test USDC
              from the Circle faucet and add Arc Testnet to your wallet.
            </p>
          </section>

          {/* ABOUT */}
          <section id="overview" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>ABOUT</p>
            <h2>Overview</h2>
            <p style={{ marginBottom: 16 }}>
              Users make predictions on real-world events — from crypto to
              sports to macroeconomics — betting on "Yes" or "No" outcomes.
              Arcdiction goes beyond a traditional betting market: it turns
              the experience into a game, with progression, competition and
              ongoing rewards.
            </p>
            <p style={{ marginBottom: 16 }}>
              Key differentiators: resolution via Pyth Network, USDC
              settlement powered by Circle infrastructure, and a
              gamification layer (XP, levels, daily check-in, weekly
              jackpot, leaderboard) that keeps the experience recurring and
              social.
            </p>
          </section>

          <section id="technology" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>ABOUT</p>
            <h2>Technology</h2>
            <div className="docs-step">
              <p>Arc</p>
              <p>Onchain infrastructure built for stablecoins — sub-second deterministic finality and USDC as native gas.</p>
            </div>
            <div className="docs-step">
              <p>Pyth Network</p>
              <p>Oracle — provides price and event data to resolve markets objectively.</p>
            </div>
            <div className="docs-step">
              <p>USDC (Circle)</p>
              <p>The stablecoin used for bets, liquidity and payouts.</p>
            </div>
          </section>

          {/* MARKETS */}
          <section id="current-markets" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>MARKETS</p>
            <h2>Current markets</h2>
            <div className="docs-step">
              <p>BTC above $70k by Aug 31?</p>
              <p>Category: Crypto</p>
            </div>
            <div className="docs-step">
              <p>Real Madrid wins the Champions League?</p>
              <p>Category: Sports</p>
            </div>
            <div className="docs-step">
              <p>Fed cuts US rates by December?</p>
              <p>Category: Macro</p>
            </div>
          </section>

          <section id="how-pyth-resolves" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>MARKETS</p>
            <h2>How Pyth resolves markets</h2>
            <p style={{ marginBottom: 16 }}>
              When an event ends, the market is resolved automatically
              based on data provided by Pyth, ensuring an objective and
              verifiable outcome.
            </p>
          </section>

          <section id="disputes" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>MARKETS</p>
            <h2>Disputes and arbitration</h2>
            <p style={{ marginBottom: 16 }}>
              If there's a discrepancy or suspected error in a resolution,
              a dispute mechanism lets the outcome be challenged and
              reviewed before final settlement.
            </p>
          </section>

          {/* GAMIFICATION */}
          <section id="xp-and-levels" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>GAMIFICATION</p>
            <h2>XP and levels</h2>
            <p style={{ marginBottom: 16 }}>
              You earn XP for every prediction you make and for daily
              check-ins. Your accumulated XP sets your level and your spot
              on the public leaderboard.
            </p>
          </section>

          <section id="daily-checkin" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>GAMIFICATION</p>
            <h2>Daily check-in</h2>
            <p style={{ marginBottom: 16 }}>
              On your Profile page, you can check in once a day. The XP you
              earn grows with each consecutive day (1, 3, 5, 7 XP...) — but
              if you miss a day, the streak resets back to zero.
            </p>
          </section>

          <section id="weekly-jackpot" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>GAMIFICATION</p>
            <h2>Weekly jackpot</h2>
            <p style={{ marginBottom: 16 }}>
              A percentage of the fees generated by Arcdiction bets feeds a
              community jackpot. Every week, 10 people are rewarded based
              on accumulated XP — the more XP, the better the odds. See
              details on the <a href="/jackpot">Jackpot</a> page.
            </p>
          </section>

          {/* ROADMAP */}
          <section id="phase-1" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>ROADMAP</p>
            <h2>Phase 1 — MVP (current)</h2>
            <div className="docs-step">
              <p>Initial markets</p>
              <p>Crypto (BTC), Sports (Champions League) and Macro (Fed), with more categories on the way.</p>
            </div>
            <div className="docs-step">
              <p>Format</p>
              <p>Binary markets (Yes/No), with initial liquidity provided by the platform itself.</p>
            </div>
            <div className="docs-step">
              <p>Resolution</p>
              <p>Via Pyth, with a dispute/arbitration mechanism.</p>
            </div>
          </section>

          <section id="phase-2" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>ROADMAP</p>
            <h2>Phase 2 — User-created markets</h2>
            <p style={{ marginBottom: 16 }}>
              Users will be able to freely create their own prediction
              markets, including setting initial odds/percentages. To avoid
              subjective resolution, market creation will be limited to
              assets/data supported by Pyth Network (crypto, equities,
              indices). The market creator earns a percentage of the fees
              it generates. This phase also brings bet settlement directly
              via smart contract on Arc, replacing the database used in
              this early testing phase.
            </p>
          </section>

          {/* SECURITY */}
          <section id="security" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>SECURITY</p>
            <h2>Security and dispute resolution</h2>
            <p style={{ marginBottom: 16 }}>
              In this testing phase, balances and bets are simulated (test
              USDC), stored centrally — no real funds move. All markets are
              resolved based on verifiable Pyth data, minimizing subjective
              outcomes. (Dispute window, who arbitrates contested cases,
              and penalties for bad-faith disputes are still being defined
              for the on-chain contract phase.)
            </p>
          </section>

          {/* FAQ */}
          <section id="faq" style={{ marginTop: 40 }}>
            <p style={{ color: "#7fc9c4", fontSize: 12, fontWeight: 500 }}>HELP</p>
            <h2>FAQ</h2>
            <div className="docs-step">
              <p>What is Arcdiction?</p>
              <p>A gamified prediction market platform, built on Arc.</p>
            </div>
            <div className="docs-step">
              <p>How are markets resolved?</p>
              <p>Automatically, based on Pyth Network data.</p>
            </div>
            <div className="docs-step">
              <p>Do I need USDC to participate?</p>
              <p>In this testing phase, every wallet automatically gets $10 of simulated balance to bet with.</p>
            </div>
            <div className="docs-step">
              <p>Which wallets can I use?</p>
              <p>Any Web3-compatible wallet, like MetaMask and Rabby.</p>
            </div>
            <div className="docs-step">
              <p>How does XP work?</p>
              <p>You earn XP by making predictions and daily check-ins. XP sets your level and your leaderboard position.</p>
            </div>
            <div className="docs-step">
              <p>Will I be able to create my own markets?</p>
              <p>Yes — starting in Phase 2, any user will be able to create markets, as long as they're based on assets covered by Pyth Network.</p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
