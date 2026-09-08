export default function CategoryChips({ categories, activeCategory, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto px-5 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      {categories.map((category) => {
        const isActive = category === activeCategory;
        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelect(category)}
            className={[
              'shrink-0 rounded-full px-4 py-1.5 text-[13px] font-medium transition-colors',
              isActive ? 'bg-brand-600 text-white' : 'bg-white text-ink-600 shadow-card',
            ].join(' ')}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}
