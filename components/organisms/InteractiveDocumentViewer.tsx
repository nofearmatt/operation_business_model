'use client';

import { useEffect, useState, useRef } from 'react';
import { ChevronRight, FileText } from 'lucide-react';
import Icon from '@/components/atoms/Icon';
import ProgressIndicator from '@/components/atoms/ProgressIndicator';
import ScrollReveal from '@/components/atoms/ScrollReveal';

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface InteractiveDocumentViewerProps {
  children: React.ReactNode;
}

export default function InteractiveDocumentViewer({ children }: InteractiveDocumentViewerProps) {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>('');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  // Генерируем оглавление из заголовков
  useEffect(() => {
    if (contentRef.current) {
      const headings = contentRef.current.querySelectorAll('h1, h2, h3, h4');
      const toc: TableOfContentsItem[] = [];

      headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        const title = heading.textContent || '';
        let id = title.toLowerCase()
          .replace(/[^\w\s-]/g, '')
          .replace(/\s+/g, '-')
          .trim();
        
        // Убеждаемся что ID уникальный
        if (!id || id === '-' || id === '') {
          id = `heading-${index}`;
        } else {
          // Добавляем индекс для уникальности
          id = `${id}-${index}`;
        }
        
        // Добавляем ID к заголовку для навигации
        heading.id = id;
        
        toc.push({ id, title, level });
      });

      setTableOfContents(toc);
    }
  }, [children]);

  // Отслеживаем активную секцию при скролле
  useEffect(() => {
    const handleScroll = () => {
      const headings = document.querySelectorAll('h1, h2, h3, h4');
      let currentSection = '';

      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          currentSection = heading.id;
        }
      });

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="flex min-h-screen bg-cloud">
      <ProgressIndicator />
      
      {/* Sidebar с оглавлением */}
      <div className={`${isCollapsed ? 'w-12' : 'w-80'} transition-all duration-300 bg-white/80 border-r border-steel/20 sticky top-0 h-screen overflow-y-auto hidden md:block`}>
        <div className="p-4">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-steel/10 transition-colors"
          >
            <Icon 
              icon={FileText} 
              size="md" 
              color="muted"
            />
            {!isCollapsed && (
              <>
                <span className="font-medium text-graphite">Содержание</span>
                <Icon 
                  icon={ChevronRight} 
                  size="sm" 
                  color="muted"
                  className={`ml-auto transition-transform ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}
                />
              </>
            )}
          </button>
        </div>

        {!isCollapsed && (
          <nav className="px-4 pb-4">
            <ul className="space-y-1">
              {tableOfContents.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`
                      w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200
                      ${item.level === 1 ? 'font-semibold' : ''}
                      ${item.level === 2 ? 'ml-4 font-medium' : ''}
                      ${item.level === 3 ? 'ml-8' : ''}
                      ${item.level === 4 ? 'ml-12 text-xs' : ''}
                      ${activeSection === item.id 
                        ? 'bg-electric-coral text-cloud' 
                        : 'text-steel hover:text-graphite hover:bg-steel/10'
                      }
                    `}
                  >
                    {item.title}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Основной контент */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <ScrollReveal>
            <div ref={contentRef} className="prose prose-base md:prose-lg max-w-none">
              {children}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
} 