export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl bg-white p-3 shadow-card">
      <div className="mb-3 aspect-square w-full rounded-xl bg-ink-400/10" />
      <div className="mb-2 h-3 w-3/4 rounded bg-ink-400/10" />
      <div className="h-3 w-1/2 rounded bg-ink-400/10" />
    </div>
  );
}

export function ProductGridSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="animate-pulse px-5 pt-5">
      <div className="mb-4 aspect-square w-full rounded-2xl bg-ink-400/10" />
      <div className="mb-2 h-4 w-2/3 rounded bg-ink-400/10" />
      <div className="mb-6 h-3 w-1/3 rounded bg-ink-400/10" />
      <div className="mb-2 h-3 w-full rounded bg-ink-400/10" />
      <div className="h-3 w-5/6 rounded bg-ink-400/10" />
    </div>
  );
}
