import { useState } from "react";
import AuthModal from "./components/AuthModal/AuthModal";
import { Toaster } from "react-hot-toast";
import AppRouter from "./AppRouter";
import { FavoritesProvider } from "./contexts/FavoritesProvider";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <FavoritesProvider>
      <AppRouter />
      <AuthModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <Toaster position="top-center" reverseOrder={false} />
        </FavoritesProvider>
    </div>
  );
}

export default App;

