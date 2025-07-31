'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();

  // Detect mobile device for performance optimization
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  // Animation variants for performance
  const menuVariants = {
    hidden: { 
      x: '100%',
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }
    },
    visible: { 
      x: 0,
      transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
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
        {/* Кнопка меню - 44px+ touch target */}
        <motion.button
          className="fixed top-4 right-4 z-50 bg-electric-coral text-cloud rounded-full shadow-lg
                     w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center
                     touch-manipulation select-none"
          onClick={() => setIsOpen(!isOpen)}
          whileHover={!isMobile ? { scale: 1.05 } : {}}
          whileTap={{ scale: 0.95 }}
          aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={isOpen}
          style={{ WebkitTapHighlightColor: 'transparent' }}
        >
          <Icon icon={isOpen ? X : Menu} size="md" color="white" />
        </motion.button>

        {/* Menu and Overlay with AnimatePresence */}
        <AnimatePresence mode="wait">
          {isOpen && (
            <>
              {/* Overlay */}
              <motion.div
                className="fixed inset-0 bg-graphite/60 backdrop-blur-sm z-40"
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                transition={{ duration: 0.2 }}
                onClick={() => setIsOpen(false)}
                style={{ WebkitTapHighlightColor: 'transparent' }}
              />

              {/* Мобильное меню - адаптивная ширина */}
              <motion.div
                className="fixed top-0 right-0 h-full bg-white shadow-2xl z-40
                           w-full max-w-sm sm:max-w-md
                           xs:w-[280px] sm:w-[320px]"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                style={{ 
                  WebkitOverflowScrolling: 'touch',
                  overscrollBehavior: 'contain'
                }}
              >
                <div className="p-4 sm:p-6 pt-16 sm:pt-20 h-full overflow-y-auto">
                  {/* Header */}
                  <div className="mb-6 sm:mb-8">
                    <h2 className="text-lg sm:text-xl font-bold text-graphite mb-2">
                      Стратегический Хаб
                    </h2>
                    <p className="text-xs sm:text-sm text-steel">
                      Операционная модель «Фотофактор»
                    </p>
                  </div>

                  {/* Navigation Items - 44px+ touch targets */}
                  <div className="space-y-2 sm:space-y-3">
                    {navItems.map((item) => (
                      <Link key={item.href} href={item.href}>
                        <div
                          className={`
                            flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg transition-all duration-200
                            min-h-[44px] touch-manipulation select-none
                            ${isActive(item.href) 
                              ? 'bg-electric-coral text-cloud' 
                              : 'text-steel hover:bg-steel/10 hover:text-graphite active:bg-steel/20'
                            }
                          `}
                          style={{ WebkitTapHighlightColor: 'transparent' }}
                        >
                          <Icon 
                            icon={item.icon} 
                            size="md" 
                            color={isActive(item.href) ? 'white' : 'default'}
                          />
                          <div className="flex-1 min-w-0">
                            <div className={`font-medium text-sm sm:text-base ${isActive(item.href) ? 'text-cloud' : ''}`}>
                              {item.label}
                            </div>
                            <div className={`text-xs sm:text-sm opacity-70 ${isActive(item.href) ? 'text-cloud' : 'text-steel'}`}>
                              {item.description}
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>

                  {/* Progress Section */}
                  <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-steel/5 rounded-lg">
                    <div className="text-xs sm:text-sm text-steel">
                      <strong>Прогресс:</strong> MVP Foundation завершен
                    </div>
                    <div className="w-full bg-steel/20 rounded-full h-2 mt-2">
                      <div className="bg-electric-coral h-2 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                    <div className="text-xs text-steel/70 mt-1">
                      Phase 2: Mobile-First в процессе...
                    </div>
                  </div>

                  {/* Mobile Performance Indicator */}
                  <div className="mt-4 p-3 bg-technical-blue/5 rounded-lg border border-technical-blue/20">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-technical-blue rounded-full animate-pulse"></div>
                      <span className="text-xs text-technical-blue font-medium">
                        Mobile-Optimized Experience
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
} 