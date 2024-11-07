import type { Metadata } from "next";
import "../globals.css";
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
      <body
        className={`${dmSans.className} min-h-screen bg-slate-50/30 text-slate-800`}
      >
        <div className="mx-auto max-w-[960px]">
          <Header />
          <main className="my-4 px-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
