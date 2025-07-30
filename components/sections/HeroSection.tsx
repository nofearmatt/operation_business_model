'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Target, Zap, Layers } from 'lucide-react';
import Button from '@/components/atoms/Button';
import Heading from '@/components/atoms/Heading';
import Icon from '@/components/atoms/Icon';
import Link from 'next/link';

export default function HeroSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity
    }
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-cloud via-white to-steel/10 blueprint-bg overflow-hidden">
      {/* Декоративные элементы */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 rounded-full bg-electric-coral/10"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute top-40 right-20 w-20 h-20 rounded-full bg-technical-blue/10"
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 1 } }}
        />
        <motion.div
          className="absolute bottom-32 left-1/4 w-16 h-16 rounded-full bg-electric-coral/20"
          animate={{ ...floatingAnimation, transition: { ...floatingAnimation.transition, delay: 2 } }}
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Бейдж */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-block bg-white/80 rounded-full px-6 py-3 shadow-lg">
              <div className="flex items-center gap-2">
                <Icon icon={Zap} size="sm" color="accent" />
                <span className="text-steel font-medium">Операционная Модель 2025</span>
              </div>
            </div>
          </motion.div>

          {/* Главный заголовок */}
          <motion.div variants={itemVariants} className="mb-6">
            <Heading level={1} className="text-4xl md:text-5xl lg:text-7xl mb-4">
              <span className="text-graphite">Путь от</span>{' '}
              <span className="text-electric-coral">Хаоса</span>
              <br />
              <span className="text-graphite">к</span>{' '}
              <span className="text-technical-blue">Порядку</span>
            </Heading>
          </motion.div>

          {/* Подзаголовок */}
          <motion.div variants={itemVariants} className="mb-8">
            <p className="text-lg md:text-xl lg:text-2xl text-steel max-w-3xl mx-auto leading-relaxed">
              Интерактивный стратегический хаб для внедрения модели{' '}
              <strong className="text-graphite">«Платформа + Юниты»</strong>{' '}
              в креативном продакшне «Фотофактор»
            </p>
          </motion.div>

          {/* Кнопки */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link href="/hub">
              <Button variant="primary" size="lg" className="group">
                Начать исследование
                <Icon icon={ArrowRight} size="md" color="white" className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="/satellite/operations">
              <Button variant="secondary" size="lg">
                Посмотреть архитектуру
              </Button>
            </Link>
          </motion.div>

          {/* Ключевые показатели */}
          <motion.div variants={itemVariants}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-4xl mx-auto">
              <div className="bg-white/60 rounded-xl p-6 shadow-lg">
                <Icon icon={Target} size="xl" color="accent" className="mx-auto mb-3" />
                <h3 className="font-bold text-graphite text-lg mb-2">Цель</h3>
                <p className="text-steel text-sm">
                  Масштабирование до 100+ сотрудников без потери управляемости
                </p>
              </div>
              
              <div className="bg-white/60 rounded-xl p-6 shadow-lg">
                <Icon icon={Layers} size="xl" color="accent" className="mx-auto mb-3" />
                <h3 className="font-bold text-graphite text-lg mb-2">Решение</h3>
                <p className="text-steel text-sm">
                  Разделение ресурсов (Платформа) и проектов (Юниты)
                </p>
              </div>
              
              <div className="bg-white/60 rounded-xl p-6 shadow-lg">
                <Icon icon={Zap} size="xl" color="accent" className="mx-auto mb-3" />
                <h3 className="font-bold text-graphite text-lg mb-2">Результат</h3>
                <p className="text-steel text-sm">
                  80% процессов на автомате, 20% времени на творчество
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Стрелка вниз */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-steel/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-steel/50 rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
} 