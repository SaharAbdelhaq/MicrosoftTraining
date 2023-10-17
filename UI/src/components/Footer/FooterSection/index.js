import React from "react";
import "./FooterSection.css";

const FooterSection = ({ data }) => {
  const { title, subtitles } = data;
  return (
    <div className="footer-section">
      <h2 className="footer-section-title">{title}</h2>
      <ul className="footer-section-ul">
        {subtitles.map((e, index) => (
          <li key={index} className="footer-section-subtitle">
            {e}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;
