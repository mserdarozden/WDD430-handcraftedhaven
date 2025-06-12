type Filters = { search: string; category: string; priceMin: string; priceMax: string };

type Props = {
  filters: Filters;
  setFilters: (val: Filters) => void;
  onSearch: () => void;
};

export default function SearchBar({ filters, setFilters, onSearch }: Props) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search products..."
        value={filters.search}
        onChange={(e) => setFilters({ ...filters, search: e.target.value })}
      />
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          placeholder="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
        />
        <input
          type="number"
          placeholder="Min Price"
          value={filters.priceMin}
          onChange={(e) => setFilters({ ...filters, priceMin: e.target.value })}
        />
        <input
          type="number"
          placeholder="Max Price"
          value={filters.priceMax}
          onChange={(e) => setFilters({ ...filters, priceMax: e.target.value })}
        />
        <button onClick={onSearch}>Search</button>
      </div>
    </div>
  );
}
