import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { toast } from "react-hot-toast";

export const registerUser = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(userCredential.user, {
      displayName: name,
    });
    toast.success("Registration successful! Please login now.");
    await signOut(auth); 
    return true; 
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      toast.error("This email is already in use. Try another one");
    } else if (error.code === "auth/invalid-email") {
      toast.error("Invalid email format");
    } else {
      toast.error(`Registration error. Please try again`);
    }
    return false;
  }
};

export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    toast.success("Welcome!");
    return userCredential.user;
  } catch (error) {
    if (error.code === "auth/invalid-credential") {
      toast.error("User with such credentials was not found. Please try again");
    } else {
      console.log(error.code)
      toast.error(`Something went wrong... Please try again`);
    }
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    toast.success("Bye-bye");
  } catch (error) {
    toast.error(`Logout error. Please try again`);
    throw error;
  }
};

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};