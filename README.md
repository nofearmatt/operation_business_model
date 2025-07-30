# 🚀 Интерактивный Стратегический Хаб «Фотофактор»

> Операционная модель «Платформа + Юниты» — путь от хаоса к порядку

[![Next.js](https://img.shields.io/badge/Next.js-15.4.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4_beta-06B6D4?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![MIT License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](https://choosealicense.com/licenses/mit/)

## 📋 О проекте

Интерактивное веб-приложение для презентации новой операционной модели компании «Фотофактор». Проект демонстрирует переход от традиционной структуры к инновационной модели «Платформа + Юниты».

### ✨ Ключевые особенности

- **🎯 Интерактивный интерфейс** — Навигация с анимациями и переходами
- **📱 Адаптивный дизайн** — Отлично работает на всех устройствах  
- **🎨 Современный UI** — Tailwind CSS v4 с кастомной темой
- **📖 MDX контент** — Динамическая подгрузка документации
- **⚡ Высокая производительность** — Next.js 15 с Turbopack
- **🔧 TypeScript** — Полная типизация кода

## 🛠 Технологический стек

### Frontend
- **Next.js 15.4.5** — React фреймворк с App Router
- **Tailwind CSS v4** — Utility-first CSS фреймворк
- **TypeScript** — Статическая типизация
- **Framer Motion** — Анимации и переходы
- **MDX** — Markdown с React компонентами

### Инструменты разработки
- **Turbopack** — Быстрый bundler для Next.js
- **ESLint** — Линтинг кода
- **PostCSS** — CSS обработка
- **Lucide React** — Иконки

## 🚀 Быстрый старт

### Требования
- Node.js 18.0 или выше
- npm или yarn

### Установка

```bash
# Клонируем репозиторий
git clone https://github.com/nofearmatt/operation_business_model.git
cd operation_business_model

# Устанавливаем зависимости
npm install

# Запускаем dev сервер
npm run dev
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере.

## 📁 Структура проекта

```
fotofactor-strategic-hub/
├── app/                    # Next.js App Router
│   ├── globals.css        # Глобальные стили + Tailwind
│   ├── layout.tsx         # Корневой лейаут
│   ├── page.tsx           # Главная страница
│   ├── hub/               # Стратегический хаб
│   └── satellite/         # Сателлитные страницы
├── components/            # React компоненты
│   ├── atoms/            # Базовые компоненты
│   ├── molecules/        # Составные компоненты
│   ├── organisms/        # Сложные компоненты
│   └── sections/         # Секции страниц
├── content/              # MDX документы
└── public/               # Статические файлы
```

## 🎨 Дизайн-система

### Цветовая палитра
- **Graphite** `#111827` — Основной текст
- **Steel** `#4B5563` — Второстепенный текст  
- **Cloud** `#F9FAFB` — Фон
- **Electric Coral** `#FF5A5A` — Акцент 1
- **Technical Blue** `#3B82F6` — Акцент 2

### Типографика
- **Основной шрифт**: Inter (Google Fonts)
- **Заголовки**: жирное начертание Inter
- **Адаптивные размеры**: от text-2xl до text-5xl

## 🔧 Особенности реализации

### Tailwind CSS v4
Проект использует beta-версию Tailwind CSS v4 с новой CSS-first конфигурацией:

```css
@import "tailwindcss";

@theme {
  --color-graphite: #111827;
  --color-steel: #4B5563;
  --color-cloud: #F9FAFB;
  /* ... */
}
```

### Компонентная архитектура
Следует принципам Atomic Design:
- **Atoms** — Кнопки, заголовки, иконки
- **Molecules** — Навигация, карточки
- **Organisms** — Сложные UI блоки
- **Sections** — Секции страниц

## 📱 Адаптивность

- **Mobile First** — Начинаем с мобильных устройств
- **Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)
- **Гибкие компоненты** — Автоматическая адаптация под экран

## 🚀 Деплой

### Vercel (рекомендуется)
```bash
npm run build
# Деплой через Vercel CLI или GitHub integration
```

### Другие платформы
```bash
npm run build
npm start
```

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте feature ветку (`git checkout -b feature/AmazingFeature`)
3. Сделайте коммит (`git commit -m 'Add some AmazingFeature'`)
4. Запушьте в ветку (`git push origin feature/AmazingFeature`)
5. Откройте Pull Request

## 📄 Лицензия

Проект распространяется под лицензией MIT. См. [LICENSE](LICENSE) для подробностей.

## 👥 Команда

- **Концепция и дизайн** — Команда «Фотофактор»
- **Разработка** — Интерактивный стратегический хаб
- **Техническая реализация** — Next.js + Tailwind CSS v4

## 📞 Контакты

- **Сайт**: [Фотофактор](https://fotofactor.ru)
- **GitHub**: [nofearmatt/operation_business_model](https://github.com/nofearmatt/operation_business_model)

---

<div align="center">
  <strong>🚀 Прототип готов к тестированию</strong><br>
  <em>Интерактивный стратегический хаб «Фотофактор»</em>
</div>
