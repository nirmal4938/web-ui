import React from "react";

const PlayerCard = ({ player }: { player: any }) => {
  return (
    <div className="max-w-3xl bg-white rounded-xl shadow-md overflow-hidden p-4">
      <div className="flex gap-4">
        {player.image && (
          <img
            src={player.image}
            alt={player.title}
            className="w-40 h-40 object-cover rounded-lg"
          />
        )}
        <div>
          <h2 className="text-xl font-bold mb-2">{player.title}</h2>
          <p className="text-gray-700 whitespace-pre-line">{player.description}</p>
          {player.pageUrl && (
            <a
              href={player.pageUrl}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline mt-2 inline-block"
            >
              View on Wikipedia →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
