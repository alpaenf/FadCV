import type { CSSProperties } from 'react';

export function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  try {
    // Handle YYYY-MM format from month inputs
    const [year, month] = dateStr.split('-');
    if (!year) return '';
    if (!month) return year;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    return `${monthNames[parseInt(month, 10) - 1]} ${year}`;
  } catch {
    return dateStr;
  }
}

export function skillLevelBar(level: number, accent: string, bg: string = '#e5e7eb'): CSSProperties[] {
  return [1, 2, 3, 4, 5].map((l) => ({
    flex: 1,
    height: '4px',
    borderRadius: '2px',
    background: l <= level ? accent : bg,
  }));
}
