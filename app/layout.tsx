import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Price Tracker",
  description: "Track prices of your favorite products",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="max-w-10xl h-auto mx-auto bg-[#0B1120] font-spaceGrotesk overflow-x-hidden">
          <Navbar />
          <div>{children}</div>
        </main>
      </body>
    </html>
  );
}
