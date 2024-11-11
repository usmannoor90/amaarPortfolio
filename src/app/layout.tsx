import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import { Footer } from "@/components/Footer";
import { StarsBackground } from "@/components/stars-background";
import { ShootingStars } from "@/components/shooting-stars";
import FloatingNav from "@/components/floating-navbar";

import logo from "../app/favicon.ico";
import { navlinks } from "@/constants/navlinks";

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Amaar Khan - Writer",
  description:
    "Amaar Khan is a Writer and speaker. He is a digital nomad and travels around the world while working remotely.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={twMerge(
          inter.className,
          " antialiased   bg-black relative overflow-hidden  "
        )}
      >
        <ShootingStars />
        <StarsBackground />
        <FloatingNav navItems={navlinks} logoUrl={`${logo}`} />

        <div className=" bg-[#0000002f] flex-1 overflow-y-auto">
          <div className="flex-1 bg-[#0000002f] h-screen  relative z-10 w-full">
            {children}
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
