'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { generateId } from '@/lib/storage';
import type { Experience } from '@/types/cv';
import { inputClass, inputStyle, textareaStyle, labelClass, labelStyle, cardStyle } from './formStyles';

interface Props { items: Experience[]; onChange: (items: Experience[]) => void; }

export default function ExperienceSection({ items, onChange }: Props) {
  const [expanded, setExpanded] = useState<string | null>(null);
  const add = () => { const id = generateId(); onChange([...items, { id, company: '', position: '', location: '', startDate: '', endDate: '', current: false, description: '' }]); setExpanded(id); };
  const remove = (id: string) => onChange(items.filter((i) => i.id !== id));
  const update = (id: string, field: keyof Experience, value: string | boolean) => onChange(items.map((i) => (i.id === id ? { ...i, [field]: value } : i)));

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {items.map((item) => (
          <motion.div key={item.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.25 }} className="rounded-xl overflow-hidden" style={cardStyle}>
            <div className="flex items-center justify-between p-3.5 cursor-pointer" onClick={() => setExpanded(expanded === item.id ? null : item.id)}>
              <div>
                <div className="text-sm font-semibold" style={{ color: '#f8f8f8' }}>{item.company || 'Nama Perusahaan'}</div>
                {item.position && <div className="text-xs mt-0.5" style={{ color: '#a0a0b0' }}>{item.position}</div>}
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
                      <div><label className={labelClass} style={labelStyle}>Perusahaan *</label><input className={inputClass} style={inputStyle} placeholder="PT. Teknologi Indonesia" value={item.company} onChange={(e) => update(item.id, 'company', e.target.value)} /></div>
                      <div><label className={labelClass} style={labelStyle}>Posisi *</label><input className={inputClass} style={inputStyle} placeholder="Software Engineer" value={item.position} onChange={(e) => update(item.id, 'position', e.target.value)} /></div>
                      <div><label className={labelClass} style={labelStyle}>Lokasi</label><input className={inputClass} style={inputStyle} placeholder="Jakarta, Indonesia" value={item.location} onChange={(e) => update(item.id, 'location', e.target.value)} /></div>
                      <div><label className={labelClass} style={labelStyle}>Mulai</label><input type="month" className={inputClass} style={inputStyle} value={item.startDate} onChange={(e) => update(item.id, 'startDate', e.target.value)} /></div>
                      <div className="sm:col-span-2"><label className={labelClass} style={labelStyle}>Selesai</label><div className="space-y-1.5"><input type="month" className={inputClass} style={{ ...inputStyle, opacity: item.current ? 0.4 : 1 }} disabled={item.current} value={item.endDate} onChange={(e) => update(item.id, 'endDate', e.target.value)} /><label className="flex items-center gap-2 cursor-pointer"><input type="checkbox" checked={item.current} onChange={(e) => update(item.id, 'current', e.target.checked)} className="accent-red-600" /><span className="text-xs" style={{ color: '#a0a0b0' }}>Masih Bekerja</span></label></div></div>
                    </div>
                    <div><label className={labelClass} style={labelStyle}>Deskripsi Pekerjaan</label><textarea className={inputClass} style={textareaStyle} placeholder="Deskripsi tanggung jawab dan pencapaian Anda..." value={item.description} onChange={(e) => update(item.id, 'description', e.target.value)} /></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>
      <motion.button onClick={add} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} className="w-full py-3 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2 transition-all" style={{ borderColor: 'rgba(220, 38, 38, 0.3)', color: '#ef4444', background: 'rgba(220, 38, 38, 0.06)' }}>
        <Plus size={15} /> Tambah Pengalaman Kerja
      </motion.button>
    </div>
  );
}
