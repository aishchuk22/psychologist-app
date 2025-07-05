import Select from "react-select";
import styles from "./Filters.module.css";
import { useState } from "react";

const Filters = ({ specializations, onFilterChange }) => {
  const [sortOption, setSortOption] = useState({
    value: "Show all",
    label: "Show all",
  });
  const [selectedSpecialization, setSelectedSpecialization] = useState({
    value: "Show all",
    label: "Show all",
  });

  const sortOptions = [
    { value: "Show all", label: "Show all" },
    { value: "A to Z", label: "A to Z" },
    { value: "Z to A", label: "Z to A" },
    {
      value: "Cheapest to more expensive",
      label: "Cheapest to more expensive",
    },
    {
      value: "More expensive to cheapest",
      label: "More expensive to cheapest",
    },
    { value: "Popular (rating 4.8 and more)", label: "Popular" },
    { value: "Not popular (less than 4.8 rating)", label: "Not popular" },
  ];

  const specializationOptions = [
    { value: "Show all", label: "Show all" },
    ...specializations.map((spec) => ({ value: spec, label: spec })),
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#3470ff",
      borderRadius: "14px",
      padding: "2px 4px",
      border: "none",
      boxShadow: "none",
      cursor: "pointer",
      minWidth: "226px",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#fbfbfb",
      fontSize: "14px",
      fontWeight: 500,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#fbfbfb" : "#fff",
      color: state.isFocused ? "#191a15" : "rgba(25, 26, 21, 0.3)",
      cursor: "pointer",
      fontSize: "14px",
      padding: "10px 16px",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "#fbfbfb",
    }),
    indicatorSeparator: () => ({ display: "none" }),
    menu: (provided) => ({
      ...provided,
      borderRadius: "16px",
      padding: "6px",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    }),
  };

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
          styles={customStyles}
          isSearchable={false}
        />
        <Select
          options={specializationOptions}
          value={selectedSpecialization}
          onChange={handleSpecializationChange}
          styles={customStyles}
          isSearchable={false}
        />
      </div>
    </div>
  );
};

export default Filters;
