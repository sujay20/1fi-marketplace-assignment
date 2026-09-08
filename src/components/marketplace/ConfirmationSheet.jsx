import { formatCurrency } from '../../utils/emi.js';

export default function ConfirmationSheet({ product, plan, onClose, onGoToShop }) {
  if (!product || !plan) return null;

  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-black/40">
      <div className="w-full max-w-[390px] rounded-t-[28px] bg-white px-5 pb-8 pt-3">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-black/10" />

        <div className="flex flex-col items-center text-center">
          <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-3xl">
            ✅
          </span>
          <p className="text-[16px] font-bold text-ink-900">Plan selected</p>
          <p className="mt-1 text-[13px] text-ink-400">
            Your {plan.label} no-cost EMI request for {product.name} is ready to submit.
          </p>
        </div>

        <div className="mt-5 space-y-2 rounded-2xl bg-surface p-4">
          <div className="flex justify-between text-[13px]">
            <span className="text-ink-400">Monthly instalment</span>
            <span className="font-semibold text-ink-900">{formatCurrency(plan.monthlyAmount)}</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-ink-400">Tenure</span>
            <span className="font-semibold text-ink-900">{plan.label}</span>
          </div>
          <div className="flex justify-between text-[13px]">
            <span className="text-ink-400">Total payable</span>
            <span className="font-semibold text-ink-900">{formatCurrency(plan.totalPayable)}</span>
          </div>
        </div>

        <button
          type="button"
          onClick={onGoToShop}
          className="mt-5 w-full rounded-full bg-brand-600 py-3.5 text-[14px] font-semibold text-white active:bg-brand-700"
        >
          Done
        </button>
        <button
          type="button"
          onClick={onClose}
          className="mt-2 w-full py-2 text-[13px] font-medium text-ink-400"
        >
          Back to product
        </button>
      </div>
    </div>
  );
}
