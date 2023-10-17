import React, { useEffect, useState } from "react";
import SearchContext from "../contexts/SearchContext";
import axios from "axios";

const SearchProvider = ({ children }) => {
  const [searchInput, setSearchInput] = useState({
    Text: "",
    Location: "",
    Type: "",
    Price: [1, 100],
  });
  const [products, setProducts] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const result = {
      Product_Name: searchInput.Text,
      Max_Price: searchInput.Price[1],
      Min_Price: searchInput.Price[0],
      LocationOfBusiness: searchInput.Location,
      business_type: searchInput.Type,
    };

    axios
      .post("http://localhost:9999/product/FiltersProducts ", result, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExOSwiZW1haWwiOiJvbWFyQGdtYWlsLmNvbSIsInBob25lIjoiNTYiLCJpYXQiOjE2ODMyMDEyNTN9.jYU4YmZkl8UYYSr_JxZOy-utW-YaEr1ia4DwwlTFkgQ",
        },
      })
      .then(function (response) {
        const {
          data: { FilterProducts },
        } = response;
        const a = [];
        FilterProducts.map((b, index) => {
          return b.products.map((p, i) => {
            return a.push({
              product: p,
              id: p.id,
              title: p.name,
              type: b.sectionn,
              location: b.LocationOfBusiness,
              price: p.price,
              img: p.Primary_Image,
              key: i,
            });
          });
        });
        setProducts(a);
      })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  }, [searchInput]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/user/sections ", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExOSwiZW1haWwiOiJvbWFyQGdtYWlsLmNvbSIsInBob25lIjoiNTYiLCJpYXQiOjE2ODMyMDEyNTN9.jYU4YmZkl8UYYSr_JxZOy-utW-YaEr1ia4DwwlTFkgQ",
        },
      })
      .then(function (response) {
        setSections(response.data);
      })
      .catch(function (error) {
        //handle error
        console.log(error);
      });
  }, []);

  return (
    <SearchContext.Provider
      value={{ products, sections, searchInput, setSearchInput }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
