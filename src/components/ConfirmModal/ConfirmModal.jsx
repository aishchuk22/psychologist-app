import { useEffect } from "react";

import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, psychologist }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onCancel();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onCancel]);

  if (!isOpen || !psychologist) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onCancel();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent}>
        <p>
          Are you sure you want to remove {psychologist.name} from favorites?
        </p>
        <div className={styles.buttons}>
          <button onClick={onConfirm} className={styles.confirmBtn}>
            Yes
          </button>
          <button onClick={onCancel} className={styles.cancelBtn}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
