'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Camera, X } from 'lucide-react';
import type { PersonalInfo } from '@/types/cv';

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const inputClass = `w-full px-3.5 py-3 rounded-xl text-sm font-medium input-glow transition-all duration-200`;
const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#f8f8f8',
};
const labelClass = "block text-xs font-semibold mb-2";
const labelStyle = { color: '#a0a0b0' };

export default function PersonalInfoSection({ data, onChange }: Props) {
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleField = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handlePhoto = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const size = Math.min(img.width, img.height);
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d')!;
        const sx = (img.width - size) / 2;
        const sy = (img.height - size) / 2;
        ctx.drawImage(img, sx, sy, size, size, 0, 0, 200, 200);
        onChange({ ...data, photo: canvas.toDataURL('image/jpeg', 0.85) });
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-5">
      {/* Photo + name/title */}
      <div className="flex items-start gap-4">
        <div className="flex flex-col items-center gap-2">
          <motion.div
            className="w-20 h-20 rounded-2xl overflow-hidden flex items-center justify-center relative cursor-pointer"
            style={{
              background: dragging ? 'rgba(220,38,38,0.15)' : 'rgba(255,255,255,0.05)',
              border: `2px dashed ${dragging ? '#ef4444' : 'rgba(255,255,255,0.15)'}`,
            }}
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const file = e.dataTransfer.files[0];
              if (file) handlePhoto(file);
            }}
            onClick={() => fileRef.current?.click()}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {data.photo ? (
              <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <div className="flex flex-col items-center gap-1" style={{ color: '#606070' }}>
                <Camera size={20} />
                <span className="text-xs">Foto</span>
              </div>
            )}
          </motion.div>
          {data.photo && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => onChange({ ...data, photo: '' })}
              className="flex items-center gap-1 text-xs"
              style={{ color: '#ef4444' }}
            >
              <X size={10} /> Hapus
            </motion.button>
          )}
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handlePhoto(file);
            }}
          />
        </div>

        <div className="flex-1 grid grid-cols-1 gap-4">
          <div>
            <label className={labelClass} style={labelStyle}>Nama Lengkap *</label>
            <input
              className={inputClass}
              style={inputStyle}
              placeholder="John Doe"
              value={data.fullName}
              onChange={(e) => handleField('fullName', e.target.value)}
            />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Posisi / Jabatan *</label>
            <input
              className={inputClass}
              style={inputStyle}
              placeholder="Software Engineer"
              value={data.jobTitle}
              onChange={(e) => handleField('jobTitle', e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Contact fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {([
          { key: 'email', label: 'Email *', placeholder: 'john@example.com' },
          { key: 'phone', label: 'No. Telepon *', placeholder: '+62 812 3456 7890' },
          { key: 'location', label: 'Lokasi', placeholder: 'Jakarta, Indonesia' },
          { key: 'website', label: 'Website/Portfolio', placeholder: 'https://johndoe.dev' },
          { key: 'linkedin', label: 'LinkedIn', placeholder: 'linkedin.com/in/johndoe' },
          { key: 'github', label: 'GitHub', placeholder: 'github.com/johndoe' },
        ] as { key: keyof PersonalInfo; label: string; placeholder: string }[]).map(({ key, label, placeholder }) => (
          <div key={key}>
            <label className={labelClass} style={labelStyle}>{label}</label>
            <input
              className={inputClass}
              style={inputStyle}
              placeholder={placeholder}
              value={(data[key] as string) || ''}
              onChange={(e) => handleField(key, e.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
