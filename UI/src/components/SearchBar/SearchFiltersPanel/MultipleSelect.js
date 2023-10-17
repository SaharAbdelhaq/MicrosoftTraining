import React, { useContext } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import "./SearchFiltersPanel.css";
import SearchContext from "../../../contexts/SearchContext";
import { useNavigate } from "react-router-dom";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 180,
    },
  },
};

// function getStyles(name, personName, theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

export default function MultipleSelect({ itemName, content, sections }) {
  const { searchInput, setSearchInput } = useContext(SearchContext);
  const navigate = useNavigate();
  const theme = useTheme();

  const { [itemName]: stateValue } = searchInput;

  const handleMenuPropsClick = (e) => {
    if (
      stateValue !== null &&
      stateValue !== undefined &&
      e.target.getAttribute("data-value") === stateValue.toString()
    ) {
      handleClear();
    }
  };
  const handleClear = () => {
    const clearedValue = typeof searchInput[itemName] === "string" ? "" : "";
    setSearchInput({
      ...searchInput,
      [itemName]: "",
    });
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("Product_Name", searchInput.Text);
    urlSearchParams.set("Max_Price", searchInput.Price[1]);
    urlSearchParams.set("Min_Price", searchInput.Price[0]);
    if (itemName === "Location") urlSearchParams.set("LocationOfBusiness", "");
    else urlSearchParams.set("LocationOfBusiness", searchInput.Location);
    if (itemName === "Type") urlSearchParams.set("business_type", "");
    else urlSearchParams.set("business_type", searchInput.Type);

    navigate(`/Results?${urlSearchParams.toString()}`);
  };

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    setSearchInput({
      ...searchInput,
      [itemName]: value,
    });
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.set("Product_Name", searchInput.Text);
    urlSearchParams.set("Max_Price", searchInput.Price[1]);
    urlSearchParams.set("Min_Price", searchInput.Price[0]);
    if (itemName === "Location")
      urlSearchParams.set("LocationOfBusiness", value);
    else urlSearchParams.set("LocationOfBusiness", searchInput.Location);
    if (itemName === "Type") urlSearchParams.set("business_type", value);
    else urlSearchParams.set("business_type", searchInput.Type);

    navigate(`/Results?${urlSearchParams.toString()}`);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 180 }} size="small">
        <InputLabel
          id="demo-multiple-name-label"
          sx={{
            color: "#eda415",
            "&.Mui-focused": {
              color: "#eda415 !important",
            },
          }}
        >
          {itemName}
        </InputLabel>
        <Select
          labelId="demo-multiple-name-label"
          id="demo-multiple-name"
          // multiple
          value={stateValue}
          onChange={handleChange}
          input={<OutlinedInput label="Name" />}
          MenuProps={{
            ...MenuProps,
            onClick: handleMenuPropsClick,
          }}
          sx={{
            // height: 30 + "px",
            color: "#eda415",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#eda415",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline ": {
              borderColor: "#eda415",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#eda415",
            },
            ".MuiSvgIcon-root ": {
              fill: "#eda415 !important",
              color: "#eda415",
            },
          }}
        >
          {!sections &&
            content.map((name) => (
              <MenuItem
                key={name}
                value={name}
                // style={getStyles(name, stateValue, theme)}
                sx={{
                  borderColor: "#eda415",
                  outlineColor: "#eda415",
                }}
              >
                {name}
              </MenuItem>
            ))}
          {sections === true &&
            content.map((sec) => (
              <MenuItem
                key={sec.id}
                value={sec.id.toString()}
                // style={getStyles(name, stateValue, theme)}
                sx={{
                  borderColor: "#eda415",
                  outlineColor: "#eda415",
                }}
              >
                {sec.section}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
