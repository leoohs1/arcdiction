"use client";

import Link from "next/link";
import { ConnectWallet } from "./ConnectWallet";

const links = [
  { href: "/mercados", label: "Mercados" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/docs", label: "Docs" },
  { href: "/perfil", label: "Perfil" },
];

export function Header({ active }: { active: string }) {
  return (
    <nav>
      <Link href="/" style={{ textDecoration: "none" }}>
        <span className="logo">
          <img
            src="/logo.png"
            alt="Arcdiction"
            style={{ height: 24, verticalAlign: "middle", marginRight: 8 }}
          />
          Arcdiction
        </span>
      </Link>
      <div className="nav-links">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={active === link.label ? "nav-link nav-link-active" : "nav-link"}
          >
            {link.label}
          </Link>
        ))}
      </div>
      <ConnectWallet />
    </nav>
  );
}
