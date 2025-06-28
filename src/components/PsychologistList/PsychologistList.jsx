import { useEffect, useState } from "react";
import PsychologistCard from "../PsychologistCard/PsychologistCard";
import { fetchPsychologists } from "../../services/psychologistsService";
import ClipLoader from "react-spinners/ClipLoader";
import styles from "./PsychologistList.module.css";

const PsychologistsList = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const data = await fetchPsychologists();
        setPsychologists(data);
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        setErrorMessage("An error occured while pulling the list of psychologists. Please, try again later.");
      } finally {
        setLoading(false);
      }
    };

    getData();
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

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      {loading && (
        <div className={styles.loader}>
          <ClipLoader color="#3f82f8" loading={loading} size={50} />
        </div>
      )}

      {errorMessage && <div className={styles.error}>{errorMessage}</div>}

      <ul className={styles.list}>
        {psychologists.slice(0, visibleCount).map((psychologist) => (
          <li key={psychologist.id}>
            <PsychologistCard psychologist={psychologist} />
          </li>
        ))}
      </ul>

      {!loading && visibleCount < psychologists.length && (
        <button onClick={handleLoadMore} className={styles.loadMoreBtn}>
          Load More
        </button>
      )}

      {showScrollTop && (
        <button onClick={scrollToTop} className={styles.scrollTopBtn}>
          Back to Top ↑
        </button>
      )}
    </div>
  );
};

export default PsychologistsList;