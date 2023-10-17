import "./SearchBar.css";
import SearchInputPanel from "./SearchInputPanel";
import SearchFiltersPanel from "./SearchFiltersPanel";
import { useState, useContext } from "react";

import icon from "./icon.png";
import { useNavigate } from "react-router-dom";
import SearchContext from "../../contexts/SearchContext";

const SearchBar = (props) => {
  const { searchInput, setSearchInput } = useContext(SearchContext);
  const navigate = useNavigate();
  // const [result, setResult] = useContext(ResultContext);

  // const [searchInput, setSearchInput] = useState({
  //   Text: "",
  //   Location: [],
  //   Type: [],
  //   Price: [1, 100],
  // });

  const data = {
    Product_Name: searchInput.Text,
    Max_Price: searchInput.Price[1],
    Min_Price: searchInput.Price[0],
    LocationOfBusiness: searchInput.Location,
    business_type: 0,
    // business_type: searchInput.Type[0],
  };
  // const search = () => {
  //   setResult(data);
  //   navigate("/Results");
  // };
  const search = () => {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("Product_Name", searchInput.Text);
    urlSearchParams.set("Max_Price", searchInput.Price[1]);
    urlSearchParams.set("Min_Price", searchInput.Price[0]);

    urlSearchParams.set("LocationOfBusiness", searchInput.Location);

    urlSearchParams.set("business_type", searchInput.Type);

    navigate(`/Results?${urlSearchParams.toString()}`);
  };

  return (
    <div className="SearchBar">
      <div className="SearchBar-left-section">
        <a href="/">
          <img src={icon} alt="" className="SearchBar-icon" />
        </a>
        <SearchInputPanel search={search} />
      </div>
      <SearchFiltersPanel />
    </div>
  );
};

export default SearchBar;
