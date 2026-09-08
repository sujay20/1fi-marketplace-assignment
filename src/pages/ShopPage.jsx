import { useLocation, useNavigate } from 'react-router-dom';
import Banner from '../components/common/Banner.jsx';
import SegmentedTabs from '../components/common/SegmentedTabs.jsx';
import BottomNav from '../components/common/BottomNav.jsx';
import TopBrandsTab from './TopBrandsTab.jsx';
import NearbyStoresTab from './NearbyStoresTab.jsx';
import MarketplaceTab from './MarketplaceTab.jsx';

const TABS = [
  { id: 'top-brands', label: 'Top Brands', path: '/shop/top-brands' },
  { id: 'nearby-stores', label: 'Nearby Stores', path: '/shop/nearby-stores' },
  { id: 'marketplace', label: '1Fi Marketplace', path: '/shop/marketplace' },
];

function activeTabFromPath(pathname) {
  const match = TABS.find((tab) => pathname.startsWith(tab.path));
  return match?.id ?? 'marketplace';
}

export default function ShopPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const activeId = activeTabFromPath(location.pathname);

  const handleChange = (id) => {
    const tab = TABS.find((t) => t.id === id);
    navigate(tab.path);
  };

  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="device-scroll flex-1">
        <Banner />
        <SegmentedTabs tabs={TABS} activeId={activeId} onChange={handleChange} />

        <div className="mt-4">
          {activeId === 'top-brands' && <TopBrandsTab />}
          {activeId === 'nearby-stores' && <NearbyStoresTab />}
          {activeId === 'marketplace' && <MarketplaceTab />}
        </div>
      </div>
      <BottomNav activeId="shop" />
    </div>
  );
}
