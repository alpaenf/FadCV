'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

const templates = [
  { id: 'modern' as const, label: 'Modern', sublabel: 'Professional' },
  { id: 'minimal' as const, label: 'Minimal', sublabel: 'Elegant' },
  { id: 'creative' as const, label: 'Creative', sublabel: 'Layout' },
];

function ModernPreview({ accent }: { accent: string }) {
  return (
    <div style={{ width: '100%', height: '64px', display: 'flex', background: '#f5f5f5', borderRadius: '6px', overflow: 'hidden' }}>
      <div style={{ width: '30%', background: accent, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '6px 4px', gap: '4px' }}>
        <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'rgba(255,255,255,0.6)' }} />
        <div style={{ width: '80%', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.4)' }} />
        <div style={{ width: '60%', height: '2px', borderRadius: '2px', background: 'rgba(255,255,255,0.3)' }} />
        <div style={{ width: '70%', height: '2px', borderRadius: '2px', background: 'rgba(255,255,255,0.3)' }} />
      </div>
      <div style={{ flex: 1, padding: '6px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
        <div style={{ height: '5px', borderRadius: '2px', background: '#333', width: '70%' }} />
        <div style={{ height: '3px', borderRadius: '2px', background: accent, width: '50%' }} />
        <div style={{ height: '2px', borderRadius: '2px', background: '#ccc', width: '90%' }} />
        <div style={{ height: '2px', borderRadius: '2px', background: '#ccc', width: '75%' }} />
        <div style={{ height: '2px', borderRadius: '2px', background: '#ccc', width: '85%' }} />
      </div>
    </div>
  );
}

function MinimalPreview({ accent }: { accent: string }) {
  return (
    <div style={{ width: '100%', height: '64px', background: '#fff', borderRadius: '6px', overflow: 'hidden', padding: '6px 8px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `2px solid ${accent}`, paddingBottom: '4px', marginBottom: '2px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ height: '5px', borderRadius: '2px', background: '#222', width: '60px' }} />
          <div style={{ height: '3px', borderRadius: '2px', background: accent, width: '40px' }} />
        </div>
        <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: `2px solid ${accent}`, background: '#f0f0f0' }} />
      </div>
      <div style={{ height: '2px', borderRadius: '2px', background: '#ddd', width: '100%' }} />
      <div style={{ height: '2px', borderRadius: '2px', background: '#ddd', width: '80%' }} />
      <div style={{ height: '2px', borderRadius: '2px', background: '#ddd', width: '90%' }} />
    </div>
  );
}

function CreativePreview({ accent }: { accent: string }) {
  return (
    <div style={{ width: '100%', height: '64px', background: '#fff', borderRadius: '6px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '22px', background: '#111827', display: 'flex', alignItems: 'center', gap: '4px', padding: '0 6px' }}>
        <div style={{ width: '14px', height: '14px', borderRadius: '50%', background: accent }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
          <div style={{ height: '3px', borderRadius: '2px', background: '#fff', width: '50%' }} />
          <div style={{ height: '2px', borderRadius: '2px', background: accent, width: '35%' }} />
        </div>
      </div>
      <div style={{ flex: 1, display: 'flex' }}>
        <div style={{ width: '60%', padding: '4px 5px', display: 'flex', flexDirection: 'column', gap: '2px', borderRight: '1px solid #eee' }}>
          <div style={{ height: '2px', borderRadius: '2px', background: accent, width: '50%' }} />
          <div style={{ height: '2px', borderRadius: '2px', background: '#ccc', width: '90%' }} />
          <div style={{ height: '2px', borderRadius: '2px', background: '#ccc', width: '75%' }} />
        </div>
        <div style={{ width: '40%', padding: '4px', background: '#fafafa', display: 'flex', flexDirection: 'column', gap: '2px' }}>
          <div style={{ height: '2px', borderRadius: '2px', background: accent, width: '60%' }} />
          <div style={{ height: '2px', borderRadius: '2px', background: '#ccc', width: '85%' }} />
          <div style={{ height: '2px', borderRadius: '2px', background: '#ccc', width: '70%' }} />
        </div>
      </div>
    </div>
  );
}

interface Props {
  selected: 'modern' | 'minimal' | 'creative';
  onSelect: (id: 'modern' | 'minimal' | 'creative') => void;
  accentColor?: string;
}

const PreviewMap = {
  modern: ModernPreview,
  minimal: MinimalPreview,
  creative: CreativePreview,
};

export default function TemplateSelector({ selected, onSelect, accentColor = '#dc2626' }: Props) {
  return (
    <div className="rounded-xl p-5 mb-4" style={{ background: '#161922', border: '1px solid rgba(255,255,255,0.06)' }}>
      <h3 className="text-sm font-bold mb-4" style={{ color: '#f8f8f8' }}>
        Pilih Template
      </h3>
      <div className="grid grid-cols-3 gap-3">
        {templates.map((tpl) => {
          const PreviewComp = PreviewMap[tpl.id];
          return (
            <motion.button
              key={tpl.id}
              onClick={() => onSelect(tpl.id)}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex flex-col items-center p-3 rounded-xl transition-all"
              style={{
                border: `2px solid ${selected === tpl.id ? accentColor : 'rgba(255,255,255,0.07)'}`,
                background: selected === tpl.id ? `${accentColor}14` : 'rgba(18,18,26,0.9)',
                boxShadow: selected === tpl.id ? `0 4px 20px ${accentColor}25` : 'none',
              }}
            >
              <div className="w-full mb-3 rounded overflow-hidden" style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.3)' }}>
                <PreviewComp accent={accentColor} />
              </div>
              <span className="text-xs font-semibold text-center leading-tight mt-0.5" style={{ color: selected === tpl.id ? accentColor : '#a0a0b0' }}>
                {tpl.label}
              </span>
              <span className="text-xs text-center leading-tight" style={{ color: '#404050', fontSize: '10px' }}>
                {tpl.sublabel}
              </span>
              <AnimatePresence>
                {selected === tpl.id && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="absolute top-1.5 right-1.5"
                  >
                    <CheckCircle2 size={13} color={accentColor} />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
