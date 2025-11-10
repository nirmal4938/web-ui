import React, { useState } from "react";
import PlayerCard from "@/components/cricket/PlayerCard";

const SearchPlayersPage: React.FC = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    const res = await fetch(`${import.meta.env.VITE_API_PROD_URL}/cricket/players/search/${query}`);
    const data = await res.json();
    setResult(data.results || []);
    setLoading(false);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Search Cricket Players</h1>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter player name..."
          className="border rounded px-3 py-2 flex-1"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {result.length > 0 && (
        <div className="space-y-4">
          {result.map((p, idx) => (
            <PlayerCard key={idx} player={p} />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPlayersPage;
