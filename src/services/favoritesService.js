import { db } from "./firebase";
import { ref, get, set } from "firebase/database";

export const getFavoritesFromDB = async (userId) => {
  const userRef = ref(db, `users/${userId}/favorites`);
  const snapshot = await get(userRef);
  return snapshot.exists() ? snapshot.val() : [];
};

export const setFavoritesToDB = async (userId, favorites) => {
  const userRef = ref(db, `users/${userId}/favorites`);
  await set(userRef, favorites);
};