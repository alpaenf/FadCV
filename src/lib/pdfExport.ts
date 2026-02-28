import type { CVData } from '@/types/cv';

export async function exportToPDF(elementId: string, fileName: string = 'CV-FadCV'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('CV preview element not found');

  // Temporarily move into viewport for accurate capture
  element.style.left = '0px';
  element.style.position = 'fixed';
  element.style.top = '0px';
  element.style.zIndex = '-999';
  // Wait for layout to settle
  await new Promise(r => setTimeout(r, 100));

  const html2canvas = (await import('html2canvas')).default;
  const { jsPDF } = await import('jspdf');

  let canvas;
  try {
    canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      logging: false,
      width: 794,
      height: element.scrollHeight,
      windowWidth: 794,
      scrollX: 0,
      scrollY: 0,
    });
  } finally {
    // Always restore position
    element.style.left = '-10000px';
    element.style.position = 'absolute';
    element.style.top = '0px';
    element.style.zIndex = '';
  }

  const imgData = canvas.toDataURL('image/jpeg', 0.95);
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();
  const canvasRatio = canvas.height / canvas.width;
  const imgHeight = pdfWidth * canvasRatio;

  if (imgHeight <= pdfHeight) {
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, imgHeight);
  } else {
    // Multi-page support
    let remain = imgHeight;
    let page = 0;

    while (remain > 0) {
      if (page > 0) pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, -(pdfHeight * page), pdfWidth, imgHeight);
      remain -= pdfHeight;
      page++;
    }
  }

  pdf.save(`${fileName}.pdf`);
}

export function calculateProgress(data: CVData): number {
  let score = 0;
  const max = 10;

  const p = data.personalInfo;
  if (p.fullName) score++;
  if (p.email) score++;
  if (p.phone) score++;
  if (p.jobTitle) score++;
  if (p.location) score++;
  if (p.photo) score++;
  if (data.summary.text) score++;
  if (data.education.length > 0) score++;
  if (data.experience.length > 0) score++;
  if (data.skill.length > 0) score++;

  return Math.round((score / max) * 100);
}
