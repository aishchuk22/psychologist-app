import PsychologistCard from "../PsychologistCard/PsychologistCard";

import styles from "./PsychologistList.module.css";

const PsychologistsList = ({
  psychologists = [],
  visibleCount,
  onLoadMore,
  showScrollTop,
  onScrollToTop,
  onHeartClick,
  openLoginModal,
}) => {
  if (!Array.isArray(psychologists)) {
    return null;
  }

  return (
    <div>
      <ul className={styles.list}>
        {psychologists.slice(0, visibleCount).map((psychologist) => (
          <li key={psychologist.id}>
            <PsychologistCard
              psychologist={psychologist}
              onHeartClick={onHeartClick}
              openLoginModal={openLoginModal}
            />
          </li>
        ))}
      </ul>

      {visibleCount < psychologists.length && (
        <button onClick={onLoadMore} className={styles.loadMoreBtn}>
          Load More
        </button>
      )}

      {showScrollTop && (
        <button onClick={onScrollToTop} className={styles.scrollTopBtn}>
          Back to Top ↑
        </button>
      )}
    </div>
  );
};

export default PsychologistsList;
