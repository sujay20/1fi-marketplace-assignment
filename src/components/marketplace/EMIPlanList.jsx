import EMIPlanCard from './EMIPlanCard.jsx';
import { ErrorState } from '../common/StateViews.jsx';

export default function EMIPlanList({ status, error, plans, selectedPlanId, onSelectPlan, onRetry }) {
  if (status === 'loading' || status === 'idle') {
    return (
      <div className="space-y-2.5">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-[62px] animate-pulse rounded-2xl bg-ink-400/10" />
        ))}
      </div>
    );
  }

  if (status === 'error') {
    return <ErrorState title="Couldn't load EMI plans" message={error} onRetry={onRetry} />;
  }

  return (
    <div className="space-y-2.5">
      {plans.map((plan) => (
        <EMIPlanCard
          key={plan.id}
          plan={plan}
          isSelected={plan.id === selectedPlanId}
          onSelect={onSelectPlan}
        />
      ))}
    </div>
  );
}
