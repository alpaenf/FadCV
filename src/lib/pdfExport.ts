import type { CVData } from '@/types/cv';

export async function exportToPDF(elementId: string, fileName: string = 'CV-FadCV'): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('CV preview element not found');

  const html2canvas = (await import('html2canvas')).default;
  const { jsPDF } = await import('jspdf');

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: '#ffffff',
    logging: false,
    width: element.scrollWidth,
    height: element.scrollHeight,
  });

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
    let position = 0;
    let page = 0;

    while (remain > 0) {
      if (page > 0) pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, -(pdfHeight * page), pdfWidth, imgHeight);
      remain -= pdfHeight;
      position += pdfHeight;
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
