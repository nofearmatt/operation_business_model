'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import Button from '@/components/atoms/Button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden blueprint-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Заголовок с анимацией */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Heading level={1} className="mb-4 sm:mb-6 text-graphite text-2xl sm:text-3xl lg:text-4xl xl:text-5xl leading-tight">
            Интерактивный<br className="sm:hidden" /> Стратегический Хаб
          </Heading>
        </motion.div>
        
        {/* Подзаголовок с анимацией */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-base sm:text-lg lg:text-xl text-steel mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
            Операционная модель «Платформа + Юниты»
          </p>
        </motion.div>
        
        {/* Кнопка с анимацией - mobile-first */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <Link href="/satellite/operations">
            <Button 
              variant="primary"
              size="lg"
              className="transition-all hover:scale-105 
                        min-h-[48px] px-6 sm:px-8 py-3 sm:py-4
                        text-sm sm:text-base font-medium
                        touch-manipulation select-none w-auto min-w-[200px] sm:min-w-[240px]"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              Изучить Модель
            </Button>
          </Link>
        </motion.div>
        
        {/* Дополнительный декоративный элемент */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-8 sm:mt-12 lg:mt-16 flex justify-center"
        >
          <div className="w-16 sm:w-20 lg:w-24 h-1 bg-gradient-to-r from-electric-coral to-technical-blue rounded-full opacity-50"></div>
        </motion.div>

        {/* Mobile performance indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0 }}
          className="mt-6 sm:mt-8 flex justify-center sm:hidden"
        >
          <div className="flex items-center gap-2 px-3 py-2 bg-white/60 backdrop-blur-sm rounded-full border border-steel/20">
            <div className="w-2 h-2 bg-technical-blue rounded-full animate-pulse"></div>
            <span className="text-xs text-steel font-medium">
              Mobile Optimized
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 