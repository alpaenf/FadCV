// Shared styles for form sections
export const inputClass = `w-full px-3.5 py-3 rounded-xl text-sm font-medium input-glow transition-all duration-200`;
export const inputStyle = {
  background: 'rgba(255,255,255,0.05)',
  border: '1px solid rgba(255,255,255,0.1)',
  color: '#f8f8f8',
};
export const textareaStyle = {
  ...inputStyle,
  resize: 'vertical' as const,
  minHeight: '80px',
};
export const labelClass = 'block text-xs font-semibold mb-2';
export const labelStyle = { color: '#a0a0b0' };
export const cardStyle = {
  background: 'rgba(18, 18, 26, 0.9)',
  border: '1px solid rgba(255,255,255,0.08)',
};
