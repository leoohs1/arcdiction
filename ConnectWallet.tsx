"use client";

import { useState } from "react";
import { useAccount, useConnect, useDisconnect } from "wagmi";

function short(address: string) {
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function ConnectWallet() {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();
  const [open, setOpen] = useState(false);

  if (isConnected && address) {
    return (
      <button className="btn-primary" onClick={() => disconnect()}>
        {short(address)} · Sair
      </button>
    );
  }

  return (
    <div style={{ position: "relative" }}>
      <button className="btn-primary" onClick={() => setOpen(!open)}>
        Conectar wallet
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            right: 0,
            top: "calc(100% + 8px)",
            background: "#fff",
            borderRadius: 10,
            padding: 8,
            minWidth: 180,
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
            zIndex: 10,
          }}
        >
          {connectors.map((connector) => (
            <button
              key={connector.uid}
              onClick={() => {
                connect({ connector });
                setOpen(false);
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "8px 10px",
                background: "transparent",
                border: "none",
                borderRadius: 6,
                fontSize: 13,
                color: "#0a2540",
                cursor: "pointer",
              }}
            >
              {connector.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
