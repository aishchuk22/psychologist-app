import { useEffect, useState } from "react";
import Filters from "../components/Filters/Filters";
import PsychologistsList from "../components/PsychologistList/PsychologistList";
import { fetchPsychologists } from "../services/psychologistsService";
import { toast } from "react-hot-toast";
import ClipLoader from "react-spinners/ClipLoader";

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
    let result = [...psychologists];

    if (selectedSpecialization !== "Show all") {
      result = result.filter(
        (p) => p.specialization === selectedSpecialization
      );
    }

    switch (sortOption) {
      case "A to Z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Cheapest to more expensive":
        result.sort((a, b) => a.price_per_hour - b.price_per_hour);
        break;
      case "More expensive to cheapest":
        result.sort((a, b) => b.price_per_hour - a.price_per_hour);
        break;
      case "Popular (rating 4.8 and more)":
        result = result.filter((p) => p.rating >= 4.8);
        break;
      case "Not popular (less than 4.8 rating)":
        result = result.filter((p) => p.rating < 4.8);
        break;
      default:
        break;
    }

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

  const allSpecializations = [
    ...new Set(psychologists.map((p) => p.specialization)),
  ];

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: "100px" }}>
        <ClipLoader color="#3f82f8" loading={loading} size={50} />
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
