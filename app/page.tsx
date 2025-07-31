import HeroSection from '@/components/sections/HeroSection';
import AnimatedSection from '@/components/atoms/AnimatedSection';
import Heading from '@/components/atoms/Heading';
import Tooltip from '@/components/atoms/Tooltip';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero секция */}
      <HeroSection />
      
      {/* Секция с деталями - с анимацией */}
      <AnimatedSection className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <Heading level={2} className="mb-4">
              Почему «Платформа + Юниты»?
            </Heading>
            <p className="text-lg text-steel max-w-2xl mx-auto">
              Наша текущая модель исчерпала себя. Рост штата с 30 до 50 человек не дал пропорционального роста прибыли. 
              {' '}
              <Tooltip text="Инновационная структура, где общая Платформа обеспечивает автономные Юниты всеми необходимыми ресурсами и процессами">
                Модель «Платформа + Юниты»
              </Tooltip>
              {' '}решает эту проблему.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-steel/5 p-8 rounded-xl">
              <Heading level={3} className="mb-4 text-electric-coral">Что внутри?</Heading>
              <ul className="space-y-3 text-steel">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-electric-coral rounded-full"></div>
                  <Link href="/hub" className="hover:text-electric-coral transition-colors font-medium">
                    Стратегический Хаб
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-technical-blue rounded-full"></div>
                  <Link href="/satellite/operations" className="hover:text-technical-blue transition-colors font-medium">
                    Операционная модель «Платформа + Юниты»
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-electric-coral rounded-full"></div>
                  <Link href="/satellite/products" className="hover:text-electric-coral transition-colors font-medium">
                    Продуктовая матрица
                  </Link>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-technical-blue rounded-full"></div>
                  <Link href="/satellite/goldratt" className="hover:text-technical-blue transition-colors font-medium">
                    Анализ по методу Голдратта
                  </Link>
                </li>
              </ul>
            </div>

            <div className="bg-cloud p-8 rounded-xl">
              <Heading level={3} className="mb-4 text-technical-blue">Принципы</Heading>
              <ul className="space-y-3 text-steel">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-technical-blue rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <Tooltip text="Централизованное управление всеми общими ресурсами: персонал, оборудование, процессы, знания">
                      <strong>Платформа</strong>
                    </Tooltip>
                    {' '}— единый центр ресурсов
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-electric-coral rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <Tooltip text="Автономные команды, фокусирующиеся на конкретных продуктах или услугах с четкими KPI">
                      <strong>Юниты</strong>
                    </Tooltip>
                    {' '}— автономные проектные команды
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-technical-blue rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <Tooltip text="Четкое разделение ответственности: Платформа отвечает за ресурсы, Юниты — за результат">
                      <strong>Разделение ответственности</strong>
                    </Tooltip>
                    {' '}— каждый за своё
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-electric-coral rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    <Tooltip text="Прозрачная система метрик для оценки эффективности как Платформы (утилизация ресурсов), так и Юнитов (ROI проектов)">
                      <strong>Прозрачные метрики</strong>
                    </Tooltip>
                    {' '}— измеряем всё
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Секция трансформации - с анимацией */}
      <AnimatedSection className="py-20 bg-steel/5" delay={0.2}>
        <div className="max-w-4xl mx-auto px-8 text-center">
          <Heading level={2} className="mb-8">От проблем к решениям</Heading>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-bold text-red-600 mb-4">❌ Было</h3>
              <ul className="text-left space-y-2 text-steel">
                <li>• Хаотичное распределение задач</li>
                <li>• Перегрузка ключевых сотрудников</li>
                <li>• Непрозрачность процессов</li>
                <li>• Потеря управляемости при росте</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-600 mb-4">✅ Стало</h3>
              <ul className="text-left space-y-2 text-steel">
                <li>• Системное управление ресурсами</li>
                <li>• Равномерная загрузка команд</li>
                <li>• Прозрачные процессы и метрики</li>
                <li>• Масштабируемость без потери качества</li>
              </ul>
            </div>
          </div>
        </div>
      </AnimatedSection>
    </main>
  );
}
