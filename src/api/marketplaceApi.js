import { PRODUCTS, CATEGORIES, EMI_TEMPLATES } from './products.data.js';
import { buildEmiPlans } from '../utils/emi.js';

// A single, small abstraction standing in for a real HTTP client.
// Every export here returns a Promise and can fail, exactly like `fetch`
// would, so hooks/components never need to know whether the data is mocked
// or coming from a live 1Fi backend.

const NETWORK_DELAY_MS = 550;

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

class ApiError extends Error {
  constructor(message, status = 500) {
    super(message);
    this.status = status;
  }
}

/**
 * @param {{ category?: string, query?: string }} params
 */
export async function fetchProducts({ category = 'All', query = '' } = {}) {
  await wait(NETWORK_DELAY_MS);

  let results = PRODUCTS;

  if (category && category !== 'All') {
    results = results.filter((p) => p.category === category);
  }

  if (query.trim()) {
    const q = query.trim().toLowerCase();
    results = results.filter(
      (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q)
    );
  }

  return results.map((p) => ({
    id: p.id,
    name: p.name,
    brand: p.brand,
    category: p.category,
    icon: p.icon,
    accent: p.accent,
    rating: p.rating,
    reviews: p.reviews,
    startingPrice: p.basePrice,
    minTenureMonths: Math.min(...EMI_TEMPLATES.map((t) => t.tenureMonths)),
  }));
}

export async function fetchCategories() {
  await wait(150);
  return CATEGORIES;
}

export async function fetchProductById(productId) {
  await wait(NETWORK_DELAY_MS);

  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    throw new ApiError(`Product "${productId}" was not found.`, 404);
  }

  return product;
}

/**
 * Simulates a backend that prices EMI plans server-side for a given
 * product + variant, rather than the client inventing numbers.
 */
export async function fetchEmiPlans(productId, variantId) {
  await wait(400);

  const product = PRODUCTS.find((p) => p.id === productId);
  if (!product) {
    throw new ApiError(`Product "${productId}" was not found.`, 404);
  }

  const variant = product.variants.options.find((v) => v.id === variantId) ??
    product.variants.options[0];

  const price = product.basePrice + variant.priceDelta;
  return {
    price,
    plans: buildEmiPlans(price, EMI_TEMPLATES),
  };
}

export { ApiError };
