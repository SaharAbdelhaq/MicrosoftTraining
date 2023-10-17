import React from 'react'
import './Homee.css';
import stars from './stars.png';

export default function Aboutweb() {
  
  return (<div id="about-aya" >
    <div>
    <div className="containerAyA">
      <div className="row-aya">

        <div className="col-md-4-a">
          <img src={stars} className="aboutImage-a" />
          <h2 style={{ color: "#660000" }}>High Quality Products</h2>
          <p style={{ color: "rgb(36,62,95)", paddingTop: "20px"  }}>
          All Product have been very well prepared for the best experience of future Business.</p>
        
        </div>

        <div className="col-md-4-a">
          <img src="http://res.cloudinary.com/dfqddpjfl/image/upload/v1498777629/tools_yorndk.png" className="aboutImage-a" />
          <h2 style={{ color: "#660000" }}>Continuous rich content</h2>
          <p style={{ color: "rgb(36,62,95)", paddingTop: "20px"  }}>
          Choose the field that interests you and find out about all the shops in which you work; 
          You will find everything you need!</p>      
        </div>
        <div className="col-md-4-a">
          <img src="http://res.cloudinary.com/dfqddpjfl/image/upload/v1498777627/help_dfec8u.png" className="aboutImage-a" />
          <h2 style={{ color: "#660000" }}>Contact with us!</h2>
          <p style={{ color: "rgb(36,62,95)", paddingTop: "20px" }}>
          Please, if you have any problem with any store, send a message to us,
          and we will follow up and respond to messages </p>
        </div>
        
      </div>
    </div>
  </div>
  </div>

  )
}
