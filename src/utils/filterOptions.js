export const sortOptions = [
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
  
  export const createSpecializationOptions = (specializations) => [
    { value: "Show all", label: "Show all" },
    ...specializations.map((spec) => ({ value: spec, label: spec })),
  ];
  
  export const showAllOption = { value: "Show all", label: "Show all" };