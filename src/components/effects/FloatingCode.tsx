'use client';

import * as React from 'react';
import { motion } from 'motion/react';

const codeSnippets = [
  { text: 'model.fit(X_train, y_train)', category: 'ml', x: '8%', y: '15%', duration: 8 },
  { text: 'from transformers import AutoModel', category: 'ml', x: '88%', y: '10%', duration: 10 },
  { text: 'await prisma.user.create()', category: 'backend', x: '12%', y: '65%', duration: 9 },
  { text: 'torch.nn.functional.softmax()', category: 'ml', x: '82%', y: '70%', duration: 11 },
  {
    text: 'const [state, dispatch] = useReducer()',
    category: 'frontend',
    x: '20%',
    y: '35%',
    duration: 7,
  },
  { text: 'docker compose up --build', category: 'devops', x: '75%', y: '45%', duration: 9 },
  {
    text: 'app.post("/api/predict", async)',
    category: 'backend',
    x: '48%',
    y: '80%',
    duration: 10,
  },
  {
    text: '<Suspense fallback={<Loading />}>',
    category: 'frontend',
    x: '92%',
    y: '55%',
    duration: 8,
  },
  { text: 'redis.setex(key, 3600, data)', category: 'backend', x: '15%', y: '88%', duration: 9 },
  { text: 'np.linalg.svd(matrix)', category: 'ml', x: '65%', y: '20%', duration: 10 },
  { text: 'useState<T extends Model>()', category: 'frontend', x: '35%', y: '60%', duration: 8 },
  { text: 'git rebase -i HEAD~3', category: 'devops', x: '55%', y: '25%', duration: 9 },
];

interface FloatingCodeItemProps {
  text: string;
  delay: number;
  x: string;
  y: string;
  duration: number;
  category: string;
}

function FloatingCodeItem({ text, delay, x, y, duration, category }: FloatingCodeItemProps) {
  const colorClass = React.useMemo(() => {
    switch (category) {
      case 'ml':
        return 'text-[#C586C0]';
      case 'backend':
        return 'text-[#4EC9B0]';
      case 'frontend':
        return 'text-[#DCDCAA]';
      case 'devops':
        return 'text-[#9CDCFE]';
      default:
        return 'text-[#CE9178]';
    }
  }, [category]);

  return (
    <motion.div
      className="absolute select-none whitespace-nowrap font-mono"
      style={{
        left: x,
        top: y,
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: [0, 0.7, 0.7, 0],
        y: [20, -30, -60, -100],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'linear',
        times: [0, 0.3, 0.7, 1],
      }}
    >
      <span className={`${colorClass} text-xs sm:text-sm`}>{text}</span>
    </motion.div>
  );
}

export function FloatingCode() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {codeSnippets.map((snippet, index) => (
        <FloatingCodeItem
          key={snippet.text}
          text={snippet.text}
          category={snippet.category}
          delay={index * 0.7}
          x={snippet.x}
          y={snippet.y}
          duration={snippet.duration}
        />
      ))}
    </div>
  );
}
