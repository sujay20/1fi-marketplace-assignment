export default function VariantSelector({ variants, selectedId, onSelect }) {
  if (!variants) return null;

  return (
    <div className="mt-5">
      <p className="mb-2 text-[13px] font-semibold text-ink-900">{variants.label}</p>
      <div className="flex flex-wrap gap-2">
        {variants.options.map((option) => {
          const isActive = option.id === selectedId;
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onSelect(option.id)}
              className={[
                'rounded-full border px-4 py-2 text-[13px] font-medium transition-colors',
                isActive
                  ? 'border-brand-600 bg-brand-50 text-brand-700'
                  : 'border-black/10 bg-white text-ink-600',
              ].join(' ')}
            >
              {option.label}
              {option.priceDelta > 0 && (
                <span className="ml-1 text-[11px] text-ink-400">+₹{option.priceDelta.toLocaleString('en-IN')}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
