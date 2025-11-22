import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Slooze Commodities",
  description: "Role-based inventory manager",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        {/* Client wrappers moved into a small client component */}
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
