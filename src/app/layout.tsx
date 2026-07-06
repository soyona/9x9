import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "9×9 MathGrid",
  description: "从理解到熟练的乘法学习工具",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
