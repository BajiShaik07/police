import React, { useState, useEffect } from 'react';
import { police_backend } from "declarations/police_backend";
import './Complaint.css';
import logo from '../../public/complaint.jpg';

const Complaint = () => {
  const [firs, setFirs] = useState([]);
  const [id, setId] = useState('');
  const [complainantName, setComplainantName] = useState('');
  const [complainantContact, setComplainantContact] = useState('');
  const [incidentDetails, setIncidentDetails] = useState('');
  const [location, setLocation] = useState('');
  const [address, setAddress] = useState('');
  const [state, setState] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [district, setDistrict] = useState('');

  // State variables for input validation
  const [complainantNameError, setComplainantNameError] = useState('');
  const [complainantContactError, setComplainantContactError] = useState('');
  const [incidentDetailsError, setIncidentDetailsError] = useState('');
  const [locationError, setLocationError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [stateError, setStateError] = useState('');
  const [dateTimeError, setDateTimeError] = useState('');
  const [districtError, setDistrictError] = useState('');

  const generateRandomId = () => {
    let newId;
    do {
      newId = Math.floor(100000 + Math.random() * 900000).toString();
    } while (firs.some(fir => fir.id === newId));

    return newId;
  };

  useEffect(() => {
    const fetchFir = async () => {
      try {
        const fetchedFir = await police_backend.getFirDetails();
        setFirs(fetchedFir);
      } catch (error) {
        console.error("Error fetching Fir:", error);
      }
    };

    fetchFir();
    setId(generateRandomId());
  }, []);

  const handleAddComplaint = async () => {
    try {
      // Validate all fields
      if (!complainantName) {
        setComplainantNameError('Complainant Name is required');
        return;
      }
      if (!complainantContact) {
        setComplainantContactError('Complainant Contact is required');
        return;
      }
      if (!incidentDetails) {
        setIncidentDetailsError('Incident Details are required');
        return;
      }
      if (!dateTime) {
        setDateTimeError('Date and Time are required');
        return;
      }
      if (!location) {
        setLocationError('Location is required');
        return;
      }
      if (!address) {
        setAddressError('Address is required');
        return;
      }
      if (!state) {
        setStateError('State is required');
        return;
      }
      if (!district) {
        setDistrictError('District is required');
        return;
      }

      // If all fields are filled, proceed to submit complaint
      const timestamp = new Date().toISOString();
      await police_backend.submitFir({
        id: id,
        complainantContact,
        complainantName,
        address,
        dateTime,
        location,
        incidentDetails,
        timestamp,
        updates: [],
        state,
        status: "null",
        district
      });
      const updatedFirs = await police_backend.getFirDetails();
      setFirs(updatedFirs);

      await new Promise((resolve) => setTimeout(resolve, 0));

      setId(generateRandomId());
      setComplainantName('');
      setComplainantContact('');
      setIncidentDetails('');
      setLocation('');
      setAddress('');
      setState('');
      setDateTime('');
      setDistrict('');
      alert("Complaint submitted successfully!");
      console.log("Complaint submitted successfully!");
    } catch (error) {
      console.error("Error adding complaint:", error);
    }
  };

  // Updated list of districts in Andhra Pradesh
  const districtsInAP = [
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "Guntur",
    "Krishna",
    "Kurnool",
    "NTR",
    "Nellore",
    "Prakasam",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
    "Y.S.R. Kadapa",
  ];

  return (
    <div className='complaint-container'>
      <img className='logo' src={logo} alt="Complaint" />
      <div className='complaint-form'>
        <h2>File a Complaint</h2>
        <div className="input-container">
          <label htmlFor="id">Complaint ID:</label>
          <input
            type="text"
            id="id"
            value={id}
            readOnly
          />
        </div>
        <div className="input-container">
          <label htmlFor="complainantName">Complainant Name:</label>
          <input
            type="text"
            id="complainantName"
            value={complainantName}
            onChange={(e) => {
              setComplainantName(e.target.value);
              setComplainantNameError('');
            }}
            required
          />
          <span className="error">{complainantNameError}</span>
        </div>
        <div className="input-container">
          <label htmlFor="complainantContact">Complainant Contact:</label>
          <input
            type="text"
            id="complainantContact"
            value={complainantContact}
            onChange={(e) => {
              setComplainantContact(e.target.value);
              setComplainantContactError('');
            }}
            required
          />
          <span className="error">{complainantContactError}</span>
        </div>
        <div className="input-container">
          <label htmlFor="incidentDetails">Incident Details:</label>
          <textarea
            id="incidentDetails"
            value={incidentDetails}
            onChange={(e) => {
              setIncidentDetails(e.target.value);
              setIncidentDetailsError('');
            }}
            required
          />
          <span className="error">{incidentDetailsError}</span>
        </div>
        <div className="input-container">
          <label htmlFor="dateTime">Date and Time:</label>
          <input
            type="datetime-local"
            id="dateTime"
            value={dateTime}
            onChange={(e) => {
              setDateTime(e.target.value);
              setDateTimeError('');
            }}
            required
          />
          <span className="error">{dateTimeError}</span>
        </div>
        <div className="input-container">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => {
              setLocation(e.target.value);
              setLocationError('');
            }}
            required
          />
          <span className="error">{locationError}</span>
        </div>
        <div className="input-container">
          <label htmlFor="address">Address:</label>
          <input 
            type="text"
            id="address"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              setAddressError('');
            }}
            required
          />
          <span className="error">{addressError}</span>
        </div>
        <div className="input-container">
          <label htmlFor="state">State:</label>
          <input
            type="text"
            id="state"
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setStateError('');
            }}
            required
          />
          <span className="error">{stateError}</span>
        </div>
        <div className="input-container">
          <label htmlFor="district">District :</label>
          <select
            id="district"
            value={district}
            onChange={(e) => {
              setDistrict(e.target.value);
              setDistrictError('');
            }}
            required
          >
            <option value="" disabled>Select District</option>
            {districtsInAP.map((districtOption, index) => (
              <option key={index} value={districtOption}>{districtOption}</option>
            ))}
          </select>
          <span className="error">{districtError}</span>
        </div>
        <button onClick={handleAddComplaint}>Submit Complaint</button>
      </div>
    </div>
  );
};

export default Complaint;
