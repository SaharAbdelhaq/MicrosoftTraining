import React, { useState, useEffect } from "react";
import "./Sidebar.css";
import LOGO from "./LOGO.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faHome,
  faRightFromBracket,
  faBug,
  faMessage,
  faHeart,
  faPlus,
  faPen,
} from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faChartLine } from "@fortawesome/free-solid-svg-icons";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const [userType, setUserType] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  let name = localStorage.getItem("username");
  let logo = localStorage.getItem("logo");
  let user_type = localStorage.getItem("user_type");

  const navigate = useNavigate();
  useEffect(() => {
    const type = localStorage.getItem("user_type");
    setUserType(type);

    return () => {
      <div>Authorization error, please login again...</div>;
    };
  }, [userType]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate("/Form");
  };
  const sideBarItems =
    userType === "business owner" ? BO : userType === "admin" ? admin : user;

  return (
    <div className="sidebar">
      <div className="profile">
        <img src={logo} alt="profile_picture" />
        <h3>{name}</h3>
        <p>{user_type.toUpperCase()}</p>
      </div>
      <ul>
        {sideBarItems.map((element, index) => {
          return (
            <li key={index}>
              <button
                className={`sidebar-btn ${index === activeIndex ? "active" : ""
                  }`}
                onClick={(e) => {
                  setActiveIndex(index);
                  navigate(element.url);
                }}
              >
                <span className="icon">
                  <FontAwesomeIcon icon={element.icon} />
                </span>
                <span className="item">{element.title}</span>
              </button>
            </li>
          );
        })}



        <li>
          <button
            className="sidebar-btn"
            onClick={handleLogout}
          >
            <span className="icon">
              <FontAwesomeIcon icon={faRightFromBracket} />
            </span>
            <span className="item">logout</span>
          </button>
        </li>


      </ul>
    </div>
  );
}

const user = [
  { title: "Home", url: "/Home", icon: faHome },
  { title: "My Favorites", url: "/Favorites", icon: faHeart },
  // { title: "report a problem", url: "/Popup", icon: faBug },
  { title: "report a problem", url: "/ContactForm", icon: faBug },

  { title: "chats", url: "/Chats_Omar", icon: faMessage },
];
const BO = [
  { title: "Home", url: "/Home", icon: faHome },
  { title: "add product", url: "/product/newProduct", icon: faPlus },
  { title: "My Products", url: "/BOproducts", icon: faMessage },
  { title: "chats", url: "/Chats_Omar", icon: faMessage },
  { title: "My Favorites", url: "/Favorites", icon: faHeart },
  { title: "report a problem", url: "/ContactForm", icon: faBug },

  // { title: "instagram account", url: "", icon: faInstagram },
  // { title: "update info", url: "/", icon: faPen },
];

const admin = [
  // { title: "Home", url: "/Home", icon: faHome },
  { title: "dashboard", url: "/MainSection", icon: faDesktop },
  { title: "reports", url: "/Reports", icon: faChartLine },
  { title: "chats", url: "/Chats_Omar", icon: faMessage },

];

