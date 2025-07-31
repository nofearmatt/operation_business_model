'use client';

import React from 'react';
import { MDXProvider as BaseMDXProvider } from '@mdx-js/react';
import Tooltip from '@/components/atoms/Tooltip';
import SolutionDiagram from '@/components/organisms/SolutionDiagram';
import ProductMatrixViewer from '@/components/organisms/ProductMatrixViewer';
import InteractiveDocumentViewer from '@/components/organisms/InteractiveDocumentViewer';
import Button from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';
import Icon from '@/components/atoms/Icon';
import { findGlossaryTerm } from '@/lib/glossary';

// Компонент для автоматического обнаружения терминов в MDX
const AutoTooltip: React.FC<{ term: string; children: React.ReactNode }> = ({ 
  term, 
  children 
}) => {
  const glossaryTerm = findGlossaryTerm(term);
  
  if (glossaryTerm) {
    return (
      <Tooltip term={term}>
        {children}
      </Tooltip>
    );
  }
  
  return <>{children}</>;
};

// Расширенный компонент Tooltip для MDX
const MDXTooltip: React.FC<{
  text?: string;
  term?: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
  children: React.ReactNode;
}> = ({ text, term, position = 'top', children }) => {
  return (
    <Tooltip text={text} term={term} position={position}>
      {children}
    </Tooltip>
  );
};

// Кастомные компоненты для MDX
const components = {
  // Основные компоненты
  Tooltip: MDXTooltip,
  AutoTooltip,
  SolutionDiagram,
  ProductMatrixViewer,
  InteractiveDocumentViewer,
  Button,
  Heading,
  Icon,
  
  // Переопределение стандартных элементов
  h1: ({ children, ...props }: any) => (
    <Heading level={1} className="mb-6 text-3xl md:text-4xl font-bold text-graphite" {...props}>
      {children}
    </Heading>
  ),
  
  h2: ({ children, ...props }: any) => (
    <Heading level={2} className="mb-4 text-2xl md:text-3xl font-semibold text-graphite mt-8" {...props}>
      {children}
    </Heading>
  ),
  
  h3: ({ children, ...props }: any) => (
    <Heading level={3} className="mb-3 text-xl md:text-2xl font-medium text-graphite mt-6" {...props}>
      {children}
    </Heading>
  ),
  
  p: ({ children, ...props }: any) => (
    <p className="mb-4 text-steel leading-relaxed text-base md:text-lg" {...props}>
      {children}
    </p>
  ),
  
  ul: ({ children, ...props }: any) => (
    <ul className="mb-4 pl-6 space-y-2 text-steel" {...props}>
      {children}
    </ul>
  ),
  
  ol: ({ children, ...props }: any) => (
    <ol className="mb-4 pl-6 space-y-2 text-steel list-decimal" {...props}>
      {children}
    </ol>
  ),
  
  li: ({ children, ...props }: any) => (
    <li className="text-steel leading-relaxed" {...props}>
      {children}
    </li>
  ),
  
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-electric-coral pl-4 py-2 mb-4 bg-cloud/50 italic text-steel" {...props}>
      {children}
    </blockquote>
  ),
  
  code: ({ children, ...props }: any) => (
    <code className="px-2 py-1 bg-cloud text-graphite rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),
  
  pre: ({ children, ...props }: any) => (
    <pre className="mb-4 p-4 bg-graphite text-cloud rounded-lg overflow-x-auto text-sm" {...props}>
      {children}
    </pre>
  ),
  
  table: ({ children, ...props }: any) => (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full border-collapse border border-steel/20" {...props}>
        {children}
      </table>
    </div>
  ),
  
  th: ({ children, ...props }: any) => (
    <th className="border border-steel/20 px-4 py-2 bg-cloud text-graphite font-semibold text-left" {...props}>
      {children}
    </th>
  ),
  
  td: ({ children, ...props }: any) => (
    <td className="border border-steel/20 px-4 py-2 text-steel" {...props}>
      {children}
    </td>
  ),
  
  a: ({ children, href, ...props }: any) => (
    <a 
      href={href}
      className="text-technical-blue hover:text-electric-coral underline transition-colors"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  
  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold text-graphite" {...props}>
      {children}
    </strong>
  ),
  
  em: ({ children, ...props }: any) => (
    <em className="italic text-steel" {...props}>
      {children}
    </em>
  ),
  
  hr: ({ ...props }: any) => (
    <hr className="my-8 border-t border-steel/20" {...props} />
  ),
  
  // Кастомные wrapper компоненты
  Section: ({ children, className = '', ...props }: any) => (
    <section className={`mb-8 ${className}`} {...props}>
      {children}
    </section>
  ),
  
  Card: ({ children, className = '', ...props }: any) => (
    <div className={`bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg mb-6 ${className}`} {...props}>
      {children}
    </div>
  ),
  
  Alert: ({ type = 'info', children, ...props }: any) => {
    const typeClasses = {
      info: 'bg-technical-blue/10 border-technical-blue text-technical-blue',
      success: 'bg-green-500/10 border-green-500 text-green-700',
      warning: 'bg-yellow-500/10 border-yellow-500 text-yellow-700',
      error: 'bg-electric-coral/10 border-electric-coral text-electric-coral'
    };
    
    return (
      <div className={`border-l-4 p-4 mb-4 rounded-r-lg ${typeClasses[type as keyof typeof typeClasses]}`} {...props}>
        {children}
      </div>
    );
  },
  
  // Специальные компоненты для терминологии
  Term: ({ children, definition, ...props }: any) => (
    <Tooltip text={definition} position="top">
      <span className="font-medium text-graphite cursor-help" {...props}>
        {children}
      </span>
    </Tooltip>
  ),
  
  KPI: ({ children, description, ...props }: any) => (
    <Tooltip text={description} position="top">
      <span className="font-semibold text-technical-blue bg-technical-blue/10 px-2 py-1 rounded cursor-help" {...props}>
        {children}
      </span>
    </Tooltip>
  )
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