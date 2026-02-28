import { CVData, defaultCVData } from '@/types/cv';

const STORAGE_KEY = 'fadcv_data';

export function saveCV(data: CVData): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save CV data:', e);
  }
}

export function loadCV(): CVData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultCVData;
    const parsed = JSON.parse(stored) as Partial<CVData>;
    return {
      ...defaultCVData,
      ...parsed,
      personalInfo: { ...defaultCVData.personalInfo, ...(parsed.personalInfo || {}) },
      summary: { ...defaultCVData.summary, ...(parsed.summary || {}) },
      settings: { ...defaultCVData.settings, ...(parsed.settings || {}) },
      education: parsed.education || [],
      experience: parsed.experience || [],
      organization: parsed.organization || [],
      project: parsed.project || [],
      certificate: parsed.certificate || [],
      skill: parsed.skill || [],
      customSections: parsed.customSections || [],
      sectionOrder: parsed.sectionOrder || defaultCVData.sectionOrder,
    };
  } catch (e) {
    console.error('Failed to load CV data:', e);
    return defaultCVData;
  }
}

export function clearCV(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear CV data:', e);
  }
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
