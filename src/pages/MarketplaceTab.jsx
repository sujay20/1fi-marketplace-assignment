import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/common/SearchBar.jsx';
import CategoryChips from '../components/marketplace/CategoryChips.jsx';
import ProductGrid from '../components/marketplace/ProductGrid.jsx';
import { useProducts } from '../hooks/useProducts.js';
import { fetchCategories } from '../api/marketplaceApi.js';

export default function MarketplaceTab() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [categories, setCategories] = useState(['All']);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  const { data: products, status, error } = useProducts({ category, query });

  return (
    <div className="pb-8">
      <div className="px-5">
        <SearchBar value={query} onChange={setQuery} placeholder="Search products…" />
      </div>

      <div className="mt-4">
        <CategoryChips categories={categories} activeCategory={category} onSelect={setCategory} />
      </div>

      <div className="mt-3 flex items-center justify-between px-5">
        <h2 className="text-[17px] font-bold text-ink-900">1Fi Marketplace</h2>
        <span className="text-[12px] text-ink-400">{products.length} products</span>
      </div>

      <div className="mt-3 px-5">
        <ProductGrid
          status={status}
          error={error}
          products={products}
          onSelectProduct={(id) => navigate(`/shop/marketplace/${id}`)}
          onRetry={() => setQuery((q) => q)}
        />
      </div>
    </div>
  );
}
