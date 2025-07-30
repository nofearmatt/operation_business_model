'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Home, Target, Layers, Package, TrendingUp, Menu, X, type LucideIcon } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/atoms/Icon';

interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

const navItems: NavItem[] = [
  {
    href: '/',
    label: 'Главная',
    icon: Home,
    description: 'Обзор операционной модели'
  },
  {
    href: '/hub',
    label: 'Стратегический Хаб',
    icon: Target,
    description: 'Суть и диагностика проблем'
  },
  {
    href: '/satellite/operations',
    label: 'Операционная Модель',
    icon: Layers,
    description: 'Архитектура «Платформа + Юниты»'
  },
  {
    href: '/satellite/products',
    label: 'Продуктовая Матрица',
    icon: Package,
    description: 'Каталог решений для клиентов'
  },
  {
    href: '/satellite/goldratt',
    label: 'Анализ Ограничений',
    icon: TrendingUp,
    description: 'Диагностика по методу Голдратта'
  }
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <>
      {/* Десктопная навигация */}
      <nav className="hidden lg:block fixed top-8 right-8 z-50">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-steel/20 p-4"
        >
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group cursor-pointer
                    ${isActive(item.href) 
                      ? 'bg-electric-coral text-cloud' 
                      : 'text-steel hover:bg-steel/10 hover:text-graphite'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Icon 
                    icon={item.icon} 
                    size="sm" 
                    color={isActive(item.href) ? 'white' : 'default'}
                  />
                  <div className="min-w-0">
                    <div className={`font-medium text-sm ${isActive(item.href) ? 'text-cloud' : ''}`}>
                      {item.label}
                    </div>
                    <div className={`text-xs opacity-70 ${isActive(item.href) ? 'text-cloud' : 'text-steel'}`}>
                      {item.description}
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </motion.div>
      </nav>

      {/* Мобильная навигация */}
      <div className="lg:hidden">
        {/* Кнопка меню */}
        <motion.button
          className="fixed top-6 right-6 z-50 bg-electric-coral text-cloud p-3 rounded-full shadow-lg"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Icon icon={isOpen ? X : Menu} size="md" color="white" />
        </motion.button>

        {/* Overlay */}
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-graphite/50 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Мобильное меню */}
        <motion.div
          className={`
            fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-40 transform transition-transform duration-300
            ${isOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
          initial={{ x: '100%' }}
          animate={{ x: isOpen ? 0 : '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        >
          <div className="p-6 pt-20">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-graphite mb-2">
                Стратегический Хаб
              </h2>
              <p className="text-sm text-steel">
                Операционная модель «Фотофактор»
              </p>
            </div>

            <div className="space-y-3">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                  <div
                    className={`
                      flex items-center gap-4 p-4 rounded-lg transition-all duration-200
                      ${isActive(item.href) 
                        ? 'bg-electric-coral text-cloud' 
                        : 'text-steel hover:bg-steel/10 hover:text-graphite'
                      }
                    `}
                  >
                    <Icon 
                      icon={item.icon} 
                      size="md" 
                      color={isActive(item.href) ? 'white' : 'default'}
                    />
                    <div>
                      <div className={`font-medium ${isActive(item.href) ? 'text-cloud' : ''}`}>
                        {item.label}
                      </div>
                      <div className={`text-sm opacity-70 ${isActive(item.href) ? 'text-cloud' : 'text-steel'}`}>
                        {item.description}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-8 p-4 bg-steel/5 rounded-lg">
              <div className="text-xs text-steel">
                <strong>Прогресс:</strong> 8/12 задач завершено
              </div>
              <div className="w-full bg-steel/20 rounded-full h-2 mt-2">
                <div className="bg-electric-coral h-2 rounded-full" style={{ width: '67%' }}></div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
} 