import type { CVData } from '@/types/cv';
import { formatDate } from '@/templates/templateUtils';

interface Props { data: CVData; }

export default function MinimalElegant({ data }: Props) {
  const { personalInfo: p, settings } = data;
  const accent = settings.accentColor || '#dc2626';
  const fontBase = settings.fontSize === 'sm' ? 11 : settings.fontSize === 'lg' ? 13 : 12;
  const s = (n: number) => `${n * fontBase / 12}px`;
  const visibleSections = data.sectionOrder.filter((s) => s.visible);

  const secTitle: React.CSSProperties = {
    fontSize: s(12),
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    color: '#1a1a2e',
    marginBottom: '12px',
    marginTop: '22px',
    paddingBottom: '6px',
    borderBottom: `2px solid ${accent}`,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  };

  const renderSection = (secId: string) => {
    switch (secId) {
      case 'summary':
        if (!data.summary.text) return null;
        return (
          <div key="summary">
            <div style={secTitle}><span style={{ width: '14px', height: '2px', background: accent, display: 'inline-block' }}></span>Profil</div>
            <p style={{ fontSize: s(11), lineHeight: 1.75, color: '#444', borderLeft: `3px solid ${accent}`, paddingLeft: '12px' }}>
              {data.summary.text}
            </p>
          </div>
        );

      case 'experience':
        if (!data.experience.length) return null;
        return (
          <div key="experience">
            <div style={secTitle}><span style={{ width: '14px', height: '2px', background: accent, display: 'inline-block' }}></span>Pengalaman Kerja</div>
            {data.experience.map((exp, idx) => (
              <div key={exp.id} style={{ marginBottom: '16px', paddingBottom: '14px', borderBottom: idx < data.experience.length - 1 ? '1px solid #f0f0f0' : 'none' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2px' }}>
                  <div style={{ fontSize: s(12.5), fontWeight: 700, color: '#1a1a2e' }}>{exp.position}</div>
                  <div style={{ fontSize: s(10), color: '#888', whiteSpace: 'nowrap', flexShrink: 0, marginLeft: '8px' }}>
                    {formatDate(exp.startDate)} – {exp.current ? 'Sekarang' : formatDate(exp.endDate)}
                  </div>
                </div>
                <div style={{ fontSize: s(11), fontWeight: 600, color: accent, marginBottom: '2px' }}>
                  {exp.company}{exp.location ? ` · ${exp.location}` : ''}
                </div>
                {exp.description && <p style={{ fontSize: s(10.5), color: '#555', lineHeight: 1.65, marginTop: '4px' }}>{exp.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'education':
        if (!data.education.length) return null;
        return (
          <div key="education">
            <div style={secTitle}><span style={{ width: '14px', height: '2px', background: accent, display: 'inline-block' }}></span>Pendidikan</div>
            {data.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <div style={{ fontSize: s(12), fontWeight: 700, color: '#1a1a2e' }}>{edu.institution}</div>
                    <div style={{ fontSize: s(11), color: accent, fontWeight: 600 }}>{edu.degree}{edu.field ? ` · ${edu.field}` : ''}</div>
                    {edu.gpa && <div style={{ fontSize: s(10), color: '#888' }}>IPK: {edu.gpa}</div>}
                  </div>
                  <div style={{ fontSize: s(10), color: '#888', flexShrink: 0, marginLeft: '8px' }}>
                    {formatDate(edu.startDate)} – {edu.current ? 'Sekarang' : formatDate(edu.endDate)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'skill':
        if (!data.skill.length) return null;
        const grouped: Record<string, typeof data.skill> = {};
        data.skill.forEach((sk) => {
          if (!grouped[sk.category]) grouped[sk.category] = [];
          grouped[sk.category].push(sk);
        });
        return (
          <div key="skill">
            <div style={secTitle}><span style={{ width: '14px', height: '2px', background: accent, display: 'inline-block' }}></span>Keterampilan</div>
            {Object.entries(grouped).map(([cat, skills]) => (
              <div key={cat} style={{ marginBottom: '10px' }}>
                <div style={{ fontSize: s(10), fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>{cat}</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {skills.map((sk) => (
                    <div
                      key={sk.id}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: s(10.5),
                        fontWeight: 600,
                        background: `${accent}14`,
                        color: accent,
                        border: `1px solid ${accent}30`,
                      }}
                    >
                      {sk.name}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        );

      case 'organization':
        if (!data.organization.length) return null;
        return (
          <div key="organization">
            <div style={secTitle}><span style={{ width: '14px', height: '2px', background: accent, display: 'inline-block' }}></span>Organisasi</div>
            {data.organization.map((org) => (
              <div key={org.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: s(11.5), fontWeight: 700, color: '#1a1a2e' }}>{org.name}</div>
                    {org.role && <div style={{ fontSize: s(10.5), color: accent }}>{org.role}</div>}
                  </div>
                  <div style={{ fontSize: s(10), color: '#888', flexShrink: 0 }}>
                    {formatDate(org.startDate)} – {org.current ? 'Sekarang' : formatDate(org.endDate)}
                  </div>
                </div>
                {org.description && <p style={{ fontSize: s(10.5), color: '#555', marginTop: '4px', lineHeight: 1.65 }}>{org.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'project':
        if (!data.project.length) return null;
        return (
          <div key="project">
            <div style={secTitle}><span style={{ width: '14px', height: '2px', background: accent, display: 'inline-block' }}></span>Proyek</div>
            {data.project.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: s(11.5), fontWeight: 700, color: '#1a1a2e' }}>{proj.name}</div>
                    {proj.role && <div style={{ fontSize: s(10.5), color: accent }}>{proj.role}</div>}
                    {proj.technologies && <div style={{ fontSize: s(10), color: '#888', fontStyle: 'italic' }}>{proj.technologies}</div>}
                  </div>
                  {proj.startDate && <div style={{ fontSize: s(10), color: '#888', flexShrink: 0 }}>{formatDate(proj.startDate)}</div>}
                </div>
                {proj.description && <p style={{ fontSize: s(10.5), color: '#555', marginTop: '4px', lineHeight: 1.65 }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'certificate':
        if (!data.certificate.length) return null;
        return (
          <div key="certificate">
            <div style={secTitle}><span style={{ width: '14px', height: '2px', background: accent, display: 'inline-block' }}></span>Sertifikat</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {data.certificate.map((cert) => (
                <div key={cert.id} style={{ padding: '8px 12px', background: '#fafafa', borderRadius: '6px', borderTop: `3px solid ${accent}` }}>
                  <div style={{ fontSize: s(11), fontWeight: 700, color: '#1a1a2e' }}>{cert.name}</div>
                  <div style={{ fontSize: s(10), color: '#666' }}>{cert.issuer}</div>
                  {cert.date && <div style={{ fontSize: s(9.5), color: '#888' }}>{formatDate(cert.date)}</div>}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        const cs = data.customSections.find((c) => c.id === secId);
        if (!cs?.items.length) return null;
        return (
          <div key={secId}>
            <div style={secTitle}><span style={{ width: '14px', height: '2px', background: accent, display: 'inline-block' }}></span>{cs.title}</div>
            {cs.items.map((item) => (
              <div key={item.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: s(11.5), fontWeight: 700, color: '#1a1a2e' }}>{item.title}</div>
                    {item.subtitle && <div style={{ fontSize: s(10.5), color: accent }}>{item.subtitle}</div>}
                  </div>
                  {item.date && <div style={{ fontSize: s(10), color: '#888' }}>{item.date}</div>}
                </div>
                {item.description && <p style={{ fontSize: s(10.5), color: '#555', marginTop: '4px', lineHeight: 1.65 }}>{item.description}</p>}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div id="cv-preview" style={{ width: '794px', minHeight: '1123px', background: '#ffffff', fontFamily: "'Calibri', 'Arial', sans-serif", padding: '48px 56px', color: '#1a1a2e', boxSizing: 'border-box' }}>
      {/* Header */}
      <div style={{ borderBottom: `3px solid ${accent}`, paddingBottom: '20px', marginBottom: '4px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: s(26), fontWeight: 800, letterSpacing: '-0.5px', color: '#0d0d1a', lineHeight: 1.1 }}>
              {p.fullName || 'Nama Anda'}
            </div>
            <div style={{ fontSize: s(14), fontWeight: 500, color: accent, letterSpacing: '0.5px', marginTop: '4px' }}>
              {p.jobTitle || 'Jabatan Anda'}
            </div>

            {/* Contact row */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginTop: '12px', fontSize: s(10), color: '#555' }}>
              {p.email && <span>✉ {p.email}</span>}
              {p.phone && <span>☎ {p.phone}</span>}
              {p.location && <span>⌖ {p.location}</span>}
              {p.website && <span>⬡ {p.website}</span>}
              {p.linkedin && <span>in {p.linkedin}</span>}
            </div>
          </div>

          {p.photo && (
            <img
              src={p.photo}
              alt="Profile"
              style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', marginLeft: '20px', border: `2px solid ${accent}` }}
            />
          )}
        </div>
      </div>

      {/* Sections */}
      {visibleSections.map((sec) => renderSection(sec.id))}
      {data.customSections.filter((cs) => !visibleSections.find((v) => v.id === cs.id)).map((cs) => renderSection(cs.id))}
    </div>
  );
}
