'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Star } from 'lucide-react';
import { generateId } from '@/lib/storage';
import type { Skill } from '@/types/cv';
import { inputClass, inputStyle, labelClass, labelStyle } from './formStyles';

interface Props { items: Skill[]; onChange: (items: Skill[]) => void; }

const SKILL_CATEGORIES = ['Teknis', 'Bahasa', 'Soft Skills', 'Tools', 'Design', 'Lainnya'];

export default function SkillsSection({ items, onChange }: Props) {
  const add = () => onChange([...items, { id: generateId(), name: '', level: 3, category: 'Teknis' }]);
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id));
  const update = (id: string, field: keyof Skill, value: string | number) => onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  const grouped = SKILL_CATEGORIES.reduce((acc, cat) => {
    const catItems = items.filter((s) => s.category === cat);
    if (catItems.length) acc[cat] = catItems;
    return acc;
  }, {} as Record<string, Skill[]>);

  return (
    <div className="space-y-4">
      <AnimatePresence mode="popLayout">
        {items.map((skill) => (
          <motion.div
            key={skill.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-3 rounded-xl p-3.5"
            style={{ background: 'rgba(18, 18, 26, 0.9)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {/* Name */}
            <input
              className={inputClass + ' flex-1'}
              style={inputStyle}
              placeholder="Nama keahlian"
              value={skill.name}
              onChange={(e) => update(skill.id, 'name', e.target.value)}
            />

            {/* Category */}
            <select
              className="px-2.5 py-2 rounded-xl text-xs font-medium input-glow"
              style={{ ...inputStyle, minWidth: '90px' }}
              value={skill.category}
              onChange={(e) => update(skill.id, 'category', e.target.value)}
            >
              {SKILL_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Level stars */}
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((level) => (
                <button
                  key={level}
                  onClick={() => update(skill.id, 'level', level)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    size={14}
                    fill={level <= skill.level ? '#dc2626' : 'none'}
                    color={level <= skill.level ? '#dc2626' : '#404050'}
                  />
                </button>
              ))}
            </div>

            <button onClick={() => remove(skill.id)} style={{ color: '#ef4444', flexShrink: 0 }}>
              <Trash2 size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={add}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all"
        style={{ borderColor: 'rgba(220, 38, 38, 0.3)', color: '#ef4444', background: 'rgba(220, 38, 38, 0.06)' }}
      >
        <Plus size={15} /> Tambah Keterampilan
      </motion.button>

      {items.length > 0 && (
        <div className="text-xs font-medium mt-2 p-2 rounded-lg" style={{ color: '#606070', background: 'rgba(255,255,255,0.03)' }}>
          💡 Klik bintang untuk mengatur tingkat keahlian (1–5)
        </div>
      )}
    </div>
  );
}
