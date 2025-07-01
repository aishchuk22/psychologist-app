import React, { useEffect } from "react";
import styles from "./AppointmentModal.module.css";
import { X } from "lucide-react";

const AppointmentModal = ({ isOpen, onClose, psychologist }) => {
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === "Escape") {
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

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <X size={24} />
        </button>

        <h2 className={styles.title}>
          Make an appointment with a psychologist
        </h2>

        <p className={styles.description}>
          You are on the verge of changing your life for the better. Fill out
          the short form below to book your personal appointment with a
          professional psychologist. We guarantee confidentiality and respect
          for your privacy.
        </p>

        {psychologist && (
          <div className={styles.psychologistInfo}>
            <img
              src={psychologist.avatar_url}
              alt={psychologist.name}
              className={styles.avatar}
            />
            <span className={styles.name}>{psychologist.name}</span>
          </div>
        )}

        <div className={styles.formPlaceholder}>{/* Form here */}</div>
      </div>
    </div>
  );
};

export default AppointmentModal;
