import { useState } from "react";

import { selectCustomStyles } from "../../utils/selectCustomStyles";
import {
  sortOptions,
  createSpecializationOptions,
  showAllOption,
} from "../../utils/filterOptions";

import Select from "react-select";

import styles from "./Filters.module.css";

const Filters = ({ specializations, onFilterChange }) => {
  const [sortOption, setSortOption] = useState(showAllOption);
  const [selectedSpecialization, setSelectedSpecialization] =
    useState(showAllOption);

  const specializationOptions = createSpecializationOptions(specializations);

  const handleSortChange = (selected) => {
    setSortOption(selected);
    onFilterChange({
      sortOption: selected.value,
      selectedSpecialization: selectedSpecialization.value,
    });
  };

  const handleSpecializationChange = (selected) => {
    setSelectedSpecialization(selected);
    onFilterChange({
      sortOption: sortOption.value,
      selectedSpecialization: selected.value,
    });
  };

  return (
    <div className={styles.filtersContainer}>
      <p className={styles.filtersTitle}>Filters</p>
      <div className={styles.selectsWrapper}>
        <Select
          options={sortOptions}
          value={sortOption}
          onChange={handleSortChange}
          styles={selectCustomStyles}
          isSearchable={false}
        />
        <Select
          options={specializationOptions}
          value={selectedSpecialization}
          onChange={handleSpecializationChange}
          styles={selectCustomStyles}
          isSearchable={false}
        />
      </div>
    </div>
  );
};

export default Filters;
