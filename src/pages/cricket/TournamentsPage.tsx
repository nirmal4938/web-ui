import React, { useState } from "react";

const TournamentsPage: React.FC = () => {
  const [name, setName] = useState("ICC Cricket World Cup");
  const [data, setData] = useState<any>(null);

  const handleFetch = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_PROD_URL}/cricket/tournaments/${name}`);
    const json = await res.json();
    setData(json.tournament || null);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Cricket Tournaments</h1>
      <div className="flex gap-2 mb-4">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border rounded px-3 py-2 flex-1"
          placeholder="Enter tournament name..."
        />
        <button onClick={handleFetch} className="bg-green-600 text-white px-4 py-2 rounded">
          Fetch
        </button>
      </div>

      {data && (
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="text-xl font-bold">{data.title}</h2>
          <p className="text-gray-700 mt-2">{data.description}</p>
        </div>
      )}
    </div>
  );
};

export default TournamentsPage;
