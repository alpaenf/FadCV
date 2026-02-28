'use client';

import { motion } from 'framer-motion';
import { Palette, Type } from 'lucide-react';
import type { CVSettings } from '@/types/cv';

const ACCENT_COLORS = [
  '#dc2626', // Crimson
  '#7c3aed', // Purple
  '#2563eb', // Blue
  '#059669', // Emerald
  '#d97706', // Amber
  '#db2777', // Pink
  '#0891b2', // Cyan
  '#1e293b', // Dark
];

interface Props {
  settings: CVSettings;
  onChange: (settings: CVSettings) => void;
}

export default function CVSettingsPanel({ settings, onChange }: Props) {
  return (
    <div className="rounded-xl p-5 mb-4" style={{ background: '#161922', border: '1px solid rgba(255,255,255,0.06)' }}>
      {/* Accent Color */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Palette size={14} color="#ef4444" />
          <span className="text-xs font-bold" style={{ color: '#a0a0b0' }}>Warna Aksen</span>
        </div>
        <div className="flex flex-wrap gap-3">
          {ACCENT_COLORS.map((color) => (
            <motion.button
              key={color}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => onChange({ ...settings, accentColor: color })}
              className="w-9 h-9 rounded-full border-2 transition-all"
              style={{
                background: color,
                borderColor: settings.accentColor === color ? 'white' : 'transparent',
                boxShadow: settings.accentColor === color ? `0 0 0 2px ${color}` : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Font Size */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Type size={14} color="#ef4444" />
          <span className="text-xs font-bold" style={{ color: '#a0a0b0' }}>Ukuran Font</span>
        </div>
        <div className="flex gap-3">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <motion.button
              key={size}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => onChange({ ...settings, fontSize: size })}
              className="flex-1 py-2.5 rounded-lg text-xs font-semibold transition-all"
              style={{
                background: settings.fontSize === size ? 'rgba(220, 38, 38, 0.2)' : 'rgba(255,255,255,0.05)',
                color: settings.fontSize === size ? '#ef4444' : '#606070',
                border: `1px solid ${settings.fontSize === size ? 'rgba(220, 38, 38, 0.4)' : 'transparent'}`,
              }}
            >
              {size === 'sm' ? 'Kecil' : size === 'md' ? 'Normal' : 'Besar'}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
