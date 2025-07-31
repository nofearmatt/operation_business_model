'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Star, DollarSign, Clock, Users, ChevronDown, X } from 'lucide-react';
import Icon from '@/components/atoms/Icon';
import Button from '@/components/atoms/Button';

interface Product {
  id: string;
  name: string;
  slogan: string;
  targetClient: string;
  pain: string;
  complexity: number;
  price: number;
  timeline: string;
  features: string[];
  margin: string;
  unitType: 'flow' | 'projects';
  color: string;
}

const products: Product[] = [
  {
    id: 'content-starter',
    name: 'Контент-Стартер',
    slogan: 'Профессиональный контент для вашего бизнеса за 5 дней',
    targetClient: 'Малый бизнес, стартапы',
    pain: 'Нужно быстро и недорого наполнить сайт/соцсети качественным контентом',
    complexity: 1,
    price: 1,
    timeline: '5 дней',
    features: ['25 фото', 'Базовая ретушь', 'Фикс-прайс', '100% предоплата'],
    margin: '45-50%',
    unitType: 'flow',
    color: '#10B981'
  },
  {
    id: 'brand-package',
    name: 'Бренд-Пакет',
    slogan: 'Создаем визуальный язык вашего бренда',
    targetClient: 'Средний бизнес, маркетинговые отделы',
    pain: 'Нужна имиджевая история, контент отражающий стиль бренда',
    complexity: 3,
    price: 3,
    timeline: '2-3 недели',
    features: ['Креативная концепция', '1 съемочный день', 'Кастинг моделей', '20 фото с журнальной ретушью'],
    margin: '35-45%',
    unitType: 'projects',
    color: '#3B82F6'
  },
  {
    id: 'corporate-subscription',
    name: 'Корпоративный Абонемент',
    slogan: 'Ваш штатный отдел контента на аутсорсе',
    targetClient: 'Крупные компании, e-commerce',
    pain: 'Нужен постоянный поток контента, один надежный партнер',
    complexity: 4,
    price: 4,
    timeline: 'Ежемесячно',
    features: ['Выделенный менеджер', 'SLA на скорость', 'Облачный архив', 'Ежемесячное планирование'],
    margin: '30-40%',
    unitType: 'projects',
    color: '#8B5CF6'
  },
  {
    id: 'custom-project',
    name: 'Кастом-Проект',
    slogan: 'Решаем невыполнимые креативные задачи',
    targetClient: 'Рекламные агентства, крупные бренды',
    pain: 'Нужен уникальный, сложный проект мирового уровня',
    complexity: 5,
    price: 5,
    timeline: 'Индивидуально',
    features: ['Полный цикл', 'Любая сложность', 'Мировой уровень', 'Премиальное качество'],
    margin: '40%+',
    unitType: 'projects',
    color: '#EF4444'
  }
];

export default function ProductMatrixViewer() {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [filterByUnit, setFilterByUnit] = useState<'all' | 'flow' | 'projects'>('all');
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection with performance optimization
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const filteredProducts = filterByUnit === 'all' 
    ? products 
    : products.filter(p => p.unitType === filterByUnit);

  const renderStars = (count: number, prefix: string = 'star') => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon 
        key={`${prefix}-${i}`}
        icon={Star} 
        size="sm" 
        color={i < count ? "accent" : "muted"}
        className={`${i < count ? "fill-current" : ""} ${isMobile ? "w-3 h-3" : "w-4 h-4"}`}
      />
    ));
  };

  const renderPrice = (level: number, prefix: string = 'price') => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon 
        key={`${prefix}-${i}`}
        icon={DollarSign} 
        size="sm" 
        color={i < level ? "accent" : "muted"}
        className={isMobile ? "w-3 h-3" : "w-4 h-4"}
      />
    ));
  };

  // Handle card selection with mobile optimization
  const handleCardSelect = (productId: string) => {
    setSelectedProduct(selectedProduct === productId ? null : productId);
  };

  // Animation variants optimized for mobile
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: isMobile ? 0.2 : 0.3,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    },
    hover: isMobile ? {} : { 
      y: -5, 
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const detailsVariants = {
    hidden: { 
      opacity: 0, 
      height: 0,
      y: -20
    },
    visible: { 
      opacity: 1, 
      height: 'auto',
      y: 0,
      transition: { 
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const
      }
    }
  };

  return (
    <div className="w-full my-6 sm:my-8">
      <div className="text-center mb-6 sm:mb-8">
        <h3 className="text-xl sm:text-2xl font-bold text-graphite mb-2">
          Интерактивная Продуктовая Матрица
        </h3>
        <p className="text-sm sm:text-base text-steel mb-4 sm:mb-6 max-w-2xl mx-auto">
          {isMobile ? 'Нажмите на карточку для деталей' : 'Нажмите на карточку для детального просмотра'}
        </p>
        
        {/* Mobile-First Filters */}
        <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-3 mb-6">
          <Button
            variant={filterByUnit === 'all' ? 'primary' : 'ghost'}
            size={isMobile ? 'md' : 'sm'}
            onClick={() => setFilterByUnit('all')}
            className="min-h-[44px] w-full sm:w-auto touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            Все продукты ({products.length})
          </Button>
          <Button
            variant={filterByUnit === 'flow' ? 'primary' : 'ghost'}
            size={isMobile ? 'md' : 'sm'}
            onClick={() => setFilterByUnit('flow')}
            className="min-h-[44px] w-full sm:w-auto touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            Юнит "Поток" ({products.filter(p => p.unitType === 'flow').length})
          </Button>
          <Button
            variant={filterByUnit === 'projects' ? 'primary' : 'ghost'}
            size={isMobile ? 'md' : 'sm'}
            onClick={() => setFilterByUnit('projects')}
            className="min-h-[44px] w-full sm:w-auto touch-manipulation"
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            Юнит "Проекты" ({products.filter(p => p.unitType === 'projects').length})
          </Button>
        </div>
      </div>

      {/* Mobile-First Product Grid */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-6 sm:mb-8"
        layout
      >
        <AnimatePresence mode="wait">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              whileHover="hover"
              whileTap={{ scale: 0.98 }}
              className={`
                bg-white/80 backdrop-blur-sm rounded-xl p-4 sm:p-6 shadow-lg cursor-pointer border-2 transition-all 
                min-h-[280px] sm:min-h-[320px] flex flex-col
                touch-manipulation select-none
                ${selectedProduct === product.id 
                  ? 'border-electric-coral shadow-xl ring-2 ring-electric-coral/20' 
                  : 'border-transparent hover:border-steel/30 active:border-steel/50'
                }
              `}
              onClick={() => handleCardSelect(product.id)}
              style={{ 
                borderColor: selectedProduct === product.id ? product.color : undefined,
                WebkitTapHighlightColor: 'transparent'
              }}
            >
              {/* Header */}
              <div className="mb-3 sm:mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-bold text-graphite text-base sm:text-lg leading-tight flex-1 pr-2">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: product.color }}
                    />
                    {selectedProduct === product.id && (
                      <Icon 
                        icon={ChevronDown} 
                        size="sm" 
                        color="accent"
                        className="transform rotate-180 transition-transform"
                      />
                    )}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-steel italic leading-tight">{product.slogan}</p>
              </div>

              {/* Metrics */}
              <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-steel font-medium">Сложность:</span>
                  <div className="flex gap-0.5 sm:gap-1">
                    {renderStars(product.complexity, `${product.id}-complexity`)}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-xs text-steel font-medium">Цена:</span>
                  <div className="flex gap-0.5 sm:gap-1">
                    {renderPrice(product.price, `${product.id}-price`)}
                  </div>
                </div>
                
                                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-1">
                     <Icon icon={Clock} size="sm" color="muted" className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
                     <span className="text-xs text-steel">Срок:</span>
                   </div>
                   <span className="text-xs font-medium">{product.timeline}</span>
                 </div>
                 
                 <div className="flex items-center justify-between">
                   <div className="flex items-center gap-1">
                     <Icon icon={Users} size="sm" color="muted" className={isMobile ? "w-3 h-3" : "w-4 h-4"} />
                     <span className="text-xs text-steel">Юнит:</span>
                   </div>
                   <span className="text-xs text-steel font-medium">
                     {product.unitType === 'flow' ? 'Поток' : 'Проекты'}
                   </span>
                 </div>
              </div>

              {/* Margin */}
              <div className="text-center mt-auto">
                <div className="inline-block bg-green-100 px-2 sm:px-3 py-1 rounded-full">
                  <span className="text-xs font-semibold text-green-800">
                    Маржа: {product.margin}
                  </span>
                </div>
              </div>

              {/* Mobile selection indicator */}
              {isMobile && (
                <div className="mt-2 text-center">
                  <span className="text-xs text-steel/70">
                    {selectedProduct === product.id ? 'Нажмите еще раз для скрытия' : 'Нажмите для подробностей'}
                  </span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Mobile-First Detailed Information */}
      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            variants={detailsVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="bg-white/90 backdrop-blur-sm rounded-xl p-4 sm:p-6 lg:p-8 shadow-xl border border-steel/20"
          >
            {(() => {
              const product = products.find(p => p.id === selectedProduct);
              if (!product) return null;

              return (
                <div>
                  {/* Header with close button */}
                  <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                    <div 
                      className="w-5 h-5 sm:w-6 sm:h-6 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: product.color }}
                    />
                    <h3 className="text-lg sm:text-2xl font-bold text-graphite flex-1">
                      {product.name}
                    </h3>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="p-2 hover:bg-steel/10 rounded-full transition-colors touch-manipulation min-h-[44px] min-w-[44px] flex items-center justify-center"
                      style={{ WebkitTapHighlightColor: 'transparent' }}
                      aria-label="Закрыть детали продукта"
                    >
                      <Icon icon={X} size="md" color="muted" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                    <div>
                      <h4 className="font-semibold text-graphite mb-2 text-sm sm:text-base">Целевой клиент:</h4>
                      <p className="text-steel mb-3 sm:mb-4 text-sm sm:text-base">{product.targetClient}</p>
                      
                      <h4 className="font-semibold text-graphite mb-2 text-sm sm:text-base">Боль клиента:</h4>
                      <p className="text-steel italic mb-3 sm:mb-4 text-sm sm:text-base">
                        &ldquo;{product.pain}&rdquo;
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-graphite mb-2 text-sm sm:text-base">Что включено:</h4>
                      <ul className="space-y-1">
                        {product.features.map((feature, index) => (
                          <li key={`${product.id}-feature-${index}`} className="text-steel text-sm flex items-start">
                            <span className="text-electric-coral mr-2 flex-shrink-0">•</span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-steel/5 rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="font-medium text-graphite text-sm">
                        Ответственный юнит: <span className="text-technical-blue">
                          {product.unitType === 'flow' ? 'Юнит "Поток"' : 'Юнит "Проекты"'}
                        </span>
                      </span>
                      <span className="font-bold text-green-700 text-sm">
                        Целевая маржа: {product.margin}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile-First Summary */}
      <div className="mt-6 sm:mt-8 text-center">
        <div className="inline-block bg-white/60 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-lg shadow-sm">
          <div className="text-steel text-xs sm:text-sm mb-2 space-y-1 sm:space-y-0">
            <div className="block sm:inline">
              <strong>Всего продуктов:</strong> {products.length}
            </div>
            <div className="block sm:inline sm:ml-2">
              <strong>Юнит "Поток":</strong> {products.filter(p => p.unitType === 'flow').length}
            </div>
            <div className="block sm:inline sm:ml-2">
              <strong>Юнит "Проекты":</strong> {products.filter(p => p.unitType === 'projects').length}
            </div>
          </div>
          <p className="text-xs text-steel">
            💡 Продуктовая линейка покрывает 90% типовых запросов клиентов
          </p>
        </div>
      </div>
    </div>
  );
} 