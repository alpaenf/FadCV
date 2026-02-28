'use client';

import { motion } from 'framer-motion';
import { ArrowDown, Star, Zap } from 'lucide-react';

export default function HeroSection() {
  const scrollToBuilder = () => {
    document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div
        className="absolute top-20 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(220, 38, 38, 0.06) 0%, transparent 70%)',
          filter: 'blur(40px)',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-8"
          style={{
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.2)',
            color: '#ef4444',
          }}
        >
          <Zap size={14} />
          CV Builder Profesional · 100% Gratis · Tanpa Login
          <Zap size={14} />
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-6"
        >
          Buat CV{' '}
          <span className="gradient-text">Profesional</span>
          <br />
          Dalam Hitungan Menit
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.35 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: '#a0a0b0' }}
        >
          Pilih template premium, isi data Anda, dan unduh CV berkualitas tinggi dalam format PDF.
          Preview realtime, simpan otomatis, tanpa registrasi.
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="flex flex-wrap justify-center gap-6 mb-10"
        >
          {[
            { label: 'Template Premium', value: '3+' },
            { label: 'Seksi Tersedia', value: '8+' },
            { label: 'Gratis Selamanya', value: '100%' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs" style={{ color: '#606070' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={scrollToBuilder}
            whileHover={{ scale: 1.04, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-base font-bold text-white transition-all"
            style={{
              background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
              boxShadow: '0 8px 32px rgba(220, 38, 38, 0.4)',
            }}
          >
            <Star size={18} />
            Mulai Buat CV Sekarang
            <ArrowDown size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
