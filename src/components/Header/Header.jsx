import styles from "./Header.module.css";
import { logoutUser } from "../../services/authService";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

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
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <h2 className={styles.logo}>
            <span>psychologists.</span>services
          </h2>

          <div
            className={user ? styles.linksWrapperCentered : styles.linksWrapper}
          >
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

            <div className={styles.favLinkPlaceholder}>
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
            </div>
          </div>
        </div>

        <div className={styles.rightSection}>
          {!user ? (
            <>
              <button onClick={openLoginModal} className={styles.authButton}>
                Log In
              </button>
              <button onClick={openRegisterModal} className={styles.authButton}>
                Registration
              </button>
            </>
          ) : (
            <>
              <div className={styles.userWrapper}>
                <div className={styles.userInfo}>
                  <svg
                    className={styles.userIcon}
                    width={16}
                    height={16}
                    viewBox="0 0 32 32"
                  >
                    <path d="M16 5.333c1.415 0 2.771 0.562 3.771 1.562s1.562 2.357 1.562 3.771-0.562 2.771-1.562 3.771c-1 1-2.357 1.562-3.771 1.562s-2.771-0.562-3.771-1.562c-1-1-1.562-2.357-1.562-3.771s0.562-2.771 1.562-3.771c1-1 2.357-1.562 3.771-1.562zM16 18.667c5.893 0 10.667 2.387 10.667 5.333v2.667h-21.333v-2.667c0-2.947 4.773-5.333 10.667-5.333z"></path>
                  </svg>
                  <span>{user.displayName || user.email}</span>
                </div>

                <button onClick={handleLogout} className={styles.logoutButton}>
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
