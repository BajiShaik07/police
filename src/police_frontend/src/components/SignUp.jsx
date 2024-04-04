import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { police_backend } from "declarations/police_backend";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "declarations/police_backend";
import { Principal } from "@dfinity/principal";
import '../SignUp.css';
import logo from '../../public/police-image.png';
import logo1 from '../../public/user-image.png';
import Footer from './Footer';

function SignUp() {
  const [isPolice, setIsPolice] = useState(true);
  const [principal, setPrincipal] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isxPolice, setIsxPolice] = useState(false);
  const [isUser, setIsUser] = useState(false);
  let authClient;
  let actor;

  async function handleAuthenticated(authClient) {
    setIsConnected(true);
    const identity = await authClient.getIdentity();
    actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    var resp = await actor.isAccountExists();
    console.log(resp);
    if (resp.statusCode == BigInt(200)) {
      setPrincipal(resp.principal.toString());
      if (resp.msg == "null") {
        setLoggedIn(true);
        setIsConnected(true);
      } else if (resp.msg == "police") {
        setIsConnected(true);
        setIsxPolice(true);
        setLoggedIn(true);
      } else {
        setIsConnected(true);
        setIsUser(true);
        setLoggedIn(true);
      }
    }
  }

  async function handleWalletClick() {
    var authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      authClient.logout();
      window.location.href = "/";
    } else {
      authClient.login({
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
        identityProvider: process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/#authorize"
          : `http://localhost:4943?canisterId=${process.env.CANISTER_ID_internet_identity}`,
        onSuccess: async () => {
          handleAuthenticated(authClient);
        },
      });
    }
  }

  async function reconnectWallet() {
    authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      await handleAuthenticated(authClient);
    } else {
      actor = police_backend;
    }
  }

  useEffect(() => {
    async function sendRequest() {
      await reconnectWallet();
    }
    sendRequest();
  }, []);

  const toggleUserType = () => {
    setIsPolice((prevIsPolice) => !prevIsPolice);
  };

  async function ski() {
    var name = document.getElementById("name").value;
    var dob = document.getElementById("date").value;
    var gender = document.getElementById("gender").value;
    var specialization = document.getElementById("specialization").value;
    var g;
    if (gender == 'male') {
      g = { Male: null };
    } else {
      g = { Female: null };
    }
    if (!isConnected) {
      alert("Connect Wallet to continue");
    }
    var authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();
    var actor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    if (isPolice) {
      if ((name == null || name == "") || (dob == null || dob == "") || (gender == null || gender == "") || (specialization == null || specialization == "")) {
        alert("Fill in All Details to Signup.");
        return;
      }
      var resp = await actor.createPolice(name, dob, g, specialization);
      if (resp.statusCode == BigInt(200)) {
        setIsxPolice(true);
      } else {
        alert(resp.msg);
      }

    } else {
      if ((name == null || name == "") || (dob == null || dob == "") || (gender == null || gender == "")) {
        alert("Fill in All Details to Signup.");
        return;
      }
      var resp = await actor.createUser(name, dob, g);
      if (resp.statusCode == BigInt(200)) {
        setIsUser(true);
      } else {
        alert(resp.msg);
      }

    }
  }

  return (
    <>
    <div className="signup-container">
      {
        isxPolice ? <Navigate to="/policeProfile" /> : null
      }
      {
        isUser ? <Navigate to="/userProfile"  /> : null
      }
      <div className={`content ${isPolice ? 'left' : 'right'}`}>
        <div className={`left-content ${isPolice ? '' : 'blur'}`}>
          <img
            src={logo}
            alt="police"
            className="image"
    />
          <p className="label">Police</p>
        </div>
        <label className={`switch ${isPolice ? 'left' : 'right'}`}>
          <input
            type="checkbox"
            className="toggle-button"
            onChange={toggleUserType}
            checked={!isPolice}
          />
          <span className="slider"></span>
        </label>
        <div className={`right-content ${isPolice ? 'blur' : ''}`}>
          <img
            src={logo1}
            alt="user"
            className="image"
    />
          <p className="label">User</p>
        </div>
      </div>
      <div className="signup-form">
        <h2>Sign up as a {isPolice ? 'Police' : 'user'}</h2>
        <form>
          <label>
            Fullname:
            <input id='name' className='type' type="name" placeholder='Enter Your Name' />
          </label>
          <label>
            Date of Birth:
            <input id='date'className='type' type='date' />
          </label>
          <label>
            Gender:
            <select id="gender">
              <option value=''>Select Gender</option>
              <option value='male'>Male</option>
              <option value='female'>Female</option>
            </select>
          </label>
          <label style={{ display: isPolice ? 'block' : 'none' }}>
            Specialization:
            <input id="specialization" className='type' type='text' placeholder='Enter Your Specialization with Police Id ' />
          </label>
        </form>
        <button type="submit" onClick={ski} className='btn1'>Sign Up</button>
      </div>
      <ul className="background">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
    </div>
    <Footer/>
    </>
  );
}

export default SignUp;