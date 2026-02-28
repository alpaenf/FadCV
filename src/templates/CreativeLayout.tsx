import type { CVData } from '@/types/cv';
import { formatDate } from '@/templates/templateUtils';

interface Props { data: CVData; }

export default function CreativeLayout({ data }: Props) {
  const { personalInfo: p, settings } = data;
  const accent = settings.accentColor || '#dc2626';
  const fontBase = settings.fontSize === 'sm' ? 11 : settings.fontSize === 'lg' ? 13 : 12;
  const s = (n: number) => `${n * fontBase / 12}px`;
  const visibleSections = data.sectionOrder.filter((s) => s.visible);

  const leftSections = ['summary', 'experience', 'organization', 'project'];
  const rightSections = ['education', 'skill', 'certificate'];

  const secTitle = (label: string) => (
    <div style={{
      fontSize: s(10.5),
      fontWeight: 800,
      textTransform: 'uppercase',
      letterSpacing: '2px',
      color: accent,
      marginBottom: '10px',
      marginTop: '18px',
      paddingBottom: '5px',
      borderBottom: `1px solid ${accent}40`,
    }}>
      {label}
    </div>
  );

  const renderSection = (secId: string, col: 'left' | 'right') => {
    switch (secId) {
      case 'summary':
        if (!data.summary.text || col !== 'left') return null;
        return (
          <div key="summary">
            {secTitle('Profil')}
            <p style={{ fontSize: s(10.5), lineHeight: 1.75, color: '#374151' }}>{data.summary.text}</p>
          </div>
        );

      case 'experience':
        if (!data.experience.length || col !== 'left') return null;
        return (
          <div key="experience">
            {secTitle('Pengalaman')}
            {data.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: s(12), fontWeight: 700, color: '#111827' }}>{exp.position}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '4px' }}>
                  <div style={{ fontSize: s(10.5), color: accent, fontWeight: 600 }}>{exp.company}</div>
                  <div style={{ fontSize: s(10), color: '#9ca3af' }}>{formatDate(exp.startDate)} – {exp.current ? 'Sekarang' : formatDate(exp.endDate)}</div>
                </div>
                {exp.description && <p style={{ fontSize: s(10.5), color: '#6b7280', marginTop: '4px', lineHeight: 1.65 }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'organization':
        if (!data.organization.length || col !== 'left') return null;
        return (
          <div key="organization">
            {secTitle('Organisasi')}
            {data.organization.map((org) => (
              <div key={org.id} style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: s(11.5), fontWeight: 700, color: '#111827' }}>{org.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  {org.role && <div style={{ fontSize: s(10.5), color: accent }}>{org.role}</div>}
                  <div style={{ fontSize: s(10), color: '#9ca3af' }}>{formatDate(org.startDate)} – {org.current ? 'Sekarang' : formatDate(org.endDate)}</div>
                </div>
                {org.description && <p style={{ fontSize: s(10.5), color: '#6b7280', marginTop: '4px', lineHeight: 1.65 }}>{org.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'project':
        if (!data.project.length || col !== 'left') return null;
        return (
          <div key="project">
            {secTitle('Proyek')}
            {data.project.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: s(11.5), fontWeight: 700, color: '#111827' }}>{proj.name}</div>
                {proj.role && <div style={{ fontSize: s(10.5), color: accent }}>{proj.role}</div>}
                {proj.technologies && (
                  <div style={{ fontSize: s(10), color: '#9ca3af', fontStyle: 'italic', marginBottom: '2px' }}>{proj.technologies}</div>
                )}
                {proj.description && <p style={{ fontSize: s(10.5), color: '#6b7280', lineHeight: 1.65 }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'education':
        if (!data.education.length || col !== 'right') return null;
        return (
          <div key="education">
            {secTitle('Pendidikan')}
            {data.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: s(11.5), fontWeight: 700, color: '#111827' }}>{edu.institution}</div>
                <div style={{ fontSize: s(10.5), color: accent, fontWeight: 600 }}>{edu.degree}{edu.field ? ` · ${edu.field}` : ''}</div>
                <div style={{ fontSize: s(10), color: '#9ca3af' }}>
                  {formatDate(edu.startDate)} – {edu.current ? 'Sekarang' : formatDate(edu.endDate)}
                  {edu.gpa ? ` · IPK ${edu.gpa}` : ''}
                </div>
              </div>
            ))}
          </div>
        );

      case 'skill':
        if (!data.skill.length || col !== 'right') return null;
        const grouped: Record<string, typeof data.skill> = {};
        data.skill.forEach((sk) => {
          if (!grouped[sk.category]) grouped[sk.category] = [];
          grouped[sk.category].push(sk);
        });
        return (
          <div key="skill">
            {secTitle('Keterampilan')}
            {Object.entries(grouped).map(([cat, skills]) => (
              <div key={cat} style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: s(9.5), fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>{cat}</div>
                {skills.map((sk) => (
                  <div key={sk.id} style={{ marginBottom: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                      <span style={{ fontSize: s(10.5), color: '#374151', fontWeight: 600 }}>{sk.name}</span>
                    </div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[1,2,3,4,5].map((l) => (
                        <div key={l} style={{ flex: 1, height: '5px', borderRadius: '3px', background: l <= sk.level ? accent : '#e5e7eb' }} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );

      case 'certificate':
        if (!data.certificate.length || col !== 'right') return null;
        return (
          <div key="certificate">
            {secTitle('Sertifikat')}
            {data.certificate.map((cert) => (
              <div key={cert.id} style={{ marginBottom: '8px', padding: '6px 8px', background: '#f9fafb', borderRadius: '4px', borderLeft: `3px solid ${accent}` }}>
                <div style={{ fontSize: s(11), fontWeight: 700, color: '#111827' }}>{cert.name}</div>
                <div style={{ fontSize: s(10), color: '#6b7280' }}>{cert.issuer}{cert.date ? ` · ${formatDate(cert.date)}` : ''}</div>
              </div>
            ))}
          </div>
        );

      default:
        const cs = data.customSections.find((c) => c.id === secId);
        if (!cs?.items.length) return null;
        return (
          <div key={secId}>
            {secTitle(cs.title)}
            {cs.items.map((item) => (
              <div key={item.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div style={{ fontSize: s(11.5), fontWeight: 700, color: '#111827' }}>{item.title}</div>
                  {item.date && <div style={{ fontSize: s(10), color: '#9ca3af' }}>{item.date}</div>}
                </div>
                {item.subtitle && <div style={{ fontSize: s(10.5), color: accent }}>{item.subtitle}</div>}
                {item.description && <p style={{ fontSize: s(10.5), color: '#6b7280', marginTop: '4px', lineHeight: 1.65 }}>{item.description}</p>}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div id="cv-preview" style={{ width: '794px', minHeight: '1123px', background: '#ffffff', fontFamily: "'Calibri', 'Arial', sans-serif", color: '#1a1a2e' }}>
      {/* Header */}
      <div style={{ background: '#111827', padding: '32px 40px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', top: 0, right: 0, width: '200px', height: '200px',
          background: accent, borderRadius: '0 0 0 200px', opacity: 0.1,
        }} />
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '24px' }}>
          {p.photo ? (
            <img src={p.photo} alt="Profile" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${accent}`, flexShrink: 0 }} />
          ) : (
            <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <span style={{ fontSize: '32px', fontWeight: 800, color: 'white' }}>
                {p.fullName ? p.fullName.charAt(0).toUpperCase() : '?'}
              </span>
            </div>
          )}
          <div>
            <div style={{ fontSize: s(26), fontWeight: 800, color: 'white', lineHeight: 1.1 }}>{p.fullName || 'Nama Anda'}</div>
            <div style={{ fontSize: s(13), color: accent, fontWeight: 600, letterSpacing: '0.5px', marginTop: '4px' }}>{p.jobTitle || 'Jabatan Anda'}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '10px', fontSize: s(10), color: '#9ca3af' }}>
              {p.email && <span>✉ {p.email}</span>}
              {p.phone && <span>☎ {p.phone}</span>}
              {p.location && <span>⌖ {p.location}</span>}
              {p.linkedin && <span>in {p.linkedin}</span>}
              {p.github && <span>⌘ {p.github}</span>}
            </div>
          </div>
        </div>
      </div>

      {/* Two-column body */}
      <div style={{ display: 'flex', gap: '0', padding: '0' }}>
        {/* Left 60% */}
        <div style={{ width: '60%', padding: '24px 28px', borderRight: '1px solid #f0f0f0' }}>
          {visibleSections.filter((s) => leftSections.includes(s.id)).map((s) => renderSection(s.id, 'left'))}
          {data.customSections
            .filter((cs) => !visibleSections.find((v) => v.id === cs.id) && !rightSections.includes(cs.id))
            .map((cs) => renderSection(cs.id, 'left'))}
        </div>

        {/* Right 40% */}
        <div style={{ width: '40%', padding: '24px 24px', background: '#fafafa' }}>
          {visibleSections.filter((s) => rightSections.includes(s.id)).map((s) => renderSection(s.id, 'right'))}
        </div>
      </div>
    </div>
  );
}
