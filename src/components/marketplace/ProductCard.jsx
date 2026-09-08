import { formatCurrency } from '../../utils/emi.js';

export default function ProductCard({ product, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(product.id)}
      className="flex flex-col rounded-2xl bg-white p-3 text-left shadow-card active:scale-[0.98] transition-transform"
    >
      <div
        className="mb-3 flex aspect-square w-full items-center justify-center rounded-xl text-4xl"
        style={{ background: `${product.accent}14` }}
      >
        {product.icon}
      </div>
      <p className="line-clamp-1 text-[11px] font-medium text-ink-400">{product.brand}</p>
      <p className="line-clamp-1 text-[13px] font-semibold text-ink-900">{product.name}</p>

      <div className="mt-1.5 flex items-center justify-between">
        <p className="text-[13px] font-bold text-ink-900">{formatCurrency(product.startingPrice)}</p>
      </div>
      <span className="mt-1.5 inline-flex w-fit items-center rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-700">
        No-cost EMI from {product.minTenureMonths} mo
      </span>
    </button>
  );
}
