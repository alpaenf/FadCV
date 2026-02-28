'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, ChevronDown, ChevronUp, GripVertical } from 'lucide-react';
import { useState } from 'react';
import { generateId } from '@/lib/storage';
import type { CustomSection, CustomItem } from '@/types/cv';
import { inputClass, inputStyle, textareaStyle, labelClass, labelStyle, cardStyle } from './formStyles';

interface Props {
  sections: CustomSection[];
  onChange: (sections: CustomSection[]) => void;
}

export default function CustomSectionsManager({ sections, onChange }: Props) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [showAdd, setShowAdd] = useState(false);

  const addSection = () => {
    if (!newTitle.trim()) return;
    const id = generateId();
    onChange([...sections, { id, title: newTitle.trim(), items: [] }]);
    setNewTitle('');
    setShowAdd(false);
    setExpandedSection(id);
  };

  const removeSection = (id: string) => onChange(sections.filter((s) => s.id !== id));

  const updateSection = (id: string, items: CustomItem[]) =>
    onChange(sections.map((s) => (s.id === id ? { ...s, items } : s)));

  const addItem = (sectionId: string) => {
    const id = generateId();
    const section = sections.find((s) => s.id === sectionId)!;
    const newItems = [...section.items, { id, title: '', subtitle: '', date: '', description: '' }];
    updateSection(sectionId, newItems);
    setExpandedItem(id);
  };

  const removeItem = (sectionId: string, itemId: string) => {
    const section = sections.find((s) => s.id === sectionId)!;
    updateSection(sectionId, section.items.filter((i) => i.id !== itemId));
  };

  const updateItem = (sectionId: string, itemId: string, field: keyof CustomItem, value: string) => {
    const section = sections.find((s) => s.id === sectionId)!;
    updateSection(sectionId, section.items.map((i) => (i.id === itemId ? { ...i, [field]: value } : i)));
  };

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            layout
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="rounded-xl overflow-hidden"
            style={{ background: 'rgba(26, 26, 38, 0.9)', border: '1px solid rgba(220, 38, 38, 0.15)' }}
          >
            {/* Section Header */}
            <div
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: '#dc2626' }} />
                <span className="text-sm font-bold" style={{ color: '#f8f8f8' }}>{section.title}</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(220, 38, 38, 0.15)', color: '#ef4444' }}>
                  {section.items.length} item
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => { e.stopPropagation(); removeSection(section.id); }} style={{ color: '#ef4444' }}><Trash2 size={14} /></button>
                {expandedSection === section.id ? <ChevronUp size={14} style={{ color: '#a0a0b0' }} /> : <ChevronDown size={14} style={{ color: '#a0a0b0' }} />}
              </div>
            </div>

            <AnimatePresence>
              {expandedSection === section.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="border-t overflow-hidden"
                  style={{ borderColor: 'rgba(220, 38, 38, 0.1)' }}
                >
                  <div className="p-3 space-y-2">
                    {/* Items */}
                    <AnimatePresence mode="popLayout">
                      {section.items.map((item) => (
                        <motion.div
                          key={item.id}
                          layout
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, height: 0 }}
                          className="rounded-xl overflow-hidden"
                          style={cardStyle}
                        >
                          <div className="flex items-center justify-between p-2.5 cursor-pointer" onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}>
                            <span className="text-xs font-semibold" style={{ color: '#f8f8f8' }}>{item.title || 'Item'}</span>
                            <div className="flex items-center gap-2">
                              <button onClick={(e) => { e.stopPropagation(); removeItem(section.id, item.id); }} style={{ color: '#ef4444' }}><Trash2 size={12} /></button>
                              {expandedItem === item.id ? <ChevronUp size={12} style={{ color: '#a0a0b0' }} /> : <ChevronDown size={12} style={{ color: '#a0a0b0' }} />}
                            </div>
                          </div>
                          <AnimatePresence>
                            {expandedItem === item.id && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="border-t overflow-hidden" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                                <div className="p-2.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                  <div><label className={labelClass} style={labelStyle}>Judul</label><input className={inputClass} style={inputStyle} placeholder="Judul item" value={item.title} onChange={(e) => updateItem(section.id, item.id, 'title', e.target.value)} /></div>
                                  <div><label className={labelClass} style={labelStyle}>Sub-judul</label><input className={inputClass} style={inputStyle} placeholder="Detail tambahan" value={item.subtitle} onChange={(e) => updateItem(section.id, item.id, 'subtitle', e.target.value)} /></div>
                                  <div><label className={labelClass} style={labelStyle}>Tanggal</label><input className={inputClass} style={inputStyle} placeholder="2024" value={item.date} onChange={(e) => updateItem(section.id, item.id, 'date', e.target.value)} /></div>
                                  <div><label className={labelClass} style={labelStyle}>Deskripsi</label><textarea className={inputClass} style={textareaStyle} placeholder="Deskripsi..." value={item.description} onChange={(e) => updateItem(section.id, item.id, 'description', e.target.value)} /></div>
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      ))}
                    </AnimatePresence>

                    <button
                      onClick={() => addItem(section.id)}
                      className="w-full py-2 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5"
                      style={{ borderColor: 'rgba(255,255,255,0.08)', color: '#a0a0b0', background: 'transparent' }}
                    >
                      <Plus size={12} /> Tambah Item
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add new section */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-2"
          >
            <input
              className={inputClass + ' w-full'}
              style={inputStyle}
              placeholder="Judul seksi baru (contoh: Penghargaan)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addSection()}
              autoFocus
            />
            <div className="flex gap-2">
              <button
                onClick={addSection}
                className="flex-1 py-2.5 rounded-xl font-semibold text-sm"
                style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)', color: 'white' }}
              >
                Buat Seksi
              </button>
              <button
                onClick={() => { setShowAdd(false); setNewTitle(''); }}
                className="px-4 py-2.5 rounded-xl text-sm font-semibold"
                style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#a0a0b0' }}
              >
                Batal
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setShowAdd(true)}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-center gap-2"
        style={{ borderColor: 'rgba(220, 38, 38, 0.3)', color: '#ef4444', background: 'rgba(220, 38, 38, 0.06)' }}
      >
        <Plus size={15} /> Tambah Seksi Kustom
      </motion.button>
    </div>
  );
}
