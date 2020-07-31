import React, { useState } from 'react'
import Conditions from "./Conditions"
import Button from 'react-bootstrap/Button'

  
const Walk = () => {
  
  
  let [city, setCity] = useState('');
  let [responseObj, setResponseObj] = useState({});
  const uriEncodedCity = encodeURIComponent(city)
  console.log(uriEncodedCity)
  const getForecast = e => {
    e.preventDefault()
    fetch(`http://localhost:3002/api/v1/user_activities/weather/${uriEncodedCity}`)
      .then(res => res.json())
      .then(res => {
        console.log(res)
        setResponseObj(res)
        setCity("")
      })
      .catch(err => {
        console.log(err);
      });
  }
  
  return(
    <div className="play-container">
           <h2 className="journal-form">Check the weather and then go outside and take a stroll . . . </h2>
           <Conditions 
            responseObj={responseObj}
           />
           <form onSubmit={getForecast}>
                <input
                    className='forecast-input'
                    type="text"
                    placeholder="Enter City"
                    maxLength="50"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    />
                <Button variant="link" className="forecast-button timer-button" type="submit">Get Forecast</Button>
          </form>

    </div>
  )
}
export default Walk;