"use client";

import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet } from "wagmi/chains";
import { metaMask, injected } from "wagmi/connectors";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Por enquanto usamos a rede "mainnet" só como placeholder técnico.
// Quando entrarmos na parte dos contratos, trocamos isso pela rede
// testnet da Arc de verdade.
export const config = createConfig({
  chains: [mainnet],
  connectors: [metaMask(), injected({ target: "rabby" })],
  transports: { [mainnet.id]: http() },
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
