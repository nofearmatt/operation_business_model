import type { Metadata } from "next";
import Navigation from '@/components/molecules/Navigation';
import "./globals.css";

export const metadata: Metadata = {
  title: "Интерактивный Стратегический Хаб «Фотофактор»",
  description: "Операционная модель «Платформа + Юниты» — путь от хаоса к порядку",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <Navigation />
        {children}
      </body>
    </html>
  );
}
