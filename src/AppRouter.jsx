import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import PsychologistsPage from "./pages/PsychologistsPage";
import FavoritesPage from "./pages/FavoritesPage";

const AppRouter = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<div>Home Page</div>} />
        <Route path="/psychologists" element={<PsychologistsPage />} />
        <Route path="/favourites" element={<FavoritesPage />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
