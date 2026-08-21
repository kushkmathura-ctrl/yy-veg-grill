import "./Search.css";

function Search({ search, setSearch }) {
  return (
    <section className="search">
      <input
        type="text"
        placeholder="🔍 Search your favourite food..."
        value={search}
        onChange={(e) =>
  setSearch(e.target.value.replace(/\s+/g, " "))
}
      />
    </section>
  );
}

export default Search;