import { useState } from "react";
import AuthModal from "./components/AuthModal/AuthModal";
import { Toaster } from "react-hot-toast";
import AppRouter from "./AppRouter";
import { FavoritesProvider } from "./contexts/FavoritesProvider";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <AuthProvider>
      <FavoritesProvider>
        <AppRouter setIsModalOpen={setIsModalOpen} />
        <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <Toaster position="top-center" reverseOrder={false} />
      </FavoritesProvider>
    </AuthProvider>
  );
}

export default App;
