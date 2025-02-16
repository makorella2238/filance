'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FreelanceHero from '@/components/FreelanceHero/FreelanceHero';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="flex w-full h-screen items-center justify-center p-6 space-x-6">
            <FreelanceHero />
            {children}
          </div>
        </QueryClientProvider>
      </body>
    </html>
  );
}
