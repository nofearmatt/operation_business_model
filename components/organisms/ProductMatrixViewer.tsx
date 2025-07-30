'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Star, DollarSign, Clock, Users } from 'lucide-react';
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
        className={i < count ? "fill-current" : ""}
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
      />
    ));
  };

  return (
    <div className="w-full my-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-graphite mb-2">
          Интерактивная Продуктовая Матрица
        </h3>
        <p className="text-steel mb-6">
          Нажмите на карточку для детального просмотра
        </p>
        
        {/* Фильтры */}
        <div className="flex justify-center gap-2 mb-6">
          <Button
            variant={filterByUnit === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilterByUnit('all')}
          >
            Все продукты
          </Button>
          <Button
            variant={filterByUnit === 'flow' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilterByUnit('flow')}
          >
            Юнит "Поток"
          </Button>
          <Button
            variant={filterByUnit === 'projects' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilterByUnit('projects')}
          >
            Юнит "Проекты"
          </Button>
        </div>
      </div>

      {/* Сетка продуктов */}
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mb-8"
        layout
      >
        {filteredProducts.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className={`
              bg-white/80 rounded-xl p-4 md:p-6 shadow-lg cursor-pointer border-2 transition-all min-h-[300px] flex flex-col
              ${selectedProduct === product.id ? 'border-electric-coral shadow-xl' : 'border-transparent hover:border-steel/30'}
            `}
            onClick={() => setSelectedProduct(selectedProduct === product.id ? null : product.id)}
            style={{ borderColor: selectedProduct === product.id ? product.color : undefined }}
          >
            {/* Заголовок */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-graphite text-lg leading-tight">{product.name}</h4>
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0" 
                  style={{ backgroundColor: product.color }}
                />
              </div>
              <p className="text-sm text-steel italic leading-tight">{product.slogan}</p>
            </div>

            {/* Показатели */}
            <div className="space-y-3 mb-4 flex-1">
              <div className="flex items-center justify-between">
                <span className="text-xs text-steel">Слож:</span>
                <div className="flex gap-1">
                  {renderStars(product.complexity, `${product.id}-complexity`)}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-steel">Цена:</span>
                <div className="flex gap-1">
                  {renderPrice(product.price, `${product.id}-price`)}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <Icon icon={Clock} size="sm" color="muted" />
                <span className="text-xs font-medium">{product.timeline}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <Icon icon={Users} size="sm" color="muted" />
                <span className="text-xs text-steel">{product.unitType === 'flow' ? 'Поток' : 'Проекты'}</span>
              </div>
            </div>

            {/* Маржа */}
            <div className="text-center mt-auto">
              <div className="inline-block bg-green-100 px-3 py-1 rounded-full">
                <span className="text-xs font-semibold text-green-800">
                  Маржа: {product.margin}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Детальная информация */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white/90 rounded-xl p-8 shadow-xl"
        >
          {(() => {
            const product = products.find(p => p.id === selectedProduct);
            if (!product) return null;

            return (
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div 
                    className="w-6 h-6 rounded-full" 
                    style={{ backgroundColor: product.color }}
                  />
                  <h3 className="text-2xl font-bold text-graphite">{product.name}</h3>
                  <button
                    onClick={() => setSelectedProduct(null)}
                    className="ml-auto text-steel hover:text-graphite text-xl"
                  >
                    ×
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-graphite mb-2">Целевой клиент:</h4>
                    <p className="text-steel mb-4">{product.targetClient}</p>
                    
                    <h4 className="font-semibold text-graphite mb-2">Боль клиента:</h4>
                    <p className="text-steel italic mb-4">&ldquo;{product.pain}&rdquo;</p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-graphite mb-2">Что включено:</h4>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={`${product.id}-feature-${index}`} className="text-steel text-sm">
                          • {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-steel/5 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-graphite">
                      Ответственный юнит: {product.unitType === 'flow' ? 'Юнит "Поток"' : 'Юнит "Проекты"'}
                    </span>
                    <span className="font-bold text-green-700">
                      Целевая маржа: {product.margin}
                    </span>
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>
      )}

      {/* Сводка */}
      <div className="mt-8 text-center">
        <div className="inline-block bg-white/60 px-6 py-4 rounded-lg">
          <p className="text-steel text-sm mb-2">
            <strong>Всего продуктов:</strong> {products.length} | 
                          <strong> Юнит &ldquo;Поток&rdquo;:</strong> {products.filter(p => p.unitType === 'flow').length} | 
              <strong> Юнит &ldquo;Проекты&rdquo;:</strong> {products.filter(p => p.unitType === 'projects').length}
          </p>
          <p className="text-xs text-steel">
            💡 Продуктовая линейка покрывает 90% типовых запросов клиентов
          </p>
        </div>
      </div>
    </div>
  );
} 