import { useState, useEffect } from "react";
import s from "./AuthModal.module.css";
import RegisterForm from "../Auth/RegisterForm/RegisterForm";
import LoginForm from "../Auth/LoginForm/LoginForm";

const AuthModal = ({ isOpen, onClose }) => {
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={s.backdrop} onClick={handleBackdropClick}>
      <div className={s.modal}>
        <button className={s.closeBtn} onClick={onClose}>❌</button>

        <div className={s.toggleButtons}>
          <button
            onClick={() => setAuthMode("login")}
            className={authMode === "login" ? s.active : ""}
          >
            Login
          </button>
          <button
            onClick={() => setAuthMode("register")}
            className={authMode === "register" ? s.active : ""}
          >
            Register
          </button>
        </div>

        {authMode === "login" && <LoginForm />}
        {authMode === "register" && <RegisterForm />}
      </div>
    </div>
  );
};

export default AuthModal;