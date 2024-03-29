// CList.jsx

import React, { useState, useEffect } from "react";
import { police_backend } from "declarations/police_backend";
import "./CList.css";

const UList = () => {
  const [firs, setFirs] = useState([]);

  useEffect(() => {
    const fetchFir = async () => {
      try {
        const fetchedFir = await police_backend.getFirDetails();
        setFirs(fetchedFir);
        console.log("FIR details fetched successfully:", fetchedFir);
      } catch (error) {
        console.error("Error fetching Fir:", error);
      }
    };

    fetchFir();
  }, []);

  return (
    <div className="complaint-list">
      <h2>Complaint List</h2>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Complaint ID</th>
              <th>Complainant Name</th>
              <th>Contact</th>
              <th>Incident Details</th>
              <th>Location</th>
              <th>Date and Time</th>
              <th>Address</th>
              <th>State</th>
              <th>Pin Code</th>
              <th>Status</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {firs.map((fir) => (
              <tr key={fir.id}>
                <td>{fir.id}</td>
                <td>{fir.complainantName}</td>
                <td>{fir.complainantContact}</td>
                <td>{fir.incidentDetails}</td>
                <td>{fir.location}</td>
                <td>{fir.dateTime}</td>
                <td>{fir.address}</td>
                <td>{fir.state}</td>
                <td>{fir.pin}</td>
                <td>{fir.status}</td>
                <td>{fir.timestamp}</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html:
                      fir.updates.length > 0
                        ? fir.updates
                            .map((action) => {
                              return action[1] + "<br />";
                            })
                            .join("")
                        : "No Actions Available",
                  }}
                />
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UList;