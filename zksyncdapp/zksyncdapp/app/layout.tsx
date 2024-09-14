"use client";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi"; // using WagmiProvider instead of WagmiConfig
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { base, sepolia, polygon, lisk, mainnet, zksyncSepoliaTestnet } from "viem/chains";
import { Inter } from '@next/font/google';
// import localFont from 'next/font/local';
import './globals.css';

// Fonts configuration
// const geistSans = localFont({
//   src: './fonts/GeistVF.woff',
//   variable: '--font-geist-sans',
//   weight: '100 900',
// });
// const geistMono = localFont({
//   src: './fonts/GeistMonoVF.woff',
//   variable: '--font-geist-mono',
//   weight: '100 900',
// });
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

// RainbowKit and Wagmi setup with chains and SSR support
export const config = getDefaultConfig({
  appName: "waste management",
  projectId: process.env.NEXT_PUBLIC_RAINBOW_PROJECT_ID || "cd69bf97dd61900553d715d65cd1f44f", // Use project ID from env
  chains: [
    mainnet,
    polygon,
    base,
    lisk,
    zksyncSepoliaTestnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  ssr: true, // If your dApp uses server-side rendering (SSR)
});

// Initialize React Query client
const queryClient = new QueryClient();

// export const metadata = {
//   title: 'Secure Data',
//   description: 'A zkSync data management application',
// };

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        {/* WagmiProvider wraps RainbowKitProvider and QueryClientProvider */}
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            <RainbowKitProvider >
              {children}
            </RainbowKitProvider>
          </QueryClientProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
