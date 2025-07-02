import { useState } from "react";
import { HashRouter as Router } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import AppRouter from "./AppRouter";
import { FavoritesProvider } from "./contexts/FavoritesProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import LoginModal from "./components/LoginModal/LoginModal";
import RegisterModal from "./components/RegisterModal/RegisterModal";

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <AuthProvider>
      <FavoritesProvider>
        <Router>
          <AppRouter
            openLoginModal={() => setIsLoginModalOpen(true)}
            openRegisterModal={() => setIsRegisterModalOpen(true)}
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

        <Toaster position="top-center" reverseOrder={false} />
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
