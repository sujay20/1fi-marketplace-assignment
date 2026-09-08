import { formatCurrency } from '../../utils/emi.js';

export default function EMIPlanCard({ plan, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(plan.id)}
      className={[
        'flex w-full items-center justify-between rounded-2xl border px-4 py-3.5 text-left transition-colors',
        isSelected ? 'border-brand-600 bg-brand-50' : 'border-black/10 bg-white',
      ].join(' ')}
    >
      <div className="flex items-center gap-3">
        <span
          className={[
            'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
            isSelected ? 'border-brand-600 bg-brand-600' : 'border-black/20',
          ].join(' ')}
        >
          {isSelected && <span className="h-2 w-2 rounded-full bg-white" />}
        </span>
        <div>
          <p className="text-[14px] font-semibold text-ink-900">
            {formatCurrency(plan.monthlyAmount)}
            <span className="font-normal text-ink-400"> /mo</span>
          </p>
          <p className="text-[12px] text-ink-400">{plan.label} · Total {formatCurrency(plan.totalPayable)}</p>
        </div>
      </div>
      <span
        className={[
          'shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold',
          plan.type === 'no-cost' ? 'bg-emerald-50 text-emerald-700' : 'bg-ink-400/10 text-ink-600',
        ].join(' ')}
      >
        {plan.tag}
      </span>
    </button>
  );
}
