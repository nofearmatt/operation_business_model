import HeroSection from '@/components/sections/HeroSection';
import AnimatedBlock from '@/components/atoms/AnimatedBlock';
import Heading from '@/components/atoms/Heading';
import Tooltip from '@/components/atoms/Tooltip';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero секция */}
      <HeroSection />
      
      {/* Секция с деталями - с новой анимацией */}
      <AnimatedBlock 
        type="slideUp"
        delay={0.2}
        visualAnchor={true}
        className="py-20 bg-white"
      >
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
          
          {/* Staggered grid animation */}
          <AnimatedBlock 
            type="scale"
            staggerChildren={true}
            stagger={0.15}
            delay={0.3}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="bg-steel/5 p-6 rounded-xl">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-3">Фокус на результате</h3>
              <p className="text-steel">
                Каждый юнит отвечает за свою прибыль и знает точные метрики успеха.
              </p>
            </div>
            
            <div className="bg-steel/5 p-6 rounded-xl">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Скорость решений</h3>
              <p className="text-steel">
                Автономность юнитов устраняет бюрократические задержки.
              </p>
            </div>
            
            <div className="bg-steel/5 p-6 rounded-xl">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold mb-3">Прозрачность процессов</h3>
              <p className="text-steel">
                Каждый ресурс имеет четкую стоимость и метрики эффективности.
              </p>
            </div>
            
            <div className="bg-steel/5 p-6 rounded-xl">
              <div className="text-4xl mb-4">🚀</div>
              <h3 className="text-xl font-bold mb-3">Масштабируемость</h3>
              <p className="text-steel">
                Добавление новых юнитов не усложняет общую систему.
              </p>
            </div>
          </AnimatedBlock>
        </div>
      </AnimatedBlock>

      {/* Секция трансформации - с разными анимациями */}
      <AnimatedBlock 
        type="blur"
        delay={0.1}
        showProgress={true}
        className="py-20 bg-steel/5"
      >
        <div className="max-w-4xl mx-auto px-8 text-center">
          <Heading level={2} className="mb-8">От проблем к решениям</Heading>
          
          <AnimatedBlock 
            type="slideLeft"
            staggerChildren={true}
            stagger={0.2}
            delay={0.4}
            className="grid md:grid-cols-2 gap-12"
          >
            <div>
              <AnimatedBlock type="rotate" delay={0.2}>
                <h3 className="text-xl font-bold text-red-600 mb-4">❌ Было</h3>
              </AnimatedBlock>
              <AnimatedBlock 
                type="fadeIn"
                staggerChildren={true}
                stagger={0.1}
                delay={0.5}
                className="text-left space-y-2 text-steel"
              >
                <div>• Хаотичное распределение задач</div>
                <div>• Перегрузка ключевых сотрудников</div>
                <div>• Непрозрачность процессов</div>
                <div>• Потеря управляемости при росте</div>
              </AnimatedBlock>
            </div>
            
            <div>
              <AnimatedBlock type="rotate" delay={0.3}>
                <h3 className="text-xl font-bold text-green-600 mb-4">✅ Стало</h3>
              </AnimatedBlock>
              <AnimatedBlock 
                type="fadeIn"
                staggerChildren={true}
                stagger={0.1}
                delay={0.6}
                className="text-left space-y-2 text-steel"
              >
                <div>• Системное управление ресурсами</div>
                <div>• Равномерная загрузка команд</div>
                <div>• Прозрачные процессы и метрики</div>
                <div>• Масштабируемость без потери качества</div>
              </AnimatedBlock>
            </div>
          </AnimatedBlock>
        </div>
      </AnimatedBlock>

      {/* Финальная CTA секция */}
      <AnimatedBlock 
        type="scale"
        delay={0.3}
        duration={0.8}
        visualAnchor={true}
        className="py-20 bg-gradient-to-br from-electric-coral/5 to-technical-blue/5"
      >
        <div className="max-w-4xl mx-auto px-8 text-center">
          <AnimatedBlock type="slideUp" delay={0.4}>
            <Heading level={2} className="mb-6">
              Готовы к трансформации?
            </Heading>
          </AnimatedBlock>
          
          <AnimatedBlock type="fadeIn" delay={0.6}>
            <p className="text-lg text-steel mb-8 max-w-2xl mx-auto">
              Изучите нашу операционную модель и узнайте, как она может изменить ваш бизнес
            </p>
          </AnimatedBlock>
          
          <AnimatedBlock 
            type="scale" 
            delay={0.8}
            staggerChildren={true}
            stagger={0.2}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link href="/satellite/operations" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-electric-coral text-cloud px-8 py-4 rounded-lg font-medium hover:bg-electric-coral/90 transition-all hover:scale-105 min-h-[48px]">
                Изучить Операционную Модель
              </button>
            </Link>
            
            <Link href="/satellite/products" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto border-2 border-technical-blue text-technical-blue px-8 py-4 rounded-lg font-medium hover:bg-technical-blue hover:text-cloud transition-all hover:scale-105 min-h-[48px]">
                Посмотреть Продукты
              </button>
            </Link>
          </AnimatedBlock>
        </div>
      </AnimatedBlock>
    </main>
  );
}
