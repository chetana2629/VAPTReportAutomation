import React from "react";
import { useSelector } from "react-redux";
import SearchBar from "./components/SearchBar";
import VulnerabilityList from "./components/VulnerabilityList";
import "./App.css";

function App() {
  const { items, loading, error, hasSearched } = useSelector(
    (state) => state.vulns
  );

  return (
    <div className="container">
      <h1>Vulnerability Knowledge Base Search</h1>

      {/* 🔍 Search bar */}
      <SearchBar />

      {/* ⏳ Loading / ❌ Error states */}
      {loading && <p className="hint">Loading…</p>}
      {error && <p className="error">Error: {error}</p>}

      {/* 📋 Results */}
      <VulnerabilityList vulns={items} hasSearched={hasSearched} />
    </div>
  );
}

export default App;
