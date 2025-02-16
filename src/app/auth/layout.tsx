"use client";

import FreelanceHero from "@/components/FreelanceHero/FreelanceHero";
import styles from "./RootLayout.module.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <html lang="en">
      <body>
          <div className={styles.rootContainer}>
            <FreelanceHero />
            <div className={styles.contentWrapper}>{children}</div>
          </div>
      </body>
    </html>
  );
}
