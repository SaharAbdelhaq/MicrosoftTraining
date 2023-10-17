import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Reports.css';
import { Link } from 'react-router-dom';

const UsersReports = () => {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await axios.get('http://localhost:9999/admin/AllReports', {
        headers: {
          Authorization: localStorage.getItem("access_token")
        },
      });
        console.log(response.data);
        const formattedReports = response.data.map((report) => {
          return {
            id: report.id,
            Name: report.Name,
            Email: report.Email,
            Subject: report.Subject,
            Comment: report.Comment
          };
        });
        setReports(formattedReports);
      } catch (error) {
        console.error(error.response); // Print entire response object
        console.error(error); // Print error object
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="testimonials">
      <div className="inner">
        <h1>Reports</h1>
        <div className="border"></div>

        <div className="row">
          {reports.map((report) => (
           
           <Link to={`/admin/report/${report.id}`} className="col"> 
              <div className="testimonial">
                <h2 className="nameReportSec">{report.Name}</h2>
                <p className="subjectReportSec">{report.Subject}</p>
                <p className="emailReportSec">{report.Email}</p>
                <p className="commentReportSec">{report.Comment}</p>
                <a className='buttonReportSec'>Open</a>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UsersReports;
