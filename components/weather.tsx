/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
// Weather.tsx
import React, { useState } from 'react';
import axios from 'axios';
import './weather.css';

const Weather: React.FC = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState<any>(null);

  const fetchWeather = async () => {
    try {
      const geoResponse =
      await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${import.meta.env.PUBLIC_ENV__APP_API_KEY}`);

    // Assuming the first result is the city we want
    const { lat, lon } = geoResponse.data[0];

    const weatherResponse =
      await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${import.meta.env.PUBLIC_ENV__APP_API_KEY}`);
      setWeatherData(weatherResponse.data);
    } catch (error) {
      console.error('Error fetching weather:', error);
    }
  };


  return (
    <div className='weather'>
        <div className='search'>
      <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" />
      <button onClick={fetchWeather}>Get Weather</button>
      </div>

      {weatherData && (
         <div className="container">
         <div className="top">
           <div className="location">
             <p>{weatherData.name}</p>
           </div>
           <div className="temp">
             {weatherData.main ? <h1>{weatherData.main.temp.toFixed()}°F</h1> : null}
           </div>
           <div className="description">
             {weatherData.weather ? <p>{weatherData.weather[0].main}</p> : null}
           </div>
         </div>
 
         {weatherData.name !== undefined &&
           <div className="bottom">
             <div className="feels">
               {weatherData.main ? <p className='bold'>{weatherData.main.feels_like.toFixed()}°F</p> : null}
               <p>Feels Like</p>
             </div>
             <div className="humidity">
               {weatherData.main ? <p className='bold'>{weatherData.main.humidity}%</p> : null}
               <p>Humidity</p>
             </div>
             <div className="wind">
               {weatherData.wind ? <p className='bold'>{weatherData.wind.speed.toFixed()} MPH</p> : null}
               <p>Wind Speed</p>
             </div>
           </div>
         }
 
 
 
       </div>
      )}
    </div>
  );

  
};

export default Weather;
