export function downloadText(filename: string, content: string, type = 'text/plain') {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement('a');
  link.href = url; link.download = filename; link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadEnquiry(kind: string, details: unknown) {
  downloadText(`velaro-${kind}-enquiry.json`, JSON.stringify({ boutique: 'VELARO', kind, createdAt: new Date().toISOString(), status: 'Draft — not submitted', details }, null, 2), 'application/json');
}
