import type { CVData } from '@/types/cv';
import { formatDate } from '@/templates/templateUtils';

interface Props {
  data: CVData;
  scale?: number;
}

export default function ModernProfessional({ data, scale = 1 }: Props) {
  const { personalInfo: p, settings } = data;
  const accent = settings.accentColor || '#dc2626';
  const fontSizeBase = settings.fontSize === 'sm' ? 11 : settings.fontSize === 'lg' ? 13 : 12;
  const s = (n: number) => `${n * fontSizeBase / 12}px`;

  const sideStyle: React.CSSProperties = {
    width: '32%',
    minHeight: '1123px',
    background: accent,
    color: 'white',
    padding: '32px 20px',
    fontFamily: "'Calibri', 'Arial', sans-serif",
    boxSizing: 'border-box',
    flexShrink: 0,
  };

  const mainStyle: React.CSSProperties = {
    flex: 1,
    background: '#ffffff',
    color: '#1a1a2e',
    padding: '32px 24px',
    fontFamily: "'Calibri', 'Arial', sans-serif",
    boxSizing: 'border-box',
    minHeight: '1123px',
  };

  const sectionLabelSide: React.CSSProperties = {
    fontSize: s(10),
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.75)',
    marginBottom: '8px',
    marginTop: '20px',
    paddingBottom: '4px',
    borderBottom: '1px solid rgba(255,255,255,0.25)',
  };

  const sectionLabel: React.CSSProperties = {
    fontSize: s(11),
    fontWeight: 700,
    letterSpacing: '1px',
    textTransform: 'uppercase',
    color: accent,
    marginBottom: '10px',
    marginTop: '20px',
    paddingBottom: '4px',
    borderBottom: `2px solid ${accent}`,
  };

  // Visible sections from sectionOrder
  const visibleSections = data.sectionOrder.filter((s) => s.visible);

  const renderMainSection = (sectionId: string) => {
    switch (sectionId) {
      case 'summary':
        if (!data.summary.text) return null;
        return (
          <div key="summary">
            <div style={sectionLabel}>Profil</div>
            <p style={{ fontSize: s(11), lineHeight: 1.7, color: '#333', marginBottom: '4px' }}>
              {data.summary.text}
            </p>
          </div>
        );

      case 'experience':
        if (!data.experience.length) return null;
        return (
          <div key="experience">
            <div style={sectionLabel}>Pengalaman Kerja</div>
            {data.experience.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '4px' }}>
                  <div>
                    <div style={{ fontSize: s(12), fontWeight: 700, color: '#1a1a2e' }}>{exp.position}</div>
                    <div style={{ fontSize: s(11), fontWeight: 600, color: accent }}>{exp.company}</div>
                    {exp.location && <div style={{ fontSize: s(10), color: '#666' }}>{exp.location}</div>}
                  </div>
                  <div style={{ fontSize: s(10), color: '#888', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {formatDate(exp.startDate)} – {exp.current ? 'Sekarang' : formatDate(exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p style={{ fontSize: s(10.5), color: '#444', marginTop: '4px', lineHeight: 1.65 }}>
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        );

      case 'education':
        if (!data.education.length) return null;
        return (
          <div key="education">
            <div style={sectionLabel}>Pendidikan</div>
            {data.education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <div>
                    <div style={{ fontSize: s(12), fontWeight: 700, color: '#1a1a2e' }}>{edu.institution}</div>
                    <div style={{ fontSize: s(11), color: accent, fontWeight: 600 }}>
                      {edu.degree}{edu.field ? ` – ${edu.field}` : ''}
                    </div>
                    {edu.gpa && <div style={{ fontSize: s(10), color: '#666' }}>IPK: {edu.gpa}</div>}
                  </div>
                  <div style={{ fontSize: s(10), color: '#888', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {formatDate(edu.startDate)} – {edu.current ? 'Sekarang' : formatDate(edu.endDate)}
                  </div>
                </div>
                {edu.description && <p style={{ fontSize: s(10.5), color: '#444', marginTop: '4px', lineHeight: 1.65 }}>{edu.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'organization':
        if (!data.organization.length) return null;
        return (
          <div key="organization">
            <div style={sectionLabel}>Organisasi</div>
            {data.organization.map((org) => (
              <div key={org.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <div>
                    <div style={{ fontSize: s(12), fontWeight: 700, color: '#1a1a2e' }}>{org.name}</div>
                    {org.role && <div style={{ fontSize: s(11), color: accent, fontWeight: 600 }}>{org.role}</div>}
                  </div>
                  <div style={{ fontSize: s(10), color: '#888', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {formatDate(org.startDate)} – {org.current ? 'Sekarang' : formatDate(org.endDate)}
                  </div>
                </div>
                {org.description && <p style={{ fontSize: s(10.5), color: '#444', marginTop: '4px', lineHeight: 1.65 }}>{org.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'project':
        if (!data.project.length) return null;
        return (
          <div key="project">
            <div style={sectionLabel}>Proyek</div>
            {data.project.map((proj) => (
              <div key={proj.id} style={{ marginBottom: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <div>
                    <div style={{ fontSize: s(12), fontWeight: 700, color: '#1a1a2e' }}>{proj.name}</div>
                    {proj.role && <div style={{ fontSize: s(11), color: accent }}>{proj.role}</div>}
                    {proj.technologies && (
                      <div style={{ fontSize: s(10), color: '#888', fontStyle: 'italic', marginTop: '2px' }}>
                        {proj.technologies}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: s(10), color: '#888', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {proj.startDate && formatDate(proj.startDate)}{proj.endDate && ` – ${formatDate(proj.endDate)}`}
                  </div>
                </div>
                {proj.description && <p style={{ fontSize: s(10.5), color: '#444', marginTop: '4px', lineHeight: 1.65 }}>{proj.description}</p>}
              </div>
            ))}
          </div>
        );

      case 'certificate':
        if (!data.certificate.length) return null;
        return (
          <div key="certificate">
            <div style={sectionLabel}>Sertifikat</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {data.certificate.map((cert) => (
                <div key={cert.id} style={{ padding: '8px', borderLeft: `3px solid ${accent}`, background: '#f9f9f9' }}>
                  <div style={{ fontSize: s(11), fontWeight: 700, color: '#1a1a2e' }}>{cert.name}</div>
                  <div style={{ fontSize: s(10), color: '#666' }}>{cert.issuer}</div>
                  {cert.date && <div style={{ fontSize: s(9.5), color: '#888' }}>{formatDate(cert.date)}</div>}
                </div>
              ))}
            </div>
          </div>
        );

      default:
        // Custom sections
        const customSection = data.customSections.find((cs) => cs.id === sectionId);
        if (!customSection || !customSection.items.length) return null;
        return (
          <div key={sectionId}>
            <div style={sectionLabel}>{customSection.title}</div>
            {customSection.items.map((item) => (
              <div key={item.id} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '4px' }}>
                  <div>
                    <div style={{ fontSize: s(11.5), fontWeight: 700, color: '#1a1a2e' }}>{item.title}</div>
                    {item.subtitle && <div style={{ fontSize: s(10.5), color: accent }}>{item.subtitle}</div>}
                  </div>
                  {item.date && <div style={{ fontSize: s(10), color: '#888' }}>{item.date}</div>}
                </div>
                {item.description && <p style={{ fontSize: s(10.5), color: '#444', marginTop: '4px', lineHeight: 1.65 }}>{item.description}</p>}
              </div>
            ))}
          </div>
        );
    }
  };

  return (
    <div id="cv-preview" style={{ width: '794px', minHeight: '1123px', display: 'flex', background: '#fff', fontFamily: "'Calibri', 'Arial', sans-serif" }}>
      {/* Sidebar */}
      <div style={sideStyle}>
        {/* Photo */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          {p.photo ? (
            <img
              src={p.photo}
              alt="Profile"
              style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid rgba(255,255,255,0.5)', objectFit: 'cover', margin: '0 auto', display: 'block' }}
            />
          ) : (
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span style={{ fontSize: '36px', fontWeight: 700, color: 'rgba(255,255,255,0.7)' }}>
                {p.fullName ? p.fullName.charAt(0).toUpperCase() : '?'}
              </span>
            </div>
          )}
        </div>

        {/* Name & Title */}
        <div style={{ textAlign: 'center', marginBottom: '16px' }}>
          <div style={{ fontSize: s(17), fontWeight: 800, lineHeight: 1.2, marginBottom: '4px' }}>{p.fullName || 'Nama Anda'}</div>
          <div style={{ fontSize: s(11), opacity: 0.85, letterSpacing: '0.5px' }}>{p.jobTitle || 'Jabatan Anda'}</div>
        </div>

        {/* Contact */}
        <div style={sectionLabelSide}>Kontak</div>
        {[
          { label: p.email, icon: '✉' },
          { label: p.phone, icon: '☎' },
          { label: p.location, icon: '⌖' },
          { label: p.website, icon: '⬡' },
          { label: p.linkedin, icon: 'in' },
          { label: p.github, icon: '⌘' },
        ].filter(({ label }) => label).map(({ label, icon }, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '6px', marginBottom: '6px', fontSize: s(10), wordBreak: 'break-word' }}>
            <span style={{ opacity: 0.8, flexShrink: 0, fontSize: s(10), lineHeight: 1.5 }}>{icon}</span>
            <span style={{ opacity: 0.9 }}>{label}</span>
          </div>
        ))}

        {/* Skills */}
        {data.skill.length > 0 && (
          <>
            <div style={sectionLabelSide}>Keterampilan</div>
            {data.skill.map((sk) => (
              <div key={sk.id} style={{ marginBottom: '8px' }}>
                <div style={{ fontSize: s(10.5), fontWeight: 600, marginBottom: '3px' }}>{sk.name}</div>
                <div style={{ display: 'flex', gap: '3px' }}>
                  {[1,2,3,4,5].map((level) => (
                    <div
                      key={level}
                      style={{
                        flex: 1,
                        height: '4px',
                        borderRadius: '2px',
                        background: level <= sk.level ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.2)',
                      }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Main content */}
      <div style={mainStyle}>
        {visibleSections
          .filter((sec) => sec.id !== 'skill')
          .map((sec) => renderMainSection(sec.id))}

        {/* Extra custom sections not in sectionOrder */}
        {data.customSections
          .filter((cs) => !visibleSections.find((s) => s.id === cs.id))
          .map((cs) => renderMainSection(cs.id))}
      </div>
    </div>
  );
}
