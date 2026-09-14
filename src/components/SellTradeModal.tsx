import { downloadEnquiry } from '../utils/download';
import { useDialog } from '../hooks/useDialog';
import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Check, ShieldCheck, DollarSign, RefreshCw, Upload } from 'lucide-react';

export const SellTradeModal: React.FC = () => {
  const { isSellTradeModalOpen, setIsSellTradeModalOpen, showToast } = useShop();

  const [photos, setPhotos] = useState<File[]>([]);
  const [mode, setMode] = useState<'sell' | 'trade'>('sell');
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    reference: '',
    year: '2024',
    condition: 'Unworn',
    boxAndPapers: 'Full Set',
    name: '',
    email: '',
    phone: '',
    expectedPrice: ''
  });

  const dialogRef = useDialog(!!isSellTradeModalOpen, () => { setIsSellTradeModalOpen(false); setSubmitted(false); });
  if (!isSellTradeModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    downloadEnquiry(mode, { ...formData, photos: photos.map(file => file.name) });
    setSubmitted(true);
    showToast('VALUATION DRAFT DOWNLOADED', 'Your draft is ready. No valuation request has been sent.', 'info');
  };

  return (
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Sell or trade your watch" tabIndex={-1} className="dialog-overlay fixed inset-0 z-50 bg-[#080808]/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="max-w-2xl w-full bg-[#111111] border border-[#C6A15B]/50 p-8 shadow-2xl relative text-[#F5F5F5] rounded-velaro my-8">
        <button aria-label="Close sell or trade your watch"
          onClick={() => {
            setIsSellTradeModalOpen(false);
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
            <h3 className="font-serif text-3xl text-[#F5F5F5]">Your valuation draft is ready</h3>
            <p className="text-xs text-[#A5A5A5] max-w-md mx-auto leading-relaxed">
              Thank you, {formData.name}. Your {mode} enquiry has been downloaded. Photographs remain on your device; include the original files when sharing your draft. No offer has been requested.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setIsSellTradeModalOpen(false);
              }}
              className="mt-6 px-8 py-3 bg-[#C6A15B] text-[#080808] text-xs font-bold uppercase tracking-widest hover:bg-[#F5F5F5]"
            >
              CLOSE
            </button>
          </div>
        ) : (
          <div>
            <div className="border-b border-[#222222] pb-4 mb-6">
              <span className="text-[9px] uppercase tracking-[0.3em] text-[#C6A15B] block mb-1 font-semibold">
                YOUR WATCH. OUR NETWORK.
              </span>
              <h3 className="font-serif text-3xl text-[#F5F5F5]">
                SELL OR TRADE THROUGH VELARO
              </h3>
              <p className="text-xs text-[#A5A5A5] mt-1 font-sans font-light">
                Prepare a sale or trade enquiry. This preview downloads your details; it does not send them.
              </p>
            </div>

            {/* Mode selector */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <button
                type="button"
                onClick={() => setMode('sell')}
                className={`py-2.5 px-4 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 rounded-velaro ${
                  mode === 'sell'
                    ? 'bg-[#C6A15B] text-[#080808]'
                    : 'bg-[#161616] border border-[#222222] text-[#A5A5A5] hover:text-[#F5F5F5]'
                }`}
              >
                <DollarSign className="w-4 h-4" />
                <span>DIRECT OUTRIGHT SALE</span>
              </button>
              <button
                type="button"
                onClick={() => setMode('trade')}
                className={`py-2.5 px-4 text-xs font-bold uppercase tracking-widest transition-all flex items-center justify-center space-x-2 rounded-velaro ${
                  mode === 'trade'
                    ? 'bg-[#C6A15B] text-[#080808]'
                    : 'bg-[#161616] border border-[#222222] text-[#A5A5A5] hover:text-[#F5F5F5]'
                }`}
              >
                <RefreshCw className="w-4 h-4" />
                <span>TRADE-IN VALUE</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="SellTradeModal-1" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    BRAND *
                  </label>
                  <input id="SellTradeModal-1"
                    type="text"
                    required
                    placeholder="Rolex, Patek Philippe"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-2 text-xs text-[#F5F5F5] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="SellTradeModal-2" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    MODEL NAME *
                  </label>
                  <input id="SellTradeModal-2"
                    type="text"
                    required
                    placeholder="Submariner Date"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-2 text-xs text-[#F5F5F5] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="SellTradeModal-3" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    REFERENCE NUMBER
                  </label>
                  <input id="SellTradeModal-3"
                    type="text"
                    placeholder="126610LN"
                    value={formData.reference}
                    onChange={(e) => setFormData({ ...formData, reference: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-2 text-xs text-[#F5F5F5] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="SellTradeModal-4" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    CONDITION
                  </label>
                  <select id="SellTradeModal-4"
                    value={formData.condition}
                    onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none"
                  >
                    <option value="Unworn">Unworn / Vault</option>
                    <option value="Excellent">Excellent (9.5+ / 10)</option>
                    <option value="Very Good">Very Good (9.0 / 10)</option>
                    <option value="Good">Good (8.0 / 10)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="SellTradeModal-5" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    PROVENANCE SET
                  </label>
                  <select id="SellTradeModal-5"
                    value={formData.boxAndPapers}
                    onChange={(e) => setFormData({ ...formData, boxAndPapers: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-3 py-2 text-xs text-[#F5F5F5] focus:outline-none"
                  >
                    <option value="Full Set">Full Set (Box, Papers & Cards)</option>
                    <option value="Box Only">Box Only</option>
                    <option value="Papers Only">Papers Only</option>
                    <option value="Watch Only">Watch Only</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="SellTradeModal-6" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    EXPECTED PRICE ($)
                  </label>
                  <input id="SellTradeModal-6"
                    type="text"
                    placeholder="e.g. $14,500"
                    value={formData.expectedPrice}
                    onChange={(e) => setFormData({ ...formData, expectedPrice: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-2 text-xs text-[#F5F5F5] focus:outline-none"
                  />
                </div>
              </div>

              {/* Local photograph selection */}
              <label htmlFor="SellTradeModal-photos" className="block border border-dashed border-[#222222] hover:border-[#C6A15B] p-4 text-center cursor-pointer bg-[#080808]">
                <Upload className="w-5 h-5 text-[#C6A15B] mx-auto mb-1" />
                <span className="text-[10px] uppercase tracking-widest text-[#F5F5F5] block font-semibold">
                  UPLOAD WATCH PHOTOGRAPHS (OPTIONAL)
                </span>
                <span className="text-[9px] text-[#A5A5A5]">Choose up to 5 photographs (10 MB each)</span>
                <input id="SellTradeModal-photos" aria-label="Watch photographs" type="file" accept="image/*" multiple className="block w-full text-xs mt-3" onChange={e => {
                  const selected = Array.from(e.target.files ?? []);
                  if (selected.length > 5 || selected.some(f => !f.type.startsWith('image/') || f.size > 10 * 1024 * 1024)) { showToast('CHECK PHOTOGRAPHS', 'Choose up to 5 images, each smaller than 10 MB.'); e.target.value = ''; return; }
                  setPhotos(selected);
                }} />
                {photos.length > 0 && <span className="block mt-2 text-xs text-[#C6A15B]">{photos.map(f => f.name).join(', ')}</span>}
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="SellTradeModal-7" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    FULL NAME *
                  </label>
                  <input id="SellTradeModal-7"
                    type="text"
                    required
                    placeholder="Kareem Mansour"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-2 text-xs text-[#F5F5F5] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="SellTradeModal-8" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    EMAIL ADDRESS *
                  </label>
                  <input id="SellTradeModal-8"
                    type="email"
                    required
                    placeholder="kareem@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-2 text-xs text-[#F5F5F5] focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="SellTradeModal-9" className="block text-[9px] uppercase tracking-widest text-[#A5A5A5] mb-1 font-semibold">
                    PHONE NUMBER
                  </label>
                  <input id="SellTradeModal-9"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#080808] border border-[#222222] focus:border-[#C6A15B] px-4 py-2 text-xs text-[#F5F5F5] focus:outline-none"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#C6A15B] hover:bg-[#F5F5F5] text-[#080808] font-bold text-xs uppercase tracking-[0.2em] transition-colors"
                >
                  DOWNLOAD VALUATION ENQUIRY
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
