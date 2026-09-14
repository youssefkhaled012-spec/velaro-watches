export interface WatchConditionScorecard {
  caseScore: number;
  crystalScore: number;
  braceletScore: number;
  claspScore: number;
  notes: string;
}

export interface WatchSpecifications {
  general: {
    brand: string;
    collection: string;
    reference: string;
    year: number;
    condition: 'New' | 'Unworn' | 'Excellent' | 'Very Good' | 'Good';
  };
  case: {
    material: string;
    diameterMm: number;
    thicknessMm: number;
    waterResistance: string;
    crystal: string;
    caseback: string;
  };
  movement: {
    calibre: string;
    type: 'Automatic' | 'Manual' | 'Quartz' | 'Solar' | 'Co-Axial';
    powerReserve: string;
    jewels?: number;
    functions: string;
  };
  dial: {
    color: string;
    indexes: string;
    hands: string;
  };
  bracelet: {
    material: string;
    color: string;
    clasp: string;
  };
  set: {
    originalBox: boolean;
    originalPapers: boolean;
    warrantyCard: boolean;
    accessories: string;
  };
}

export interface WatchProductVelaro {
  id: string;
  reference: string;
  brand: string;
  name: string;
  subTitle?: string;
  priceUsd: number;
  estimatedMarketMinUsd?: number;
  estimatedMarketMaxUsd?: number;
  retailPriceUsd?: number;
  category: 'Automatic' | 'Mechanical' | 'Quartz' | 'Chronograph' | 'GMT' | 'Diver' | 'Dress' | 'Sports' | 'Everyday' | 'Smart Watches' | 'Accessories';
  gender: 'Men' | 'Women' | 'Unisex' | 'Accessories';
  condition: 'New' | 'Unworn' | 'Excellent' | 'Very Good' | 'Good';
  year: number;
  set: 'Full Set' | 'Box & Papers' | 'Archive Papers' | 'Watch Only';
  isNewArrival?: boolean;
  isBestseller?: boolean;
  isLimitedEdition?: boolean;
  isPreOwned?: boolean;
  isLuxuryVault?: boolean;
  isUnder5k?: boolean;
  is5kTo20k?: boolean;
  isOver20k?: boolean;
  isCollectorsSelection?: boolean;
  isAccessory?: boolean;
  badges: string[];
  images: {
    front: string;
    side?: string;
    caseback?: string;
    bracelet?: string;
    clasp?: string;
    box?: string;
    papers?: string;
    movement?: string;
    macro?: string;
  };
  description: string;
  story: string;
  conditionScorecard: WatchConditionScorecard;
  specs: WatchSpecifications;
}

export interface BrandInfoVelaro {
  tagline?: string;
  name: string;
  slug: string;
  origin: string;
  founded: number;
  description: string;
  heroImage: string;
  subcategories: string[];
}

export interface JournalArticleVelaro {
  body?: string[];
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  imageUrl: string;
  author: string;
}

export const VELARO_BRANDS: BrandInfoVelaro[] = [
  {
    name: 'Rolex',
    slug: 'rolex',
    origin: 'Geneva, Switzerland',
    founded: 1905,
    description: 'An emblem of perfection, precision, and prestige. Discover certified Rolex Daytona, Submariner, GMT-Master II, and Datejust timepieces.',
    heroImage: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1600',
    subcategories: ['Submariner', 'Daytona', 'Datejust', 'GMT-Master II', 'Day-Date', 'Explorer', 'Yacht-Master']
  },
  {
    name: 'Patek Philippe',
    slug: 'patek-philippe',
    origin: 'Geneva, Switzerland',
    founded: 1839,
    description: 'You never actually own a Patek Philippe. You merely look after it for the next generation.',
    heroImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1600',
    subcategories: ['Nautilus', 'Aquanaut', 'Calatrava', 'Complications', 'Grand Complications']
  },
  {
    name: 'Audemars Piguet',
    slug: 'audemars-piguet',
    origin: 'Le Brassus, Switzerland',
    founded: 1875,
    description: 'To break the rules, you must first master them. Home of the legendary Royal Oak.',
    heroImage: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1600',
    subcategories: ['Royal Oak', 'Royal Oak Offshore', 'Code 11.59', 'Royal Oak Concept']
  },
  {
    name: 'Cartier',
    slug: 'cartier',
    origin: 'Paris, France',
    founded: 1847,
    description: 'The Jeweller of Kings and King of Jewellers. Iconic Santos, Tank, and Ballon Bleu creations.',
    heroImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1600',
    subcategories: ['Santos', 'Tank', 'Ballon Bleu', 'Panthère', 'Pasha']
  },
  {
    name: 'Omega',
    slug: 'omega',
    origin: 'Bienne, Switzerland',
    founded: 1848,
    tagline: 'Precision and Space Heritage',
    description: 'The first watch on the Moon and official timekeeper of the Olympic Games.',
    heroImage: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1600',
    subcategories: ['Speedmaster', 'Seamaster', 'Constellation', 'De Ville']
  },
  {
    name: 'Richard Mille',
    slug: 'richard-mille',
    origin: 'Les Breuleux, Switzerland',
    founded: 2001,
    description: 'A racing machine on the wrist. High-tech materials and ultra-lightweight tonneau cases.',
    heroImage: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1600',
    subcategories: ['RM 11', 'RM 35', 'RM 67', 'RM 055']
  },
  {
    name: 'Vacheron Constantin',
    slug: 'vacheron-constantin',
    origin: 'Geneva, Switzerland',
    founded: 1755,
    description: 'The world’s oldest continuously operating watch manufacture.',
    heroImage: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1600',
    subcategories: ['Overseas', 'Patrimony', 'Historiques', 'Traditionnelle']
  },
  {
    name: 'Tudor',
    slug: 'tudor',
    origin: 'Geneva, Switzerland',
    founded: 1926,
    description: 'Born to Dare. Robust tool watches powered by high-performance manufacture movements.',
    heroImage: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1600',
    subcategories: ['Black Bay', 'Pelagos', 'Royal', 'Ranger']
  }
];

export const VELARO_PRODUCTS: WatchProductVelaro[] = [
  {
    id: 'rolex-daytona-126500ln',
    reference: '126500LN',
    brand: 'Rolex',
    name: 'Cosmograph Daytona',
    subTitle: 'White Dial Cerachrom Bezel Oystersteel',
    priceUsd: 34950,
    estimatedMarketMinUsd: 34000,
    estimatedMarketMaxUsd: 36500,
    retailPriceUsd: 15100,
    category: 'Chronograph',
    gender: 'Men',
    condition: 'Unworn',
    year: 2026,
    set: 'Full Set',
    isNewArrival: true,
    isBestseller: true,
    isLuxuryVault: true,
    isOver20k: true,
    isCollectorsSelection: true,
    badges: ['Certified', 'Full Set', 'Unworn'],
    images: {
      front: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1200',
      side: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200',
      caseback: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200',
      bracelet: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
      box: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200'
    },
    description: 'The legendary chronograph benchmark. Featuring the re-proportioned 41mm Oystersteel case, moulded black Cerachrom bezel with platinum PVD tachymeter scale, and the new Calibre 4131 automatic movement.',
    story: 'First introduced in 1963 to meet the demands of professional racing drivers, the Rolex Cosmograph Daytona has achieved legendary status among collectors worldwide.',
    conditionScorecard: {
      caseScore: 10,
      crystalScore: 10,
      braceletScore: 10,
      claspScore: 10,
      notes: 'Unworn vault condition. Original protective factory stickers intact on clasp interior. Full green warranty card dated 2026.'
    },
    specs: {
      general: {
        brand: 'Rolex',
        collection: 'Cosmograph Daytona',
        reference: '126500LN',
        year: 2026,
        condition: 'Unworn'
      },
      case: {
        material: 'Oystersteel (904L)',
        diameterMm: 40,
        thicknessMm: 11.9,
        waterResistance: '100m / 330ft',
        crystal: 'Scratch-resistant Sapphire',
        caseback: 'Solid Monobloc Oystersteel'
      },
      movement: {
        calibre: 'Rolex Calibre 4131',
        type: 'Automatic',
        powerReserve: '72 Hours',
        jewels: 47,
        functions: 'Central hours & minutes, small seconds, 12-hour chronograph'
      },
      dial: {
        color: 'White Lacquer with Black Snails Rings',
        indexes: '18ct White Gold Hour Markers with Chromalight',
        hands: '18ct White Gold Hands'
      },
      bracelet: {
        material: 'Oystersteel (904L)',
        color: 'Brushed & Polished Steel',
        clasp: 'Folding Oysterlock with Easylink 5mm extension'
      },
      set: {
        originalBox: true,
        originalPapers: true,
        warrantyCard: true,
        accessories: 'Green Chronometer Tag, White Serial Tag, Instruction Booklet, Wallet'
      }
    }
  },
  {
    id: 'patek-philippe-nautilus-5711',
    reference: '5711/1A-010',
    brand: 'Patek Philippe',
    name: 'Nautilus Automatic 40mm',
    subTitle: 'Blue Gradient Horizontal Embossed Dial',
    priceUsd: 118000,
    estimatedMarketMinUsd: 115000,
    estimatedMarketMaxUsd: 122000,
    category: 'Automatic',
    gender: 'Men',
    condition: 'Unworn',
    year: 2021,
    set: 'Full Set',
    isBestseller: true,
    isLuxuryVault: true,
    isOver20k: true,
    isCollectorsSelection: true,
    isPreOwned: true,
    badges: ['Certified', 'Vault Grail', 'Full Set'],
    images: {
      front: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
      side: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
      caseback: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200'
    },
    description: 'Gérald Genta’s iconic 1976 luxury sports design in its purest stainless steel form. Features the gradated blue-black dial with horizontal embossing.',
    story: 'Discontinued in 2021, the 5711/1A-010 stands as one of the most sought-after horologicalGrails of the 21st century.',
    conditionScorecard: {
      caseScore: 9.9,
      crystalScore: 10,
      braceletScore: 9.8,
      claspScore: 9.8,
      notes: 'Unworn vault collection specimen. Complete Certificate of Origin stamped by authorized boutique in Geneva.'
    },
    specs: {
      general: {
        brand: 'Patek Philippe',
        collection: 'Nautilus',
        reference: '5711/1A-010',
        year: 2021,
        condition: 'Unworn'
      },
      case: {
        material: 'Stainless Steel',
        diameterMm: 40,
        thicknessMm: 8.3,
        waterResistance: '120m',
        crystal: 'Sapphire Crystal',
        caseback: 'Sapphire Crystal Exhibition Back'
      },
      movement: {
        calibre: 'Calibre 26-330 S C',
        type: 'Automatic',
        powerReserve: '45 Hours',
        jewels: 30,
        functions: 'Hours, minutes, sweep seconds, date'
      },
      dial: {
        color: 'Gradated Blue Black',
        indexes: 'Gold Applied Hour Markers with Luminescent Coating',
        hands: 'Luminescent Steel Baton'
      },
      bracelet: {
        material: 'Stainless Steel',
        color: 'Satin & Polished Steel',
        clasp: 'Fold-Over Clasp'
      },
      set: {
        originalBox: true,
        originalPapers: true,
        warrantyCard: true,
        accessories: 'Patek Certificate of Origin, Leather Portfolio, Box'
      }
    }
  },
  {
    id: 'audemars-piguet-royal-oak-15500st',
    reference: '15500ST.OO.1220ST.01',
    brand: 'Audemars Piguet',
    name: 'Royal Oak Selfwinding 41mm',
    subTitle: 'Grande Tapisserie Black Dial Steel',
    priceUsd: 42500,
    estimatedMarketMinUsd: 41000,
    estimatedMarketMaxUsd: 44000,
    category: 'Sports',
    gender: 'Men',
    condition: 'Excellent',
    year: 2024,
    set: 'Full Set',
    isNewArrival: true,
    isOver20k: true,
    badges: ['Certified', 'Full Set'],
    images: {
      front: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200',
      side: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1200'
    },
    description: 'Octagonal bezel with eight hexagonal screws, integrated bracelet, and the hand-carved Grande Tapisserie pattern.',
    story: 'The Royal Oak revolutionized watchmaking in 1972 as the world’s first luxury stainless steel sports watch.',
    conditionScorecard: {
      caseScore: 9.6,
      crystalScore: 10,
      braceletScore: 9.5,
      claspScore: 9.5,
      notes: 'Excellent condition with micro hairline marks on bezel bevel. Full box and digital warranty extended through 2029.'
    },
    specs: {
      general: {
        brand: 'Audemars Piguet',
        collection: 'Royal Oak',
        reference: '15500ST.OO.1220ST.01',
        year: 2024,
        condition: 'Excellent'
      },
      case: {
        material: 'Stainless Steel',
        diameterMm: 41,
        thicknessMm: 10.4,
        waterResistance: '50m',
        crystal: 'Glareproofed Sapphire Crystal',
        caseback: 'Glareproofed Sapphire Exhibition Back'
      },
      movement: {
        calibre: 'Manufacture Calibre 4302',
        type: 'Automatic',
        powerReserve: '70 Hours',
        jewels: 32,
        functions: 'Hours, minutes, seconds, date'
      },
      dial: {
        color: 'Black Grande Tapisserie',
        indexes: 'White Gold Applied Markers',
        hands: 'Royal Oak Hands with Luminescent Coating'
      },
      bracelet: {
        material: 'Stainless Steel',
        color: 'Steel',
        clasp: 'AP Folding Clasp'
      },
      set: {
        originalBox: true,
        originalPapers: true,
        warrantyCard: true,
        accessories: 'AP Green Box, Warranty Booklet'
      }
    }
  },
  {
    id: 'cartier-santos-large-model',
    reference: 'WSSA0018',
    brand: 'Cartier',
    name: 'Santos de Cartier Large Model',
    subTitle: 'Silvered Opaline Dial Steel SmartLink',
    priceUsd: 7900,
    estimatedMarketMinUsd: 7600,
    estimatedMarketMaxUsd: 8100,
    category: 'Dress',
    gender: 'Men',
    condition: 'New',
    year: 2025,
    set: 'Full Set',
    is5kTo20k: true,
    isBestseller: true,
    badges: ['Certified', 'New 2025', 'Full Set'],
    images: {
      front: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
      side: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200'
    },
    description: 'Designed in 1904 for aviator Alberto Santos-Dumont. Features the QuickSwitch interchangeable strap system and SmartLink sizing mechanism.',
    story: 'The Santos is recognized as the world’s first purpose-built wristwatch for pilots.',
    conditionScorecard: {
      caseScore: 10,
      crystalScore: 10,
      braceletScore: 10,
      claspScore: 10,
      notes: 'Brand new 2025 boutique delivery with additional calfskin leather strap and stainless steel folding buckle.'
    },
    specs: {
      general: {
        brand: 'Cartier',
        collection: 'Santos de Cartier',
        reference: 'WSSA0018',
        year: 2025,
        condition: 'New'
      },
      case: {
        material: 'Steel',
        diameterMm: 39.8,
        thicknessMm: 9.38,
        waterResistance: '100m',
        crystal: 'Sapphire Crystal',
        caseback: 'Steel Monobloc'
      },
      movement: {
        calibre: 'Calibre 1847 MC',
        type: 'Automatic',
        powerReserve: '42 Hours',
        functions: 'Hours, minutes, seconds, date'
      },
      dial: {
        color: 'Silvered Opaline',
        indexes: 'Roman Numerals',
        hands: 'Blued-Steel Sword-Shaped Hands'
      },
      bracelet: {
        material: 'Steel & Additional Calfskin',
        color: 'Steel & Tan Leather',
        clasp: 'Double Folding Buckle'
      },
      set: {
        originalBox: true,
        originalPapers: true,
        warrantyCard: true,
        accessories: 'Additional Strap, Strap Tool, Red Cartier Box'
      }
    }
  },
  {
    id: 'omega-speedmaster-moonwatch-31030',
    reference: '310.30.42.50.01.002',
    brand: 'Omega',
    name: 'Speedmaster Moonwatch Professional',
    subTitle: 'Co-Axial Master Chronometer Sapphire Sandwich',
    priceUsd: 8000,
    estimatedMarketMinUsd: 7800,
    estimatedMarketMaxUsd: 8200,
    category: 'Chronograph',
    gender: 'Men',
    condition: 'Unworn',
    year: 2026,
    set: 'Full Set',
    is5kTo20k: true,
    isBestseller: true,
    badges: ['Certified', 'METAS Chronometer', 'Full Set'],
    images: {
      front: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200',
      side: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1200'
    },
    description: 'The famous manual-wind chronograph qualified by NASA for all manned space missions. Features the stepped dial and sapphire exhibition caseback.',
    story: 'Worn by astronaut Buzz Aldrin during the Apollo 11 lunar landing in July 1969.',
    conditionScorecard: {
      caseScore: 10,
      crystalScore: 10,
      braceletScore: 10,
      claspScore: 10,
      notes: 'Unworn 2026 METAS Master Chronometer certification passport included.'
    },
    specs: {
      general: {
        brand: 'Omega',
        collection: 'Speedmaster',
        reference: '310.30.42.50.01.002',
        year: 2026,
        condition: 'Unworn'
      },
      case: {
        material: 'Stainless Steel',
        diameterMm: 42,
        thicknessMm: 13.2,
        waterResistance: '50m',
        crystal: 'Domed Sapphire Crystal',
        caseback: 'Sapphire Crystal Exhibition'
      },
      movement: {
        calibre: 'Calibre 3861',
        type: 'Manual',
        powerReserve: '50 Hours',
        jewels: 26,
        functions: 'Chronograph, small seconds, hours, minutes'
      },
      dial: {
        color: 'Step Black Matte',
        indexes: 'Luminescent Transfer',
        hands: 'White Moonwatch Hands'
      },
      bracelet: {
        material: 'Stainless Steel',
        color: 'Steel',
        clasp: 'Comfort Extension Foldover'
      },
      set: {
        originalBox: true,
        originalPapers: true,
        warrantyCard: true,
        accessories: 'Moonwatch Presentation Box, Velcro Strap, Loupe'
      }
    }
  },
  {
    id: 'richard-mille-rm-11-03',
    reference: 'RM11-03',
    brand: 'Richard Mille',
    name: 'RM 11-03 Automatic Flyback Chronograph',
    subTitle: 'Titanium Skeleton Flyback Annual Calendar',
    priceUsd: 245000,
    estimatedMarketMinUsd: 240000,
    estimatedMarketMaxUsd: 255000,
    category: 'Sports',
    gender: 'Men',
    condition: 'Excellent',
    year: 2023,
    set: 'Full Set',
    isLuxuryVault: true,
    isOver20k: true,
    isCollectorsSelection: true,
    badges: ['Certified', 'Hyper Horology', 'Full Set'],
    images: {
      front: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1200',
      side: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200'
    },
    description: 'An avant-garde racing machine for the wrist. Grade 5 titanium tonneau case, variable-geometry rotor, flyback chronograph, and annual calendar.',
    story: 'Inspired by Formula 1 aerodynamics and modern material engineering.',
    conditionScorecard: {
      caseScore: 9.7,
      crystalScore: 10,
      braceletScore: 9.6,
      claspScore: 9.6,
      notes: 'Excellent condition with complete original Richard Mille leather winding box and authenticity passport.'
    },
    specs: {
      general: {
        brand: 'Richard Mille',
        collection: 'RM 11-03',
        reference: 'RM11-03',
        year: 2023,
        condition: 'Excellent'
      },
      case: {
        material: 'Grade 5 Titanium',
        diameterMm: 44.5,
        thicknessMm: 16.15,
        waterResistance: '50m',
        crystal: 'Sapphire Crystal Front & Back',
        caseback: 'Sapphire Exhibition'
      },
      movement: {
        calibre: 'RMAC3',
        type: 'Automatic',
        powerReserve: '55 Hours',
        functions: 'Flyback chronograph, annual calendar, oversized date'
      },
      dial: {
        color: 'Skeletonized Sapphire',
        indexes: 'Arabic Numerals',
        hands: 'Luminescent Skeleton Hands'
      },
      bracelet: {
        material: 'Black Rubber Strap',
        color: 'Black',
        clasp: 'Titanium Folding Buckle'
      },
      set: {
        originalBox: true,
        originalPapers: true,
        warrantyCard: true,
        accessories: 'RM Watch Winder Box, Leather Certificate Folder'
      }
    }
  },
  {
    id: 'rolex-submariner-126610ln',
    reference: '126610LN',
    brand: 'Rolex',
    name: 'Submariner Date 41mm',
    subTitle: 'Black Cerachrom Bezel Oystersteel',
    priceUsd: 15800,
    estimatedMarketMinUsd: 15200,
    estimatedMarketMaxUsd: 16200,
    category: 'Diver',
    gender: 'Men',
    condition: 'Unworn',
    year: 2026,
    set: 'Full Set',
    isNewArrival: true,
    is5kTo20k: true,
    badges: ['Certified', 'Unworn', 'Full Set'],
    images: {
      front: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1200',
      side: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200'
    },
    description: 'The world benchmark for diving watches. 300m water resistance, unidirectionally rotatable Cerachrom bezel with 60-minute graduations.',
    story: 'First created in 1953, the Submariner was the first diver’s wristwatch waterproof to a depth of 100 metres.',
    conditionScorecard: {
      caseScore: 10,
      crystalScore: 10,
      braceletScore: 10,
      claspScore: 10,
      notes: 'Unworn 2026 condition with green chronometer tag and official Rolex warranty.'
    },
    specs: {
      general: {
        brand: 'Rolex',
        collection: 'Submariner',
        reference: '126610LN',
        year: 2026,
        condition: 'Unworn'
      },
      case: {
        material: 'Oystersteel',
        diameterMm: 41,
        thicknessMm: 12.3,
        waterResistance: '300m / 1000ft',
        crystal: 'Sapphire with Cyclops Lens',
        caseback: 'Solid Monobloc'
      },
      movement: {
        calibre: 'Calibre 3235',
        type: 'Automatic',
        powerReserve: '70 Hours',
        functions: 'Centre hours, minutes, seconds, instantaneous date'
      },
      dial: {
        color: 'Black Lacquer',
        indexes: 'Chromalight Luminous Hour Markers',
        hands: 'Mercedes Luminescent Hands'
      },
      bracelet: {
        material: 'Oystersteel',
        color: 'Steel',
        clasp: 'Oysterlock with Glidelock Fine-Adjustment'
      },
      set: {
        originalBox: true,
        originalPapers: true,
        warrantyCard: true,
        accessories: 'Green Card Wallet, Both Hang Tags'
      }
    }
  },
  {
    id: 'tudor-black-bay-58-navy',
    reference: 'M79030B-0001',
    brand: 'Tudor',
    name: 'Black Bay 58 Navy Blue',
    subTitle: 'Matte Blue Dial Steel Rivet Bracelet',
    priceUsd: 3850,
    estimatedMarketMinUsd: 3600,
    estimatedMarketMaxUsd: 4000,
    category: 'Diver',
    gender: 'Men',
    condition: 'Excellent',
    year: 2024,
    set: 'Full Set',
    isUnder5k: true,
    badges: ['Certified', 'Under $5k', 'Full Set'],
    images: {
      front: 'https://images.unsplash.com/photo-1547996160-81dfa63595aa?auto=format&fit=crop&q=80&w=1200',
      side: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?auto=format&fit=crop&q=80&w=1200'
    },
    description: 'Proportioned to vintage 1958 standards with a 39mm case depth and snowflake hands.',
    story: 'Pays tribute to Tudor’s first 200-metre waterproof divers’ watches.',
    conditionScorecard: {
      caseScore: 9.5,
      crystalScore: 10,
      braceletScore: 9.4,
      claspScore: 9.4,
      notes: 'Clean pre-owned example with faint desk diving marks on clasp.'
    },
    specs: {
      general: {
        brand: 'Tudor',
        collection: 'Black Bay',
        reference: 'M79030B-0001',
        year: 2024,
        condition: 'Excellent'
      },
      case: {
        material: 'Steel',
        diameterMm: 39,
        thicknessMm: 11.9,
        waterResistance: '200m',
        crystal: 'Domed Sapphire',
        caseback: 'Steel'
      },
      movement: {
        calibre: 'Calibre MT5402 (COSC)',
        type: 'Automatic',
        powerReserve: '70 Hours',
        functions: 'Hours, minutes, seconds'
      },
      dial: {
        color: 'Matte Navy Blue',
        indexes: 'Luminous Applied Markers',
        hands: 'Snowflake Hands'
      },
      bracelet: {
        material: 'Steel',
        color: 'Rivet Steel',
        clasp: 'Folding Clasp with Safety Catch'
      },
      set: {
        originalBox: true,
        originalPapers: true,
        warrantyCard: true,
        accessories: 'Tudor Box and Guarantee Card'
      }
    }
  },
  {
    id: 'grand-seiko-snowflake-sbga211',
    reference: 'SBGA211',
    brand: 'Grand Seiko',
    name: 'Heritage Snowflake Spring Drive',
    subTitle: 'High-Intensity Titanium Pure White Snow Dial',
    priceUsd: 6200,
    estimatedMarketMinUsd: 5900,
    estimatedMarketMaxUsd: 6400,
    category: 'Everyday',
    gender: 'Men',
    condition: 'New',
    year: 2025,
    set: 'Full Set',
    is5kTo20k: true,
    badges: ['Certified', 'New 2025', 'Full Set'],
    images: {
      front: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
      side: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1200'
    },
    description: 'Captures the texture of freshly fallen snow in the Shinshu mountains. Powered by the glide-motion Spring Drive movement.',
    story: 'Handcrafted at the Shinshu Watch Studio in Japan.',
    conditionScorecard: {
      caseScore: 10,
      crystalScore: 10,
      braceletScore: 10,
      claspScore: 10,
      notes: 'Brand new 2025 boutique delivery.'
    },
    specs: {
      general: {
        brand: 'Grand Seiko',
        collection: 'Heritage',
        reference: 'SBGA211',
        year: 2025,
        condition: 'New'
      },
      case: {
        material: 'High-Intensity Titanium',
        diameterMm: 41,
        thicknessMm: 12.5,
        waterResistance: '100m',
        crystal: 'Dual-curved Sapphire',
        caseback: 'See-through Exhibition'
      },
      movement: {
        calibre: 'Calibre 9R65',
        type: 'Automatic',
        powerReserve: '72 Hours',
        jewels: 30,
        functions: 'Spring Drive glide seconds, power reserve indicator'
      },
      dial: {
        color: 'Snowflake Textured White',
        indexes: 'Zaratsu Polished Applied Markers',
        hands: 'Blued Steel Seconds Hand'
      },
      bracelet: {
        material: 'High-Intensity Titanium',
        color: 'Titanium',
        clasp: 'Three-fold Clasp with Push Button'
      },
      set: {
        originalBox: true,
        originalPapers: true,
        warrantyCard: true,
        accessories: 'Grand Seiko Inspection Certificate, Box'
      }
    }
  }
];

export const VELARO_JOURNAL: JournalArticleVelaro[] = [
  {
    id: 'j-1',
    body: [
      'A thoughtful collection begins with curiosity. Before choosing a reference, consider the moments in which you will wear it: a working day, an evening out, or a journey away. The most rewarding watch is often the one that feels natural on your wrist.',
      'Look beyond the name on the dial. Compare the proportions of the case, the shape of the lugs, the finishing of the bracelet and the legibility of the hands. Our catalogue brings together contrasting approaches, from the integrated silhouette of the Nautilus to the purposeful character of the Submariner.',
      'Keep a small shortlist. Use the comparison table to place dimensions, movements and condition side by side, then return to the details that matter to you. An impressive specification is only useful when it serves the way you want to wear a watch.',
      'Finally, ask questions about the individual example. Request photographs of the actual timepiece, its accompanying documents and any service records before making a decision. A collection should reflect your taste, developed patiently, one considered choice at a time.'
    ],
    slug: 'watches-every-collector-should-know',
    category: 'COLLECTING GUIDE',
    title: 'The Watches Every Collector Should Know',
    excerpt: 'From Gerald Genta’s integrated steel icons to independent horological masterworks, a curated survey of essential timepieces.',
    date: 'SEPTEMBER 2026',
    readTime: '7 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?auto=format&fit=crop&q=80&w=1200',
    author: 'VELARO EDITORIAL DESK'
  },
  {
    id: 'j-2',
    body: [
      'The Daytona is a useful starting point for learning to look closely. A familiar model name can encompass different references, dial treatments and conditions. Begin with the complete reference of the example in front of you, rather than a photograph or a nickname.',
      'Make a note of the details you want to compare: dial colour, bezel finish, bracelet, case proportions and accompanying set. Examine the watch as a whole. A reference you admire in an editorial photograph may feel quite different when you try it on.',
      'Condition belongs to the individual watch. Ask for clear, current photographs of the case, clasp and bracelet, along with the information available about its service history. A broad condition label should begin that conversation, not replace it.',
      'Use a shortlist to separate your preferences from the excitement of a search. Save the references you want to revisit, compare their supplied details, and prepare questions for a specialist. The aim is a well-understood timepiece that you will enjoy wearing.'
    ],
    slug: 'rolex-daytona-collectors-guide',
    category: 'CHRONOGRAPH',
    title: 'Rolex Daytona: A Collector’s Guide',
    excerpt: 'Tracing the evolution from early manual-wind references to the modern 126500LN generation.',
    date: 'AUGUST 2026',
    readTime: '9 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&q=80&w=1200',
    author: 'SENIOR WATCH SPECIALIST'
  },
  {
    id: 'j-3',
    body: [
      'A complication is a function beyond the basic display of time. The appeal may be practical, visual, or simply the pleasure of seeing a small mechanical system perform an additional task. Start with what you would actually like your watch to do.',
      'A chronograph lets you measure an elapsed interval. A calendar brings the date onto the dial. A second time-zone display can help you keep another place in mind. These functions give a watch a different rhythm of use, and often a distinctive arrangement of hands and subdials.',
      'More information is not always more useful. Consider whether the dial remains easy to read and whether the controls feel comfortable to operate. A quieter, simpler face may be as compelling as a richly detailed one.',
      'Before operating or adjusting a particular watch, read its own instructions or ask a qualified specialist. Setting procedures vary by movement. Understanding the piece in your hands is part of the pleasure of owning it.'
    ],
    slug: 'understanding-watch-complications',
    category: 'HOROLOGY',
    title: 'Understanding Watch Complications',
    excerpt: 'Demystifying perpetual calendars, minute repeaters, tourbillons, and split-seconds chronographs.',
    date: 'JULY 2026',
    readTime: '6 MIN READ',
    imageUrl: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&q=80&w=1200',
    author: 'HOROLOGY LAB'
  }
];
