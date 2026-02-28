'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { generateId } from '@/lib/storage';
import type { Project } from '@/types/cv';
import { inputClass, inputStyle, textareaStyle, labelClass, labelStyle, cardStyle } from './formStyles';

interface Props { items: Project[]; onChange: (items: Project[]) => void; }

export default function ProjectSection({ items, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const add = () => { const id = generateId(); onChange([...items, { id, name: '', role: '', link: '', startDate: '', endDate: '', description: '', technologies: '' }]); setExpanded(id); };
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id));
  const update = (id: string, field: keyof Project, value: string) => onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="rounded-xl overflow-hidden" style={cardStyle}>
            <div className="flex items-center justify-between p-3.5 cursor-pointer" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
              <div>
                <div className="text-sm font-semibold" style={{ color: '#f8f8f8' }}>{item.name || 'Nama Proyek'}</div>
                {item.technologies && <div className="text-xs mt-0.5" style={{ color: '#a0a0b0' }}>{item.technologies}</div>}
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); remove(item.id); }} style={{ color: '#ef4444' }}><Trash2 size={14} /></button>
                {expanded === item.id ? <ChevronUp size={14} style={{ color: '#a0a0b0' }} /> : <ChevronDown size={14} style={{ color: '#a0a0b0' }} />}
              </div>
            </div>
            <AnimatePresence>
              {expanded === item.id && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="border-t overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><label className={labelClass} style={labelStyle}>Nama Proyek *</label><input className={inputClass} style={inputStyle} placeholder="Aplikasi E-Commerce" value={item.name} onChange={(e) => update(item.id, 'name', e.target.value)} /></div>
                      <div><label className={labelClass} style={labelStyle}>Peran Anda</label><input className={inputClass} style={inputStyle} placeholder="Lead Developer" value={item.role} onChange={(e) => update(item.id, 'role', e.target.value)} /></div>
                      <div className="sm:col-span-2"><label className={labelClass} style={labelStyle}>Link Proyek</label><input className={inputClass} style={inputStyle} placeholder="https://github.com/..." value={item.link} onChange={(e) => update(item.id, 'link', e.target.value)} /></div>
                      <div><label className={labelClass} style={labelStyle}>Mulai</label><input type="month" className={inputClass} style={inputStyle} value={item.startDate} onChange={(e) => update(item.id, 'startDate', e.target.value)} /></div>
                      <div><label className={labelClass} style={labelStyle}>Selesai</label><input type="month" className={inputClass} style={inputStyle} value={item.endDate} onChange={(e) => update(item.id, 'endDate', e.target.value)} /></div>
                      <div className="sm:col-span-2"><label className={labelClass} style={labelStyle}>Teknologi</label><input className={inputClass} style={inputStyle} placeholder="React, Node.js, PostgreSQL" value={item.technologies} onChange={(e) => update(item.id, 'technologies', e.target.value)} /></div>
                    </div>
                    <div><label className={labelClass} style={labelStyle}>Deskripsi</label><textarea className={inputClass} style={textareaStyle} placeholder="Jelaskan proyek, fitur, dan dampaknya..." value={item.description} onChange={(e) => update(item.id, 'description', e.target.value)} /></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
      <motion.button onClick={add} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full py-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all" style={{ borderColor: 'rgba(220, 38, 38, 0.3)', color: '#ef4444', background: 'rgba(220, 38, 38, 0.06)' }}>
        <Plus size={15} /> Tambah Proyek
      </motion.button>
    </div>
  );
}
