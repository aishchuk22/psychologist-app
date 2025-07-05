import { useEffect } from "react";

import RegisterForm from "../Auth/RegisterForm/RegisterForm";

import styles from "./RegisterModal.module.css";
import { X } from "lucide-react";

const RegisterModal = ({ isOpen, onClose, openLoginModal }) => {
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
        <RegisterForm onClose={onClose} openLoginModal={openLoginModal} />
      </div>
    </div>
  );
};

export default RegisterModal;
