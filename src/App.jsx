import { useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRouter from "./AppRouter";
import { FavoritesProvider } from "./contexts/FavoritesProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";
import ConfirmLogoutModal from "./components/ConfirmLogoutModal/ConfirmLogoutModal";
import { logoutUser } from "./services/authService";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleOpenLogoutModal = () => setIsLogoutModalOpen(true);
  const handleCloseLogoutModal = () => setIsLogoutModalOpen(false);

  const handleConfirmLogout = async () => {
    await logoutUser();
    handleCloseLogoutModal();
  };

  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <AppRouter
            openLoginModal={() => setIsLoginModalOpen(true)}
            openRegisterModal={() => setIsRegisterModalOpen(true)}
            openLogoutModal={handleOpenLogoutModal}
          />
        </Router>

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
        />

        <RegisterModal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
        />

        <ConfirmLogoutModal
          isOpen={isLogoutModalOpen}
          onClose={handleCloseLogoutModal}
          onConfirm={handleConfirmLogout}
        />

        <Toaster position="top-center" reverseOrder={false} />
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
