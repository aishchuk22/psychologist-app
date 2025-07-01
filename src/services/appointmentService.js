import { getDatabase, ref, push, set } from "firebase/database";
import { app } from "../services/firebase";

const db = getDatabase(app);

export const saveAppointment = async (appointmentData) => {
  const newAppointmentRef = push(ref(db, "appointments"));
  await set(newAppointmentRef, {
    ...appointmentData,
    createdAt: new Date().toISOString(),
  });
};