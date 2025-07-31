import type { Metadata } from "next";
import Navigation from '@/components/molecules/Navigation';
import ErrorBoundary from '@/components/atoms/ErrorBoundary';
import StructuredData from '@/components/atoms/StructuredData';
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://fotofactor-strategic-hub.vercel.app'),
  title: "Интерактивный Стратегический Хаб «Фотофактор»",
  description: "Операционная модель «Платформа + Юниты» — путь от хаоса к порядку. Интерактивный стратегический хаб для изучения современных подходов к управлению производством.",
  keywords: [
    "операционная модель",
    "платформа юниты", 
    "теория ограничений",
    "голдратт",
    "управление производством",
    "стратегический хаб",
    "фотофактор",
    "продакшн менеджмент",
    "workflow optimization",
    "business model"
  ],
  authors: [{ name: "Команда Фотофактор" }],
  creator: "Фотофактор",
  publisher: "Фотофактор",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'ru_RU',
    url: 'https://fotofactor-strategic-hub.vercel.app/',
    siteName: 'Стратегический Хаб Фотофактор',
    title: "Интерактивный Стратегический Хаб «Фотофактор»",
    description: "Операционная модель «Платформа + Юниты» — путь от хаоса к порядку. Изучите современные подходы к управлению производством.",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Операционная модель Платформа + Юниты',
      }
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Интерактивный Стратегический Хаб «Фотофактор»",
    description: "Операционная модель «Платформа + Юниты» — путь от хаоса к порядку",
    images: ['/og-image.jpg'],
    creator: '@fotofactor_ru',
    site: '@fotofactor_ru',
  },
  alternates: {
    canonical: 'https://fotofactor-strategic-hub.vercel.app/',
  },
  category: 'business',
  classification: 'Business Management Tool',
  other: {
    'business:contact_data:locality': 'Moscow',
    'business:contact_data:country_name': 'Russia',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="canonical" href="https://fotofactor-strategic-hub.vercel.app/" />
        <meta name="theme-color" content="#FF5A5A" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="Russian" />
        <meta name="revisit-after" content="7 days" />
        <meta name="rating" content="General" />
        <StructuredData type="WebSite" />
        <StructuredData type="Organization" />
        <StructuredData type="SoftwareApplication" />
      </head>
      <body className="antialiased">
        <ErrorBoundary>
          {/* Skip to main content for accessibility */}
          <a 
            href="#main-content" 
            className="skip-to-main"
            aria-label="Перейти к основному содержанию страницы"
          >
            Перейти к содержанию
          </a>
          
          <Navigation />
          
          <main 
            id="main-content" 
            role="main"
            aria-label="Основное содержание страницы"
            tabIndex={-1}
          >
            {children}
          </main>
        </ErrorBoundary>
      </body>
    </html>
  );
}
