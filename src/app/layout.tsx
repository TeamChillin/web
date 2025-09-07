import type { Metadata } from "next";
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
