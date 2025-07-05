export const selectCustomStyles = {
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