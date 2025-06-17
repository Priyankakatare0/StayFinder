import React from 'react';
import Navbar from '../Page/Navabar';
import bgImage from '../assets/bgimage.webp';
import Header from './Header';
import ListingList from './ListingList';
import Listings from './Listings';
import Footer from '../Page/Footer';




const Home = () => {
  return (
    <>
  
    <Header/>
    <Listings/>
    <Footer />
   
    </>
    
  )
};

export default Home;
