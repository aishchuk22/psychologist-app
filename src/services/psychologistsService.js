import { getDatabase, ref, get } from "firebase/database";

const db = getDatabase();

export const fetchPsychologists = async () => {
  const psychologistsRef = ref(db, 'psychologists');
  const snapshot = await get(psychologistsRef);

  if (snapshot.exists()) {
    const data = snapshot.val();

    return Object.keys(data).map((key) => ({
      id: key,
      ...data[key],
    }));
  } else {
    return [];
  }
};