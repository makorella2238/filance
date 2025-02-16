"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import FreelanceHero from "@/components/FreelanceHero/FreelanceHero";
import styles from "./RootLayout.module.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <div className={styles.rootContainer}>
            <FreelanceHero />
            <div className={styles.contentWrapper}>{children}</div>
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
