import { Routes, Route } from "react-router-dom";

import PsychologistsPage from "./pages/PsychologistsPage";
import FavoritesPage from "./pages/FavoritesPage";
import NotFoundPage from "./pages/NotFoundPage";
import Header from "./components/Header/Header";
import HomePage from "./pages/HomePage";

const AppRouter = ({ openLoginModal, openRegisterModal, openLogoutModal }) => {
  return (
    <>
      <Header
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
        openLogoutModal={openLogoutModal}
      />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/psychologists"
          element={<PsychologistsPage openLoginModal={openLoginModal} />}
        />
        <Route path="/favourites" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
