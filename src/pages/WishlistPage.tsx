import { Heart } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { SHOP_PRODUCTS } from '../data/catalog';
import { ProductCardVelaro } from '../components/ProductCardVelaro';

export function WishlistPage() {
  const { wishlist, setActivePage } = useShop();
  const products = SHOP_PRODUCTS.filter(p => wishlist.includes(p.id));
  return <div className="page-shell max-w-7xl mx-auto px-6 pb-24">
    <p className="eyebrow">YOUR PERSONAL SELECTION</p>
    <h1 className="font-serif text-5xl sm:text-7xl mt-3 mb-6">The wish list.</h1>
    <p className="text-sm text-velaro-muted mb-12">Exceptional pieces to return to. Saved on this device.</p>
    {products.length ? <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">{products.map(p => <ProductCardVelaro key={p.id} product={p} />)}</div> : <div className="border border-velaro-border bg-velaro-charcoal text-center py-20 px-6">
      <Heart className="mx-auto text-velaro-gold mb-5" size={32} />
      <h2 className="font-serif text-3xl mb-3">Your next chapter awaits.</h2>
      <p className="text-velaro-muted text-sm mb-8">Save a timepiece with the heart icon to start your collection.</p>
      <button className="gold-button" onClick={() => setActivePage('collection')}>Explore watches</button>
    </div>}
  </div>;
}
