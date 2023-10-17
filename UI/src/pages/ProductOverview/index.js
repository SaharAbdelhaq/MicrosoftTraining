// import React, { useState, useEffect } from "react";
// import "./ProductOverview.css";
// import ImagesPanel from "../../components/ImagesPanel";
// import InfoPanel from "../../components/InfoPanel";
// import ReviewsPanel from "../../components/ReviewsPanel";
// import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const handleClose = () => {
//   document.getElementById("popup").style.display = "none";
//   document.getElementById("aura").style.display = "none";
// };

// const ProductOverview = () => {
//   const { id } = useParams();
//   const [info, setInfo] = useState({});
// console.log(id);
//   // useEffect(() => {
//   //   axios
//   //     .get(
//   //       "https://virtserver.swaggerhub.com/WASANJEHAD75_1/sawomAPI/1.0.0/productByID2"
//   //     )
//   //     .then(function (response) {
//   //       const { data } = response;
//   //       const {
//   //         Product_ID,
//   //         Business_Name,
//   //         Product_Name,
//   //         Description,
//   //         Price,
//   //         Primary_Image,
//   //       } = response.data;
//   //       setInfo(data);
//   //       console.log(data);
//   //     })
//   //     .catch(function (error) {
//   //       //handle error
//   //       console.log(error);
//   //     });
//   // }, [id]);

//   // if (Object.keys(info).length === 0) {
//   //   // Render a loading indicator or an empty div until the API response is available
//   //   return <div>Loading...</div>;
//   // }

//   return (
//     <div className="ProductOverview">
//       <div id="aura" className="black_overlay" onClick={handleClose}></div>
//       <div className="ProductOverview-main-panel">
//         <ImagesPanel />
//         <InfoPanel info={info} />
//       </div>
//       <div className="ProductOverview-second-panel" id="popup">
//         <button className="close-btn">
//           <FontAwesomeIcon icon={solid("circle-xmark")} onClick={handleClose} />
//         </button>
//         <ReviewsPanel />
//       </div>
//     </div>
//   );
// };

// export default ProductOverview;
