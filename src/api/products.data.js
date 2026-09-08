// Mock "database" for the Marketplace. In a real build this file is replaced
// by a network call to the 1Fi backend — every consumer of this data goes
// through src/api/marketplaceApi.js, never imports this file directly.

export const CATEGORIES = ['All', 'Phones', 'Laptops', 'Audio', 'Wearables'];

export const PRODUCTS = [
  {
    id: 'p-iphone-15',
    name: 'iPhone 15',
    brand: 'Apple',
    category: 'Phones',
    icon: '📱',
    accent: '#111827',
    rating: 4.7,
    reviews: 2431,
    basePrice: 79900,
    description:
      'A15 Bionic chip, a 48MP main camera and all-day battery life, in a durable aerospace-grade aluminium design.',
    highlights: ['6.1" Super Retina XDR display', 'Dynamic Island', '48MP main camera', 'USB-C'],
    variants: {
      label: 'Storage',
      options: [
        { id: 'v-128', label: '128GB', priceDelta: 0 },
        { id: 'v-256', label: '256GB', priceDelta: 10000 },
        { id: 'v-512', label: '512GB', priceDelta: 30000 },
      ],
    },
  },
  {
    id: 'p-macbook-air',
    name: 'MacBook Air M3',
    brand: 'Apple',
    category: 'Laptops',
    icon: '💻',
    accent: '#1F2937',
    rating: 4.8,
    reviews: 1189,
    basePrice: 114900,
    description:
      'The M3 chip brings a huge leap in performance and battery life to the thinnest, lightest MacBook ever.',
    highlights: ['13.6" Liquid Retina display', 'Up to 18 hours battery', 'M3 chip', 'Fanless design'],
    variants: {
      label: 'Memory',
      options: [
        { id: 'v-8', label: '8GB / 256GB', priceDelta: 0 },
        { id: 'v-16', label: '16GB / 512GB', priceDelta: 20000 },
      ],
    },
  },
  {
    id: 'p-royal-enfield',
    name: 'Royal Enfield Classic 350',
    brand: 'Royal Enfield',
    category: 'Wearables',
    icon: '🏍️',
    accent: '#7C2D12',
    rating: 4.5,
    reviews: 864,
    basePrice: 193000,
    description:
      'Timeless design meets modern engineering — the J-series 349cc engine delivers smooth, torque-rich performance.',
    highlights: ['349cc J-series engine', 'Dual-channel ABS', 'Classic styling', '5-speed gearbox'],
    variants: {
      label: 'Colour',
      options: [
        { id: 'v-black', label: 'Stealth Black', priceDelta: 0 },
        { id: 'v-red', label: 'Chrome Red', priceDelta: 8000 },
      ],
    },
  },
  {
    id: 'p-sony-wh1000',
    name: 'Sony WH-1000XM5',
    brand: 'Sony',
    category: 'Audio',
    icon: '🎧',
    accent: '#374151',
    rating: 4.6,
    reviews: 3021,
    basePrice: 29990,
    description:
      'Industry-leading noise cancellation with two processors controlling eight microphones for exceptional silence.',
    highlights: ['30-hour battery', 'Industry-leading ANC', 'Multipoint connection', 'Speak-to-chat'],
    variants: {
      label: 'Colour',
      options: [
        { id: 'v-black', label: 'Black', priceDelta: 0 },
        { id: 'v-silver', label: 'Platinum Silver', priceDelta: 0 },
      ],
    },
  },
  {
    id: 'p-samsung-s24',
    name: 'Galaxy S24 Ultra',
    brand: 'Samsung',
    category: 'Phones',
    icon: '📱',
    accent: '#1E3A8A',
    rating: 4.6,
    reviews: 1745,
    basePrice: 129999,
    description:
      'Galaxy AI is here. A titanium frame, a 200MP camera, and the built-in S Pen make this the ultimate Ultra.',
    highlights: ['200MP camera', 'Built-in S Pen', 'Titanium frame', 'Snapdragon 8 Gen 3'],
    variants: {
      label: 'Storage',
      options: [
        { id: 'v-256', label: '256GB', priceDelta: 0 },
        { id: 'v-512', label: '512GB', priceDelta: 12000 },
      ],
    },
  },
  {
    id: 'p-lg-oled-tv',
    name: 'LG 55" OLED C3',
    brand: 'LG',
    category: 'Wearables',
    icon: '📺',
    accent: '#0F172A',
    rating: 4.7,
    reviews: 592,
    basePrice: 139990,
    description:
      'Self-lit OLED pixels deliver perfect black and infinite contrast, powered by the a9 Gen6 AI processor.',
    highlights: ['4K Self-Lit OLED', 'a9 Gen6 AI Processor', '120Hz refresh rate', 'Dolby Vision'],
    variants: {
      label: 'Size',
      options: [
        { id: 'v-55', label: '55 inch', priceDelta: 0 },
        { id: 'v-65', label: '65 inch', priceDelta: 60000 },
      ],
    },
  },
];

// EMI templates the way a finance/lending service would expose them —
// tenure + fee schedule, independent of any single product.
export const EMI_TEMPLATES = [
  { id: 'emi-3', tenureMonths: 3, type: 'no-cost', processingFeePct: 0 },
  { id: 'emi-6', tenureMonths: 6, type: 'no-cost', processingFeePct: 0 },
  { id: 'emi-9', tenureMonths: 9, type: 'standard', processingFeePct: 1.5, annualInterestPct: 10 },
  { id: 'emi-12', tenureMonths: 12, type: 'standard', processingFeePct: 1.5, annualInterestPct: 10 },
];
