import type { Metadata } from "next";
import { AnimatedDonut } from '@/components/animated-donut';
import "./globals.css";

export const metadata: Metadata = {
  title: "veryveryHotdog",
  description: "Hotdog Area",

};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased relative">
        <AnimatedDonut />
        {children}
      </body>
    </html>
  );
}
