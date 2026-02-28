'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User, FileText, GraduationCap, Briefcase, Building2,
  FolderOpen, Award, Wrench, LayoutGrid, ChevronDown, ChevronUp
} from 'lucide-react';
import type { CVData } from '@/types/cv';
import PersonalInfoSection from './form/PersonalInfoSection';
import EducationSection from './form/EducationSection';
import ExperienceSection from './form/ExperienceSection';
import OrganizationSection from './form/OrganizationSection';
import ProjectSection from './form/ProjectSection';
import CertificateSection from './form/CertificateSection';
import SkillsSection from './form/SkillsSection';
import CustomSectionsManager from './form/CustomSectionsManager';

interface Props {
  data: CVData;
  onChange: (data: CVData) => void;
}

const sections = [
  { id: 'personal', label: 'Informasi Pribadi', icon: User, required: true },
  { id: 'summary', label: 'Ringkasan Profil', icon: FileText },
  { id: 'experience', label: 'Pengalaman Kerja', icon: Briefcase },
  { id: 'education', label: 'Pendidikan', icon: GraduationCap },
  { id: 'skill', label: 'Keterampilan', icon: Wrench },
  { id: 'organization', label: 'Organisasi', icon: Building2 },
  { id: 'project', label: 'Proyek', icon: FolderOpen },
  { id: 'certificate', label: 'Sertifikat', icon: Award },
  { id: 'custom', label: 'Seksi Kustom', icon: LayoutGrid },
];

export default function CVForm({ data, onChange }: Props) {
  const [activeSection, setActiveSection] = useState<string>('personal');

  const toggle = (id: string) => setActiveSection(activeSection === id ? '' : id);

  const sectionCount: Record<string, number> = {
    experience: data.experience.length,
    education: data.education.length,
    skill: data.skill.length,
    organization: data.organization.length,
    project: data.project.length,
    certificate: data.certificate.length,
    custom: data.customSections.length,
  };

  return (
    <div className="space-y-3">
      {sections.map(({ id, label, icon: Icon, required }) => (
        <motion.div
          key={id}
          layout
          className="rounded-2xl overflow-hidden"
          style={{
            background: '#161922',
            border: activeSection === id
              ? '1px solid rgba(220, 38, 38, 0.3)'
              : '1px solid rgba(255,255,255,0.05)',
            boxShadow: activeSection === id ? '0 4px 24px rgba(220, 38, 38, 0.08)' : 'none',
          }}
        >
          {/* Section Header */}
          <motion.button
            onClick={() => toggle(id)}
            className="w-full flex items-center justify-between px-4 py-4 text-left"
            whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{
                  background: activeSection === id
                    ? 'linear-gradient(135deg, rgba(239,68,68,0.25), rgba(185,28,28,0.15))'
                    : 'rgba(255,255,255,0.05)',
                  border: activeSection === id ? '1px solid rgba(220, 38, 38, 0.3)' : '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <Icon size={15} color={activeSection === id ? '#ef4444' : '#606070'} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-sm font-semibold"
                    style={{ color: activeSection === id ? '#f8f8f8' : '#a0a0b0' }}
                  >
                    {label}
                  </span>
                  {required && (
                    <span className="text-xs" style={{ color: '#dc2626' }}>*</span>
                  )}
                </div>
                {sectionCount[id] !== undefined && sectionCount[id] > 0 && (
                  <span className="text-xs" style={{ color: '#ef4444' }}>
                    {sectionCount[id]} item
                  </span>
                )}
              </div>
            </div>
            <motion.div animate={{ rotate: activeSection === id ? 180 : 0 }} transition={{ duration: 0.2 }}>
              <ChevronDown size={16} color={activeSection === id ? '#ef4444' : '#606070'} />
            </motion.div>
          </motion.button>

          {/* Section Content */}
          <AnimatePresence>
            {activeSection === id && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div
                  className="px-4 pb-6 border-t"
                  style={{ borderColor: 'rgba(220, 38, 38, 0.1)', paddingTop: '20px' }}
                >
                  {id === 'personal' && (
                    <PersonalInfoSection
                      data={data.personalInfo}
                      onChange={(personalInfo) => onChange({ ...data, personalInfo })}
                    />
                  )}
                  {id === 'summary' && (
                    <div>
                      <label className="block text-xs font-semibold mb-2" style={{ color: '#a0a0b0' }}>
                        Ringkasan Profil Singkat
                      </label>
                      <textarea
                        className="w-full px-4 py-3 rounded-xl text-sm font-medium input-glow transition-all duration-200"
                        style={{
                          background: 'rgba(255,255,255,0.05)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: '#f8f8f8',
                          resize: 'vertical',
                          minHeight: '100px',
                        }}
                        placeholder="Tuliskan ringkasan singkat tentang diri Anda, pengalaman, dan tujuan karir dalam 3-4 kalimat..."
                        value={data.summary.text}
                        onChange={(e) => onChange({ ...data, summary: { text: e.target.value } })}
                      />
                      <div className="text-xs mt-1.5 text-right" style={{ color: '#606070' }}>
                        {data.summary.text.length} karakter
                      </div>
                    </div>
                  )}
                  {id === 'education' && (
                    <EducationSection
                      items={data.education}
                      onChange={(education) => onChange({ ...data, education })}
                    />
                  )}
                  {id === 'experience' && (
                    <ExperienceSection
                      items={data.experience}
                      onChange={(experience) => onChange({ ...data, experience })}
                    />
                  )}
                  {id === 'organization' && (
                    <OrganizationSection
                      items={data.organization}
                      onChange={(organization) => onChange({ ...data, organization })}
                    />
                  )}
                  {id === 'project' && (
                    <ProjectSection
                      items={data.project}
                      onChange={(project) => onChange({ ...data, project })}
                    />
                  )}
                  {id === 'certificate' && (
                    <CertificateSection
                      items={data.certificate}
                      onChange={(certificate) => onChange({ ...data, certificate })}
                    />
                  )}
                  {id === 'skill' && (
                    <SkillsSection
                      items={data.skill}
                      onChange={(skill) => onChange({ ...data, skill })}
                    />
                  )}
                  {id === 'custom' && (
                    <CustomSectionsManager
                      sections={data.customSections}
                      onChange={(customSections) => onChange({ ...data, customSections })}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
}
