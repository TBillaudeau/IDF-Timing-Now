// FavoritesPage.js

import React, { useState } from 'react';
import StationInfo from '../components/Header';

function FavoritesPage() {
  const [favoriteStations, setFavoriteStations] = useState([]);

  // Add a station to favorites
  const addToFavorites = (station) => {
    setFavoriteStations([...favoriteStations, station]);
  };

  // Remove a station from favorites
  const removeFromFavorites = (station) => {
    const updatedFavorites = favoriteStations.filter((fav) => fav !== station);
    setFavoriteStations(updatedFavorites);
  };
  function FavoriteStation({ stationName, onRemoveFromFavorites }) {
    return (
      <div className="flex items-center mb-4">
        <p className="text-lg font-semibold mr-2">{stationName}</p>
        <button onClick={onRemoveFromFavorites} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded">
          Remove
        </button>
      </div>
    );
  }
  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="m-2 sm:m-6">
        <h2 className="text-xl font-semibold mb-4">Favorite Stations</h2>
        {favoriteStations.length === 0 ? (
          <p>No favorite stations yet.</p>
        ) : (
          favoriteStations.map((station) => (
            <FavoriteStation
              key={station}
              stationName={station}
              onRemoveFromFavorites={() => removeFromFavorites(station)}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
