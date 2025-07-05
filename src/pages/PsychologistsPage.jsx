import { useEffect, useState } from "react";

import PsychologistsList from "../components/PsychologistList/PsychologistList";
import { fetchPsychologists } from "../services/psychologistsService";
import Filters from "../components/Filters/Filters";
import { applyFilters, getUniqueSpecializations } from "../utils/filterSwitch";

import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";

const PsychologistsPage = ({ openLoginModal }) => {
  const [psychologists, setPsychologists] = useState([]);
  const [filteredPsychologists, setFilteredPsychologists] = useState([]);
  const [_filters, setFilters] = useState({
    sortOption: "Show all",
    selectedSpecialization: "Show all",
  });
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchPsychologists();
        setPsychologists(data);
        setFilteredPsychologists(data);
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        toast.error("Error loading psychologists. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
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

  const allSpecializations = getUniqueSpecializations(psychologists);

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <ClipLoader color="#3470ff" loading={loading} size={50} />
      </div>
    );
  }

  return (
    <div style={{ padding: "64px 0 100px" }}>
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
        openLoginModal={openLoginModal}
      />
    </div>
  );
};

export default PsychologistsPage;
