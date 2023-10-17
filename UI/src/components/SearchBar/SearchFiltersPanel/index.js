import React, { useContext } from "react";
import "./SearchFiltersPanel.css";
import RangeSlider from "./RangeSlider";
import MultipleSelect from "./MultipleSelect";
import SearchContext from "../../../contexts/SearchContext";

const SearchFiltersPanel = () => {
  const { sections } = useContext(SearchContext);
  const cities = [
    "Jenin",
    "Tulkarem",
    "Ramallah",
    "Hebron",
    "Jericho",
    "Qalqilya",
    "Jerusalem",
  ];

  return (
    <div className="SearchBar-filters-panel">
      <RangeSlider />
      <MultipleSelect itemName="Location" content={cities} />
      <MultipleSelect itemName="Type" sections={true} content={sections} />
    </div>
  );
};

export default SearchFiltersPanel;
