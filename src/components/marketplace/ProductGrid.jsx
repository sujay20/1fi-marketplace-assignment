import ProductCard from './ProductCard.jsx';
import { ProductGridSkeleton } from '../common/Skeleton.jsx';
import { ErrorState, EmptyState } from '../common/StateViews.jsx';

export default function ProductGrid({ status, error, products, onSelectProduct, onRetry }) {
  if (status === 'loading' || status === 'idle') {
    return <ProductGridSkeleton />;
  }

  if (status === 'error') {
    return <ErrorState message={error} onRetry={onRetry} />;
  }

  if (products.length === 0) {
    return (
      <EmptyState
        icon="🛍️"
        title="No products found"
        message="Try a different category or search term."
      />
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
      ))}
    </div>
  );
}
