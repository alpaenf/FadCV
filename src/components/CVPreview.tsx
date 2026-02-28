'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';
import type { CVData } from '@/types/cv';
import ModernProfessional from '@/templates/ModernProfessional';
import MinimalElegant from '@/templates/MinimalElegant';
import CreativeLayout from '@/templates/CreativeLayout';

interface Props {
  data: CVData;
  isExporting: boolean;
}

export default function CVPreview({ data, isExporting }: Props) {
  const [zoom, setZoom] = useState(0.55);

  const templates = {
    modern: ModernProfessional,
    minimal: MinimalElegant,
    creative: CreativeLayout,
  };
  const TemplateComponent = templates[data.settings.template] || ModernProfessional;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      {/* Floating zoom controls */}
      <div
        style={{
          position: 'absolute', bottom: '16px', right: '16px', zIndex: 20,
          display: 'flex', alignItems: 'center', gap: '2px',
          background: 'rgba(19,21,30,0.95)', backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.10)',
          borderRadius: '12px', padding: '4px 6px',
        }}
      >
        <button
          onClick={() => setZoom(Math.max(0.3, zoom - 0.1))}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#909090', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', minWidth: '36px', minHeight: '36px' }}
          title="Perkecil"
        >
          <ZoomOut size={16} />
        </button>
        <span style={{ fontSize: '11px', fontFamily: 'monospace', color: '#707080', minWidth: '34px', textAlign: 'center', fontWeight: 600 }}>
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#909090', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', minWidth: '36px', minHeight: '36px' }}
          title="Perbesar"
        >
          <ZoomIn size={16} />
        </button>
        <button
          onClick={() => setZoom(0.55)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#909090', padding: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', minWidth: '36px', minHeight: '36px' }}
          title="Reset zoom"
        >
          <Maximize2 size={16} />
        </button>
      </div>

      {/* Preview Viewport */}
      <div
        style={{
          flex: 1, overflowY: 'auto', overflowX: 'auto', position: 'relative',
          background: '#0c0d14',
          minHeight: '400px',
        }}
      >
        {/* Export loading skeleton */}
        <AnimatePresence>
          {isExporting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl"
              style={{ background: 'rgba(10, 10, 15, 0.85)', backdropFilter: 'blur(8px)' }}
            >
              <div className="space-y-3 w-64">
                <div className="skeleton h-4 w-full" />
                <div className="skeleton h-3 w-4/5" />
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-3/4" />
                <div className="skeleton h-4 w-2/3 mt-4" />
                <div className="skeleton h-3 w-full" />
                <div className="skeleton h-3 w-5/6" />
              </div>
              <div className="mt-6 text-sm font-semibold" style={{ color: '#ef4444' }}>
                Generating PDF...
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CV Page */}
        <div className="flex justify-center p-6" style={{ width: 'max-content', minWidth: '100%' }}>
          <motion.div
            key={data.settings.template}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top center',
              width: '794px',
              boxShadow: '0 8px 48px rgba(0,0,0,0.6), 0 2px 8px rgba(0,0,0,0.4)',
              borderRadius: '2px',
              overflow: 'hidden',
            }}
          >
            <TemplateComponent data={data} />
          </motion.div>
        </div>

        {/* A4 size indicator */}
        <div
          style={{ position: 'absolute', bottom: '12px', left: '12px', zIndex: 10, fontSize: '10px', padding: '3px 8px', borderRadius: '6px', background: 'rgba(0,0,0,0.5)', color: '#606070' }}
        >
          A4 · 210×297mm
        </div>
      </div>
    </div>
  );
}
