'use client';

import { motion } from 'framer-motion';
import { FileText, Download, Sparkles } from 'lucide-react';

export default function Navbar({ onExport, isExporting }: { onExport: () => void; isExporting: boolean }) {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 h-16"
      style={{
        background: 'rgba(10, 10, 15, 0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(220, 38, 38, 0.15)',
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-full flex items-center justify-between">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-2 cursor-pointer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #ef4444, #b91c1c)' }}
          >
            <FileText size={16} color="white" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            <span className="gradient-text">Fad</span>
            <span style={{ color: '#f8f8f8' }}>CV</span>
          </span>
          <div
            className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium"
            style={{ background: 'rgba(220, 38, 38, 0.15)', color: '#ef4444', border: '1px solid rgba(220, 38, 38, 0.2)' }}
          >
            <Sparkles size={10} />
            Premium
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:block text-sm" style={{ color: '#a0a0b0' }}>
            Expert CV Builder
          </span>

          <motion.button
            onClick={onExport}
            disabled={isExporting}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            style={{
              background: isExporting
                ? 'rgba(220,38,38,0.3)'
                : 'linear-gradient(135deg, #ef4444, #b91c1c)',
              color: 'white',
              boxShadow: isExporting ? 'none' : '0 4px 16px rgba(220, 38, 38, 0.35)',
            }}
          >
            <Download size={15} />
            {isExporting ? 'Exporting...' : 'Export PDF'}
          </motion.button>
        </div>
      </div>
    </motion.nav>
  );
}
