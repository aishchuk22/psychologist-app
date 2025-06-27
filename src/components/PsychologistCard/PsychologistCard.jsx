import styles from './PsychologistCard.module.css';
import { Star } from 'lucide-react';

const PsychologistCard = ({ psychologist }) => {
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
  } = psychologist;

  return (
    <div className={styles.card}>
      <img src={avatar_url} alt={name} className={styles.avatar} />

      <div className={styles.header}>
        <h3>{name}</h3>
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
        <span className={styles.tag}>Initial consultation: {initial_consultation}</span>
      </div>

      <p className={styles.about}>{about}</p>

      <button className={styles.readMoreBtn}>Read more</button>
    </div>
  );
};

export default PsychologistCard;