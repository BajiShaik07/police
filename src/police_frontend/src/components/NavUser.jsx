import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import "../Profile.css"; // Import the CSS file
import CProfile from "./UserProfile";
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { police_backend } from "declarations/police_backend";
import { AuthClient } from "@dfinity/auth-client";
import { canisterId, createActor } from "declarations/police_backend";
import { Principal } from "@dfinity/principal";import logo from '../../public/user-image.png';


const NavUser = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [noofdoc, setNoofdoc] = useState(0);
  const [noofreq, setNoofreq] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  //authentication starts

  const [principal, setPrincipal] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [isPolice, setIsPolice] = useState(false);
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
        setIsPolice(true);
        setLoggedIn(true);
      } else {
        setIsConnected(true);
        setIsUser(true);
        setLoggedIn(true);
      }
    }
    console.log(isConnected, isPolice, isUser, loggedIn);
  }

  async function handleWalletClick() {
    var authClient = await AuthClient.create();
    if (await authClient.isAuthenticated()) {
      authClient.logout();
      window.location.href = "/"; // Redirect to the home page after logout
    } else {
      authClient.login({
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
        identityProvider:
          process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app/#authorize"
            : `http://localhost:4943?canisterId=${process.env.CANISTER_ID_internet_identity}`,
        onSuccess: async () => {
          handleAuthenticated(authClient);
        },
      });
    }
  }

  async function reconnectWallet() {
    console.log("connec");
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
      console.log("comple");
      setIsLoading(false);
      var resp = await actor.getUserDetails();
      console.log(resp);
      if (resp.statusCode == BigInt(200)) {
        var user = resp.user[0];
        setDob(user.dob);
        setName(user.name);
        setGender(Object.keys(user.gender)[0]);
        setNoofdoc(user.polices.length);
        setNoofreq(Number(user.noofrecords));
      }
    }
    sendRequest();
  }, []);

  // authentication ends

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsBlurred(!isBlurred); // Toggle the blur effect when the menu is opened/closed
  };
  const hamburger_class = isMenuOpen
    ? "hamburger hamburger--spring is-active"
    : "hamburger hamburger--spring";
  return isLoading == false ? (
    <div className="navbar-container1 profile-body1 mt-3">
      {!isUser ? <Navigate to="/" /> : null}

      <nav className="navbar1">
        {" "}
        {/* Use the class name directly */}
        <div className="logo">
          <img src={logo} alt="User Logo" />
          <span className="nav-heading">User</span>
        </div>
        <div className="profile">
          <a href="/userprofile">
            <img src={logo} alt="Profile Pic" />
          </a>
          {/* <span>Hello, {userName}</span> */}
          <button
            className={hamburger_class}
            type="button"
            onClick={toggleMenu}
          >
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>
        </div>
      </nav>
      <CProfile
        principal={principal}
        name={name}
        dob={dob}
        gender={gender}
        policesVisited={noofdoc}
        NoofRecords={noofreq}
        isBlurred={isBlurred} // Pass the blur state to the Profile component
      />
      <div className={`dropdown-menu ${isMenuOpen ? "open" : ""}`}>
        <div className="dropdown-box">
          <Link className="button" to="/complaint">
            Raise Complaint
          </Link>
          <Link className="button" to="/uList">
            Complaint List
          </Link>
        </div>
        <div className="dropdown-box">
          <hr />
          <button className="button" onClick={handleWalletClick}>
            Logout
          </button>
          <div className="social-icons">
            <FaFacebook />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default NavUser;
