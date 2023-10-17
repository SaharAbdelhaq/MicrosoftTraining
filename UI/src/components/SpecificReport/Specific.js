import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Specific.css';
import reportImage from './reportImage.png';
import { useParams } from 'react-router-dom';

export default function Specific() {
  const [report, setReport] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/admin/report${id}`, {
          headers: {
            Authorization: localStorage.getItem("access_token")
          },
          
        });
        console.log('Response data:', response.data);
        setReport(response.data[0]);
      } catch (error) {
        console.error('Error fetching report:', error);
      }
    };
    console.log('Fetching report with ID:', id);
    fetchReport();
  }, [id]);

  if (!report) {
    return <div>Loading...</div>;
  }
  console.log('Report data:', report);
  return (
    <>
    <div className="formReport" id="formReport">
                  <img src={reportImage} alt="" id='tick'/>
                  <h2 className='report-title'>From : {report.Name}</h2>
          <p className='report-info'><span className='spanReport'>Subject :</span> {report.Subject}</p>
          <p className='report-info'><span className='spanReport'>Email :</span> {report.Email}</p>
          <p className='report-info'><span className='spanReport'>Comment :</span> {report.Comment}</p>
          <p className='report-info'><span className='spanReport'>User ID :</span> {report.User_ID}</p>
        </div>
      </>
  );
}
