import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchVulns, fetchSuggestions, resetFilters } from "../features/vulns/vulnSlice";

export default function SearchBar() {
  const dispatch = useDispatch();
  const { suggestions } = useSelector((state) => state.vulns);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (query.length > 1) {
      dispatch(fetchSuggestions(query));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  }, [query, dispatch]);

  const handleSearch = () => {
    if (query.trim()) dispatch(searchVulns(query));
    setShowSuggestions(false);
  };

  const handleSelectSuggestion = (text) => {
    setQuery(text);
    dispatch(searchVulns(text));
    setShowSuggestions(false);
  };

  const handleReset = () => {
    setQuery("");
    dispatch(resetFilters());
  };

  return (
    <div className="relative w-full max-w-lg mx-auto my-6">
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Search vulnerabilities..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded-lg px-4 py-2 shadow-sm focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Search
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
        >
          Reset
        </button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-full mt-1 left-0 right-0 bg-white border rounded-lg shadow-lg z-10">
          {suggestions.map((s, idx) => (
            <li
              key={idx}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleSelectSuggestion(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
