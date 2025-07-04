import { useEffect, useState } from "react";
import { FavoritesContext } from "./FavoritesContext";
import { useAuth } from "../hooks/useAuth";
import {
  getFavoritesFromDB,
  setFavoritesToDB,
} from "../services/favoritesService";
import toast from "react-hot-toast";

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const dbFavorites = await getFavoritesFromDB(user.uid);
          setFavorites(dbFavorites || []);
        } catch (error) {
          toast.error("Failed to load favorites:", error);
        }
      } else {
        setFavorites([]);
      }
    };

    fetchFavorites();
  }, [user]);

  useEffect(() => {
    if (user) {
      setFavoritesToDB(user.uid, favorites);
    }
  }, [favorites, user]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const isFavorite = (id) => favorites.includes(id);

  return (
    <FavoritesContext.Provider
      value={{ favorites, toggleFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};
