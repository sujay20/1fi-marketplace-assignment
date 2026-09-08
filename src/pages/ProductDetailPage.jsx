import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useProductDetail } from '../hooks/useProductDetail.js';
import { useEmiPlans } from '../hooks/useEmiPlans.js';
import { DetailSkeleton } from '../components/common/Skeleton.jsx';
import { ErrorState } from '../components/common/StateViews.jsx';
import VariantSelector from '../components/marketplace/VariantSelector.jsx';
import EMIPlanList from '../components/marketplace/EMIPlanList.jsx';
import ConfirmationSheet from '../components/marketplace/ConfirmationSheet.jsx';
import { formatCurrency } from '../utils/emi.js';

export default function ProductDetailPage() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const { product, status, error, retry } = useProductDetail(productId);

  const [selectedVariantId, setSelectedVariantId] = useState(null);
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Default to the first variant once the product has loaded.
  useEffect(() => {
    if (product && !selectedVariantId) {
      setSelectedVariantId(product.variants.options[0].id);
    }
  }, [product, selectedVariantId]);

  const {
    plans,
    price,
    status: emiStatus,
    error: emiError,
    retry: retryEmi,
  } = useEmiPlans(productId, selectedVariantId);

  // Reset the chosen plan whenever the variant (and therefore price) changes.
  useEffect(() => {
    setSelectedPlanId(null);
  }, [selectedVariantId]);

  const selectedPlan = useMemo(
    () => plans.find((p) => p.id === selectedPlanId) ?? null,
    [plans, selectedPlanId]
  );

  if (status === 'loading' || status === 'idle') {
    return (
      <div className="flex h-full flex-col bg-surface">
        <DetailHeader onBack={() => navigate(-1)} />
        <DetailSkeleton />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="flex h-full flex-col bg-surface">
        <DetailHeader onBack={() => navigate(-1)} />
        <ErrorState message={error} onRetry={retry} />
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col bg-surface">
      <div className="device-scroll flex-1 pb-28">
        <DetailHeader onBack={() => navigate(-1)} />

        <div
          className="mx-5 flex aspect-[4/3] items-center justify-center rounded-2xl text-7xl"
          style={{ background: `${product.accent}14` }}
        >
          {product.icon}
        </div>

        <div className="px-5 pt-5">
          <p className="text-[12px] font-medium text-ink-400">{product.brand}</p>
          <h1 className="text-[19px] font-bold text-ink-900">{product.name}</h1>

          <div className="mt-1 flex items-center gap-1.5 text-[12px] text-ink-400">
            <span className="text-amber-500">★ {product.rating}</span>
            <span>·</span>
            <span>{product.reviews.toLocaleString('en-IN')} reviews</span>
          </div>

          <p className="mt-3 text-[20px] font-extrabold text-ink-900">
            {formatCurrency(price ?? product.basePrice)}
          </p>

          <VariantSelector
            variants={product.variants}
            selectedId={selectedVariantId}
            onSelect={setSelectedVariantId}
          />

          <p className="mt-5 text-[13px] leading-relaxed text-ink-600">{product.description}</p>

          <ul className="mt-3 space-y-1.5">
            {product.highlights.map((point) => (
              <li key={point} className="flex items-start gap-2 text-[13px] text-ink-600">
                <span className="mt-0.5 text-brand-600">•</span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-6">
            <p className="mb-2 text-[13px] font-semibold text-ink-900">Choose an EMI plan</p>
            <EMIPlanList
              status={emiStatus}
              error={emiError}
              plans={plans}
              selectedPlanId={selectedPlanId}
              onSelectPlan={setSelectedPlanId}
              onRetry={retryEmi}
            />
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 border-t border-black/5 bg-white px-5 py-4">
        <button
          type="button"
          disabled={!selectedPlan}
          onClick={() => setShowConfirmation(true)}
          className={[
            'w-full rounded-full py-3.5 text-[14px] font-semibold transition-colors',
            selectedPlan
              ? 'bg-brand-600 text-white active:bg-brand-700'
              : 'cursor-not-allowed bg-ink-400/15 text-ink-400',
          ].join(' ')}
        >
          {selectedPlan ? `Proceed with ${selectedPlan.label} plan` : 'Select an EMI plan to continue'}
        </button>
      </div>

      {showConfirmation && (
        <ConfirmationSheet
          product={product}
          plan={selectedPlan}
          onClose={() => setShowConfirmation(false)}
          onGoToShop={() => navigate('/shop/marketplace')}
        />
      )}
    </div>
  );
}

function DetailHeader({ onBack }) {
  return (
    <div className="flex items-center gap-3 px-5 pb-2 pt-5">
      <button
        type="button"
        onClick={onBack}
        className="flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-card"
        aria-label="Go back"
      >
        ←
      </button>
      <p className="text-[13px] font-semibold text-ink-600">Product details</p>
    </div>
  );
}
