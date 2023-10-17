import React, { useState, useRef, useEffect } from "react";
import './contactForm.css';
import Swal from 'sweetalert2';

function ContactForm() {
  const popupRef = useRef(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [comment, setComment] = useState("");

 let username= localStorage.getItem("username");
       
 let user_email = localStorage.getItem("user_email");

  const handleSubmit = (event) => {
    event.preventDefault();
    const report = { Name: username, Email: user_email, Subject: subject, Comment: comment };
    fetch("http://localhost:9999/user/Report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token")
      },
      body: JSON.stringify(report)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error("Failed to submit report");
        }
        Swal.fire({
          title: 'Success',
          text: 'Report submitted successfully',
          icon: 'success',
          confirmButtonText: 'OK',
        });
        setName("");
        setEmail("");
        setSubject("");
        setComment("");
      })
      .catch(error => {
        console.error(error);
        Swal.fire({
          title: 'Error',
          text: 'Failed to submit report',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };
  

  return (
    <div className="ContactForm" ref={popupRef}>
      <h1 className="sahar-contact-h">Keep in touch!</h1>
      <small>We'll get back to you as quickly as possible</small>
      <form onSubmit={handleSubmit}>
      
         
         
        <input
          placeholder="Subject"
          type="text"
          className="text-field223"
          required
          value={subject}
          onChange={event => setSubject(event.target.value)}
        />
        <textarea
          placeholder="Comment"
          className="text-field223 text-area223"
          value={comment}
          onChange={event => setComment(event.target.value)}
        ></textarea>
        <input className="form-btn223" type="submit" />
        <input className="form-btn223" type="reset" />
      </form>
    </div>
  );
}

export default ContactForm;
