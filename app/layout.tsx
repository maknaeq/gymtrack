import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import Header from "@/components/Header";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Gymtrack",
  description: "Mesurez vos performances sportives",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${dmSans.className} text-zinc-800`}>
        <Header />
        <main className="px-4">{children}</main>
      </body>
    </html>
  );
}
