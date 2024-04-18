
// PList.jsx

import React, { useState, useEffect } from "react";
import { police_backend } from "declarations/police_backend";
import "../PList.css";
import Footer from "./Footer1";

const PList = () => {
  const [firs, setFirs] = useState([]);
  const [selectedComplaintId, setSelectedComplaintId] = useState("");
  const [statusUpdate, setStatusUpdate] = useState("");
  const [actionUpdate, setActionUpdate] = useState("");
  const [selectedComplaintStatus, setSelectedComplaintStatus] = useState("");

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

  const handleUpdateStatus = async (complaintId) => {
    try {
      await police_backend.updateStatusInFir(complaintId, statusUpdate);

      const updatedFirs = await police_backend.getFirDetails();
      setFirs(updatedFirs);

      const updatedFir = updatedFirs.find((fir) => fir.id === complaintId);
      if (updatedFir) {
        setSelectedComplaintStatus(`Status: ${updatedFir.status} (Updated)`);
      }

      console.log(
        `Status updated successfully for Complaint ID: ${complaintId}`
      );
      console.log("Updated FIR details:", updatedFirs);
      console.log("Selected Complaint Status:", selectedComplaintStatus);

      setSelectedComplaintId("");
      setStatusUpdate("");
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleUpdateAction = async (complaintId) => {
    try {
      await police_backend.addUpdateInFir(
        complaintId,
        "Action",
        actionUpdate
      );

      // Get current timestamp
      const currentTimestamp = new Date().toISOString();

      // Update timestamp along with action
      await police_backend.addUpdateInFir(
        complaintId,
        "Timestamp",
        currentTimestamp
      );

      const updatedFirs = await police_backend.getFirDetails();
      setFirs(updatedFirs);

      const updatedFir = updatedFirs.find((fir) => fir.id === complaintId);
      if (updatedFir) {
        setSelectedComplaintStatus(
          `Action: ${updatedFir.updates[1]} (Updated)`
        );
      }

      console.log(
        `Action updated successfully for Complaint ID: ${complaintId}`
      );
      console.log("Updated FIR details:", updatedFirs);
      console.log("Selected Complaint Status:", selectedComplaintStatus);

      setSelectedComplaintId("");
      setActionUpdate("");
    } catch (error) {
      console.error("Error updating action:", error);
    }
  };

  return (
    <>
    <button className="back"><a href="/policeProfile">Back</a></button>
    <div className="container-fluid mt-2">
    <div className="status-container ">
      <div className="update-section">
        <h2 className="h22">Update Status and Action</h2>
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
        <div className="input-container">
          <label htmlFor="statusUpdate">Update Status:</label>
          <input
            type="text"
            id="statusUpdate"
            value={statusUpdate}
            onChange={(e) => setStatusUpdate(e.target.value)}
            placeholder="Enter new status"
          />
          <button onClick={() => handleUpdateStatus(selectedComplaintId)}>
            Update Status
          </button>
        </div>
        <div className="input-container">
          <label htmlFor="actionUpdate">Update Action:</label>
          <input
            type="text"
            id="actionUpdate"
            value={actionUpdate}
            onChange={(e) => setActionUpdate(e.target.value)}
            placeholder="Enter action update"
          />
          <button onClick={() => handleUpdateAction(selectedComplaintId)}>
            Update Action
          </button>
        </div>
      </div>
      <div className="status-list">
        <h2 className="h22"> Complaint Status List</h2>
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
                <th>District</th>
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
                  <td>{fir.district}</td>
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
      <div className="status-display">
        <h2 className="">Selected Complaint Status</h2>
        <p>{selectedComplaintStatus}</p>
      </div>
    </div>
    </div>
    <Footer/>
    </>
  );
};

export default PList;
