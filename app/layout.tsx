import "./globals.css";

export const metadata = {
  title: "Arcdiction",
  description: "Prediction market gamificado construído na Arc, resolvido pela Pyth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
