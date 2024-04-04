import React, { useEffect, useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import { police_backend } from "declarations/police_backend";
import '../Hero.css';
import Navbg from '../../public/bg.jpg';
import { Link } from 'react-router-dom';
// import Login from '../components/Login';
const Hero = (props) => {
  const [identity, setIdentity] = useState(null);
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    async function init() {
      console.log("Home Component Mounted");
      var authClient = await AuthClient.create();
      if (await authClient.isAuthenticated()) {
        const userIdentity = await authClient.getIdentity();
        setIdentity(userIdentity);
        setUserName(userIdentity.getPrincipal().toText());
        console.log("User is Logged In:", userIdentity.getPrincipal().toText());
      }
    }
    init();
  }, []);

  async function handleConnect() {
    console.log("handleConnect clicked");
    var authClient = await AuthClient.create();
    if (identity !== null) {
      authClient.logout();
      setIdentity(null);
      setUserName(null);
      console.log("User Logged Out");
    } else {
      const identityProvider =
        process.env.DFX_NETWORK === "ic"
          ? "https://identity.ic0.app/#authorize"
          : `http://bkyz2-fmaaa-aaaaa-qaaaq-cai.localhost:4943`;

      authClient.login({
        maxTimeToLive: BigInt(7 * 24 * 60 * 60 * 1000 * 1000 * 1000),
        identityProvider: identityProvider,
        onSuccess: async () => {
          const userIdentity = await authClient.getIdentity();
          setIdentity(userIdentity);
          setUserName(userIdentity.getPrincipal().toText());
          console.log("User Logged In:", userIdentity.getPrincipal().toText());
        },
      });
    }
  }

  return (
    <>
     <div className='h'>
      <h1>Police Complaint Management System</h1>
    </div>
      <div className={props.cName}>
        <img src={Navbg} alt='HeroImg' />
      </div>
      <div className='connecttowallet'>
        <button onClick={handleConnect}>{identity ? 'Disconnect' : 'Connect'}</button>
        <br /><br />
        <button><Link to="/signup">Signup</Link></button>
      </div>
      <div className="hero-text">
        <h1>{props.title}</h1>
        <p>{props.text}</p>
      </div>
    </>
  );
}

export default Hero;