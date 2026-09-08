/**
 * @param {{ tabs: {id: string, label: string}[], activeId: string, onChange: (id: string) => void }} props
 */
export default function SegmentedTabs({ tabs, activeId, onChange }) {
  return (
    <div className="mx-5 -mt-5 flex rounded-full bg-brand-100 p-1 shadow-card relative z-10">
      {tabs.map((tab) => {
        const isActive = tab.id === activeId;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={[
              'flex-1 rounded-full px-3 py-2.5 text-[13px] font-semibold transition-colors',
              isActive ? 'bg-white text-brand-700' : 'text-ink-600',
            ].join(' ')}
          >
            {tab.label}
            {isActive && <span className="mx-auto mt-1 block h-0.5 w-6 rounded-full bg-brand-600" />}
          </button>
        );
      })}
    </div>
  );
}
