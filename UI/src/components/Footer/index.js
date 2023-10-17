import React from "react";
import "./Footer.css";
import FooterSection from "./FooterSection";
import FooterInfo from "./FooterInfo";

const Footer = () => {
  return (
    <div className="Footer">
      <FooterInfo />
      {FooterData.map((e, index) => (
        <FooterSection data={e} key={index} />
      ))}
    </div>
  );
};

export default Footer;

const FooterData = [
  {
    title: "Find product",
    subtitles: [
      "Jewelry",
      "Decorations",
      "Accessories",
      "Toys & Games",
      "Clothing",
    ],
  },
  {
    title: "Get help",
    subtitles: [
      "About us",
      "Contact us",
      "Our policy",
      "Customer care",
      "FAQ’s",
    ],
  },
  {
    title: "About us",
    subtitles: ["News", "Service", "Facebook", "Instagram", "Twitter"],
  },
];
