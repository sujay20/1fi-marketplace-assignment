export function ErrorState({ title = 'Something went wrong', message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
      <span className="mb-3 text-4xl">⚠️</span>
      <p className="text-[15px] font-semibold text-ink-900">{title}</p>
      {message && <p className="mt-1 text-[13px] text-ink-400">{message}</p>}
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-full bg-brand-600 px-5 py-2.5 text-[13px] font-semibold text-white active:bg-brand-700"
        >
          Try again
        </button>
      )}
    </div>
  );
}

export function EmptyState({ icon = '🔍', title = 'Nothing here yet', message }) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
      <span className="mb-3 text-4xl">{icon}</span>
      <p className="text-[15px] font-semibold text-ink-900">{title}</p>
      {message && <p className="mt-1 text-[13px] text-ink-400">{message}</p>}
    </div>
  );
}
