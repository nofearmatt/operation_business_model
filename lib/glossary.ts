// Универсальная коллекция терминов для Tooltip системы
// Используется для автоматического добавления подсказок к специальным терминам

export interface GlossaryTerm {
  term: string;
  definition: string;
  category: 'business' | 'technical' | 'metrics' | 'process';
}

export const glossaryTerms: GlossaryTerm[] = [
  // Бизнес-термины
  {
    term: 'Платформа + Юниты',
    definition: 'Операционная модель где центральная платформа предоставляет ресурсы автономным бизнес-единицам',
    category: 'business'
  },
  {
    term: 'Юнит',
    definition: 'Автономная бизнес-единица с собственным продюсером и фокусом на конкретном продукте/услуге',
    category: 'business'
  },
  {
    term: 'Платформа',
    definition: 'Центральный хаб ресурсов: студии, оборудование, штатные специалисты. Обслуживает все юниты',
    category: 'business'
  },
  {
    term: 'Head of Resources',
    definition: 'Глава платформы. Отвечает за максимальную доступность и эффективность всех внутренних ресурсов',
    category: 'business'
  },
  {
    term: 'Продюсер',
    definition: 'CEO проекта внутри юнита. Управляет бюджетом, ресурсами и результатом конкретного проекта',
    category: 'business'
  },
  
  // Метрики
  {
    term: 'KPI',
    definition: 'Key Performance Indicators - ключевые показатели эффективности для измерения успеха',
    category: 'metrics'
  },
  {
    term: 'Утилизация ресурсов',
    definition: 'Процент времени, когда ресурс приносит пользу (забронирован). Цель: 80-90%',
    category: 'metrics'
  },
  {
    term: 'ROI',
    definition: 'Return on Investment - возврат инвестиций. Показатель прибыльности проекта или юнита',
    category: 'metrics'
  },
  {
    term: 'NPS',
    definition: 'Net Promoter Score - индекс лояльности клиентов. Готовность рекомендовать компанию',
    category: 'metrics'
  },
  {
    term: 'CSAT',
    definition: 'Customer Satisfaction Score - индекс удовлетворенности клиентов',
    category: 'metrics'
  },
  
  // Процессы
  {
    term: 'Бренд-Пакет',
    definition: 'Комплексный проект по созданию фирменного стиля: логотип, фотосъемка, видео, дизайн',
    category: 'process'
  },
  {
    term: 'Контент-Стартер',
    definition: 'Базовый пакет контента для быстрого запуска присутствия бренда в соц.сетях',
    category: 'process'
  },
  {
    term: 'Asset Hub',
    definition: 'Будущая SaaS-платформа для управления цифровыми активами и творческими ресурсами',
    category: 'technical'
  },
  {
    term: 'CRM',
    definition: 'Customer Relationship Management - система управления взаимоотношениями с клиентами',
    category: 'technical'
  },
  
  // Технические термины
  {
    term: 'MDX',
    definition: 'Markdown с поддержкой React компонентов. Позволяет встраивать интерактивные элементы в текст',
    category: 'technical'
  },
  {
    term: 'SVG',
    definition: 'Scalable Vector Graphics - векторная графика, масштабируемая без потери качества',
    category: 'technical'
  },
  {
    term: 'Framer Motion',
    definition: 'Библиотека анимаций для React. Создает плавные переходы и интерактивные эффекты',
    category: 'technical'
  },
  {
    term: 'Lighthouse',
    definition: 'Инструмент Google для аудита производительности, SEO и доступности веб-сайтов',
    category: 'technical'
  },
  {
    term: 'MVP',
    definition: 'Minimum Viable Product - минимально жизнеспособный продукт с базовой функциональностью',
    category: 'technical'
  }
];

// Утилита для поиска термина в глоссарии
export const findGlossaryTerm = (term: string): GlossaryTerm | undefined => {
  return glossaryTerms.find(item => 
    item.term.toLowerCase() === term.toLowerCase()
  );
};

// Утилита для получения всех терминов определенной категории
export const getTermsByCategory = (category: GlossaryTerm['category']): GlossaryTerm[] => {
  return glossaryTerms.filter(term => term.category === category);
};

// Автоматическое обнаружение терминов в тексте
export const detectTermsInText = (text: string): string[] => {
  const foundTerms: string[] = [];
  
  glossaryTerms.forEach(item => {
    const regex = new RegExp(`\\b${item.term}\\b`, 'gi');
    if (regex.test(text)) {
      foundTerms.push(item.term);
    }
  });
  
  return foundTerms;
}; 