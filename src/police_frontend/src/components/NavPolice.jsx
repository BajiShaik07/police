import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import '../Profile.css'; // Import the CSS file
import { police_backend } from "declarations/police_backend";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "declarations/police_backend";
import PoliceProfile from './PoliceProfile.jsx';
import logo from '../../public/police-image.png';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import PList from './PList.jsx';

const NavPolice = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [dob, setDob] = useState('');
  const [name, setName] = useState('');
  const [gender, setGender] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [noofreq, setNoofreq] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [principal, setPrincipal] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPolice, setIsPolice] = useState(false);
  const [isUser, setIsUser] = useState(false);
  let authClient;
  let actor;

  async function handleAuthenticated(authClient) {
    try {
      setIsConnected(true);
      const identity = await authClient.getIdentity();
      actor = createActor(canisterId, {
        agentOptions: {
          identity,
        },
      });
      var resp = await actor.isAccountExists();
      console.log(resp);
      if (resp.statusCode === BigInt(200)) {
        setPrincipal(resp.principal.toString());
        if (resp.msg === "null") {
          setLoggedIn(true);
          setIsConnected(true);
        } else if (resp.msg === "police") {
          setIsConnected(true);
          setIsPolice(true);
          setLoggedIn(true);
        } else {
          setIsConnected(true);
          setIsUser(true);
          setLoggedIn(true);
        }
      }
      console.log(isConnected, isPolice, isUser, loggedIn);
    } catch (error) {
      console.error("Authentication error:", error);
    }
  }

  async function handleWalletClick() {
    try {
      var authClient = await AuthClient.create();

      if (await authClient.isAuthenticated()) {
        authClient.logout();
        window.location.href = "/";
      } else {
        authClient.login({
          maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
          onSuccess: async () => {
            await handleAuthenticated(authClient);
          },
          redirectTo:
            process.env.DFX_NETWORK === "ic"
              ? "https://identity.ic0.app/#authorize"
              : `http://${process.env.CANISTER_ID_internet_identity}.localhost:4943`,
        });
      }
    } catch (error) {
      console.error("Wallet click error:", error);
    }
  }

  async function reconnectWallet() {
    console.log("connect");
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
      console.log("complete");
      setIsLoading(false);
      var resp = await actor.getPoliceDetails();
      console.log(resp);
      if (resp.statusCode === BigInt(200)) {
        var doc = resp.doc[0];
        setDob(doc.dob);
        setName(doc.name);
        setGender(Object.keys(doc.gender)[0]);
        setSpecialization(doc.specialization);
        setNoofreq(doc.requests.length);
      }
    }
    sendRequest();
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsBlurred(!isBlurred); // Toggle the blur effect when the menu is opened/closed
  };
  const hamburger_class = isMenuOpen ? 'hamburger hamburger--spring is-active' : 'hamburger hamburger--spring';
  
  return (
    (isLoading === false) ? (
      <div className="navbar-container1 profile-body1 mt-3">
        {(!isPolice) ? (<Navigate to="/" />) : (null)}
        <nav className="navbar1">
          <div className="logo">
            <img src={logo} alt="Police Logo" />
            <span className='nav-heading'>Police</span>
          </div>
          <div className="profile">
            <button className={hamburger_class} type="button" onClick={toggleMenu}>
              <span className="hamburger-box">
                <span className="hamburger-inner"></span>
              </span>
            </button>
          </div>
        </nav>
        <PoliceProfile
          principal={principal}
          name={name}
          dob={dob}
          gender={gender}
          specialization={specialization}
          noofreq={noofreq}
          isBlurred={isBlurred}
        />
        <div className={`dropdown-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="dropdown-box">
            <Link className="button" to="/plist">Complaint List </Link>
          </div>
          <div className="dropdown-box">
            <hr />
            <button className="button" onClick={handleWalletClick}>{loggedIn ? 'Logout' : 'Login'}</button>
            <div className="social-icons" style={{marginLeft: '10px'}}>
              <FaFacebook />
              <FaTwitter />
              <FaInstagram />
            </div>
          </div>
        </div>
      </div>
    ) : (<div>Loading...</div>)
  );
};

export default NavPolice;
