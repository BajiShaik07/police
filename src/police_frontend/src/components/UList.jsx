import React, { useState, useEffect } from "react";
import { police_backend } from "declarations/police_backend";
import Footer from "./Footer";
import '../CList.css';

const UList = () => {
  const [firs, setFirs] = useState([]);
  const [selectedComplaintId, setSelectedComplaintId] = useState("");
  const [notFound, setNotFound] = useState(false);

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

  // Filter FIRs based on selectedComplaintId
  const filteredFirs = selectedComplaintId
    ? firs.filter((fir) => fir.id === selectedComplaintId)
    : firs;

  // Show "not found" message if no complaints are found
  useEffect(() => {
    setNotFound(filteredFirs.length === 0 && selectedComplaintId !== "");
  }, [filteredFirs, selectedComplaintId]);

  return (
    <>
    <button className="back"><a href="/userProfile">Back</a></button>
    <div className="complaint-list">
      <h2 className="h22">Complaint List</h2>
      <div className="table-container">
        <div className="input-container">
          <label htmlFor="complaintId">Complaint ID:</label>
          <input
            type="text"
            id="complaintId"
            value={selectedComplaintId}
            onChange={(e) => setSelectedComplaintId(e.target.value)}
            placeholder="Enter Complaint ID"
          />
        </div>
        {notFound && <p>No complaints found for the entered ID.</p>}
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
              <th>Status</th>
              <th>Timestamp</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFirs.map((fir) => (
              <tr key={fir.id}>
                <td>{fir.id}</td>
                <td>{fir.complainantName}</td>
                <td>{fir.complainantContact}</td>
                <td>{fir.incidentDetails}</td>
                <td>{fir.location}</td>
                <td>{fir.dateTime}</td>
                <td>{fir.address}</td>
                <td>{fir.state}</td>
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
    <Footer/>
    </>
  );
};

export default UList;
