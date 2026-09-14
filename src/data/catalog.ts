import { VELARO_BRANDS, VELARO_PRODUCTS, WatchProductVelaro } from './velaroData';
import { BRANDS_CATALOG, WATCHES_CATALOG, WatchProduct } from './watchesData';

// Preserve the original catalogue while using the newer USD shop model.
// This is the project's illustrative conversion rate, not a live quote.
export const DEMO_EGP_RATE = 49;
export function toShopProduct(product: WatchProduct | WatchProductVelaro): WatchProductVelaro {
  if ('priceUsd' in product) return product;
  const current = VELARO_PRODUCTS.find(p => p.reference === product.reference);
  if (current) return current;
  return {
    id: product.id, reference: product.reference, brand: product.brand,
    name: product.name, subTitle: product.subTitle, priceUsd: product.priceEgp / DEMO_EGP_RATE,
    category: product.category === 'Sport' ? 'Sports' : product.category === 'Luxury' || product.category === 'Certified Pre-Owned' || product.category === 'Bespoke' ? 'Dress' : product.category,
    gender: product.gender, condition: product.isPreOwned ? 'Excellent' : 'New',
    year: product.year ?? 2026, set: product.boxAndPapers === 'Archive Papers' ? 'Archive Papers' : 'Box & Papers',
    isNewArrival: product.isNew, isBestseller: product.isBestseller, isLimitedEdition: product.isLimited,
    isPreOwned: product.isPreOwned, isLuxuryVault: product.isLuxurySuite, isAccessory: product.isAccessory,
    badges: [product.isAccessory ? 'Accessory' : 'Archive Selection', ...(product.isNew ? ['New Arrival'] : [])],
    images: { front: product.images[0], side: product.images[1] },
    description: product.description, story: product.craftsmanshipDetail,
    conditionScorecard: { caseScore: 0, crystalScore: 0, braceletScore: 0, claspScore: 0, notes: 'Inspection report not supplied for this archive reference.' },
    specs: {
      general: { brand: product.brand, collection: product.name, reference: product.reference, year: product.year ?? 2026, condition: product.isPreOwned ? 'Excellent' : 'New' },
      case: { material: product.caseMaterial, diameterMm: product.caseSizeMm, thicknessMm: 0, waterResistance: product.waterResistance, crystal: product.crystal, caseback: 'Not specified' },
      movement: { calibre: product.movement, type: product.movement === 'Manual Wind' ? 'Manual' : product.movement === 'N/A' ? 'Quartz' : product.movement, powerReserve: product.powerReserve ?? 'Not applicable', functions: product.craftsmanshipDetail },
      dial: { color: product.dialColor, indexes: 'Not specified', hands: 'Not specified' },
      bracelet: { material: product.strapMaterial, color: 'Not specified', clasp: 'Not specified' },
      set: { originalBox: product.boxAndPapers === 'Original Box & Papers', originalPapers: product.boxAndPapers === 'Original Box & Papers', warrantyCard: false, accessories: product.boxAndPapers ?? 'See original product description' }
    }
  };
}
export const SHOP_PRODUCTS = [...VELARO_PRODUCTS, ...WATCHES_CATALOG.filter(p => !VELARO_PRODUCTS.some(v => v.reference === p.reference)).map(toShopProduct)];
export const SHOP_BRANDS = [...VELARO_BRANDS, ...BRANDS_CATALOG.filter(b => !VELARO_BRANDS.some(v => v.name.toLowerCase() === b.name.toLowerCase())).map(b => ({ ...b, slug: b.name.toLowerCase().replace(/\s+/g, '-'), description: b.tagline, heroImage: b.previewImage, subcategories: [] }))];
export const isPreOwned = (product: WatchProductVelaro) => !!product.isPreOwned || ['Excellent', 'Very Good', 'Good'].includes(product.condition);
