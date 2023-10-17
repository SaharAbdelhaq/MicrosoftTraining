import React from 'react';
import ImageUploader from './component/index.js';
import Axios from 'axios'
import ImagesPanel from '../../pages/ProductOverviewUser/ImagesPanel.js';
import  { useState } from 'react';
export default function ProductImage() {
  return (
    <div className="page">


                 <ImageUploader style={{ maxWidth: '300px',  position:"relative" , display:"inline-block" }}
                               withPreview={true} /> 
            </div>
  )
}





// import React, { useState } from 'react';
// import img1 from "./cam.jpg"
// import './editProduct.css';

// function ProductImage() {
//   const [activeImg, setActiveImg] = useState(0);
//   const hoverImages = [img1, img1, img1];
//   const [mainImg, setMainImg] = useState(hoverImages[0]);

//   const handleMouseOver = (index) => {
//     setMainImg(hoverImages[index]);
//     setActiveImg(index);
//   };

//   return (
//     <div className="product-div-left">
//       <div className="img-container">
//         <img src={mainImg} alt="watch" />
//       </div>
//       <div className="hover-container">
//         {hoverImages.map((image, index) => (
//           <div key={index} onMouseOver={() => handleMouseOver(index)}>
//             <img src={image} alt={`watch ${index}`} />
//           </div>
//         ))}
//       </div>
//       <div className="btn-groups1">
//         <button type="button" className="remove-btn">
//           Remove
//         </button>
//         <button type="button" className="upload-btn">
//           Upload
//         </button>
//       </div>
//     </div>
//   );
// }

// export default ProductImage;
