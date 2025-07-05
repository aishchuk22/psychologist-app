import { useState } from "react";
import styles from "./PsychologistCard.module.css";
import { Star, Heart } from "lucide-react";
import { useFavorites } from "../../hooks/useFavorites";
import AppointmentModal from "../AppointmentModal/AppointmentModal";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-hot-toast";

const PsychologistCard = ({ psychologist, onHeartClick, openLoginModal }) => {
  const {
    name,
    avatar_url,
    experience,
    rating,
    price_per_hour,
    license,
    specialization,
    initial_consultation,
    about,
    reviews,
  } = psychologist;

  const [isExpanded, setIsExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { toggleFavorite, isFavorite } = useFavorites();
  const favorite = isFavorite(psychologist.id);

  const { user } = useAuth();

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleHeartClick = () => {
    if (!user) {
      toast("Please log in to add to favourites", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#191a15",
          color: "#FBFBFB",
        },
      });
      if (openLoginModal) openLoginModal();
      return;
    }
    if (onHeartClick) {
      onHeartClick(psychologist);
    } else {
      toggleFavorite(psychologist.id);
    }
  };

  const handleOpenModal = () => {
    if (!user) {
      toast.error("Please log in to make an appointment", {
        icon: "🕓️",
        style: {
          borderRadius: "10px",
          background: "#191a15",
          color: "#FBFBFB",
        },
      });
      if (openLoginModal) openLoginModal();
      return;
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.avatarContainer}>
          <img src={avatar_url} alt={name} className={styles.avatar} />
          <div className={styles.onlineIndicator}></div>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.topRow}>
            <p className={styles.psychologistLabel}>Psychologist</p>

            <div className={styles.rightSection}>
              <div className={styles.rating}>
                <Star size={16} fill="#ffc531" stroke="none" />
                <span>{rating}</span>
              </div>

              <div className={styles.separator}></div>

              <p className={styles.price}>
                Price / 1 hour: <span>{price_per_hour}$</span>
              </p>

              <button
                className={styles.favoriteButton}
                onClick={handleHeartClick}
              >
                {favorite ? (
                  <Heart fill="#3470FF" color="none" width={26} height={22} />
                ) : (
                  <Heart width={26} height={22} color="#191a15" fill="none" />
                )}
              </button>
            </div>
          </div>

          <div className={styles.nameRow}>
            <h3>{name}</h3>
          </div>

          <div className={styles.tags}>
            <span className={styles.tag}>
              Experience: <span className={styles.extraTag}>{experience}</span>
            </span>
            <span className={styles.tag}>
              License: <span className={styles.extraTag}>{license}</span>
            </span>
            <span className={styles.tag}>
              Specialization:{" "}
              <span className={styles.extraTag}>{specialization}</span>
            </span>
            <span className={styles.tag}>
              Initial consultation:{" "}
              <span className={styles.extraTag}>{initial_consultation}</span>
            </span>
          </div>

          <p className={styles.about}>{about}</p>

          {!isExpanded && (
            <button className={styles.readMoreBtn} onClick={handleToggleExpand}>
              Read more
            </button>
          )}

          {isExpanded && (
            <div className={styles.expandedContent}>
              {reviews.map((review, index) => (
                <div key={index} className={styles.review}>
                  <div className={styles.reviewerBox}>
                    <div className={styles.reviewAvatar}>
                      {review.reviewer.charAt(0).toUpperCase()}
                    </div>

                    <div className={styles.reviewContent}>
                      <div className={styles.reviewHeader}>
                        <strong>{review.reviewer}</strong>
                        <div className={styles.reviewRating}>
                          <Star size={16} fill="#FFC107" stroke="none" />
                          <span>{review.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className={styles.reviewComment}>{review.comment}</p>
                </div>
              ))}

              <button
                className={styles.appointmentBtn}
                onClick={handleOpenModal}
              >
                Make an appointment
              </button>

              <button
                className={styles.showLessBtn}
                onClick={handleToggleExpand}
              >
                Show less
              </button>
            </div>
          )}
        </div>
      </div>

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        psychologist={psychologist}
      />
    </>
  );
};

export default PsychologistCard;
