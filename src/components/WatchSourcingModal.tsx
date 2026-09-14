import { downloadEnquiry } from '../utils/download';
import { useDialog } from '../hooks/useDialog';
import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Search, Check, ShieldCheck } from 'lucide-react';

export const WatchSourcingModal: React.FC = () => {
  const { isSourcingModalOpen, setIsSourcingModalOpen, showToast } = useShop();

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    reference: '',
    condition: 'Unworn',
    budget: '$25,000 - $50,000',
    deadline: 'Within 30 Days',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const dialogRef = useDialog(!!isSourcingModalOpen, () => { setIsSourcingModalOpen(false); setSubmitted(false); });
  if (!isSourcingModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    downloadEnquiry('sourcing', formData);
    setSubmitted(true);
    showToast('ENQUIRY DOWNLOADED', 'Your sourcing draft is ready. It has not been sent.', 'info');
  };

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Watch sourcing" tabIndex={-1} className="dialog-overlay fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="max-w-2xl w-full bg-[#111111] border border-[#C6A15B]/50 p-8 shadow-2xl relative text-[#F5F5F5] rounded-velaro my-8">
        <button aria-label="Close watch sourcing"
          onClick={() => {
            setIsSourcingModalOpen(false);
            setSubmitted(false);
          }}
          className="absolute top-6 right-6 p-2 text-[#A5A5A5] hover:text-[#C6A15B] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-12 space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#C6A15B]/20 border border-[#C6A15B] mx-auto flex items-center justify-center text-[#C6A15B]">
              <Check className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-3xl text-[#F5F5F5]">Sourcing draft prepared</h3>
            <p className="text-xs text-[#A5A5A5] max-w-md mx-auto leading-relaxed">
              Thank you, {formData.name}. Your enquiry has been downloaded for your records. No request has been sent to an advisor.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setIsSourcingModalOpen(false);
              }}
              className="mt-6 px-8 py-3 bg-[#C6A15B] text-[#080808] text-xs font-bold uppercase tracking-widest hover:bg-[#F5F5F5]"
            >
              RETURN TO BOUTIQUE
            </button>
          </div>
        ) : (
          <div>
            <div className="border-b border-[#222222] pb-4 mb-6">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B] block mb-1 font-semibold">
                GLOBAL WATCH SOURCING DESK
              </span>
              <h3 className="font-serif text-3xl text-[#F5F5F5]">
                CAN’T FIND YOUR TIMEPIECE?
              </h3>
              <p className="text-xs text-[#A5A5A5] mt-1 font-sans font-light">
                Prepare a sourcing enquiry for your preferred timepiece. This preview downloads a draft; it does not send your details.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="WatchSourcingModal-1" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    WATCHMAKER BRAND *
                  </label>
                  <input id="WatchSourcingModal-1"
                    type="text"
                    required
                    placeholder="e.g. Rolex, Patek Philippe"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-2.5 text-xs text-[#F5F5F5] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="WatchSourcingModal-2" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    MODEL OR REFERENCE *
                  </label>
                  <input id="WatchSourcingModal-2"
                    type="text"
                    required
                    placeholder="e.g. Daytona 126500LN"
                    value={formData.reference}
                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-2.5 text-xs text-[#F5F5F5] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="WatchSourcingModal-3" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    TARGET BUDGET CAP
                  </label>
                  <select id="WatchSourcingModal-3"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-2.5 text-xs text-[#F5F5F5] focus:outline-none"
                  >
                    <option value="Under $10,000">Under $10,000</option>
                    <option value="$10,000 - $25,000">$10,000 – $25,000</option>
                    <option value="$25,000 - $50,000">$25,000 – $50,000</option>
                    <option value="$50,000 - $100,000">$50,000 – $100,000</option>
                    <option value="$100,000+">$100,000+ Collector Vault</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="WatchSourcingModal-4" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    TIMEFRAME DEADLINE
                  </label>
                  <select id="WatchSourcingModal-4"
                    value={formData.deadline}
                    onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-2.5 text-xs text-[#F5F5F5] focus:outline-none"
                  >
                    <option value="As Soon As Possible">As Soon As Possible</option>
                    <option value="Within 30 Days">Within 30 Days</option>
                    <option value="Flexible / Collector Watch">Flexible / Collector Watch</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="WatchSourcingModal-5" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    YOUR FULL NAME *
                  </label>
                  <input id="WatchSourcingModal-5"
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-2.5 text-xs text-[#F5F5F5] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="WatchSourcingModal-6" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    EMAIL ADDRESS *
                  </label>
                  <input id="WatchSourcingModal-6"
                    type="email"
                    required
                    placeholder="john@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-2.5 text-xs text-[#F5F5F5] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="WatchSourcingModal-7" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    PHONE NUMBER
                  </label>
                  <input id="WatchSourcingModal-7"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-2.5 text-xs text-[#F5F5F5] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C6A15B] hover:bg-[#F5F5F5] text-[#080808] font-bold text-xs uppercase tracking-[0.2em] transition-colors"
                >
                  DOWNLOAD SOURCING ENQUIRY
                </button>
              </div>

              <p className="text-[9px] text-[#A5A5A5] text-center flex items-center justify-center pt-2">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C6A15B] mr-1" />
                Confidential global sourcing guaranteed by VELARO.
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
