
import { useState } from "react";

function SearchBar() {
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    if (search.trim() === "") {
      return;
    }

    console.log(search);
  }

  return (
    <form onSubmit={handleSearch} className="flex w-full max-w-xl items-center gap-2 rounded-xl border border-gray-200 bg-white p-2 shadow-sm focus-within:border-blue-500">
      <span className="pl-2 text-xl text-gray-400">⌕</span>
      <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search products..." className="w-full bg-transparent px-2 py-2 outline-none" />
      {search && <button type="button" onClick={() => setSearch("")} className="px-2 text-sm text-gray-500 hover:text-blue-700">Clear</button>}
      <button type="submit" className="rounded-lg bg-yellow-400 px-5 py-3 font-semibold text-blue-950 transition hover:bg-yellow-300">Search</button>
    </form>
  );
}

export default SearchBar;
