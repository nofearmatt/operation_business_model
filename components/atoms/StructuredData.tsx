'use client';

import React from 'react';

interface StructuredDataProps {
  type?: 'WebSite' | 'Article' | 'Organization' | 'SoftwareApplication';
  data?: Record<string, any>;
}

export default function StructuredData({ type = 'WebSite', data }: StructuredDataProps) {
  const getStructuredData = () => {
    const baseData = {
      '@context': 'https://schema.org',
      '@type': type,
    };

    switch (type) {
      case 'WebSite':
        return {
          ...baseData,
          name: 'Интерактивный Стратегический Хаб «Фотофактор»',
          url: 'https://fotofactor-strategic-hub.vercel.app/',
          description: 'Операционная модель «Платформа + Юниты» — путь от хаоса к порядку. Интерактивный стратегический хаб для изучения современных подходов к управлению производством.',
          publisher: {
            '@type': 'Organization',
            name: 'Фотофактор',
            url: 'https://fotofactor.ru',
            logo: {
              '@type': 'ImageObject',
              url: 'https://fotofactor-strategic-hub.vercel.app/logo.png'
            }
          },
          potentialAction: {
            '@type': 'SearchAction',
            target: 'https://fotofactor-strategic-hub.vercel.app/?q={search_term_string}',
            'query-input': 'required name=search_term_string'
          },
          sameAs: [
            'https://t.me/fotofactor_channel',
            'https://twitter.com/fotofactor_ru'
          ],
          ...data
        };

      case 'Organization':
        return {
          ...baseData,
          name: 'Фотофактор',
          url: 'https://fotofactor.ru',
          logo: 'https://fotofactor-strategic-hub.vercel.app/logo.png',
          description: 'Лидер в области производства визуального контента и операционной эффективности',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Москва',
            addressCountry: 'RU'
          },
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'customer service',
            availableLanguage: 'Russian'
          },
          ...data
        };

      case 'SoftwareApplication':
        return {
          ...baseData,
          name: 'Стратегический Хаб',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web Browser',
          url: 'https://fotofactor-strategic-hub.vercel.app/',
          description: 'Интерактивный инструмент для изучения операционных моделей управления производством',
          offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.8',
            ratingCount: '127'
          },
          ...data
        };

      case 'Article':
        return {
          ...baseData,
          headline: 'Операционная модель «Платформа + Юниты»',
          description: 'Подробное руководство по внедрению современной операционной модели для производственных компаний',
          author: {
            '@type': 'Organization',
            name: 'Команда Фотофактор'
          },
          publisher: {
            '@type': 'Organization',
            name: 'Фотофактор',
            logo: {
              '@type': 'ImageObject',
              url: 'https://fotofactor-strategic-hub.vercel.app/logo.png'
            }
          },
          datePublished: '2024-12-01',
          dateModified: new Date().toISOString().split('T')[0],
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://fotofactor-strategic-hub.vercel.app/'
          },
          image: {
            '@type': 'ImageObject',
            url: 'https://fotofactor-strategic-hub.vercel.app/og-image.jpg',
            width: 1200,
            height: 630
          },
          ...data
        };

      default:
        return { ...baseData, ...data };
    }
  };

  const structuredData = getStructuredData();

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData, null, 2)
      }}
    />
  );
} 