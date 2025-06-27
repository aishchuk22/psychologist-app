import styles from "./Header.module.css";
import { logoutUser } from "../../services/authService";

const Header = () => {
  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // Помилка вже оброблена в authService через toast
    }
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <h2 className={styles.logo}>Psychologists App</h2>
        <button onClick={handleLogout} className={styles.logoutButton}>
          Logout
        </button>
      </nav>
    </header>
  );
};

export default Header;