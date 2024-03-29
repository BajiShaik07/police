// Home.jsx
import React, { useEffect, useState } from 'react';
import { AuthClient } from "@dfinity/auth-client";
import './Home.css';
import home from '../../public/bg.jpg';
import { Link } from 'react-router-dom';

const Home = () => {
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
    <div>
      
      <header className='h'>
        <h1>Police Complaint Management System</h1>
      </header>

      <div className='complaint-bg'>
        <img src={home} alt="home" />
        <div className='t'>
        <Link to="/signup" className="signup">Signup</Link><br />

          <br />
          <button onClick={handleConnect}>{identity ? 'Logout' : 'Connect Wallet'}</button>
        </div>
      </div>
    </div>
  );
};

export default Home;