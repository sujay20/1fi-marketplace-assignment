export default function SearchBar({ value, onChange, placeholder = 'Search…' }) {
  return (
    <div className="flex items-center gap-2 rounded-full bg-white px-4 py-3 shadow-card">
      <span aria-hidden className="text-ink-400">🔍</span>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-[14px] text-ink-900 placeholder:text-ink-400 focus:outline-none"
      />
    </div>
  );
}
