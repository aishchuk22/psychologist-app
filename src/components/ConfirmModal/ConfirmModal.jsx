import styles from "./ConfirmModal.module.css";

const ConfirmModal = ({ isOpen, onConfirm, onCancel, psychologist }) => {
  if (!isOpen || !psychologist) return null;

  return (
    <div className={styles.modalBackdrop}>
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
