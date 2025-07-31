'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Heading from '@/components/atoms/Heading';
import Button from '@/components/atoms/Button';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative py-20 overflow-hidden blueprint-bg">
      <div className="max-w-4xl mx-auto px-8 text-center">
        {/* Заголовок с анимацией */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Heading level={1} className="mb-6 text-graphite">
            Интерактивный Стратегический Хаб
          </Heading>
        </motion.div>
        
        {/* Подзаголовок с анимацией */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-xl text-steel mb-8">
            Операционная модель «Платформа + Юниты»
          </p>
        </motion.div>
        
                 {/* Кнопка с анимацией */}
         <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.6, delay: 0.6 }}
         >
           <Link href="/satellite/operations">
             <Button 
               variant="primary"
               size="lg"
               className="transition-all hover:scale-105"
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
          className="mt-16 flex justify-center"
        >
          <div className="w-24 h-1 bg-gradient-to-r from-electric-coral to-technical-blue rounded-full opacity-50"></div>
        </motion.div>
      </div>
    </section>
  );
} 