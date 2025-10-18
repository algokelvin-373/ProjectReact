"use client";

import { useState, useEffect } from "react";

export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (gameId) => {
    let newFavorites;
    if (favorites.includes(gameId)) {
      newFavorites = favorites.filter((id) => id !== gameId);
    } else {
      newFavorites = [...favorites, gameId];
    }

    setFavorites(newFavorites);
    if (typeof window !== "undefined") {
      localStorage.setItem("fmv_favorites", JSON.stringify(newFavorites));
    }
    return true;
  };

  const isFavorite = (gameId) => {
    return favorites.includes(gameId);
  };

  return { favorites, toggleFavorite, isFavorite };
}
