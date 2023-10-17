import React, { useContext } from "react";
import "./SearchInputPanel.css";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLocation, useNavigate } from "react-router-dom";
import SearchContext from "../../../contexts/SearchContext";

const SearchInputPanel = ({ search }) => {
  const { searchInput, setSearchInput } = useContext(SearchContext);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const handleChange = (e) => {
    setSearchInput({ ...searchInput, Text: e.target.value });
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("Product_Name", e.target.value);
    urlSearchParams.set("Max_Price", searchInput.Price[1]);
    urlSearchParams.set("Min_Price", searchInput.Price[0]);
    urlSearchParams.set("LocationOfBusiness", searchInput.Location);
    urlSearchParams.set("business_type", searchInput.Type);

    navigate(`/Results?${urlSearchParams.toString()}`);
  };

  return (
    <div className="SearchBar-input-panel">
      <div className="search">
        <div>
          <input
            type="text"
            value={searchInput.Text}
            placeholder="Search Here"
            required
            onChange={(e) => handleChange(e)}
            // onKeyDown={handleSearch}
          />
          {/* <button
            className="search-btn"
            id="search-btn"
            onClick={handleSearchBtnClick}
            style={{ visibility: visibility }}
          >
            {<FontAwesomeIcon icon={solid("magnifying-glass")} />}
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default SearchInputPanel;
