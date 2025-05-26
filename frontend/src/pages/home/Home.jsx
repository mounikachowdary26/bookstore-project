
import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Banner from "./Banner";
import News from "./News";
import Recommended from "./Recommended";
import TopSellers from "./TopSellers";

const Home = () => {
  const [backendMessage, setBackendMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(res => setBackendMessage(res.data))
      .catch(err => console.error('Error fetching backend:', err));
  }, []);

  return (
    <>
      <Banner />
      <TopSellers />
      <Recommended />
      <News />
      
      <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#f0f0f0' }}>
        <h2>Backend says:</h2>
        <p>{backendMessage}</p>
      </div>
    </>
  );
};

export default Home;
