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
  const [isFetched, setIsFetched] = useState(false);

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        try {
          const dbFavorites = await getFavoritesFromDB(user.uid);
          setFavorites(dbFavorites || []);
          setIsFetched(true);
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          toast.error("Failed to load favorites. Please try again");
          setIsFetched(true);
        }
      } else {
        setFavorites([]);
        setIsFetched(false);
      }
    };

    fetchFavorites();
  }, [user]);

  useEffect(() => {
    if (user && isFetched) {
      setFavoritesToDB(user.uid, favorites);
    }
  }, [favorites, user, isFetched]);

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
