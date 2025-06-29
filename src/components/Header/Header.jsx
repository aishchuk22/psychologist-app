import styles from "./Header.module.css";
import { logoutUser } from "../../services/authService";
import { NavLink } from "react-router-dom";

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

        <div className={styles.navLinks}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/psychologists"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Psychologists
          </NavLink>

          <NavLink
            to="/favourites"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Favourites
          </NavLink>

          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;