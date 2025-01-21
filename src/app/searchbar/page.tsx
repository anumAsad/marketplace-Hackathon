const SearchBar = ({ onSearch }: { onSearch: (query: string) => void }) => {
    return (
      <input
        type="text"
        placeholder="Search for products..."
        onChange={(e) => onSearch(e.target.value)}
      />
    );
  };
export default SearchBar;  