const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'shop', label: 'Shop', icon: '🏬' },
  { id: 'emi', label: 'EMI Dues', icon: '🧾' },
  { id: 'limit', label: 'Limit', icon: '📈' },
  { id: 'profile', label: 'Profile', icon: '👤' },
];

export default function BottomNav({ activeId = 'shop' }) {
  return (
    <nav className="sticky bottom-0 z-20 flex items-stretch justify-between border-t border-black/5 bg-white/95 px-4 pb-5 pt-2 backdrop-blur">
      {NAV_ITEMS.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            className="flex flex-1 flex-col items-center gap-1 pt-1 text-[11px] font-medium"
          >
            <span
              className={[
                'block h-0.5 w-6 rounded-full transition-colors',
                isActive ? 'bg-brand-600' : 'bg-transparent',
              ].join(' ')}
            />
            <span className={isActive ? 'text-brand-600' : 'text-ink-400'}>{item.icon}</span>
            <span className={isActive ? 'text-brand-600' : 'text-ink-400'}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
