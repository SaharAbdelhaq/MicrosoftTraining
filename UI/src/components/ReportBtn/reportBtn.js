import React, { useState, useRef, useEffect } from "react";
import "./Contact.css";

function Popup() {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const popupRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupVisible(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [popupRef]);

  const handleButtonClick = () => {
    setIsPopupVisible(true);
  };
  
  
  return (
    <div>
      <div className={`reporting ${isPopupVisible ? "hide" : ""}`} onClick={handleButtonClick}>Report</div>
      {isPopupVisible && (
        <div className="reportingForm" ref={popupRef}>
          <h1 className="sahar-report-h">Keep in touch!</h1>
          <small>We'll get back to you as quickly as possible</small>
          <form action="#">
            <input placeholder="Name" type="text" className="text-field" required />
            <input placeholder="Email" type="email" className="text-field" required />
            <input placeholder="Subject" type="text" className="text-field" required />
            <textarea placeholder="Comment" className="text-field text-area" ></textarea>
            <input className="form-btn2" type="submit" />
            <input className="form-btn2" type="reset" />
          </form>
        </div>
      )}
    </div>
  );
      }
        
export default Popup;
