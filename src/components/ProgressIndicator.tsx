'use client';

import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  progress: number;
  compact?: boolean;
}

export default function ProgressIndicator({ progress, compact = false }: Props) {
  const getColor = () => {
    if (progress < 30) return '#ef4444';
    if (progress < 60) return '#f97316';
    if (progress < 90) return '#eab308';
    return '#22c55e';
  };

  const getLabel = () => {
    if (progress < 30) return 'Baru Memulai';
    if (progress < 60) return 'Sedang Mengisi';
    if (progress < 90) return 'Hampir Selesai';
    return 'CV Lengkap!';
  };

  if (compact) {
    return (
      <div className="flex items-center gap-2">
        <div
          className="flex-1 h-1.5 rounded-full overflow-hidden"
          style={{ background: 'rgba(255,255,255,0.08)' }}
        >
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{ background: getColor() }}
          />
        </div>
        <span className="text-xs font-semibold flex-shrink-0" style={{ color: getColor() }}>
          {progress}%
        </span>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-xl p-3 mb-3"
      style={{ background: 'rgba(20,22,32,0.8)', border: '1px solid rgba(255,255,255,0.06)' }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          {progress === 100 ? (
            <CheckCircle2 size={13} color="#22c55e" />
          ) : (
            <div
              className="w-3 h-3 rounded-full border-2"
              style={{ borderColor: getColor(), borderTopColor: 'transparent', animation: 'spin 1s linear infinite' }}
            />
          )}
          <span className="text-xs font-semibold" style={{ color: getColor() }}>
            {getLabel()}
          </span>
        </div>
        <span className="text-xs font-bold" style={{ color: getColor() }}>
          {progress}%
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: 'rgba(255,255,255,0.07)' }}
      >
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ background: `linear-gradient(90deg, ${getColor()}, ${getColor()}bb)` }}
        />
      </div>
    </motion.div>
  );
}
