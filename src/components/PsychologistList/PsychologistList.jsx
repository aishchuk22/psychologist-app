import { useEffect, useState } from "react";

import { fetchPsychologists } from "../../services/psychologistsService";
import PsychologistCard from "../PsychologistCard/PsychologistCard";

import ClipLoader from "react-spinners/ClipLoader";
import { toast } from "react-hot-toast";
import styles from "./PsychologistList.module.css";

const PsychologistsList = () => {
  const [psychologists, setPsychologists] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchPsychologists();
        setPsychologists(data);
      } catch (error) {
        toast.error("Something went wrong... Please try again!");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  return (
    <div>
      {loading ? (
        <div className={styles.loaderContainer}>
          <ClipLoader color="#3f82f8" loading={loading} size={50} />
        </div>
      ) : (
        <>
          {psychologists.slice(0, visibleCount).map((psychologist) => (
            <PsychologistCard key={psychologist.id} psychologist={psychologist} />
          ))}

          {visibleCount < psychologists.length && (
            <button className={styles.loadMoreBtn} onClick={handleLoadMore}>
              Load More
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default PsychologistsList;