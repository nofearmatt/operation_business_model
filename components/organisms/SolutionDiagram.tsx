'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

interface DiagramNode {
  id: string;
  label: string;
  description: string;
  x: number;
  y: number;
  type: 'platform' | 'unit' | 'flow';
}

const nodes: DiagramNode[] = [
  {
    id: 'platform',
    label: 'ПЛАТФОРМА',
    description: 'Центр ресурсов: студии, оборудование, штатные специалисты',
    x: 200,
    y: 300,
    type: 'platform'
  },
  {
    id: 'unit-flow',
    label: 'Юнит "Поток"',
    description: 'Контент-Стартер, типовые съемки',
    x: 500,
    y: 200,
    type: 'unit'
  },
  {
    id: 'unit-projects',
    label: 'Юнит "Проекты"',
    description: 'Бренд-Пакеты, Кастом-проекты',
    x: 500,
    y: 400,
    type: 'unit'
  },
  {
    id: 'sales',
    label: 'ПРОДАЖИ',
    description: 'Входящие заказы от клиентов',
    x: 50,
    y: 100,
    type: 'flow'
  },
  {
    id: 'client',
    label: 'КЛИЕНТ',
    description: 'Получает готовый продукт',
    x: 750,
    y: 300,
    type: 'flow'
  }
];

const connections = [
  { from: 'sales', to: 'unit-flow', color: '#3B82F6' },
  { from: 'sales', to: 'unit-projects', color: '#3B82F6' },
  { from: 'platform', to: 'unit-flow', color: '#FF5A5A', bidirectional: true },
  { from: 'platform', to: 'unit-projects', color: '#FF5A5A', bidirectional: true },
  { from: 'unit-flow', to: 'client', color: '#3B82F6' },
  { from: 'unit-projects', to: 'client', color: '#3B82F6' }
];

export default function SolutionDiagram() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3 }
    }
  };

  const nodeVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
    hover: { scale: 1.05 }
  };

  const connectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'platform': return '#111827'; // graphite
      case 'unit': return '#FF5A5A'; // electric-coral
      case 'flow': return '#3B82F6'; // technical-blue
      default: return '#4B5563'; // steel
    }
  };

  const getConnectionPath = (from: DiagramNode, to: DiagramNode) => {
    const dx = to.x - from.x;
    const dy = to.y - from.y;
    const midX = from.x + dx / 2;
    const midY = from.y + dy / 2;
    
    // Создаем плавную кривую
    return `M ${from.x} ${from.y} Q ${midX} ${midY - 30} ${to.x} ${to.y}`;
  };

  return (
    <div className="w-full bg-white/60 rounded-xl p-8 my-8">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-graphite mb-2">
          Архитектура «Платформа + Юниты»
        </h3>
        <p className="text-steel">
          Интерактивная схема операционной модели
        </p>
      </div>

      <div className="flex justify-center overflow-x-auto">
        <motion.svg
          width="800"
          height="500"
          viewBox="0 0 800 500"
          className="w-full max-w-4xl h-auto min-w-[600px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Фоновая сетка */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#4B5563" strokeWidth="0.5" opacity="0.2"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />

          {/* Соединительные линии */}
          {connections.map((conn, index) => {
            const fromNode = nodes.find(n => n.id === conn.from);
            const toNode = nodes.find(n => n.id === conn.to);
            if (!fromNode || !toNode) return null;

            return (
              <g key={`connection-${index}`}>
                <motion.path
                  d={getConnectionPath(fromNode, toNode)}
                  fill="none"
                  stroke={conn.color}
                  strokeWidth="3"
                  strokeDasharray={conn.bidirectional ? "5,5" : "none"}
                  variants={connectionVariants}
                  opacity={hoveredNode && (hoveredNode === conn.from || hoveredNode === conn.to) ? 1 : 0.6}
                />
                
                {/* Стрелка */}
                <motion.polygon
                  points={`${toNode.x-8},${toNode.y-4} ${toNode.x-8},${toNode.y+4} ${toNode.x},${toNode.y}`}
                  fill={conn.color}
                  variants={connectionVariants}
                  opacity={hoveredNode && (hoveredNode === conn.from || hoveredNode === conn.to) ? 1 : 0.6}
                />
              </g>
            );
          })}

          {/* Узлы диаграммы */}
          {nodes.map((node) => (
            <g key={node.id}>
              <motion.g
                variants={nodeVariants}
                whileHover="hover"
                onHoverStart={() => setHoveredNode(node.id)}
                onHoverEnd={() => setHoveredNode(null)}
                style={{ cursor: 'pointer' }}
              >
                {/* Тень */}
                <ellipse
                  cx={node.x + 2}
                  cy={node.y + 2}
                  rx={node.type === 'platform' ? "80" : "60"}
                  ry="30"
                  fill="rgba(0,0,0,0.1)"
                />
                
                {/* Основной узел */}
                <ellipse
                  cx={node.x}
                  cy={node.y}
                  rx={node.type === 'platform' ? "80" : "60"}
                  ry="30"
                  fill={getNodeColor(node.type)}
                  stroke="#F9FAFB"
                  strokeWidth="2"
                />
                
                {/* Текст */}
                <text
                  x={node.x}
                  y={node.y}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fill="#F9FAFB"
                  fontSize={node.type === 'platform' ? "14" : "12"}
                  fontWeight="bold"
                >
                  {node.label}
                </text>
              </motion.g>

              {/* Тултип при наведении */}
              {hoveredNode === node.id && (
                <motion.g
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <rect
                    x={node.x - 100}
                    y={node.y - 60}
                    width="200"
                    height="40"
                    fill="#111827"
                    rx="6"
                    opacity="0.9"
                  />
                  <text
                    x={node.x}
                    y={node.y - 40}
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="#F9FAFB"
                    fontSize="11"
                  >
                    {node.description}
                  </text>
                </motion.g>
              )}
            </g>
          ))}

          {/* Легенда */}
          <g transform="translate(20, 450)">
            <text x="0" y="0" fill="#111827" fontSize="12" fontWeight="bold">Легенда:</text>
            <circle cx="10" cy="15" r="6" fill="#111827" />
            <text x="25" y="20" fill="#4B5563" fontSize="10">Платформа (ресурсы)</text>
            <circle cx="120" cy="15" r="6" fill="#FF5A5A" />
            <text x="135" y="20" fill="#4B5563" fontSize="10">Проектные юниты</text>
            <circle cx="240" cy="15" r="6" fill="#3B82F6" />
            <text x="255" y="20" fill="#4B5563" fontSize="10">Внешние потоки</text>
          </g>
        </motion.svg>
      </div>

      {/* Интерактивные кнопки */}
      <div className="flex justify-center gap-4 mt-6">
        <motion.div
          className="px-4 py-2 bg-technical-blue text-cloud rounded-lg text-sm"
          whileHover={{ scale: 1.05 }}
        >
          Поток заказов
        </motion.div>
        <motion.div
          className="px-4 py-2 bg-electric-coral text-cloud rounded-lg text-sm"
          whileHover={{ scale: 1.05 }}
        >
          Обмен ресурсами
        </motion.div>
      </div>
    </div>
  );
} 