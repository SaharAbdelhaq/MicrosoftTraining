import React from 'react'
import "./Homee.css";
import P1 from './P1.PNG';
import P2 from './P2.PNG';
import P3 from './P3.PNG';
import P4 from './P4.PNG';
import P5 from './P5.PNG';
import P6 from './P6.PNG';

export default function Orders() {
  return (
    <div className="container-aya">
    <h1
      id="hui1" style={{textAlign: "left", marginLeft: "40px", fontWeight: "bold", fontFamily: "Cyreal", color: "#144E5A", fontSize:"35px"}}
      text-align="center"
    >
      Orders
    </h1>

    <input type="radio" name="dot" id="one" className='radio' />
    <input type="radio" name="dot" id="two" className='radio'  />

    <div className="main-card">
      <div className="cards-orders" style={{ marginTop: "50px" }}>
        <div className="card-orders">
          <div className="content-orders">
            <div className="img-orders">

                <img src={P1} alt="" />
           
            </div>
            <div className="details-orders">
              <div className="name-orders">CALLESIA REPENS</div>
              <div className="place-orders">Salma Plants</div>
            </div>
          </div>
        </div>
        <div className="card-orders">
          <div className="content-orders">
            <div className="img-orders">
              <img src={P2} alt="" />
            </div>
            <div className="details-orders">
              <div className="name-orders">CALLESIA REPENS</div>
              <div className="place-orders">Salma Plants</div>
            </div>
          </div>
        </div>
        <div className="card-orders">
          <div className="content-orders">
            <div className="img-orders">
              <img src={P3} alt="" />
            </div>
            <div className="details-orders">
              <div className="name-orders">SENSEVERA</div>
              <div className="place-orders">Salma Plants</div>
            </div>
          </div>
        </div>
      </div>
      <div className="cards-orders" style={{ marginTop: "50px" }}>
        <div className="card-orders">
          <div className="content-orders">
            <div className="img-orders">
              <img src={P4} alt="" />
            </div>
            <div className="details-orders">
              <div className="name-orders">SUCCULENT PLANT</div>
              <div className="place-orders">Salma Plants</div>
            </div>
          </div>
        </div>
        <div className="card-orders">
          <div className="content-orders">
            <div className="img-orders">
              <img src={P5} alt="" />
            </div>
            <div className="details-orders">
              <div className="name-orders">BUNNY EAR CACTUS</div>
              <div className="place-orders">Salma Plants</div>
            </div>
          </div>
        </div>
        <div className="card-orders">
          <div className="content-orders">
            <div className="img-orders">
              <img src={P6} alt="" />
            </div>
            <div className="details-orders">
              <div className="name-orders">KALANSHOE BLOSSFEDIANA</div>
              <div className="place-orders">Salma Plants</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="button-orders">
      <label htmlFor="one" className="active one"></label>
      <label htmlFor="two" className="two"></label>
    </div>
    </div>
  )
}
