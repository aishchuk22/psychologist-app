import { useEffect } from "react";
import styles from "./LoginModal.module.css";
import LoginForm from "../Auth/LoginForm/LoginForm";
import { X } from "lucide-react";

const LoginModal = ({ isOpen, onClose }) => {
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
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          <X />
        </button>
        <LoginForm onClose={onClose} />
      </div>
    </div>
  );
};

export default LoginModal;
