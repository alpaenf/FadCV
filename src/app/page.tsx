'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Download, RefreshCw, LayoutGrid, PenLine, Layers2,
  Sparkles, ArrowRight, ArrowLeft, Zap, Shield, Star, ChevronRight,
  MousePointer2, ClipboardList, SlidersHorizontal, FileDown, CheckCircle2,
  Eye,
} from 'lucide-react';
import CVForm from '@/components/CVForm';
import CVPreview from '@/components/CVPreview';
import TemplateSelector from '@/components/TemplateSelector';
import CVSettingsPanel from '@/components/CVSettingsPanel';
import SectionOrderManager from '@/components/SectionOrderManager';
import CustomSectionsManager from '@/components/form/CustomSectionsManager';
import { saveCV, loadCV, clearCV } from '@/lib/storage';
import { exportToPDF, calculateProgress } from '@/lib/pdfExport';
import type { CVData } from '@/types/cv';

const TABS = [
  { id: 'template' as const, label: 'Template', icon: LayoutGrid },
  { id: 'content' as const, label: 'Isi CV', icon: PenLine },
  { id: 'layout' as const, label: 'Layout', icon: Layers2 },
];
type TabId = 'template' | 'content' | 'layout';

/* ─── Landing page ────────────────────────────────────────── */
function LandingPage({ onStart }: { onStart: () => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const features = [
    {
      icon: Zap,
      title: 'Realtime Preview',
      desc: 'Lihat perubahan CV kamu langsung saat mengetik — tanpa reload, tanpa delay.',
    },
    {
      icon: Star,
      title: '3 Template Premium',
      desc: 'Modern Professional, Minimal Elegant, dan Creative Layout siap pakai.',
    },
    {
      icon: Shield,
      title: '100% Privasi',
      desc: 'Data tersimpan hanya di browser kamu. Tidak ada server, tidak ada login.',
    },
    {
      icon: FileDown,
      title: 'Export PDF Berkualitas',
      desc: 'Unduh CV dalam format PDF A4 siap cetak dan siap kirim ke rekruter.',
    },
    {
      icon: SlidersHorizontal,
      title: 'Kustomisasi Penuh',
      desc: 'Atur warna aksen, ukuran font, urutan seksi, hingga seksi kustom sendiri.',
    },
    {
      icon: CheckCircle2,
      title: 'Simpan Otomatis',
      desc: 'Setiap ketikan tersimpan otomatis. Data tidak hilang meski browser di-refresh.',
    },
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0f1117',
        fontFamily: 'Poppins, sans-serif',
      }}
    >
      {/* ── Navbar ── */}
      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 100,
          pointerEvents: 'none',
        }}
      >
        <motion.div
          animate={scrolled ? {
            background: 'rgba(15,17,23,0.88)',
            boxShadow: '0 4px 32px rgba(0,0,0,0.45)',
            borderRadius: '999px',
            marginTop: '10px',
            marginLeft: '24px',
            marginRight: '24px',
            paddingLeft: '20px',
            paddingRight: '12px',
            border: '1px solid rgba(255,255,255,0.10)',
            backdropFilter: 'blur(24px)',
          } : {
            background: 'rgba(15,17,23,0.0)',
            boxShadow: 'none',
            borderRadius: '0px',
            marginTop: '0px',
            marginLeft: '0px',
            marginRight: '0px',
            paddingLeft: '24px',
            paddingRight: '24px',
            border: '1px solid rgba(255,255,255,0.0)',
            backdropFilter: 'blur(0px)',
          }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            pointerEvents: 'all',
          }}
        >
          {/* Logo — text only */}
          <span style={{ fontWeight: 800, fontSize: '18px', letterSpacing: '-0.5px', cursor: 'default' }}>
            <span className="gradient-text">Fad</span>
            <span style={{ color: '#f0f0f0' }}>CV</span>
          </span>

          {/* CTA */}
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 18px', borderRadius: '999px',
              fontSize: '13px', fontWeight: 700,
              background: 'linear-gradient(135deg,#ef4444,#b91c1c)',
              color: 'white',
              boxShadow: '0 2px 12px rgba(220,38,38,0.35)',
              border: 'none', cursor: 'pointer',
            }}
          >
            Mulai Buat CV <ChevronRight size={14} />
          </motion.button>
        </motion.div>
      </motion.nav>

      {/* ── Hero ── */}
      <section
        style={{
          position: 'relative',
          padding: '140px 24px 72px',
          overflow: 'hidden',
        }}
      >
        {/* background glow */}
        <div
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            background: 'radial-gradient(ellipse 80% 60% at 50% 30%, rgba(220,38,38,0.08) 0%, transparent 70%)',
          }}
        />

        <div
          style={{
            maxWidth: '720px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          {/* Badge — removed */}

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            style={{
              fontSize: 'clamp(2.4rem, 6vw, 3.6rem)',
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: '-1px',
              color: '#f0f0f4',
              marginBottom: '20px',
            }}
          >
            Buat CV{' '}
            <span className="gradient-text">Profesional</span>
            <br />
            Dalam Hitungan Menit
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.45 }}
            style={{
              fontSize: '16px',
              lineHeight: 1.7,
              color: '#6a6a7a',
              marginBottom: '36px',
              maxWidth: '520px',
              margin: '0 auto 36px',
            }}
          >
            Pilih template premium, isi data kamu, dan unduh CV berkualitas tinggi dalam format PDF.
            Preview realtime, simpan otomatis.
          </motion.p>

          {/* CTA + hint */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}
          >
            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.04, boxShadow: '0 10px 36px rgba(220,38,38,0.45)' }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '14px 32px', borderRadius: '14px',
                fontSize: '15px', fontWeight: 700,
                background: 'linear-gradient(135deg,#ef4444,#b91c1c)',
                color: 'white',
                boxShadow: '0 4px 22px rgba(220,38,38,0.38)',
                border: 'none', cursor: 'pointer',
              }}
            >
              Mulai Buat CV Sekarang <ArrowRight size={16} />
            </motion.button>
            <span style={{ fontSize: '12px', color: '#3a3a4a' }}>
              Tidak perlu daftar · Langsung jadi
            </span>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            style={{
              display: 'flex', justifyContent: 'center', gap: '48px',
              marginTop: '56px',
              paddingTop: '40px',
              borderTop: '1px solid rgba(255,255,255,0.05)',
            }}
          >
            {[
              { value: '3+', label: 'Template Premium' },
              { value: '8+', label: 'Seksi CV' },
              { value: '100%', label: 'Gratis' },
            ].map((s) => (
              <div key={s.label} style={{ textAlign: 'center' }}>
                <div
                  className="gradient-text"
                  style={{ fontSize: '26px', fontWeight: 800, lineHeight: 1 }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: '11px', color: '#4a4a5a', marginTop: '4px' }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Features ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '940px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#ef4444', marginBottom: '10px' }}>
              Fitur
            </div>
            <div style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, color: '#f0f0f4', lineHeight: 1.25 }}>
              Semua yang kamu butuhkan
            </div>
            <div style={{ fontSize: '14px', color: '#52525e', marginTop: '10px', maxWidth: '420px', margin: '10px auto 0', lineHeight: 1.65 }}>
              Dirancang untuk membuat CV profesional dengan cepat, mudah, dan gratis — tanpa kompromi.
            </div>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '16px',
            }}
          >
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  style={{
                    borderRadius: '16px',
                    padding: '22px 24px',
                    background: '#13151e',
                    border: '1px solid rgba(255,255,255,0.06)',
                  }}
                >
                  <div
                    style={{
                      width: '38px', height: '38px', borderRadius: '10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '14px',
                      background: 'rgba(220,38,38,0.1)',
                      border: '1px solid rgba(220,38,38,0.18)',
                    }}
                  >
                    <Icon size={17} color="#ef4444" />
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#e0e0e8', marginBottom: '7px' }}>
                    {f.title}
                  </div>
                  <div style={{ fontSize: '13px', lineHeight: 1.65, color: '#52525e' }}>
                    {f.desc}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── How to Use ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <div
              style={{
                display: 'inline-block',
                fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase', color: '#ef4444',
                marginBottom: '10px',
              }}
            >
              Cara Pakai
            </div>
            <div style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, color: '#f0f0f4', lineHeight: 1.25 }}>
              Selesai dalam 4 langkah mudah
            </div>
          </motion.div>

          {/* Steps */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '12px',
              position: 'relative',
            }}
          >
            {[
              {
                icon: MousePointer2,
                step: '01',
                title: 'Pilih Template',
                desc: 'Pilih salah satu dari 3 template premium yang tersedia sesuai selera kamu.',
              },
              {
                icon: ClipboardList,
                step: '02',
                title: 'Isi Data CV',
                desc: 'Lengkapi informasi pribadi, pendidikan, pengalaman, skill, dan lainnya.',
              },
              {
                icon: SlidersHorizontal,
                step: '03',
                title: 'Atur Tampilan',
                desc: 'Sesuaikan warna aksen, ukuran font, dan urutan seksi sesuai keinginan.',
              },
              {
                icon: FileDown,
                step: '04',
                title: 'Export PDF',
                desc: 'Klik tombol Export PDF dan unduh CV siap kirim berkualitas tinggi.',
              },
            ].map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  style={{
                    borderRadius: '16px',
                    padding: '22px 20px',
                    background: '#13151e',
                    border: '1px solid rgba(255,255,255,0.06)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  {/* Step number watermark */}
                  <div
                    style={{
                      position: 'absolute', top: '10px', right: '14px',
                      fontSize: '36px', fontWeight: 900,
                      color: 'rgba(220,38,38,0.06)',
                      lineHeight: 1, userSelect: 'none',
                    }}
                  >
                    {s.step}
                  </div>

                  {/* Icon */}
                  <div
                    style={{
                      width: '38px', height: '38px', borderRadius: '10px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '14px',
                      background: 'rgba(220,38,38,0.1)',
                      border: '1px solid rgba(220,38,38,0.2)',
                    }}
                  >
                    <Icon size={17} color="#ef4444" />
                  </div>

                  <div style={{ fontSize: '14px', fontWeight: 700, color: '#e8e8f0', marginBottom: '6px' }}>
                    {s.title}
                  </div>
                  <div style={{ fontSize: '12px', lineHeight: 1.65, color: '#52525e' }}>
                    {s.desc}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Template Showcase ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ textAlign: 'center', marginBottom: '36px' }}
          >
            <div
              style={{
                display: 'inline-block',
                fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase', color: '#ef4444',
                marginBottom: '10px',
              }}
            >
              Template
            </div>
            <div style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, color: '#f0f0f4', lineHeight: 1.25 }}>
              3 Desain siap pakai
            </div>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '16px',
            }}
          >
            {[
              {
                name: 'Modern Professional',
                tag: 'Paling populer',
                desc: 'Sidebar merah elegan dengan layout dua kolom. Cocok untuk industri korporat dan perbankan.',
                preview: (
                  <div style={{ width: '100%', height: '110px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', overflow: 'hidden' }}>
                    <div style={{ width: '32%', background: '#dc2626', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8px 4px', gap: '5px' }}>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)' }} />
                      <div style={{ width: '80%', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.4)' }} />
                      <div style={{ width: '60%', height: '2px', borderRadius: '2px', background: 'rgba(255,255,255,0.3)' }} />
                      <div style={{ width: '70%', height: '2px', borderRadius: '2px', background: 'rgba(255,255,255,0.3)' }} />
                      <div style={{ width: '65%', height: '2px', borderRadius: '2px', background: 'rgba(255,255,255,0.25)' }} />
                    </div>
                    <div style={{ flex: 1, padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ height: '7px', borderRadius: '3px', background: '#222', width: '65%' }} />
                      <div style={{ height: '4px', borderRadius: '2px', background: '#dc2626', width: '45%' }} />
                      <div style={{ height: '2px', background: '#ddd', width: '100%', marginTop: '2px' }} />
                      <div style={{ height: '3px', borderRadius: '2px', background: '#ccc', width: '90%' }} />
                      <div style={{ height: '3px', borderRadius: '2px', background: '#ccc', width: '75%' }} />
                      <div style={{ height: '3px', borderRadius: '2px', background: '#eee', width: '85%' }} />
                      <div style={{ height: '3px', borderRadius: '2px', background: '#eee', width: '70%' }} />
                    </div>
                  </div>
                ),
              },
              {
                name: 'Minimal Elegant',
                tag: 'Multifungsi',
                desc: 'Satu kolom bersih dengan garis aksen tipis. Cocok untuk semua jenis pekerjaan.',
                preview: (
                  <div style={{ width: '100%', height: '110px', background: '#fff', borderRadius: '8px', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2.5px solid #dc2626', paddingBottom: '8px', marginBottom: '4px' }}>
                      <div>
                        <div style={{ height: '7px', borderRadius: '3px', background: '#111', width: '90px', marginBottom: '4px' }} />
                        <div style={{ height: '4px', borderRadius: '2px', background: '#dc2626', width: '60px' }} />
                      </div>
                      <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#f0f0f0', border: '2px solid #dc2626', flexShrink: 0 }} />
                    </div>
                    <div style={{ height: '3px', borderRadius: '2px', background: '#ddd', width: '100%' }} />
                    <div style={{ height: '3px', borderRadius: '2px', background: '#ddd', width: '80%' }} />
                    <div style={{ height: '3px', borderRadius: '2px', background: '#eee', width: '95%' }} />
                    <div style={{ height: '3px', borderRadius: '2px', background: '#eee', width: '70%' }} />
                  </div>
                ),
              },
              {
                name: 'Creative Layout',
                tag: 'Tampil beda',
                desc: 'Header gelap dramatis dengan layout dua kolom. Cocok untuk desainer dan kreator.',
                preview: (
                  <div style={{ width: '100%', height: '110px', background: '#fff', borderRadius: '8px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: '36px', background: '#111827', display: 'flex', alignItems: 'center', gap: '8px', padding: '0 10px', flexShrink: 0 }}>
                      <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: '#dc2626', flexShrink: 0 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ height: '4px', borderRadius: '2px', background: '#fff', width: '55%', marginBottom: '3px' }} />
                        <div style={{ height: '3px', borderRadius: '2px', background: '#dc2626', width: '38%' }} />
                      </div>
                    </div>
                    <div style={{ flex: 1, display: 'flex' }}>
                      <div style={{ width: '58%', padding: '7px 8px', display: 'flex', flexDirection: 'column', gap: '3px', borderRight: '1px solid #eee' }}>
                        <div style={{ height: '3px', borderRadius: '2px', background: '#dc2626', width: '50%' }} />
                        <div style={{ height: '3px', borderRadius: '2px', background: '#ccc', width: '100%' }} />
                        <div style={{ height: '3px', borderRadius: '2px', background: '#ddd', width: '80%' }} />
                        <div style={{ height: '3px', borderRadius: '2px', background: '#ddd', width: '90%' }} />
                      </div>
                      <div style={{ flex: 1, padding: '7px 8px', background: '#fafafa', display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <div style={{ height: '3px', borderRadius: '2px', background: '#dc2626', width: '65%' }} />
                        <div style={{ height: '3px', borderRadius: '2px', background: '#ccc', width: '100%' }} />
                        <div style={{ height: '3px', borderRadius: '2px', background: '#ddd', width: '75%' }} />
                      </div>
                    </div>
                  </div>
                ),
              },
            ].map((tpl, i) => (
              <motion.div
                key={tpl.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                style={{
                  borderRadius: '16px',
                  padding: '16px',
                  background: '#13151e',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                {tpl.preview}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '5px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 700, color: '#e0e0e8' }}>{tpl.name}</span>
                    <span
                      style={{
                        fontSize: '10px', fontWeight: 600,
                        padding: '2px 7px', borderRadius: '999px',
                        background: 'rgba(220,38,38,0.12)',
                        color: '#ef4444',
                        border: '1px solid rgba(220,38,38,0.2)',
                      }}
                    >
                      {tpl.tag}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', lineHeight: 1.6, color: '#52525e' }}>{tpl.desc}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ textAlign: 'center', marginBottom: '36px' }}
          >
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#ef4444', marginBottom: '10px' }}>
              Testimoni
            </div>
            <div style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, color: '#f0f0f4', lineHeight: 1.25 }}>
              Apa kata mereka?
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
            {[
              {
                name: 'Rizky Aditya',
                role: 'Fresh Graduate · Teknik Informatika',
                avatar: 'RA',
                text: 'FadCV beneran ngebantu banget. Dalam 20 menit CV-ku udah jadi dan langsung bisa di-download. Templatenya clean banget!',
                stars: 5,
              },
              {
                name: 'Sari Wulandari',
                role: 'Marketing Executive',
                avatar: 'SW',
                text: 'Paling suka fitur preview langsung. Bisa lihat hasilnya real-time tanpa harus export dulu. Hemat waktu banget.',
                stars: 5,
              },
              {
                name: 'Dimas Pratama',
                role: 'UI/UX Designer',
                avatar: 'DP',
                text: 'Template Creative Layout-nya sesuai banget buat portfolio designer kayak aku. Desainnya modern dan profesional.',
                stars: 5,
              },
              {
                name: 'Aulia Fitri',
                role: 'Mahasiswa Semester Akhir',
                avatar: 'AF',
                text: 'Gak perlu login, gak perlu bayar. Data aman di browser sendiri. Ini yang aku cari-cari selama ini!',
                stars: 5,
              },
              {
                name: 'Bagas Nugroho',
                role: 'Software Engineer',
                avatar: 'BN',
                text: 'Fitur custom section-nya keren. Aku bisa tambah seksi Publikasi dan Open Source yang biasanya gak ada di template lain.',
                stars: 5,
              },
              {
                name: 'Mega Cahyani',
                role: 'HRD · 3 tahun pengalaman',
                avatar: 'MC',
                text: 'Sebagai HRD, CV dari FadCV selalu mudah dibaca dan layout-nya rapi. Kandidat yang pakai ini langsung keliatan profesional.',
                stars: 5,
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.4 }}
                style={{
                  borderRadius: '16px',
                  padding: '20px 22px',
                  background: '#13151e',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '14px',
                }}
              >
                {/* Stars */}
                <div style={{ display: 'flex', gap: '3px' }}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} size={13} fill="#f59e0b" color="#f59e0b" />
                  ))}
                </div>
                {/* Quote */}
                <div style={{ fontSize: '13px', lineHeight: 1.7, color: '#7a7a8a', flex: 1 }}>
                  "{t.text}"
                </div>
                {/* Author */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div
                    style={{
                      width: '36px', height: '36px', borderRadius: '50%',
                      background: 'linear-gradient(135deg, rgba(220,38,38,0.3), rgba(185,28,28,0.15))',
                      border: '1px solid rgba(220,38,38,0.25)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '11px', fontWeight: 700, color: '#ef4444',
                      flexShrink: 0,
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#e0e0e8' }}>{t.name}</div>
                    <div style={{ fontSize: '11px', color: '#44445a', marginTop: '1px' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '640px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ textAlign: 'center', marginBottom: '32px' }}
          >
            <div
              style={{
                display: 'inline-block',
                fontSize: '11px', fontWeight: 700, letterSpacing: '2px',
                textTransform: 'uppercase', color: '#ef4444',
                marginBottom: '10px',
              }}
            >
              FAQ
            </div>
            <div style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, color: '#f0f0f4', lineHeight: 1.25 }}>
              Pertanyaan yang sering ditanya
            </div>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              {
                q: 'Apakah FadCV benar-benar gratis?',
                a: 'Ya, 100% gratis. Tidak ada biaya tersembunyi, tidak perlu berlangganan, dan tidak ada fitur yang dikunci di balik paywall.',
              },
              {
                q: 'Apakah data CV saya aman?',
                a: 'Data kamu disimpan sepenuhnya di browser kamu menggunakan localStorage. Tidak ada data yang dikirim ke server kami. Kamu sepenuhnya mengontrol datamu.',
              },
              {
                q: 'Bisa dipakai di HP?',
                a: 'FadCV dioptimalkan untuk desktop karena editor CV membutuhkan ruang layar yang cukup. Untuk hasil terbaik, gunakan laptop atau PC.',
              },
              {
                q: 'Format apa yang bisa di-export?',
                a: 'Saat ini tersedia export ke PDF berkualitas tinggi (A4). Format lain seperti DOCX sedang dalam perencanaan.',
              },
              {
                q: 'Apakah CV saya tersimpan otomatis?',
                a: 'Ya! Setiap perubahan yang kamu buat akan tersimpan otomatis ke browser dalam hitungan detik. Data tidak hilang meski halaman di-refresh.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                style={{
                  borderRadius: '14px',
                  padding: '16px 20px',
                  background: '#13151e',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                  <CheckCircle2 size={16} color="#ef4444" style={{ marginTop: '2px', flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 700, color: '#e0e0e8', marginBottom: '5px' }}>
                      {item.q}
                    </div>
                    <div style={{ fontSize: '12px', lineHeight: 1.65, color: '#52525e' }}>
                      {item.a}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── About ── */}
      <section style={{ padding: '0 24px 80px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            style={{ textAlign: 'center', marginBottom: '40px' }}
          >
            <div style={{ display: 'inline-block', fontSize: '11px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: '#ef4444', marginBottom: '10px' }}>
              Tentang
            </div>
            <div style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', fontWeight: 800, color: '#f0f0f4', lineHeight: 1.25 }}>
              Apa itu FadCV?
            </div>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', alignItems: 'center' }}>
            {/* Left: description */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            >
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#7a7a8a' }}>
                <strong style={{ color: '#e0e0e8' }}>FadCV</strong> adalah aplikasi pembuat CV berbasis web yang dirancang untuk membantu siapa saja — dari fresh graduate hingga profesional berpengalaman — membuat CV yang memukau dengan cepat dan mudah.
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#7a7a8a' }}>
                Dibangun dengan filosofi <strong style={{ color: '#e0e0e8' }}>privasi utama</strong> — semua data CV kamu tersimpan sepenuhnya di browser, bukan di server kami. Tidak ada akun, tidak ada tracking, tidak ada biaya.
              </p>
              <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#7a7a8a' }}>
                Proyek ini dibuat dengan <span style={{ color: '#ef4444' }}>❤</span> sebagai solusi gratis dan open untuk semua pencari kerja di Indonesia.
              </p>
            </motion.div>

            {/* Right: stats cards */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}
            >
              {[
                { value: '3+', label: 'Template Premium', icon: Star },
                { value: '8+', label: 'Seksi CV', icon: ClipboardList },
                { value: '0', label: 'Data ke Server', icon: Shield },
                { value: '100%', label: 'Gratis Selamanya', icon: CheckCircle2 },
              ].map(({ value, label, icon: Icon }, i) => (
                <div
                  key={label}
                  style={{
                    borderRadius: '14px',
                    padding: '18px 16px',
                    background: '#13151e',
                    border: '1px solid rgba(255,255,255,0.06)',
                    textAlign: 'center',
                  }}
                >
                  <Icon size={18} color="#ef4444" style={{ marginBottom: '8px' }} />
                  <div className="gradient-text" style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1 }}>{value}</div>
                  <div style={{ fontSize: '11px', color: '#4a4a5a', marginTop: '5px', lineHeight: 1.4 }}>{label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── CTA strip ── */}
      <section style={{ padding: '0 24px 72px' }}>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          style={{
            maxWidth: '600px',
            margin: '0 auto',
            textAlign: 'center',
            borderRadius: '24px',
            padding: '40px 32px',
            background: 'linear-gradient(135deg, rgba(220,38,38,0.08), rgba(185,28,28,0.05))',
            border: '1px solid rgba(220,38,38,0.14)',
          }}
        >
          <div style={{ fontSize: '20px', fontWeight: 800, color: '#f0f0f4', marginBottom: '8px' }}>
            Siap buat CV yang memukau?
          </div>
          <div style={{ fontSize: '13px', color: '#5a5a6a', marginBottom: '24px' }}>
            Gratis selamanya. Tidak perlu akun. Langsung jadi.
          </div>
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '7px',
              padding: '12px 26px', borderRadius: '12px',
              fontSize: '14px', fontWeight: 700,
              background: 'linear-gradient(135deg,#ef4444,#b91c1c)',
              color: 'white',
              boxShadow: '0 4px 20px rgba(220,38,38,0.3)',
              border: 'none', cursor: 'pointer',
            }}
          >
            Buka CV Builder <ArrowRight size={14} />
          </motion.button>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer
        style={{
          textAlign: 'center',
          padding: '20px 24px',
          borderTop: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <div style={{ fontSize: '12px', color: '#2e2e3a' }}>
          <span className="gradient-text" style={{ fontWeight: 700 }}>FadCV</span>
          {' '}— 100% Client-side · Data kamu tidak dikirim ke mana pun
        </div>
      </footer>
    </div>
  );
}

/* ─── Sidebar tab content (must be top-level, not nested inside HomePage) ─── */
interface SidebarContentProps {
  tab: TabId;
  cvData: CVData;
  handleChange: (data: CVData) => void;
}
function SidebarContent({ tab, cvData, handleChange }: SidebarContentProps) {
  return (
    <AnimatePresence mode="wait">
      {tab === 'template' && (
        <motion.div key="template" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
          <TemplateSelector
            selected={cvData.settings.template}
            onSelect={(template) => handleChange({ ...cvData, settings: { ...cvData.settings, template } })}
            accentColor={cvData.settings.accentColor}
          />
          <CVSettingsPanel
            settings={cvData.settings}
            onChange={(settings) => handleChange({ ...cvData, settings })}
          />
        </motion.div>
      )}
      {tab === 'content' && (
        <motion.div key="content" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
          <CVForm data={cvData} onChange={handleChange} />
        </motion.div>
      )}
      {tab === 'layout' && (
        <motion.div key="layout" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.15 }}>
          <SectionOrderManager
            sections={cvData.sectionOrder}
            onChange={(sectionOrder) => handleChange({ ...cvData, sectionOrder })}
          />

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0 16px' }} />

          {/* Custom sections */}
          <div style={{ marginBottom: '4px' }}>
            <p style={{ fontSize: '11px', fontWeight: 700, color: '#a0a0b0', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>
              Seksi Kustom
            </p>
            <CustomSectionsManager
              sections={cvData.customSections}
              onChange={(customSections) => handleChange({ ...cvData, customSections })}
            />
          </div>

          {/* Divider */}
          <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '16px 0 12px' }} />

          <button
            onClick={() => { if (confirm('Reset semua data CV?')) { clearCV(); window.location.reload(); } }}
            style={{
              width: '100%', fontSize: '12px',
              padding: '11px', borderRadius: '10px', fontWeight: 600, cursor: 'pointer',
              color: '#ef4444', background: 'rgba(220,38,38,0.07)',
              border: '1px solid rgba(220,38,38,0.15)',
            }}
          >
            Reset Semua Data
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Main page ───────────────────────────────────────────── */
export default function HomePage() {
  const [view, setView] = useState<'landing' | 'builder'>('landing');
  const [cvData, setCvData] = useState<CVData | null>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<TabId>('content');
  const [mobileTab, setMobileTab] = useState<TabId | 'preview'>('content');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | null>(null);
  const saveTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setCvData(loadCV());
    const existing = loadCV();
    if (existing?.personalInfo?.fullName) setView('builder');
  }, []);

  const handleChange = useCallback((data: CVData) => {
    setCvData(data);
    setSaveStatus('saving');
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      saveCV(data);
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus(null), 2000);
    }, 600);
  }, []);

  const handleExport = async () => {
    if (isExporting || !cvData) return;
    setIsExporting(true);
    try {
      await exportToPDF(
        'cv-preview',
        cvData.personalInfo.fullName ? `CV - ${cvData.personalInfo.fullName}` : 'CV-FadCV',
      );
    } catch (e) {
      console.error('Export failed:', e);
    } finally {
      setIsExporting(false);
    }
  };

  if (!cvData) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f1117' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg,#ef4444,#b91c1c)' }}>
            <FileText size={20} color="white" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '160px' }}>
            <div className="skeleton" style={{ height: '12px', width: '100%' }} />
            <div className="skeleton" style={{ height: '10px', width: '80%' }} />
            <div className="skeleton" style={{ height: '10px', width: '100%' }} />
          </div>
        </div>
      </div>
    );
  }

  if (view === 'landing') {
    return (
      <AnimatePresence mode="wait">
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
          <LandingPage onStart={() => setView('builder')} />
        </motion.div>
      </AnimatePresence>
    );
  }

  const progress = calculateProgress(cvData);

  const MOBILE_TABS = [
    { id: 'template' as const, label: 'Template', icon: LayoutGrid },
    { id: 'content' as const, label: 'Isi CV', icon: PenLine },
    { id: 'layout' as const, label: 'Layout', icon: Layers2 },
    { id: 'preview' as const, label: 'Preview', icon: Eye },
  ];

  return (
    <motion.div
      key="builder"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      style={{ height: '100dvh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#0f1117', fontFamily: 'Poppins, sans-serif' }}
    >
      {/* ════ HEADER ════ */}
      <header
        style={{
          flexShrink: 0,
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 12px',
          gap: '12px',
          background: '#13151e',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          zIndex: 100,
          margin: '8px 10px 0',
          borderRadius: '14px',
          border: '1px solid rgba(255,255,255,0.07)',
        }}
      >
        {/* Back button */}
        <motion.button
          onClick={() => setView('landing')}
          whileHover={{ x: -2 }}
          whileTap={{ scale: 0.95 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.09)',
            cursor: 'pointer', padding: '6px 12px', borderRadius: '8px',
            flexShrink: 0, color: '#a0a0b0', fontSize: '12px', fontWeight: 600,
          }}
        >
          <ArrowLeft size={14} />
          <span className="hidden-mobile">Beranda</span>
        </motion.button>

        {/* Divider — hidden on mobile */}
        <div className="hidden-mobile" style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.08)', flexShrink: 0 }} />

        {/* Progress — desktop only */}
        <div style={{ flex: 1, maxWidth: '180px', display: 'flex', alignItems: 'center', gap: '8px' }} className="hidden-mobile">
          <div style={{ flex: 1, height: '4px', borderRadius: '4px', background: 'rgba(255,255,255,0.07)', overflow: 'hidden' }}>
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
              style={{
                height: '100%', borderRadius: '4px',
                background: progress < 30 ? '#ef4444' : progress < 60 ? '#f97316' : progress < 90 ? '#eab308' : '#22c55e',
              }}
            />
          </div>
          <span style={{ fontSize: '11px', fontWeight: 700, color: '#606070', flexShrink: 0 }}>{progress}%</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Save status */}
        <AnimatePresence mode="wait">
          {saveStatus === 'saving' && (
            <motion.span key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ fontSize: '11px', color: '#f97316', display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0 }}
            >
              <RefreshCw size={11} style={{ animation: 'spin 1s linear infinite' }} /> Menyimpan...
            </motion.span>
          )}
          {saveStatus === 'saved' && (
            <motion.span key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ fontSize: '11px', color: '#22c55e', flexShrink: 0 }}
            >
              ✓ Tersimpan
            </motion.span>
          )}
        </AnimatePresence>

        {/* Export button */}
        <motion.button
          onClick={handleExport}
          disabled={isExporting}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            padding: '8px 16px', borderRadius: '8px',
            fontSize: '13px', fontWeight: 700,
            background: 'linear-gradient(135deg,#ef4444,#b91c1c)',
            color: 'white',
            boxShadow: '0 2px 10px rgba(220,38,38,0.3)',
            border: 'none', cursor: 'pointer', flexShrink: 0,
            opacity: isExporting ? 0.6 : 1,
          }}
        >
          <Download size={14} />
          <span className="hidden-mobile">{isExporting ? 'Exporting...' : 'Export PDF'}</span>
          <span className="show-mobile">{isExporting ? '...' : 'PDF'}</span>
        </motion.button>
      </header>

      {/* ════ DESKTOP BODY (hidden on mobile) ════ */}
      <div className="desktop-body" style={{ flex: 1, overflow: 'hidden' }}>
        {/* Left panel */}
        <div style={{ width: '340px', flexShrink: 0, display: 'flex', flexDirection: 'column', background: '#11131c', borderRight: '1px solid rgba(255,255,255,0.05)' }}>
          {/* Desktop tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px',
                    padding: '10px 4px', fontSize: '11px', fontWeight: 600,
                    color: active ? '#ef4444' : '#4a4a5a',
                    background: active ? 'rgba(220,38,38,0.05)' : 'transparent',
                    border: 'none', cursor: 'pointer', position: 'relative',
                    borderBottom: active ? '2px solid #ef4444' : '2px solid transparent',
                    transition: 'all 0.15s',
                  }}
                >
                  <Icon size={12} />
                  {tab.label}
                </button>
              );
            })}
          </div>
          {/* Desktop scroll content */}
          <div style={{ flex: 1, overflowY: 'auto', padding: '20px 16px' }}>
            <SidebarContent tab={activeTab} cvData={cvData} handleChange={handleChange} />
          </div>
        </div>

        {/* Right: Preview */}
        <div style={{ flex: 1, overflow: 'hidden', background: '#0c0d14' }}>
          <CVPreview data={cvData} isExporting={isExporting} />
        </div>
      </div>

      {/* ════ MOBILE BODY (hidden on desktop) ════ */}
      <div className="mobile-body" style={{ flex: 1, flexDirection: 'column', overflow: 'hidden' }}>

        {/* Mobile progress strip */}
        <div style={{ flexShrink: 0, padding: '8px 16px 6px', background: '#13151e', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span style={{ fontSize: '11px', color: '#505060', fontWeight: 600, minWidth: '60px' }}>
            {mobileTab === 'template' ? 'Template' : mobileTab === 'content' ? 'Isi CV' : mobileTab === 'layout' ? 'Urutan' : 'Preview'}
          </span>
          <div style={{ flex: 1, height: '3px', borderRadius: '3px', background: 'rgba(255,255,255,0.06)', overflow: 'hidden' }}>
            <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }}
              style={{ height: '100%', borderRadius: '3px', background: progress < 30 ? '#ef4444' : progress < 60 ? '#f97316' : progress < 90 ? '#eab308' : '#22c55e' }}
            />
          </div>
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#606070', flexShrink: 0 }}>{progress}%</span>
        </div>

        {/* Mobile content area */}
        <div style={{ flex: 1, overflowY: 'auto', overflowX: mobileTab === 'preview' ? 'auto' : 'hidden' }}>
          {mobileTab === 'preview' ? (
            <div style={{ height: '100%', minHeight: '400px', background: '#0c0d14', position: 'relative' }}>
              <CVPreview data={cvData} isExporting={isExporting} />
            </div>
          ) : (
            <div style={{ padding: '20px 16px 88px' }}>
              <SidebarContent tab={mobileTab as TabId} cvData={cvData} handleChange={handleChange} />
            </div>
          )}
        </div>

        {/* Mobile bottom nav */}
        <div
          style={{
            flexShrink: 0, display: 'flex',
            background: '#13151e',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: 'env(safe-area-inset-bottom, 0px)',
            zIndex: 50,
            position: 'relative',
          }}
        >
          {MOBILE_TABS.map((tab) => {
            const Icon = tab.icon;
            const active = mobileTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setMobileTab(tab.id)}
                style={{
                  flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                  gap: '4px', padding: '10px 4px 10px',
                  fontSize: '10px', fontWeight: 700,
                  color: active ? '#ef4444' : '#404050',
                  background: active ? 'rgba(220,38,38,0.06)' : 'none',
                  border: 'none', cursor: 'pointer',
                  borderTop: active ? '2px solid #ef4444' : '2px solid transparent',
                  transition: 'all 0.15s',
                  letterSpacing: '0.2px',
                }}
              >
                <Icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

