import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { AuthProvider } from "@/components/providers/auth-provider";
import { ToastProvider } from "@/components/ui/toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NeuroCards ai — Transform PDFs into Smart Flashcards",
  description:
    "Upload any PDF and instantly generate intelligent flashcards with AI. Master any subject with spaced repetition learning.",
  keywords: ["flashcards", "AI", "PDF", "study", "learning", "spaced repetition"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased">
        <AuthProvider>
          <ThemeProvider>
            <ToastProvider>{children}</ToastProvider>
          </ThemeProvider>
        </AuthProvider>
        <script defer src="/oneko.js"></script>
      </body>
    </html>
  );
}
