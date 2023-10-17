import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Businessowners.css";
import LOGO from "./LOGO.jpg";
import { Link, useLocation } from "react-router-dom";

export default function Businessowners(props) {
  const [businessOwners, setBusinessOwners] = useState([]);
  const [productType, setProductType] = useState("");
  const search = useLocation().search;
  const type = new URLSearchParams(search).get("type");
  /////////////////////////////////////
  const userType = JSON.parse(localStorage.getItem("userType"));

  console.log(userType);

  useEffect(() => {
    axios
      .get(`http://localhost:9999/businessOwner/businessOwners/type=${type}`, {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjExOSwiZW1haWwiOiJvbWFyQGdtYWlsLmNvbSIsInBob25lIjoiNTYiLCJpYXQiOjE2ODMyMDEyNTN9.jYU4YmZkl8UYYSr_JxZOy-utW-YaEr1ia4DwwlTFkgQ",
        },
      })
      .then((response) => {
        setBusinessOwners(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    if (type === "1") {
      setProductType("Business Owners who offer Clothes");
    } else if (type === "2") {
      setProductType("Business Owners who offer Handmade Products");
    } else if (type === "3") {
      setProductType("Business Owners who offer Plants");
    }
  }, [type]);

  return (
    <div style={{ backgroundColor: "white" }}>
      <div className="container24-buisiness24">
        <h1
          style={{
            textAlign: "left",
            marginLeft: "40px",
            fontWeight: "bold",
            fontFamily: "Cyreal",
            color: "#144E5A",
            fontSize: "35px",
          }}
        >
          {productType}
        </h1>

        <div className="main-card24">
          <div className="cards24" style={{ marginTop: "50px" }}>
            {businessOwners.map((owner) => (
              <div className="card24" key={owner.Business_Name}>
                <div className="content24">
                  <h1
                    style={{
                      textAlign: "left",
                      marginLeft: "40px",
                      fontWeight: "bold",
                      fontFamily: "Cyreal",
                      color: "#144E5A",
                      fontSize: "35px",
                    }}
                  ></h1>

                  <Link
                    to={`/user/products/${owner.Business_Name}`}
                    className="img-b14"
                  >
                    <img src={owner.logo} alt="" />
                  </Link>

                  <div className="details2">
                    <div className="name2">{owner.Business_Name}</div>
                    <div className="business-type">{owner.business_type}</div>
                    <div className="sections">
                      {Array.isArray(owner.Sections) &&
                        owner.Sections.map((section) => (
                          <div key={section.id}>{section.section}</div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

{
  /* do it for spasific business name that we got from the API  */
}
