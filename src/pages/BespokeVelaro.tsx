import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { downloadEnquiry } from '../utils/download';

const options = [
  ['ONE OF ONE', 'Custom-designed individual timepieces and limited one-piece creations.'],
  ['CUSTOMIZE AUTOMATIC', 'Enquire about dial, case, strap/bracelet, engraving, and finishing.'],
  ['CUSTOMIZE QUARTZ', 'A simpler, affordable route to a personalised watch.'],
  ['CUSTOM ENGRAVING', 'Caseback engraving and personalisation for a meaningful signature.']
];
export const BespokeVelaro: React.FC = () => {
  const { showToast } = useShop();
  const [form, setForm] = useState({ name:'', email:'', phone:'', type:'ONE OF ONE', style:'', budget:'', message:'' });
  const submit = (e: React.FormEvent) => { e.preventDefault(); downloadEnquiry('bespoke', form); showToast('BESPOKE ENQUIRY READY', 'Your enquiry has been downloaded.', 'info'); setForm({name:'',email:'',phone:'',type:'ONE OF ONE',style:'',budget:'',message:''}); };
  const update = (key: keyof typeof form, value: string) => setForm(prev => ({ ...prev, [key]: value }));
  return <div className="min-h-screen bg-[#080808] text-[#F5F5F5] pt-28 pb-24"><section className="py-20 px-6 text-center border-b border-white/10"><p className="eyebrow">VELARO BESPOKE</p><h1 className="font-serif text-5xl sm:text-7xl mt-4">A Personal Expression of Time.</h1><p className="text-[#A5A5A5] text-sm mt-5">Thoughtful custom watches, shaped around your taste.</p></section><section className="max-w-7xl mx-auto px-6 py-16"><div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">{options.map(([title, text]) => <div key={title} className="bg-[#111] border border-white/10 p-6"><p className="text-[#C6A15B] text-[10px] tracking-widest">{title}</p><p className="text-sm text-[#A5A5A5] mt-4 leading-relaxed">{text}</p></div>)}</div></section><section className="max-w-3xl mx-auto px-6"><div className="border border-white/10 bg-[#111] p-6 sm:p-10"><h2 className="font-serif text-3xl">BEGIN YOUR COMMISSION</h2><form onSubmit={submit} className="grid sm:grid-cols-2 gap-5 mt-8"><input required className="field" placeholder="Name" value={form.name} onChange={e=>update('name',e.target.value)} /><input required type="email" className="field" placeholder="Email" value={form.email} onChange={e=>update('email',e.target.value)} /><input className="field" placeholder="Phone / WhatsApp" value={form.phone} onChange={e=>update('phone',e.target.value)} /><select className="field" value={form.type} onChange={e=>update('type',e.target.value)}>{options.map(([x])=><option key={x}>{x}</option>)}</select><input className="field" placeholder="Watch / Style Preference" value={form.style} onChange={e=>update('style',e.target.value)} /><input className="field" placeholder="Budget" value={form.budget} onChange={e=>update('budget',e.target.value)} /><textarea className="field sm:col-span-2 min-h-32" placeholder="Message" value={form.message} onChange={e=>update('message',e.target.value)} /><button className="gold-button sm:col-span-2" type="submit"><Send size={14} className="inline mr-2" />SUBMIT BESPOKE ENQUIRY</button></form></div></section></div>;
};
