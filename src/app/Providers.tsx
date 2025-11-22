"use client";

import { ThemeProvider } from "next-themes";
import { UserProvider } from "@/lib/hooks";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <UserProvider>
        <div >
            {/*  */}

        {children}
        </div>
        <Toaster position="top-left" />
      </UserProvider>
    </ThemeProvider>
  );
}
