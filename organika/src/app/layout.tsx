import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";

export const metadata: Metadata = {
  title: "ORGANIKA | Pós-Produção Cinematográfica",
  description: "Estúdio de pós-produção cinematográfica de Curitiba.",
};

function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <body className="min-h-screen overflow-x-hidden bg-[#F0EDE6] text-[#141410]">
      <SmoothScroll>
        {children}
      </SmoothScroll>
    </body>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}