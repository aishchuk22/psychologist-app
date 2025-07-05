import { ref, set } from "firebase/database";
import { db } from "../services/firebase";
import psychologists from "../data/psychologists.json";
import { toast } from "react-hot-toast";

export const uploadPsychologists = async () => {
    try {
      const psychologistsRef = ref(db, "psychologists");
      await set(psychologistsRef, psychologists);
      toast.success("Psychologists are successfully loaded to Firebase!");
    } catch (error) {
      toast.error(`An error occured: ${error.message}`);
    }
  };