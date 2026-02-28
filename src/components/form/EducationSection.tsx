'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { generateId } from '@/lib/storage';
import type { Education } from '@/types/cv';
import { inputClass, inputStyle, textareaStyle, labelClass, labelStyle, cardStyle } from './formStyles';

interface Props {
  items: Education[];
  onChange: (items: Education[]) => void;
}

export default function EducationSection({ items, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);

  const add = () => {
    const id = generateId();
    onChange([...items, { id, institution: '', degree: '', field: '', startDate: '', endDate: '', current: false, gpa: '', description: '' }]);
    setExpanded(id);
  };

  const remove = (id: string) => onChange(items.filter((i) => i.id !== id));

  const update = (id: string, field: keyof Education, value: string | boolean) => {
    onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));
  };

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div
            key={item.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl overflow-hidden"
            style={cardStyle}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-3.5 cursor-pointer"
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            >
              <div>
                <div className="text-sm font-semibold" style={{ color: '#f8f8f8' }}>
                  {item.institution || 'Institusi Pendidikan'}
                </div>
                {item.degree && (
                  <div className="text-xs mt-0.5" style={{ color: '#a0a0b0' }}>
                    {item.degree} {item.field && `- ${item.field}`}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); remove(item.id); }} style={{ color: '#ef4444' }}>
                  <Trash2 size={14} />
                </button>
                {expanded === item.id ? <ChevronUp size={14} style={{ color: '#a0a0b0' }} /> : <ChevronDown size={14} style={{ color: '#a0a0b0' }} />}
              </div>
            </div>

            {/* Content */}
            <AnimatePresence>
              {expanded === item.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border-t overflow-hidden"
                  style={{ borderColor: 'rgba(255,255,255,0.06)' }}
                >
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className={labelClass} style={labelStyle}>Institusi *</label>
                        <input className={inputClass} style={inputStyle} placeholder="Universitas Indonesia" value={item.institution} onChange={(e) => update(item.id, 'institution', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass} style={labelStyle}>Jenjang *</label>
                        <input className={inputClass} style={inputStyle} placeholder="S1 / S2 / D3 / SMA" value={item.degree} onChange={(e) => update(item.id, 'degree', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass} style={labelStyle}>Jurusan</label>
                        <input className={inputClass} style={inputStyle} placeholder="Teknik Informatika" value={item.field} onChange={(e) => update(item.id, 'field', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass} style={labelStyle}>IPK / GPA</label>
                        <input className={inputClass} style={inputStyle} placeholder="3.80 / 4.00" value={item.gpa} onChange={(e) => update(item.id, 'gpa', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass} style={labelStyle}>Mulai</label>
                        <input type="month" className={inputClass} style={inputStyle} value={item.startDate} onChange={(e) => update(item.id, 'startDate', e.target.value)} />
                      </div>
                      <div>
                        <label className={labelClass} style={labelStyle}>Selesai</label>
                        <div className="space-y-1.5">
                          <input type="month" className={inputClass} style={{ ...inputStyle, opacity: item.current ? 0.4 : 1 }} disabled={item.current} value={item.endDate} onChange={(e) => update(item.id, 'endDate', e.target.value)} />
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input type="checkbox" checked={item.current} onChange={(e) => update(item.id, 'current', e.target.checked)} className="accent-red-600" />
                            <span className="text-xs" style={{ color: '#a0a0b0' }}>Masih Berlangsung</span>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Deskripsi</label>
                      <textarea className={inputClass} style={textareaStyle} placeholder="Prestasi, kegiatan, atau informasi relevan..." value={item.description} onChange={(e) => update(item.id, 'description', e.target.value)} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={add}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all"
        style={{ borderColor: 'rgba(220, 38, 38, 0.3)', color: '#ef4444', background: 'rgba(220, 38, 38, 0.06)' }}
      >
        <Plus size={15} /> Tambah Pendidikan
      </motion.button>
    </div>
  );
}
