'use client';

import { memo, useState } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { motion } from 'framer-motion';
import type { NodeData } from '@/shared/data/stackNodes';

const CustomNode = memo(({ data }: NodeProps) => {
  const typedData = data as NodeData;
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (typedData.onNodeClick && typedData.techId) {
      typedData.onNodeClick(typedData.techId);
    }
  };

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="!h-1 !w-1 !border-0 !bg-transparent"
      />

      <motion.div
        className="group relative cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <motion.div
          className="absolute -inset-4 z-0 rounded-full blur-2xl"
          style={{
            background: `radial-gradient(circle, ${typedData.originalGlow}60 0%, transparent 60%)`,
          }}
          animate={{
            opacity: isHovered ? 0.8 : 0,
            scale: isHovered ? 1.1 : 1,
          }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />

        <motion.div
          className="relative z-10 min-w-[140px] overflow-hidden rounded-full px-8 py-4 text-center backdrop-blur-xl"
          style={{
            background: isHovered ? 'rgba(15, 23, 42, 0.85)' : 'rgba(15, 23, 42, 0.65)',
            border: `1px solid ${isHovered ? typedData.originalGlow + '60' : 'rgba(148, 163, 184, 0.12)'}`,
            boxShadow: isHovered
              ? `0 0 40px ${typedData.originalGlow}35, 0 0 80px ${typedData.originalGlow}15, inset 0 0 30px ${typedData.originalGlow}08`
              : '0 8px 32px rgba(0, 0, 0, 0.4)',
          }}
          animate={{
            scale: isHovered ? 1.08 : 1,
            y: isHovered ? -2 : 0,
          }}
          transition={{ duration: 0.35, ease: [0.34, 1.56, 0.64, 1] }}
        >
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              background: `linear-gradient(135deg, ${typedData.originalGlow}15 0%, transparent 50%, ${typedData.originalGlow}10 100%)`,
            }}
            animate={{
              opacity: isHovered ? 1 : 0.3,
            }}
            transition={{ duration: 0.3 }}
          />

          <div className="relative z-10">
            <motion.div
              className="text-sm font-medium tracking-wide text-white/95"
              style={{
                textShadow: isHovered
                  ? `0 0 16px ${typedData.originalGlow}80, 0 2px 8px rgba(0,0,0,0.5)`
                  : '0 2px 8px rgba(0,0,0,0.5)',
              }}
              animate={{
                letterSpacing: isHovered ? '0.05em' : '0.025em',
              }}
              transition={{ duration: 0.3 }}
            >
              {typedData.label}
            </motion.div>
          </div>

          <motion.div
            className="pointer-events-none absolute inset-0 rounded-full"
            style={{
              boxShadow: `inset 0 1px 2px ${typedData.originalGlow}20, inset 0 -1px 2px rgba(0,0,0,0.5)`,
            }}
            animate={{
              opacity: isHovered ? 1 : 0.4,
            }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!h-1 !w-1 !border-0 !bg-transparent"
      />
    </>
  );
});

CustomNode.displayName = 'CustomNode';

export default CustomNode;
