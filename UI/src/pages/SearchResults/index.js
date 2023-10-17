import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// import { ResultContext } from "../../App";
import "./SearchResults.css";
import Card from "../../components/Card";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useLocation } from "react-router-dom";
import SearchContext from "../../contexts/SearchContext";

const SearchResults = () => {
  const { products, setSearchInput } = useContext(SearchContext);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  useEffect(() => {
    const result = {
      Product_Name: searchParams.get("Product_Name"),
      Max_Price: parseInt(searchParams.get("Max_Price")),
      Min_Price: parseInt(searchParams.get("Min_Price")),
      LocationOfBusiness: searchParams.get("LocationOfBusiness"),
      business_type: searchParams.get("business_type"),
    };

    setSearchInput({
      Text: result.Product_Name,
      Location: result.LocationOfBusiness,
      Type: result.business_type,
      Price: [result.Min_Price, result.Max_Price],
    });
  }, []);

  const [Sort, setSort] = useState("title");

  const handleChange = (e) => {
    setSort(e.target.value);
  };

  products.sort(function (a, b) {
    var result;
    if (Sort === "price") {
      result = parseFloat(a[Sort]) - parseFloat(b[Sort]);
    } else {
      result =
        a[Sort].toLowerCase() < b[Sort].toLowerCase()
          ? -1
          : a[Sort].toLowerCase() > b[Sort].toLowerCase()
          ? 1
          : 0;
    }
    return result;
  });

  return (
    <div className="SearchResults">
      <FormControl sx={{ m: 1, width: 150 }}>
        <InputLabel
          id="demo-simple-select-label"
          sx={{
            color: "#1b5a7d",
            "&.Mui-focused": {
              color: "#1b5a7d !important",
            },
          }}
        >
          Sort By
        </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={Sort}
          label="Sort By"
          onChange={handleChange}
          sx={{
            // height: 30 + "px",
            color: "#1b5a7d",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#1b5a7d",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline ": {
              borderColor: "#1b5a7d",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1b5a7d",
            },
            ".MuiSvgIcon-root ": {
              fill: "#1b5a7d !important",
              color: "#1b5a7d",
            },
          }}
        >
          <MenuItem value={"title"}>name</MenuItem>
          <MenuItem value={"type"}>type</MenuItem>
          <MenuItem value={"location"}>location</MenuItem>
          <MenuItem value={"price"}>price</MenuItem>
        </Select>
      </FormControl>
      <div className="SearchResults-panel">
        {products.length !== 0 ? (
          products.map((e, index) => {
            return (
              <Card
                product={e}
                id={e.id}
                title={e.title}
                type={e.type}
                location={e.location}
                price={e.price}
                img={e.img}
                key={index}
              />
            );
          })
        ) : (
          <div>nothing here ...</div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
