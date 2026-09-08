import { Navigate, Route, Routes } from 'react-router-dom';
import ShopPage from './pages/ShopPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<Navigate to="/shop/marketplace" replace />} />
        <Route path="/shop" element={<Navigate to="/shop/marketplace" replace />} />
        <Route path="/shop/top-brands" element={<ShopPage />} />
        <Route path="/shop/nearby-stores" element={<ShopPage />} />
        <Route path="/shop/marketplace" element={<ShopPage />} />
        <Route path="/shop/marketplace/:productId" element={<ProductDetailPage />} />
        <Route path="*" element={<Navigate to="/shop/marketplace" replace />} />
      </Routes>
    </div>
  );
}
