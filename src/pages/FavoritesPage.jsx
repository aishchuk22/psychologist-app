import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PsychologistsList from "../components/PsychologistList/PsychologistList";
import { fetchPsychologists } from "../services/psychologistsService";
import ConfirmModal from "../components/ConfirmModal/ConfirmModal";
import { FavoritesContext } from "../contexts/FavoritesContext";
import Filters from "../components/Filters/Filters";
import { useAuth } from "../hooks/useAuth";
import { applyFilters, getUniqueSpecializations } from "../utils/filterSwitch";

import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";

const FavoritesPage = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  const [psychologists, setPsychologists] = useState([]);
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  const [_filters, setFilters] = useState({
    sortOption: "Show all",
    selectedSpecialization: "Show all",
  });
  const [loadingData, setLoadingData] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const [selectedPsychologist, setSelectedPsychologist] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;

    const loadData = async () => {
      try {
        const data = await fetchPsychologists();
        const favPsychologists = data.filter((p) => favorites.includes(p.id));
        setPsychologists(favPsychologists);
        setFilteredPsychologists(favPsychologists);
      } catch {
        toast.error("Error loading favorites. Please try again later.");
      } finally {
        setLoadingData(false);
      }
    };

    loadData();
  }, [favorites, user]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFilterChange = ({ sortOption, selectedSpecialization }) => {
    const result = applyFilters(psychologists, {
      sortOption,
      selectedSpecialization,
    });

    setFilters({ sortOption, selectedSpecialization });
    setFilteredPsychologists(result);
    setVisibleCount(3);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleHeartClick = (psychologist) => {
    setSelectedPsychologist(psychologist);
    setIsModalOpen(true);
  };

  const handleConfirmRemove = () => {
    if (selectedPsychologist) {
      toggleFavorite(selectedPsychologist.id);
      toast.success(`${selectedPsychologist.name} was removed from favorites.`);
    }
    setIsModalOpen(false);
    setSelectedPsychologist(null);
  };

  const handleCancelRemove = () => {
    setIsModalOpen(false);
    setSelectedPsychologist(null);
  };

  const allSpecializations = getUniqueSpecializations(psychologists);

  if (loading || loadingData) {
    return (
      <div style={{ textAlign: "center", marginTop: "140px" }}>
        <ClipLoader color="#3470ff" loading={true} size={50} />
      </div>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      {psychologists.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            marginTop: "60px",
          }}
        >
          <h2
            style={{
              color: "#191a15",
              fontSize: "24px",
              fontWeight: "600",
              marginBottom: "16px",
              margin: "0 0 16px 0",
            }}
          >
            You have no favorite psychologists yet
          </h2>
          <p
            style={{
              color: "#8a8a89",
              fontSize: "16px",
              lineHeight: "1.5",
              margin: "0",
            }}
          >
            Please visit the "Psychologists" Page and select the ones you find
            suitable for your needs 🤗
          </p>
        </div>
      ) : (
        <>
          <Filters
            specializations={allSpecializations}
            onFilterChange={handleFilterChange}
          />
          <PsychologistsList
            psychologists={filteredPsychologists}
            visibleCount={visibleCount}
            onLoadMore={handleLoadMore}
            showScrollTop={showScrollTop}
            onScrollToTop={scrollToTop}
            onHeartClick={handleHeartClick}
          />
          <ConfirmModal
            isOpen={isModalOpen}
            onConfirm={handleConfirmRemove}
            onCancel={handleCancelRemove}
            psychologist={selectedPsychologist}
          />
        </>
      )}
    </div>
  );
};

export default FavoritesPage;
