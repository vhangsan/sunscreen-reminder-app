// import logo from './logo.svg';
import './App.css';

import React, { useState } from 'react';
import axios from 'axios';
import { format } from 'date-fns';
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [uvInfo, setUvInfo] = useState(null);
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  // const [country, setCountry] = useState('');
  const [error, setError] = useState(null);
  const [alertMessage, setAlertMessage] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async () => {
    const zipCodePattern = /^\d{5}(\d{1})?$/;
    if (!zipCodePattern.test(searchTerm)) {
      alert('Invalid zip code format. Please enter a 5-digit ZIP code.');
      return;
    }

    try {
      // get data from zipcode in the US
      const geocodeUrl = `https://api.opencagedata.com/geocode/v1/json?q=${searchTerm},US&key=${process.env.REACT_APP_OPENCAGE_API_KEY}`;
      const geocodeResponse = await axios.get(geocodeUrl);
      const data = geocodeResponse.data;

      console.log('Geocode API Response:', data);

    const { lat, lng } = data.results[0].geometry;
    const city = data.results[0].components.city || data.results[0].components.town;
    const state = data.results[0].components.state;
    // const country = data.results[0].components.country;

    console.log('City:', city);
    console.log('State:', state);
    // console.log('Country:', country);

    const uvUrl = `https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lng}&alt=100&dt=`;
      const uvResponse = await axios.get(uvUrl, {
        headers: {
          'x-access-token': process.env.REACT_APP_OPENUV_API_KEY,
          'Content-Type': 'application/json',
        },
      });
      const uvData = uvResponse.data;
      console.log('UV Index API Response:', uvData);

      if (!uvData.result) {
        alert('No UV data found for the provided coordinates.');
        return;
      }
      const formattedUvTime = format(new Date(uvData.result.uv_time), 'MMM d, yyyy h:mm a');

      setUvInfo({
        ...uvData.result,
        uv_time: formattedUvTime
      })
     
      setCity(city);
      setState(state);
      // setCountry(country);

      if (uvData.result.uv > 2) {
        setAlertMessage('Apply sunscreen!');
      } else if (uvData.result.uv === 0) {
        setAlertMessage('No harsh sun rays at the moment!');
      } else {
        setAlertMessage('');
      }
    } catch (error) {
      console.error('Error fetching UV info:', error);
      setError('Error fetching UV info');
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <img src="/images/sun.png" alt="Sun Icon" className="header-image"/>
        <h1>Sun Safe Alert App</h1>
      </div>
      <p>Never forget to protect your skin! Check your location for the latest UV index.</p>
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter zipcode..."
          value={searchTerm}
          onChange={handleChange}
          className="search-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
      </div>
      {uvInfo && (
        <div className="uv-info">
        <p>My Location</p>
        <p className="location">📍 {city}, {state}</p>
        <p className="uv-index">UV Index: {uvInfo.uv}</p>
        <p className="uv-time">{uvInfo.uv_time}</p>
      </div>
      )}
      {error && <div className="error">{error}</div>}
      {alertMessage && <div className="alert">{alertMessage}</div>} {/* Alert box */}
    </div>
  );
}

export default App;
