export const applyFilters = (psychologists, { sortOption, selectedSpecialization }) => {
    let result = [...psychologists];
  
    if (selectedSpecialization !== "Show all") {
      result = result.filter(
        (p) => p.specialization === selectedSpecialization
      );
    }
  
    switch (sortOption) {
      case "A to Z":
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z to A":
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "Cheapest to more expensive":
        result.sort((a, b) => a.price_per_hour - b.price_per_hour);
        break;
      case "More expensive to cheapest":
        result.sort((a, b) => b.price_per_hour - a.price_per_hour);
        break;
      case "Popular (rating 4.8 and more)":
        result = result.filter((p) => p.rating >= 4.8);
        break;
      case "Not popular (less than 4.8 rating)":
        result = result.filter((p) => p.rating < 4.8);
        break;
      default:
        break;
    }
  
    return result;
  };
  
  export const getUniqueSpecializations = (psychologists) => {
    return [...new Set(psychologists.map((p) => p.specialization))];
  };