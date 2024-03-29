import React from 'react';
import { FaUser } from 'react-icons/fa'; // Import the FaUser icon from react-icons/fa
import '../Profile.css'; // Import the CSS file

const PoliceProfile = ({ principal, name, dob, gender, specialization, noofreq, isBlurred }) => {
  const profileClass = isBlurred ? 'profile-section ps blurred' : 'profile-section ps';

  return (
    <div className={profileClass}>
      <div className="tools">
        <div className="circle">
          <span className="red box"></span>
        </div>
        <div className="circle">
          <span className="yellow box"></span>
        </div>
        <div className="circle">
          <span className="green box"></span>
        </div>
      </div>
      <FaUser className="profile-pic" size="2rem" /> {/* Use the FaUser icon component */}
      <div className="profile-info">
        <p><b>Principal:</b> {principal}</p>
        <p><b>Name: </b>{name}</p>
        <p><b>Date of Birth:</b> {dob}</p>
        <p><b>Gender:</b> {gender}</p>
        <p><b>Specialization:</b> {specialization}</p>
      </div>
    </div>
  );
};

export default PoliceProfile;
