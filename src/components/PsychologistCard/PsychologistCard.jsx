import { useState } from "react";
import styles from "./PsychologistCard.module.css";
import { Star, Heart } from "lucide-react";
import { useFavorites } from "../../hooks/useFavorites";
import AppointmentModal from "../AppointmentModal/AppointmentModal";

const PsychologistCard = ({ psychologist, onHeartClick }) => {
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

  const handleToggleExpand = () => {
    setIsExpanded((prev) => !prev);
  };

  const handleHeartClick = () => {
    if (onHeartClick) {
      onHeartClick(psychologist);
    } else {
      toggleFavorite(psychologist.id);
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className={styles.card}>
        <img src={avatar_url} alt={name} className={styles.avatar} />

        <div className={styles.header}>
          <div className={styles.nameRow}>
            <h3>{name}</h3>
            <button
              className={styles.favoriteButton}
              onClick={handleHeartClick}
            >
              {favorite ? (
                <Heart fill="red" color="none" size={20} />
              ) : (
                <Heart size={20} color="blue" fill="none" />
              )}
            </button>
          </div>

          <div className={styles.rating}>
            <Star size={16} fill="#FFC107" stroke="none" />
            <span>{rating}</span>
          </div>
          <p>Price / 1 hour: {price_per_hour}$</p>
        </div>

        <div className={styles.tags}>
          <span className={styles.tag}>Experience: {experience}</span>
          <span className={styles.tag}>License: {license}</span>
          <span className={styles.tag}>Specialization: {specialization}</span>
          <span className={styles.tag}>
            Initial consultation: {initial_consultation}
          </span>
        </div>

        <p className={styles.about}>{about}</p>

        {!isExpanded && (
          <button className={styles.readMoreBtn} onClick={handleToggleExpand}>
            Read More
          </button>
        )}

        {isExpanded && (
          <div className={styles.expandedContent}>
            <h4>Reviews:</h4>
            {reviews.map((review, index) => (
              <div key={index} className={styles.review}>
                <p>
                  <strong>{review.reviewer}</strong> ({review.rating}⭐)
                </p>
                <p>{review.comment}</p>
              </div>
            ))}

            <button
              className={styles.appointmentBtn}
              onClick={handleOpenModal} // Відкриває AppointmentModal
            >
              Make Appointment
            </button>

            <button className={styles.showLessBtn} onClick={handleToggleExpand}>
              Show Less
            </button>
          </div>
        )}
      </div>

      {/* Модалка */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        psychologist={psychologist}
      />
    </>
  );
};

export default PsychologistCard;

// import { useState } from "react";
// import styles from "./PsychologistCard.module.css";
// import { Star, Heart } from "lucide-react";
// import { useFavorites } from "../../hooks/useFavorites";

// const PsychologistCard = ({ psychologist, onHeartClick }) => {
//   const {
//     name,
//     avatar_url,
//     experience,
//     rating,
//     price_per_hour,
//     license,
//     specialization,
//     initial_consultation,
//     about,
//     reviews,
//   } = psychologist;

//   const [isExpanded, setIsExpanded] = useState(false);

//   const handleToggleExpand = () => {
//     setIsExpanded((prev) => !prev);
//   };

//   const handleMakeAppointment = () => {
//     console.log(`Make appointment with ${name}`);
//   };

//   const { toggleFavorite, isFavorite } = useFavorites();
//   const favorite = isFavorite(psychologist.id);

//   const handleHeartClick = () => {
//     if (onHeartClick) {
//       onHeartClick(psychologist);
//     } else {
//       toggleFavorite(psychologist.id);
//     }
//   };

//   return (
//     <div className={styles.card}>
//       <img src={avatar_url} alt={name} className={styles.avatar} />

//       <div className={styles.header}>
//         <div className={styles.nameRow}>
//           <h3>{name}</h3>
//           <button className={styles.favoriteButton} onClick={handleHeartClick}>
//             {favorite ? (
//               <Heart fill="red" color="none" size={20} />
//             ) : (
//               <Heart size={20} color="blue" fill="none" />
//             )}
//           </button>
//         </div>

//         <div className={styles.rating}>
//           <Star size={16} fill="#FFC107" stroke="none" />
//           <span>{rating}</span>
//         </div>
//         <p>Price / 1 hour: {price_per_hour}$</p>
//       </div>

//       <div className={styles.tags}>
//         <span className={styles.tag}>Experience: {experience}</span>
//         <span className={styles.tag}>License: {license}</span>
//         <span className={styles.tag}>Specialization: {specialization}</span>
//         <span className={styles.tag}>
//           Initial consultation: {initial_consultation}
//         </span>
//       </div>

//       <p className={styles.about}>{about}</p>

//       {!isExpanded && (
//         <button className={styles.readMoreBtn} onClick={handleToggleExpand}>
//           Read More
//         </button>
//       )}

//       {isExpanded && (
//         <div className={styles.expandedContent}>
//           <h4>Reviews:</h4>
//           {reviews.map((review, index) => (
//             <div key={index} className={styles.review}>
//               <p>
//                 <strong>{review.reviewer}</strong> ({review.rating}⭐)
//               </p>
//               <p>{review.comment}</p>
//             </div>
//           ))}

//           <button
//             className={styles.appointmentBtn}
//             onClick={handleMakeAppointment}
//           >
//             Make Appointment
//           </button>

//           <button className={styles.showLessBtn} onClick={handleToggleExpand}>
//             Show Less
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PsychologistCard;
