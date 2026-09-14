import { downloadText } from '../utils/download';
import { useDialog } from '../hooks/useDialog';
import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, ShieldCheck, Award, FileText, CheckCircle2, Download } from 'lucide-react';

export const AuthenticityReportModal: React.FC = () => {
  const { authenticityModalProduct, closeAuthenticityReport } = useShop();

  const dialogRef = useDialog(!!authenticityModalProduct, () => { closeAuthenticityReport(); });
  if (!authenticityModalProduct) return null;

  const steps = [
    { num: '01', title: 'Visual & Microscopic Inspection', desc: 'Case bevels, hand finishings, and bezel teeth inspected under 40x magnification.' },
    { num: '02', title: 'Reference & Engraving Audit', desc: 'Case serial numbers and lug engravings matched against manufacture database records.' },
    { num: '03', title: 'Calibre Movement Verification', desc: 'Balance spring, escapement, and gold rotor verified for 100% original Swiss components.' },
    { num: '04', title: 'Timing & Amplitude Benchmark', desc: 'Tested on Witschi chronofacing equipment to ensure COSC -2/+2 sec/day tolerance.' },
    { num: '05', title: 'Water Resistance Depth Test', desc: 'Dry and wet pressure-tested to rated depth atmosphere.' },
    { num: '06', title: 'Final Passport Certification', desc: 'Vault sealed in climate-controlled casing with VELARO digital authenticity passport.' }
  ];

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Timepiece report" tabIndex={-1} className="dialog-overlay fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="max-w-2xl w-full bg-[#111111] border border-[#C6A15B] p-8 shadow-2xl relative text-[#F5F5F5] rounded-velaro my-8">
        <button aria-label="Close timepiece report"
          onClick={closeAuthenticityReport}
          className="absolute top-6 right-6 p-2 text-[#A5A5A5] hover:text-[#C6A15B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Certificate Header */}
        <div className="text-center border-b border-[#222222] pb-6 mb-6">
          <div className="w-12 h-12 rounded-full border border-[#C6A15B] mx-auto flex items-center justify-center text-[#C6A15B] mb-3 bg-[#080808]">
            <Award className="w-6 h-6" />
          </div>
          <span className="text-[9px] uppercase tracking-[0.35em] text-[#C6A15B] block font-semibold">
            SAMPLE CATALOGUE REPORT
          </span>
          <h2 className="font-serif text-3xl text-[#F5F5F5] tracking-wide mt-1">
            VELARO VAULT REPORT
          </h2>
          <p className="text-xs text-[#A5A5A5] mt-1 font-mono">
            PASSPORT ID: VLR-CERT-{authenticityModalProduct.reference}-2026
          </p>
        </div>

        {/* Watch metadata box */}
        <div className="bg-[#080808] border border-[#222222] p-4 flex items-center justify-between mb-6 text-xs">
          <div>
            <span className="text-[9px] uppercase tracking-widest text-[#C6A15B] block">TIMEPIECE</span>
            <span className="font-serif text-lg font-semibold text-[#F5F5F5]">{authenticityModalProduct.brand} {authenticityModalProduct.name}</span>
            <span className="text-[10px] text-[#A5A5A5] block font-mono">Ref. {authenticityModalProduct.reference} • Serial Verified</span>
          </div>

          <div className="text-right">
            <span className="text-[9px] uppercase tracking-widest text-[#A5A5A5] block">SCORECARD</span>
            <span className="font-sans text-xl font-bold text-[#C6A15B]">
              {authenticityModalProduct.conditionScorecard.caseScore} / 10
            </span>
          </div>
        </div>

        {/* 6 Inspection Steps */}
        <div className="space-y-3 mb-6">
          <h4 className="text-[10px] uppercase tracking-[0.25em] text-[#C6A15B] font-semibold">
            6-POINT VERIFICATION PROCEDURE
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {steps.map((step) => (
              <div key={step.num} className="bg-[#161616] p-3 border border-[#222222] text-xs">
                <div className="flex items-center space-x-2 text-[#C6A15B] font-semibold mb-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{step.num}. {step.title}</span>
                </div>
                <p className="text-[10px] text-[#A5A5A5] font-light leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-[#222222] flex justify-between items-center">
          <span className="text-[9px] text-[#A5A5A5] uppercase tracking-widest">
            ILLUSTRATIVE REPORT · NOT AN ISSUED CERTIFICATE
          </span>
          <button
            onClick={() => {
              downloadText(`velaro-${authenticityModalProduct.reference.replace(/[^a-z0-9-]/gi, '-')}-report.txt`, ['VELARO — SAMPLE CATALOGUE REPORT', 'Illustrative catalogue data. Not an issued certificate of authenticity.', `${authenticityModalProduct.brand} ${authenticityModalProduct.name}`, `Reference: ${authenticityModalProduct.reference}`, `Condition: ${authenticityModalProduct.condition}`, authenticityModalProduct.conditionScorecard.notes, ...steps.map(step => `${step.num}. ${step.title}: ${step.desc}`)].join('\n\n'));
              closeAuthenticityReport();
            }}
            className="px-6 py-2.5 bg-[#C6A15B] text-[#080808] text-[10px] font-bold uppercase tracking-widest hover:bg-[#F5F5F5] transition-colors flex items-center space-x-2"
          >
            <Download className="w-3.5 h-3.5" />
            <span>DOWNLOAD REPORT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
