'use client';

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useState } from 'react';

interface DiagramNode {
  id: string;
  type: 'client' | 'platform' | 'unit' | 'resources';
  label: string;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  tooltip: string;
}

interface DiagramConnection {
  from: string;
  to: string;
  path: string;
}

const SolutionDiagram: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true });
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes: DiagramNode[] = [
    {
      id: 'client',
      type: 'client',
      label: 'Клиент',
      x: 400,
      y: 80,
      radius: 50,
      tooltip: 'Источник требований и конечный получатель ценности'
    },
    {
      id: 'platform',
      type: 'platform', 
      label: 'Платформа',
      x: 400,
      y: 220,
      width: 200,
      height: 80,
      tooltip: 'Центральный хаб. Распределяет ресурсы между юнитами. KPI: утилизация 85%+'
    },
    {
      id: 'unit1',
      type: 'unit',
      label: 'Фото Юнит',
      x: 180,
      y: 380,
      width: 150,
      height: 60,
      tooltip: 'Фотосъемка и обработка. KPI: качество, сроки выполнения'
    },
    {
      id: 'unit2',
      type: 'unit',
      label: 'Видео Юнит', 
      x: 400,
      y: 380,
      width: 150,
      height: 60,
      tooltip: 'Видеопроизводство и монтаж. KPI: конверсия, время производства'
    },
    {
      id: 'unit3',
      type: 'unit',
      label: 'Дизайн Юнит',
      x: 620,
      y: 380,
      width: 150,
      height: 60,
      tooltip: 'Графический дизайн и брендинг. KPI: креативность, клиентская оценка'
    },
    {
      id: 'resources',
      type: 'resources',
      label: 'Ресурсы',
      x: 650,
      y: 190,
      width: 120,
      height: 120,
      tooltip: 'Общие ресурсы: персонал, оборудование, процессы'
    }
  ];

  const connections: DiagramConnection[] = [
    {
      from: 'client',
      to: 'platform',
      path: 'M 400 130 L 400 180'
    },
    {
      from: 'platform',
      to: 'unit1', 
      path: 'M 350 260 L 230 340'
    },
    {
      from: 'platform',
      to: 'unit2',
      path: 'M 400 260 L 400 340'
    },
    {
      from: 'platform',
      to: 'unit3',
      path: 'M 450 260 L 570 340'
    },
    {
      from: 'resources',
      to: 'platform',
      path: 'M 590 220 L 500 220'
    }
  ];

  const getNodeColor = (type: string, isHovered: boolean) => {
    const colors = {
      client: isHovered ? '#2563EB' : '#3B82F6', // Technical Blue
      platform: isHovered ? '#EF4444' : '#FF5A5A', // Electric Coral
      unit: isHovered ? '#6B7280' : '#4B5563', // Steel  
      resources: isHovered ? '#E5E7EB' : '#F9FAFB' // Cloud
    };
    return colors[type as keyof typeof colors];
  };

  const getNodeStroke = (type: string) => {
    const strokes = {
      client: '#1F2937',
      platform: '#1F2937', 
      unit: '#1F2937',
      resources: '#4B5563'
    };
    return strokes[type as keyof typeof strokes];
  };

  // Анимация прорисовки линий (Фаза 1: 0-1.5 сек)
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  // Анимация появления блоков (Фаза 2: 1.0-2.5 сек)
  const nodeVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }
    }
  };

  return (
    <div ref={ref} className="w-full max-w-5xl mx-auto my-8 sm:my-12 px-2 sm:px-0">
      <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 shadow-lg">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-graphite mb-2">
            Архитектура «Платформа + Юниты»
          </h3>
          <p className="text-sm sm:text-base text-steel">
            Интерактивная схема операционной модели
          </p>
        </div>

        <svg 
          viewBox="0 0 800 480" 
          className="w-full h-auto touch-manipulation"
          style={{ 
            maxHeight: '480px',
            minHeight: '200px'
          }}
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Arrow marker definition */}
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="9"
              refY="3.5"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="#4B5563"
              />
            </marker>
            
            {/* Blueprint background pattern */}
            <pattern id="blueprint" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(75, 85, 99, 0.1)" strokeWidth="1"/>
            </pattern>
          </defs>

          {/* Background */}
          <rect width="100%" height="100%" fill="url(#blueprint)" />

          {/* Connections - Фаза 1: прорисовка линий */}
          {connections.map((connection, index) => (
            <motion.path
              key={`connection-${index}`}
              d={connection.path}
              stroke="#4B5563"
              strokeWidth="2"
              fill="none"
              markerEnd="url(#arrowhead)"
              variants={pathVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: index * 0.2 }}
            />
          ))}

          {/* Nodes - Фаза 2: появление блоков */}
          {nodes.map((node, index) => (
            <motion.g
              key={node.id}
              variants={nodeVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 1.2 + index * 0.2 }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              style={{ cursor: 'pointer' }}
            >
              {node.type === 'client' ? (
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={node.radius}
                  fill={getNodeColor(node.type, hoveredNode === node.id)}
                  stroke={getNodeStroke(node.type)}
                  strokeWidth="2"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              ) : (
                <motion.rect
                  x={node.x - (node.width! / 2)}
                  y={node.y - (node.height! / 2)}
                  width={node.width}
                  height={node.height}
                  fill={getNodeColor(node.type, hoveredNode === node.id)}
                  stroke={getNodeStroke(node.type)}
                  strokeWidth="2"
                  rx="8"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              
              <text
                x={node.x}
                y={node.y + 5}
                textAnchor="middle"
                className="text-sm font-semibold fill-current text-white pointer-events-none"
                style={{ 
                  filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.5))',
                  fontSize: node.type === 'platform' ? '16px' : '14px'
                }}
              >
                {node.label}
              </text>

              {/* SVG Tooltip */}
              {hoveredNode === node.id && (
                <motion.g
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <rect
                    x={node.x - 120}
                    y={node.y - (node.type === 'client' ? 120 : 100)}
                    width="240"
                    height="50"
                    fill="#111827"
                    rx="8"
                    className="drop-shadow-lg"
                  />
                  <text
                    x={node.x}
                    y={node.y - (node.type === 'client' ? 105 : 85)}
                    textAnchor="middle"
                    className="text-xs fill-white pointer-events-none"
                  >
                    <tspan x={node.x} dy="0">{node.tooltip.substring(0, 40)}</tspan>
                    <tspan x={node.x} dy="14">{node.tooltip.substring(40)}</tspan>
                  </text>
                </motion.g>
              )}
            </motion.g>
          ))}

          {/* Декоративные элементы */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 0.3 } : { opacity: 0 }}
            transition={{ delay: 2.5, duration: 0.5 }}
          >
            <text x="50" y="30" className="text-xs fill-steel font-medium">
              Операционная модель «Фотофактор»
            </text>
            <text x="50" y="45" className="text-xs fill-steel">
              Версия 2.0 • Интерактивная диаграмма
            </text>
          </motion.g>
        </svg>

        {/* Интерактивная легенда - Mobile-First */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-4 sm:mt-6 text-xs sm:text-sm">
          <div className="flex items-center gap-2 min-h-[44px] sm:min-h-auto touch-manipulation">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-technical-blue"></div>
            <span className="text-steel font-medium">Клиент</span>
          </div>
          <div className="flex items-center gap-2 min-h-[44px] sm:min-h-auto touch-manipulation">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-electric-coral"></div>
            <span className="text-steel font-medium">Платформа</span>
          </div>
          <div className="flex items-center gap-2 min-h-[44px] sm:min-h-auto touch-manipulation">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-steel"></div>
            <span className="text-steel font-medium">Юниты</span>
          </div>
          <div className="flex items-center gap-2 min-h-[44px] sm:min-h-auto touch-manipulation">
            <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-cloud border border-steel"></div>
            <span className="text-steel font-medium">Ресурсы</span>
          </div>
        </div>

        {/* Mobile Interaction Hint */}
        <div className="text-center mt-4 sm:hidden">
          <p className="text-xs text-steel/70">
            Нажмите на элементы диаграммы для подробностей
          </p>
        </div>
      </div>
    </div>
  );
};

export default SolutionDiagram; 