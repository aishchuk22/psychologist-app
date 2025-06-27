import { useEffect, useState } from 'react';
import { fetchPsychologists } from '../../services/psychologistsService';
import PsychologistCard from '../PsychologistCard/PsychologistCard';
import styles from './PsychologistList.module.css';

const PsychologistsList = () => {
  const [psychologists, setPsychologists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchPsychologists();
      setPsychologists(data);
    };

    fetchData();
  }, []);

  return (
    <div className={styles.list}>
      {psychologists.map((psych) => (
        <PsychologistCard key={psych.id} psychologist={psych} />
      ))}
    </div>
  );
};

export default PsychologistsList;





// import React, { useEffect, useState } from "react";
// import { fetchPsychologists } from "../../services/psychologistsService";
// import styles from "./PsychologistList.module.css";

// const PsychologistsList = () => {
//   const [psychologists, setPsychologists] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const data = await fetchPsychologists();
//         setPsychologists(data);
//       } catch (err) {
//         setError(`Помилка завантаження психологів: ${err.message}`);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadData();
//   }, []);

//   if (loading) return <p>Завантаження...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <ul className={styles.list}>
//       {psychologists.map((psy) => (
//         <li key={psy.id} className={styles.item}>
//           <img src={psy.avatar_url} alt={psy.name} className={styles.avatar} />
//           <h3>{psy.name}</h3>
//           <p>{psy.specialization}</p>
//           <p>Experiense: {psy.experience}</p>
//           <p>Ціна: {psy.price_per_hour} $/год</p>
//           <p>Рейтинг: {psy.rating}</p>
//         </li>
//       ))}
//     </ul>
//   );
// };

// export default PsychologistsList;