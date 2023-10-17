import React, { useContext } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";
import SearchContext from "../../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

function valuetext(value) {
  return `${value}`;
}

const minDistance = 10;

export default function RangeSlider() {
  const { searchInput, setSearchInput } = useContext(SearchContext);
  const navigate = useNavigate();
  // const [value, setValue] = React.useState([50, 100]);
  const value = searchInput.Price;

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setSearchInput({
        ...searchInput,
        Price: [Math.min(newValue[0], value[1] - minDistance), value[1]],
      });
    } else {
      setSearchInput({
        ...searchInput,
        Price: [value[0], Math.max(newValue[1], value[0] + minDistance)],
      });
    }
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("Product_Name", searchInput.Text);
    urlSearchParams.set("Max_Price", searchInput.Price[1]);
    urlSearchParams.set("Min_Price", searchInput.Price[0]);

    urlSearchParams.set("LocationOfBusiness", searchInput.Location);

    urlSearchParams.set("business_type", searchInput.Type);

    navigate(`/Results?${urlSearchParams.toString()}`);
  };

  return (
    <Box sx={{ width: 300 }}>
      <Typography
        id="input-slider"
        gutterBottom
        sx={{
          color: "#eda415",
        }}
      >
        Price
      </Typography>
      <Slider
        getAriaLabel={() => "Minimum distance"}
        value={value}
        onChange={handleChange1}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        disableSwap
        step={1}
        min={1}
        max={500}
        sx={{
          color: "#eda415",
        }}
      />
    </Box>
  );
}
