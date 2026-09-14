import { WatchProductVelaro } from '../data/velaroData';
import { isPreOwned } from '../data/catalog';
import type { CollectionFilterStateVelaro } from '../context/ShopContext';

export function matchesFilters(w: WatchProductVelaro, filters: CollectionFilterStateVelaro): boolean {
  const category = filters.category.toLowerCase();
  const movement = w.specs.movement.type.toLowerCase();
  if (filters.brand && w.brand.toLowerCase() !== filters.brand.toLowerCase()) return false;
  if (category) {
    if (['men', 'women', 'unisex'].includes(category)) { if (w.gender.toLowerCase() !== category) return false; }
    else if (['automatic', 'quartz', 'solar', 'mechanical'].includes(category)) { if (movement !== (category === 'mechanical' ? 'manual' : category)) return false; }
    else if (category === 'new arrivals') { if (!w.isNewArrival) return false; }
    else if (category === 'best sellers') { if (!w.isBestseller) return false; }
    else if (category === 'limited editions') { if (!w.isLimitedEdition) return false; }
    else if (category === 'luxury') { if (!w.isLuxuryVault && w.priceUsd < 20000) return false; }
    else if (w.category.toLowerCase() !== (category === 'sport' ? 'sports' : category)) return false;
  }
  if (filters.movement && movement !== filters.movement.toLowerCase()) return false;
  if (filters.condition === 'Pre-Owned' ? !isPreOwned(w) : filters.condition && w.condition !== filters.condition) return false;
  if (w.priceUsd < filters.minPrice || w.priceUsd > filters.maxPrice) return false;
  const size = w.specs.case.diameterMm;
  if (filters.caseSize === 'small' && size >= 38 || filters.caseSize === 'medium' && (size < 38 || size > 41) || filters.caseSize === 'large' && size <= 41) return false;
  const query = filters.searchQuery.trim().toLowerCase();
  return !query || `${w.brand} ${w.name} ${w.reference} ${w.category}`.toLowerCase().includes(query);
}
