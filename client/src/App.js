import './App.css';

import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom'
import Decks from './pages/Decks';
import Deck from './pages/Deck';
import Navbar from './components/Navbar';
import Home from './pages/Home';

const axios = require("axios");

function App() {
  
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    axios.get("http://192.168.2.33:9000/precons").then(async (data) => {
        if(data === undefined)
          return;
        
        setDecks(data.data);
    })
  }, [])

  return (
    <>
      <div className="App">

        <Navbar/>
        
        <div className='page'>
          <div className='background'/>

          <div className='content'>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/precons" element={<Decks decks={decks}/>}/>
              <Route exact path="/deck/:slug" element={<Deck decks={decks}/>}/>
            </Routes>
          </div>
         
        </div>
  
      </div>

      <style jsx>
        {`
          .background {
            position: absolute;
            height: calc(100% - 40px); //navbar height
            z-index: 0;
            pointer-events: none;
            overflow: hidden;
          }

          .content {
            z-index: 100;
            width: 100%;
            height: 100%;
            position: relative;
          }

          .page {
            width: 100vw;
            height: 100vh;
            overflow: hidden;
          }
        `}
      </style>
    </>
  );
}

export default App;
