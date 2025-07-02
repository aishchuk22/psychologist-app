import styles from "./Header.module.css";
import { logoutUser } from "../../services/authService";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { UserRound } from "lucide-react";

const Header = ({ openLoginModal, openRegisterModal }) => {
  const { user } = useAuth();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch {
      // Помилка вже оброблена в authService
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

          {user && (
            <NavLink
              to="/favourites"
              className={({ isActive }) =>
                isActive ? styles.activeLink : styles.link
              }
            >
              Favourites
            </NavLink>
          )}

          {!user ? (
            <>
              <button onClick={openLoginModal} className={styles.authButton}>
                Login
              </button>
              <button onClick={openRegisterModal} className={styles.authButton}>
                Register
              </button>
            </>
          ) : (
            <>
              <div className={styles.userInfo}>
                <UserRound size={20} className={styles.userIcon} />
                <span>{user.displayName || user.email}</span>
              </div>
              <button onClick={handleLogout} className={styles.logoutButton}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
