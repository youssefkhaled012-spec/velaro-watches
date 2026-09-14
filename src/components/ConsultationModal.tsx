import { downloadEnquiry } from '../utils/download';
import { useDialog } from '../hooks/useDialog';
import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, ShieldCheck, Check, Calendar, Phone, Mail, User } from 'lucide-react';

export const ConsultationModal: React.FC = () => {
  const { consultationProduct, closeConsultationModal } = useShop();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    location: 'Cairo Vault Showroom',
    notes: ''
  });

  const dialogRef = useDialog(!!consultationProduct, () => { closeConsultationModal(); setSubmitted(false); });
  if (!consultationProduct) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    downloadEnquiry('consultation', { ...formData, reference: consultationProduct?.reference });
    setSubmitted(true);
  };

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Private consultation" tabIndex={-1} className="dialog-overlay fixed inset-0 z-50 bg-[#0B0B0A]/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="max-w-xl w-full bg-[#151514] border border-[#C5A880]/50 p-8 shadow-2xl relative text-[#F4F1E9]">
        <button aria-label="Close private consultation"
          onClick={closeConsultationModal}
          className="absolute top-6 right-6 p-2 text-[#8A8A85] hover:text-[#C5A880] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-10 space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#C5A880]/20 border border-[#C5A880] mx-auto flex items-center justify-center text-[#C5A880]">
              <Check className="w-7 h-7" />
            </div>
            <h3 className="font-serif text-3xl text-[#F4F1E9]">Consultation draft prepared</h3>
            <p className="text-xs text-[#8A8A85] max-w-md mx-auto leading-relaxed">
              Your consultation enquiry has been downloaded. No appointment has been booked or sent.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                closeConsultationModal();
              }}
              className="mt-6 px-8 py-3 bg-[#C5A880] text-[#0B0B0A] text-xs font-bold uppercase tracking-widest hover:bg-[#F4F1E9] transition-colors"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <div>
            <div className="border-b border-[#2A2A26] pb-4 mb-6">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C5A880] block mb-1">
                VALERE PRIVATE CONCIERGE
              </span>
              <h3 className="font-serif text-2xl text-[#F4F1E9]">
                REQUEST PRIVATE CONSULTATION
              </h3>
              <p className="text-xs text-[#8A8A85] mt-1 font-sans">
                Schedule a confidential, white-glove viewing for{' '}
                <span className="text-[#F4F1E9] font-medium">{consultationProduct.brand} {consultationProduct.name}</span> (Ref. {consultationProduct.reference}).
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="ConsultationModal-1" className="block text-[10px] uppercase tracking-widest text-[#8A8A85] mb-1">
                  FULL NAME
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-[#8A8A85] absolute left-3 top-3" />
                  <input id="ConsultationModal-1"
                    type="text"
                    required
                    placeholder="Kareem El-Sayed"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#0B0B0A] border border-[#2A2A26] focus:border-[#C5A880] pl-10 pr-4 py-2.5 text-xs text-[#F4F1E9] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="ConsultationModal-2" className="block text-[10px] uppercase tracking-widest text-[#8A8A85] mb-1">
                    PHONE NUMBER
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8A8A85] absolute left-3 top-3" />
                    <input id="ConsultationModal-2"
                      type="tel"
                      required
                      placeholder="+20 100 000 0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#0B0B0A] border border-[#2A2A26] focus:border-[#C5A880] pl-10 pr-4 py-2.5 text-xs text-[#F4F1E9] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="ConsultationModal-3" className="block text-[10px] uppercase tracking-widest text-[#8A8A85] mb-1">
                    EMAIL ADDRESS
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8A8A85] absolute left-3 top-3" />
                    <input id="ConsultationModal-3"
                      type="email"
                      required
                      placeholder="collector@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#0B0B0A] border border-[#2A2A26] focus:border-[#C5A880] pl-10 pr-4 py-2.5 text-xs text-[#F4F1E9] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="ConsultationModal-4" className="block text-[10px] uppercase tracking-widest text-[#8A8A85] mb-1">
                  PREFERRED VIEWING LOCATION
                </label>
                <select id="ConsultationModal-4"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full bg-[#0B0B0A] border border-[#2A2A26] focus:border-[#C5A880] px-4 py-2.5 text-xs text-[#F4F1E9] focus:outline-none"
                >
                  <option value="Cairo Vault Showroom">Cairo Private Vault Showroom</option>
                  <option value="Alexandria Boutique">Alexandria Private Boutique</option>
                  <option value="Private Residence">Private Residence Concierge Visit</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C5A880] hover:bg-[#F4F1E9] text-[#0B0B0A] font-bold text-xs uppercase tracking-[0.2em] transition-colors"
                >
                  DOWNLOAD APPOINTMENT ENQUIRY
                </button>
              </div>

              <p className="text-[10px] text-[#8A8A85] text-center flex items-center justify-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880] mr-1" />
                Strict confidentiality & non-disclosure guaranteed by Azzam Vault.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
