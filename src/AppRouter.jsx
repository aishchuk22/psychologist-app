import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import PsychologistsPage from "./pages/PsychologistsPage";
import FavoritesPage from "./pages/FavoritesPage";

const AppRouter = ({ openLoginModal, openRegisterModal }) => {
  return (
    <>
      <Header
        openLoginModal={openLoginModal}
        openRegisterModal={openRegisterModal}
      />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/psychologists" element={<PsychologistsPage />} />
        <Route path="/favourites" element={<FavoritesPage />} />
      </Routes>
    </>
  );
};

export default AppRouter;
