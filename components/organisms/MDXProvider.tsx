'use client';

import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import Button from '@/components/atoms/Button';

const components = {
  // Заголовки
  h1: (props: any) => <h1 className="text-4xl lg:text-5xl font-bold text-graphite mb-6" {...props} />,
  h2: (props: any) => <h2 className="text-3xl lg:text-4xl font-bold text-graphite mb-5" {...props} />,
  h3: (props: any) => <h3 className="text-2xl lg:text-3xl font-bold text-graphite mb-4" {...props} />,
  h4: (props: any) => <h4 className="text-xl font-bold text-graphite mb-3" {...props} />,

  // Параграфы
  p: (props: any) => <p className="mb-4 text-lg leading-relaxed text-steel" {...props} />,

  // Списки
  ul: (props: any) => <ul className="mb-4 space-y-2 ml-6 list-disc" {...props} />,
  ol: (props: any) => <ol className="mb-4 space-y-2 ml-6 list-decimal" {...props} />,
  li: (props: any) => <li className="text-lg leading-relaxed text-steel" {...props} />,

  // Ссылки
  a: (props: any) => (
    <a className="text-electric-coral hover:text-electric-coral/80 underline" {...props} />
  ),

  // Цитаты
  blockquote: (props: any) => (
    <blockquote className="border-l-4 border-electric-coral pl-6 my-6 italic text-steel" {...props} />
  ),

  // Код
  code: (props: any) => (
    <code className="bg-steel/10 px-2 py-1 rounded text-sm font-mono text-graphite" {...props} />
  ),

  pre: (props: any) => (
    <pre className="bg-graphite text-cloud p-4 rounded-lg mb-4 overflow-x-auto" {...props} />
  ),

  // Таблицы
  table: (props: any) => (
    <div className="overflow-x-auto mb-4">
      <table className="min-w-full border border-steel/20" {...props} />
    </div>
  ),
  
  th: (props: any) => (
    <th className="border border-steel/20 px-4 py-2 bg-steel/5 font-bold text-left" {...props} />
  ),
  
  td: (props: any) => (
    <td className="border border-steel/20 px-4 py-2" {...props} />
  ),

  // Кастомные компоненты
  Button,
};

interface MDXProviderProps {
  children: React.ReactNode;
}

export default function MDXProvider({ children }: MDXProviderProps) {
  return (
    <BaseMDXProvider components={components}>
      <div className="prose prose-lg max-w-none">
        {children}
      </div>
    </BaseMDXProvider>
  );
} 