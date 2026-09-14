export interface WatchProduct {
  id: string;
  reference: string;
  brand: string;
  name: string;
  subTitle?: string;
  priceEgp: number;
  monthlyInstallmentEgp: number;
  category: 'Automatic' | 'Chronograph' | 'Dress' | 'Sport' | 'Everyday' | 'Luxury' | 'Certified Pre-Owned' | 'Accessories' | 'Bespoke';
  gender: 'Men' | 'Women' | 'Unisex' | 'Accessories';
  movement: 'Automatic' | 'Manual Wind' | 'Quartz' | 'Solar' | 'Co-Axial' | 'N/A';
  caseSizeMm: number;
  caseMaterial: string;
  waterResistance: string;
  crystal: string;
  strapMaterial: string;
  powerReserve?: string;
  dialColor: string;
  isNew?: boolean;
  isLimited?: boolean;
  isPreOwned?: boolean;
  isBestseller?: boolean;
  isLuxurySuite?: boolean;
  isAccessory?: boolean;
  condition?: string;
  year?: number;
  boxAndPapers?: 'Original Box & Papers' | 'Archive Papers' | 'Valere Certified Vault Box';
  warrantyYears: number;
  images: string[];
  description: string;
  craftsmanshipDetail: string;
}

export interface BrandInfo {
  name: string;
  origin: string;
  founded: number;
  tagline: string;
  previewImage: string;
}

export interface JournalArticle {
  id: string;
  category: 'WATCH GUIDES' | 'HOROLOGY' | 'BUYING GUIDES';
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  author: string;
}

export interface CustomerReview {
  id: string;
  name: string;
  title: string;
  location: string;
  comment: string;
  watchPurchased: string;
  rating: number;
  date: string;
}

export const BRANDS_CATALOG: BrandInfo[] = [
  {
    name: 'TISSOT',
    origin: 'Le Locle, Switzerland',
    founded: 1853,
    tagline: 'Innovators by Tradition',
    previewImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'LONGINES',
    origin: 'Saint-Imier, Switzerland',
    founded: 1832,
    tagline: 'Elegance is an Attitude',
    previewImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'SEIKO',
    origin: 'Tokyo, Japan',
    founded: 1881,
    tagline: 'Always One Step Ahead of the Rest',
    previewImage: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'CITIZEN',
    origin: 'Tokyo, Japan',
    founded: 1918,
    tagline: 'Better Starts Now',
    previewImage: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'RADO',
    origin: 'Lengnau, Switzerland',
    founded: 1917,
    tagline: 'Master of Materials',
    previewImage: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'HAMILTON',
    origin: 'Bienne, Switzerland',
    founded: 1892,
    tagline: 'American Spirit, Swiss Precision',
    previewImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'ORIS',
    origin: 'Hölstein, Switzerland',
    founded: 1904,
    tagline: 'Real Watches for Real People',
    previewImage: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200'
  },
  {
    name: 'GRAND SEIKO',
    origin: 'Shizukuishi, Japan',
    founded: 1960,
    tagline: 'The Nature of Time',
    previewImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200'
  }
];

export const WATCHES_CATALOG: WatchProduct[] = [
  {
    id: 'tissot-prx-powermatic-80',
    reference: 'T137.407.11.041.00',
    brand: 'TISSOT',
    name: 'PRX Powermatic 80',
    subTitle: 'Deep Blue Waffle Dial Steel Integrated',
    priceEgp: 38500,
    monthlyInstallmentEgp: 3200,
    category: 'Automatic',
    gender: 'Men',
    movement: 'Automatic',
    caseSizeMm: 40,
    caseMaterial: '316L Stainless Steel',
    waterResistance: '100m / 10 bar',
    crystal: 'Scratch-resistant Sapphire Crystal with Anti-reflective Coating',
    strapMaterial: 'Integrated Stainless Steel Bracelet',
    powerReserve: '80 Hours',
    dialColor: 'Sunray Blue Waffle Pattern',
    isNew: true,
    isBestseller: true,
    warrantyYears: 3,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'An evocative 1978 design revived with modern mechanical perfection. The Tissot PRX Powermatic 80 features an integrated case design, slim profile, and a waffle dial that catches architectural light.',
    craftsmanshipDetail: 'Engineered with the Nivachron balance spring for enhanced magnetic field resistance and an extraordinary 80-hour power reserve.'
  },
  {
    id: 'longines-master-collection-moonphase',
    reference: 'L2.909.4.92.6',
    brand: 'LONGINES',
    name: 'Master Collection Moonphase',
    subTitle: 'Sunray Blue Dial Moonphase Automatic',
    priceEgp: 112000,
    monthlyInstallmentEgp: 9330,
    category: 'Dress',
    gender: 'Men',
    movement: 'Automatic',
    caseSizeMm: 40,
    caseMaterial: 'Stainless Steel',
    waterResistance: '30m / 3 bar',
    crystal: 'Sapphire Crystal with Multilayered Anti-Reflective Coating',
    strapMaterial: 'Stainless Steel Bracelet & Navy Alligator Leather',
    powerReserve: '72 Hours',
    dialColor: 'Sunray Blue with Barleycorn Engraving',
    isBestseller: true,
    warrantyYears: 5,
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'A benchmark of traditional Swiss horological elegance. Features a moonphase complication at 6 o’clock surrounded by a date subdial ring.',
    craftsmanshipDetail: 'Powered by the exclusive Longines Calibre L899 automatic movement with silicon balance spring.'
  },
  {
    id: 'longines-dolcevita-diamond-women',
    reference: 'L5.255.4.71.6',
    brand: 'LONGINES',
    name: 'DolceVita Diamond Art Deco',
    subTitle: 'Silver Flinqué Dial Diamond Bezel Steel',
    priceEgp: 89000,
    monthlyInstallmentEgp: 7410,
    category: 'Dress',
    gender: 'Women',
    movement: 'Quartz',
    caseSizeMm: 32,
    caseMaterial: 'Stainless Steel set with 46 Top Wesselton IF-VVS Diamonds',
    waterResistance: '30m / 3 bar',
    crystal: 'Scratch-resistant Sapphire Crystal',
    strapMaterial: 'Stainless Steel Bracelet with Triple Safety Folding Clasp',
    dialColor: 'Silver Flinqué with Painted Roman Numerals',
    isNew: true,
    isBestseller: true,
    warrantyYears: 5,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Inspired by the Italian sweet life (la dolce vita). Rectangular Art Deco case geometry decorated with conflict-free brilliant diamonds.',
    craftsmanshipDetail: 'High-precision Swiss quartz movement housed in an ergonomically curved stainless steel case.'
  },
  {
    id: 'seiko-prospex-speedtimer-solar',
    reference: 'SSC813',
    brand: 'SEIKO',
    name: 'Prospex Speedtimer Solar Chronograph',
    subTitle: 'White Panda Dial Stainless Steel',
    priceEgp: 34000,
    monthlyInstallmentEgp: 2830,
    category: 'Chronograph',
    gender: 'Men',
    movement: 'Solar',
    caseSizeMm: 39,
    caseMaterial: 'Stainless Steel with Super-Hard Coating',
    waterResistance: '100m / 10 bar',
    crystal: 'Curved Sapphire Crystal',
    strapMaterial: 'Three-link Stainless Steel Bracelet',
    powerReserve: '6 Months (Full Charge)',
    dialColor: 'Matte White Panda with Black Subdials',
    isNew: true,
    warrantyYears: 3,
    images: [
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Inspired by Seiko’s 1969 chronograph heritage. Compact 39mm proportions with solar accuracy powered by any ambient light source.',
    craftsmanshipDetail: 'Calibre V192 solar movement charges under indoor or outdoor light, eliminating the need for battery replacements.'
  },
  {
    id: 'rado-captain-cook-high-tech-ceramic',
    reference: 'R32127162',
    brand: 'RADO',
    name: 'Captain Cook High-Tech Ceramic',
    subTitle: 'Skeleton Dial Plasma Ceramic Automatic',
    priceEgp: 168000,
    monthlyInstallmentEgp: 14000,
    category: 'Sport',
    gender: 'Unisex',
    movement: 'Automatic',
    caseSizeMm: 43,
    caseMaterial: 'Plasma High-Tech Ceramic Monobloc',
    waterResistance: '300m / 30 bar',
    crystal: 'Boxed Sapphire Crystal with Double Anti-Reflective Coating',
    strapMaterial: 'Plasma High-Tech Ceramic Bracelet',
    powerReserve: '80 Hours',
    dialColor: 'Tinted Black Sapphire Skeleton',
    isLimited: true,
    warrantyYears: 5,
    images: [
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'The pinnacle of material innovation. High-tech scratch-proof ceramic constructed with a transparent tinted sapphire glass dial revealing the mechanical heart.',
    craftsmanshipDetail: 'Plasma ceramic technology created at temperatures up to 20,000°C gives metal-like metallic lustre with ceramic scratch resistance.'
  },
  {
    id: 'rolex-submariner-date-41',
    reference: '126610LN',
    brand: 'ROLEX',
    name: 'Submariner Date 41mm',
    subTitle: 'Oystersteel Black Cerachrom Bezel',
    priceEgp: 780000,
    monthlyInstallmentEgp: 65000,
    category: 'Luxury',
    gender: 'Men',
    movement: 'Automatic',
    caseSizeMm: 41,
    caseMaterial: 'Oystersteel (904L)',
    waterResistance: '300m / 30 bar',
    crystal: 'Scratch-resistant Sapphire with Cyclops Lens',
    strapMaterial: 'Oyster Bracelet with Oysterlock Safety Clasp',
    powerReserve: '70 Hours',
    dialColor: 'Black Glossy Lacquer',
    isLuxurySuite: true,
    isLimited: true,
    warrantyYears: 5,
    images: [
      'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'The quintessential luxury diver’s watch. Featuring the rotatable Cerachrom bezel and solid Oystersteel link bracelet.',
    craftsmanshipDetail: 'Superlative Chronometer certification (COSC + Rolex testing after casing) guaranteeing -2/+2 seconds per day accuracy.'
  },
  {
    id: 'patek-philippe-nautilus-5711',
    reference: '5711/1A-010',
    brand: 'PATEK PHILIPPE',
    name: 'Nautilus Automatic 40mm',
    subTitle: 'Blue Gradient Horizontal Embossed Dial',
    priceEgp: 4200000,
    monthlyInstallmentEgp: 350000,
    category: 'Certified Pre-Owned',
    gender: 'Men',
    movement: 'Automatic',
    caseSizeMm: 40,
    caseMaterial: 'Stainless Steel',
    waterResistance: '120m / 12 bar',
    crystal: 'Sapphire Crystal Front & Case Back',
    strapMaterial: 'Integrated Steel Bracelet',
    powerReserve: '45 Hours',
    dialColor: 'Gradated Blue Black',
    isLuxurySuite: true,
    isPreOwned: true,
    condition: 'Unworn / Vault Condition',
    year: 2021,
    boxAndPapers: 'Original Box & Papers',
    warrantyYears: 5,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'An iconic Gérald Genta masterpiece. Porthole case structure, horizontally embossed dial, and hand-finished satin-brushed steel bezel.',
    craftsmanshipDetail: 'Calibre 26-330 S C with 21K gold central rotor and Patek Philippe Seal certification.'
  },
  {
    id: 'omega-speedmaster-moonwatch-professional',
    reference: '310.30.42.50.01.002',
    brand: 'OMEGA',
    name: 'Speedmaster Moonwatch Professional',
    subTitle: 'Co-Axial Master Chronometer Sapphire Sandwich',
    priceEgp: 390000,
    monthlyInstallmentEgp: 32500,
    category: 'Chronograph',
    gender: 'Men',
    movement: 'Manual Wind',
    caseSizeMm: 42,
    caseMaterial: 'Stainless Steel',
    waterResistance: '50m / 5 bar',
    crystal: 'Domed Scratch-resistant Sapphire with Anti-reflective Treatment Inside',
    strapMaterial: 'Brushed & Polished Stainless Steel Bracelet',
    powerReserve: '50 Hours',
    dialColor: 'Step Black Matte',
    isLuxurySuite: true,
    isBestseller: true,
    warrantyYears: 5,
    images: [
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'The world’s most famous chronograph, qualified by NASA for all manned space missions since 1965. Features the classic step dial and sapphire exhibition back.',
    craftsmanshipDetail: 'Calibre 3861 manual-wind chronograph certified to METAS standards, resistant to magnetic fields of up to 15,000 gauss.'
  },
  {
    id: 'grand-seiko-snowflake-spring-drive',
    reference: 'SBGA211',
    brand: 'GRAND SEIKO',
    name: 'Heritage Snowflake Spring Drive',
    subTitle: 'High-Intensity Titanium White Snow Dial',
    priceEgp: 295000,
    monthlyInstallmentEgp: 24580,
    category: 'Everyday',
    gender: 'Men',
    movement: 'Automatic',
    caseSizeMm: 41,
    caseMaterial: 'High-Intensity Lightweight Titanium',
    waterResistance: '100m / 10 bar',
    crystal: 'Dual-curved Sapphire Crystal',
    strapMaterial: 'High-Intensity Titanium Bracelet',
    powerReserve: '72 Hours',
    dialColor: 'Snowflake Textured Pure White',
    isBestseller: true,
    warrantyYears: 5,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Captures the texture of freshly fallen snow in the mountains of Shinshu. Features the revolutionary Spring Drive glide-motion seconds hand.',
    craftsmanshipDetail: 'Zaratsu distortion-free mirror polishing executed by master artisans in Japan.'
  },
  {
    id: 'tissot-t-my-lady-automatic',
    reference: 'T132.007.11.116.00',
    brand: 'TISSOT',
    name: 'T-My Lady Automatic Diamonds',
    subTitle: 'Mother of Pearl Dial Diamond Hour Markers',
    priceEgp: 32000,
    monthlyInstallmentEgp: 2660,
    category: 'Dress',
    gender: 'Women',
    movement: 'Automatic',
    caseSizeMm: 29,
    caseMaterial: '316L Stainless Steel',
    waterResistance: '100m / 10 bar',
    crystal: 'Scratch-resistant Sapphire Crystal',
    strapMaterial: 'Stainless Steel Bracelet + Interchangeable Leather Strap',
    powerReserve: '48 Hours',
    dialColor: 'Iridescent Natural Mother of Pearl',
    isNew: true,
    warrantyYears: 3,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Conceived for the modern woman of grace and confidence. Features a mother-of-pearl dial adorned with 8 genuine diamonds.',
    craftsmanshipDetail: 'Swiss automatic calibre movement with Nivachron anti-magnetic balance spring.'
  },
  {
    id: 'valere-vault-quad-watch-winder',
    reference: 'VLR-WND-04',
    brand: 'VALERE VAULT',
    name: 'Valere Automatic Quad Watch Winder',
    subTitle: 'Black Piano Lacquer & Carbon Fibre Interior',
    priceEgp: 28500,
    monthlyInstallmentEgp: 2370,
    category: 'Accessories',
    gender: 'Accessories',
    movement: 'N/A',
    caseSizeMm: 340,
    caseMaterial: 'High-Gloss Piano Lacquer Hardwood & Tempered Glass',
    waterResistance: 'N/A',
    crystal: 'Ultra-Clear Tempered Glass Display Window',
    strapMaterial: 'Japanese Mabuchi Ultra-Silent Motors',
    dialColor: 'Carbon Fibre Weave',
    isAccessory: true,
    warrantyYears: 2,
    images: [
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200'
    ],
    description: 'Keep your self-winding automatic watches precisely wound and ready to wear. Features individual programmable TPD rotation direction motors and LED interior backlight.',
    craftsmanshipDetail: 'Equipped with ultra-quiet Japanese Mabuchi motors and magnetic shielding to prevent movement magnetisation.'
  }
];

export const JOURNAL_ARTICLES: JournalArticle[] = [
  {
    id: 'art-1',
    category: 'HOROLOGY',
    title: 'THE ARCHITECTURE OF SILICON: SWISS MOVEMENTS IN THE 21ST CENTURY',
    excerpt: 'How anti-magnetic silicon escapements and 80-hour power reserves transformed modern mechanical watchmaking.',
    date: 'SEPTEMBER 2026',
    readTime: '6 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200',
    author: 'VALERE HOROLOGY EDITORIAL'
  },
  {
    id: 'art-2',
    category: 'BUYING GUIDES',
    title: 'CERTIFIED PRE-OWNED: HOW TO NAVIGATE PROVENANCE AND AUTHENTICITY',
    excerpt: 'An insider guide to evaluating reference numbers, box & paper validity, and movement inspection criteria.',
    date: 'AUGUST 2026',
    readTime: '8 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
    author: 'VALERE COLLECTOR DESK'
  },
  {
    id: 'art-3',
    category: 'WATCH GUIDES',
    title: 'THE INTEGRATED STEEL CHRONICLE: FROM 1970s ICONS TO MODERN RE-ISSUES',
    excerpt: 'Exploring the aesthetic continuity of integrated bracelets and patterned waffle dials.',
    date: 'JULY 2026',
    readTime: '5 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
    author: 'VALERE CURATOR'
  }
];

export const REVIEWS_LIST: CustomerReview[] = [
  {
    id: 'rev-1',
    name: 'KAREEM EL-SAYED',
    title: 'COLLECTOR & ARCHITECT',
    location: 'CAIRO, EGYPT',
    comment: 'The private concierge consultation for the Patek Nautilus was effortless. Valere verified every detail of the reference and delivered in a vault-grade security casing.',
    watchPurchased: 'PATEK PHILIPPE NAUTILUS 5711',
    rating: 5,
    date: 'AUGUST 2026'
  },
  {
    id: 'rev-2',
    name: 'OMAR NAGUIB',
    title: 'FINANCIAL DIRECTOR',
    location: 'ALEXANDRIA, EGYPT',
    comment: 'Acquired the Longines Master Collection Moonphase via monthly installment. The authenticity documentation and 5-year warranty give complete peace of mind.',
    watchPurchased: 'LONGINES MASTER MOONPHASE',
    rating: 5,
    date: 'JULY 2026'
  },
  {
    id: 'rev-3',
    name: 'TAREK MANSOUR',
    title: 'HOROLOGY ENTHUSIAST',
    location: 'GIZA, EGYPT',
    comment: 'The dark boutique layout and watch finder tool made discovering the Grand Seiko Snowflake seamless. Exceptional white-glove delivery service in Cairo.',
    watchPurchased: 'GRAND SEIKO SNOWFLAKE',
    rating: 5,
    date: 'SEPTEMBER 2026'
  }
];
