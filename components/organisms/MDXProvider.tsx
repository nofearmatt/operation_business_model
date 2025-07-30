'use client';

import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import Heading from '@/components/atoms/Heading';
import Button from '@/components/atoms/Button';
import Tooltip from '@/components/atoms/Tooltip';

const components = {
  // Заголовки
  h1: (props: any) => <Heading level={1} className="mb-6 mt-8 first:mt-0" {...props} />,
  h2: (props: any) => <Heading level={2} className="mb-4 mt-8 first:mt-0" {...props} />,
  h3: (props: any) => <Heading level={3} className="mb-3 mt-6" {...props} />,
  h4: (props: any) => <Heading level={4} className="mb-2 mt-4" {...props} />,

  // Параграфы и текст
  p: (props: React.HTMLProps<HTMLParagraphElement>) => <p className="mb-4 text-lg leading-relaxed text-graphite" {...props} />,
  
  // Списки
  ul: (props: React.HTMLProps<HTMLUListElement>) => <ul className="mb-4 space-y-2 ml-6" {...props} />,
  ol: (props: React.HTMLProps<HTMLOListElement>) => <ol className="mb-4 space-y-2 ml-6" {...props} />,
  li: (props: React.HTMLProps<HTMLLIElement>) => <li className="text-lg leading-relaxed" {...props} />,

  // Ссылки
  a: (props: React.HTMLProps<HTMLAnchorElement>) => (
    <a 
      className="text-technical-blue hover:text-electric-coral transition-colors underline decoration-2 underline-offset-2" 
      {...props} 
    />
  ),

  // Таблицы
  table: (props: React.HTMLProps<HTMLTableElement>) => (
    <div className="mb-6 overflow-x-auto">
      <table className="w-full border-collapse bg-white/60 rounded-lg overflow-hidden shadow-sm" {...props} />
    </div>
  ),
  thead: (props: React.HTMLProps<HTMLTableSectionElement>) => <thead className="bg-steel/10" {...props} />,
  tbody: (props: React.HTMLProps<HTMLTableSectionElement>) => <tbody {...props} />,
  tr: (props: React.HTMLProps<HTMLTableRowElement>) => <tr className="border-b border-steel/20" {...props} />,
  th: (props: React.HTMLProps<HTMLTableCellElement>) => <th className="px-4 py-3 text-left font-semibold text-graphite" {...props} />,
  td: (props: React.HTMLProps<HTMLTableCellElement>) => <td className="px-4 py-3 text-steel" {...props} />,

  // Блоки кода
  code: (props: React.HTMLProps<HTMLElement>) => (
    <code className="bg-steel/10 px-2 py-1 rounded text-sm font-mono text-graphite" {...props} />
  ),
  pre: (props: React.HTMLProps<HTMLPreElement>) => (
    <pre className="bg-graphite text-cloud p-4 rounded-lg overflow-x-auto mb-6 text-sm" {...props} />
  ),

  // Цитаты
  blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
    <blockquote className="border-l-4 border-electric-coral bg-white/60 pl-6 py-4 mb-6 italic text-steel" {...props} />
  ),

  // Горизонтальная линия
  hr: (props: React.HTMLProps<HTMLHRElement>) => <hr className="my-8 border-steel/30" {...props} />,

  // Жирный и курсив
  strong: (props: React.HTMLProps<HTMLElement>) => <strong className="font-bold text-graphite" {...props} />,
  em: (props: React.HTMLProps<HTMLElement>) => <em className="italic" {...props} />,

  // Кастомные компоненты
  Tooltip,
  Button,
};

interface MDXProviderProps {
  children: React.ReactNode;
}

export default function MDXProvider({ children }: MDXProviderProps) {
  return (
    <BaseMDXProvider components={components}>
      {children}
    </BaseMDXProvider>
  );
} 