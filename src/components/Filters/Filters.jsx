import { useState } from "react";
import styles from "./Filters.module.css";

const Filters = ({ specializations, onFilterChange }) => {
  const [sortOption, setSortOption] = useState("Show all");
  const [selectedSpecialization, setSelectedSpecialization] = useState("Show all");

  const handleSortChange = (e) => {
    const newSort = e.target.value;
    setSortOption(newSort);
    onFilterChange({ sortOption: newSort, selectedSpecialization });
  };

  const handleSpecializationChange = (e) => {
    const newSpec = e.target.value;
    setSelectedSpecialization(newSpec);
    onFilterChange({ sortOption, selectedSpecialization: newSpec });
  };

  return (
    <div className={styles.filtersContainer}>
      <select value={sortOption} onChange={handleSortChange} className={styles.select}>
        <option>Show all</option>
        <option>A to Z</option>
        <option>Z to A</option>
        <option>Cheapest to more expensive</option>
        <option>More expensive to cheapest</option>
        <option>Popular</option>
        <option>Not popular</option>
      </select>

      <select
        value={selectedSpecialization}
        onChange={handleSpecializationChange}
        className={styles.select}
      >
        <option>Show all</option>
        {specializations.map((spec) => (
          <option key={spec} value={spec}>
            {spec}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Filters;