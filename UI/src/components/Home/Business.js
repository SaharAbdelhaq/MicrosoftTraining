import React from 'react'
import "./Homee.css";
import clothes from './clothes.jpg';
import handmade from './handmade.jpg';
import plants from './plants.jpg';
import { Link } from "react-router-dom";

export default function Business() {
  return (
    <div className="container243-buisiness243" id="hui2" >
      <h1 style={{textAlign: "left", marginLeft: "40px", fontWeight: "bold", fontFamily: "Cyreal", color: "#144E5A", fontSize:"35px"}}>Business</h1>

      <div className="main-card243">
        <div className="cards243" style={{marginTop: "50px"}}>
          <div className="card243">
            <div className="content243">
              <Link to="/Businessowners?type=1" className="img-b143">
                <img src={clothes} alt="" />
              </Link>
              <div className="details23">
                <div className="name23">Clothes</div>
              </div>
            </div>
          </div>
         
          <div className="card243">
            <div className="content243">
              <Link to="/Businessowners?type=2" className="img-b143">
                <img src={handmade} alt="" />
              </Link>
              <div className="details23">
                <div className="name23">Handmade</div>
              </div>
            </div>
          </div>
          
          <div className="card243">
            <div className="content243">
              <a href={`/BusinessOwners?type=3`} className="img-b143">
                <img src={plants} alt="" />
              </a>
              <div className="details243">
                <div className="name23">Plants</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
