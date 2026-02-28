export interface PersonalInfo {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  photo: string; // base64
}

export interface Summary {
  text: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  current: boolean;
  gpa: string;
  description: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Organization {
  id: string;
  name: string;
  role: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  role: string;
  link: string;
  startDate: string;
  endDate: string;
  description: string;
  technologies: string;
}

export interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry: string;
  credentialId: string;
  link: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number; // 1-5
  category: string;
}

export interface CustomItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
}

export interface CustomSection {
  id: string;
  title: string;
  items: CustomItem[];
}

export type SectionKey =
  | 'summary'
  | 'education'
  | 'experience'
  | 'organization'
  | 'project'
  | 'certificate'
  | 'skill'
  | string; // custom section ids

export interface SectionOrder {
  id: string;
  label: string;
  visible: boolean;
}

export interface CVSettings {
  template: 'modern' | 'minimal' | 'creative';
  accentColor: string;
  fontSize: 'sm' | 'md' | 'lg';
}

export interface CVData {
  personalInfo: PersonalInfo;
  summary: Summary;
  education: Education[];
  experience: Experience[];
  organization: Organization[];
  project: Project[];
  certificate: Certificate[];
  skill: Skill[];
  customSections: CustomSection[];
  sectionOrder: SectionOrder[];
  settings: CVSettings;
}

export const defaultCVData: CVData = {
  personalInfo: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    linkedin: '',
    github: '',
    photo: '',
  },
  summary: { text: '' },
  education: [],
  experience: [],
  organization: [],
  project: [],
  certificate: [],
  skill: [],
  customSections: [],
  sectionOrder: [
    { id: 'summary', label: 'Ringkasan Profil', visible: true },
    { id: 'experience', label: 'Pengalaman Kerja', visible: true },
    { id: 'education', label: 'Pendidikan', visible: true },
    { id: 'skill', label: 'Keterampilan', visible: true },
    { id: 'organization', label: 'Organisasi', visible: true },
    { id: 'project', label: 'Proyek', visible: true },
    { id: 'certificate', label: 'Sertifikat', visible: true },
  ],
  settings: {
    template: 'modern',
    accentColor: '#dc2626',
    fontSize: 'md',
  },
};
