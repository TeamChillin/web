import type { Metadata } from "next";
import { AnimatedDonut } from '@/components/animated-donut';
import { DonutOpacityProvider } from '@/components/donut-opacity-context';
import "./globals.css";

export const metadata: Metadata = {
  title: "HOTDOG — HERE, 부탁해, 혼술어때",
  description: "신선하고, 위험하고, 높이 날고, 미치게 뜨거운 앱을 만드는 스튜디오 HOTDOG. HERE, 부탁해, 그리고 곧 만날 혼술어때.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased relative">
        <DonutOpacityProvider>
          <AnimatedDonut />
          {children}
        </DonutOpacityProvider>
      </body>
    </html>
  );
}
