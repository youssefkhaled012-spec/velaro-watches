import { useShop } from '../context/ShopContext';

export function ClientCarePage() {
  const { setActivePage, showToast } = useShop();
  const answers = [
    ['Purchasing a timepiece', 'Browse the catalogue, save your favourites, and add watches to your bag. You can download a purchase enquiry with your selected references and quantities. Online payments, stock reservations and order submission are not available in this boutique preview.'],
    ['Delivery, returns and warranty', 'The storefront presents the proposed insured delivery, 14-day returns and warranty services. Final eligibility, destinations, costs and coverage must be confirmed by the boutique before any purchase. No shipment or warranty is issued through this preview.'],
    ['Private sourcing and valuations', 'Sourcing, sale, trade and concierge forms prepare downloadable enquiries. Your details are not sent to an advisor. Selected photographs remain on your device; only their filenames are included in valuation drafts.'],
    ['Catalogue and certificates', 'Products, prices, imagery, inspection reports and the example collector account are demonstration content. Downloaded reports are sample catalogue summaries, not issued certificates of authenticity.'],
    ['Currency display', 'USD is the catalogue base currency. EUR, GBP and EGP displays use illustrative fixed conversion rates. They are not live exchange quotes or a final transaction price.'],
    ['Privacy and local data', 'Your bag, wishlist, display currency and newsletter interest are saved in this browser. Enquiry forms download directly to your device. External image and font providers receive normal browser requests when their assets load. This preview does not use an analytics or advertising integration.'],
    ['Terms of this preview', 'This website lets you explore a proposed boutique experience. Downloading an enquiry does not create an order, contract, appointment or subscription. Published commercial terms and a connected fulfilment service are required before live trading.']
  ];
  return <div className="page-shell max-w-5xl mx-auto px-6 pb-24">
    <p className="eyebrow">AT YOUR SERVICE</p>
    <h1 className="font-serif text-5xl sm:text-7xl mt-3 mb-5">Client care.</h1>
    <p className="text-sm text-velaro-muted leading-relaxed max-w-xl mb-12">A considered experience, from your first discovery to your next acquisition. Find answers about this boutique preview below.</p>
    <div className="border-t border-velaro-border">{answers.map(([title, answer]) => <details key={title} className="border-b border-velaro-border py-6 group">
      <summary className="font-serif text-2xl cursor-pointer text-velaro-white group-open:text-velaro-gold">{title}</summary>
      <p className="text-sm text-velaro-muted leading-7 max-w-3xl mt-5">{answer}</p>
    </details>)}</div>
    <div className="mt-12 flex flex-wrap gap-4">
      <button className="gold-button" onClick={() => setActivePage('bespoke')}>Prepare a concierge enquiry</button>
      <button className="px-6 py-3 border border-velaro-border text-xs uppercase tracking-widest" onClick={() => {
        try { localStorage.removeItem('velaro-newsletter-interest'); showToast('NEWSLETTER INTEREST CLEARED', 'Your saved email has been removed from this browser.'); }
        catch { showToast('STORAGE UNAVAILABLE', 'Browser storage is currently disabled.'); }
      }}>Clear newsletter interest</button>
    </div>
  </div>;
}
