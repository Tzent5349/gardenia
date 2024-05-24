import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import '@smastrom/react-rating/style.css'
import { ThemeProvider } from "@/providers/theme-provider";
import { ToastProvider } from "@/providers/toast-provider";
import Head from "next/head";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Jost({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "GARDENIA - Portuguese brand and Lisbon fashion icon since 1988",
  description: "the go-to spot for modern portuguese design shoe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ToastProvider />

            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
