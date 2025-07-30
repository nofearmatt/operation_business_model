import HeroSection from '@/components/sections/HeroSection';
import Heading from '@/components/atoms/Heading';
import Tooltip from '@/components/atoms/Tooltip';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero секция */}
      <HeroSection />
      
      {/* Секция с деталями */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-8">
          <div className="text-center mb-16">
            <Heading level={2} className="mb-4">
              Почему «Платформа + Юниты»?
            </Heading>
            <p className="text-lg text-steel max-w-2xl mx-auto">
              Наша текущая модель исчерпала себя. Рост штата с 30 до 50 человек не дал пропорционального роста прибыли. 
              Модель{' '}
              <Tooltip text="Операционная модель, разделяющая ресурсы (Платформа) и проекты (Юниты)">
                «Платформа + Юниты»
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
                  <span className="text-steel/70">Анализ ограничений по Голдратту</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-steel/5 p-8 rounded-xl">
              <Heading level={3} className="mb-4 text-technical-blue">Интерактивные возможности</Heading>
              <ul className="space-y-3 text-steel">
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Интерактивные SVG диаграммы</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Анимации при скролле</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Тултипы для терминов</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Адаптивный дизайн</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-r from-electric-coral/10 to-technical-blue/10 px-8 py-4 rounded-xl border border-steel/20">
              <p className="text-steel text-sm mb-1">
                🚀 <strong>Прототип готов к тестированию</strong>
              </p>
              <p className="text-xs text-steel/70">
                Интерактивный стратегический хаб «Фотофактор» | localhost:3000
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
