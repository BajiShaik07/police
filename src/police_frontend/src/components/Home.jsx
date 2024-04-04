import React, { useEffect, useState } from 'react';
import { police_backend } from "declarations/police_backend";
import '../Home.css'
import Hero from './Hero'
import Footer from './Footer';

const Home = () => {
  return (
    <>
   
      <Hero 
        cName='hero'
        HeroImg='bg.jpg'
      />
      <Footer/>
    </>
  )
}

export default Home;