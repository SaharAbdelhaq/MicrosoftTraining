import React from "react";
import profile from "./profile.png";
import dashboard from "./dashboard.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import '@fortawesome/fontawesome-free/css/all.min.css';

function MainSection() {
  const [stats, setStats] = useState({});
  const [owners, setOwners] = useState([]);

  const [showAll, setShowAll] = useState(false);
  const ownersToShow = showAll ? owners : owners.slice(0, 3);

  const fetchData = () => {
    axios
      .get("http://localhost:9999/admin/AllStats", {
        headers: { Authorization: localStorage.getItem("access_token") },
      })

      .then((response) => {
        console.log(response.data);
        setStats(response.data);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchOwners() {
      const response = await fetch(
        "http://localhost:9999/businessOwner/allBusinessOwners",
        { headers: { Authorization: localStorage.getItem("access_token") } }
      );

      const data = await response.json();
      setOwners(data);
    }
    fetchOwners();
  }, []);

  // const handleChatButtonClick = () => {
  //   const email = localStorage.getItem("user_email");
  //   const BOName = product.Business_Name;
  //   const url = `http://localhost:3001?email=${email}&BOName=${BOName}`;
  //   window.open(url, "_blank");
  // };

  return (
    <div className="saharStyles">
      <div className="dashhh">
        <div className="containerSaharr">
          <main className="content">
            <section className="main">
              <div className="box box-1">
                <div className="box-left">
                  <h4>WELCOME!</h4>
                  <p>
                    You have done 72% . Check your new badge in your profile.
                  </p>
                  <Link to="/Reports">View Reports</Link>
                </div>
                <div className="box-right">
                  <img src={profile} alt="profile" />
                </div>
              </div>

              <div className="box box-2">
                <div className="box-details">
                  <h4>{stats.users}</h4>
                  <span>Users</span>
                </div>
                <div className="box-icon">
                  <i className="fas fa-users"></i>
                </div>
              </div>

              <div className="box box-3">
                <div className="box-details">
                  <h4>{stats.businessOwners}</h4>
                  <span>Owners</span>
                </div>
                <div className="box-icon">
                  <i className="fas fa-tasks"></i>
                </div>
              </div>

              <div className="box box-4">
                <div className="box-details">
                  <h4>{stats.products}</h4>
                  <span>Products</span>
                </div>
                <div className="box-icon">
                  <i className="fas fa-shopping-bag"></i>
                </div>
              </div>

              <div className="box box-5">
                <div className="box-details">
                  <h4>{stats.reports}</h4>
                  <span>Reports</span>
                </div>
                <div className="box-icon">
                  <i className="fas fa-file"></i>
                </div>
              </div>

            
            </section>    
          </main>
       
        </div>
      </div>
      
      <div className="box box-7">
                <div className="box-header">
                  <h4>Business Owners</h4>
                  <a href="#" onClick={() => setShowAll(!showAll)}>
                    {showAll ? "show less" : "see all"}
                  </a>
                </div>
                <div className="box-container">
                  {ownersToShow.map((owner) => (
                    <div className="customer" key={owner.Product_ID}>
                      <img src={owner.logo} alt="avatar" />
                      <div className="info">
                        <h5>{owner.Business_Name}</h5>
                      </div>
                      <div className="contacts">

                      <button

                      onClick={() => {

                        const email = localStorage.getItem("user_email");

                        const BOName = owner.Business_Name;

                        const url = `http://localhost:3001?email=${email}&BOName=${BOName}`;

                        window.open(url, "_blank");

                      }}

                      className="chat-btn"

                    > Chat </button>
                                          
                      </div>
                    </div>
                  ))}
                </div>
              </div>
    </div>
    
  );
}

export default MainSection;
