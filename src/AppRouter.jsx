import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import PsychologistsPage from "./pages/PsychologistsPage";
import FavoritesPage from "./pages/FavoritesPage";
import HomePage from "./pages/HomePage";

const AppRouter = ({ openLoginModal, openRegisterModal }) => {
  return (
    <>
      <Header
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/psychologists"
          element={<PsychologistsPage openLoginModal={openLoginModal} />}
        />
        <Route path="/favourites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
