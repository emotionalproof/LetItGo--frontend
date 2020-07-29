import React, { useState } from 'react'
import Conditions from "./Conditions"

  
const Walk = () => {
  
  
  // let [city, setCity] = useState('');
  // let [responseObj, setResponseObj] = useState({});
  // const uriEncodedCity = encodeURIComponent(city)
  
  // const getForecast = e => {
  //   e.preventDefault()
  //   fetch(`http://localhost:3002/api/v1/user_activities/weather/${uriEncodedCity}`)
  //     .then(res => res.json())
  //     .then(res => {
  //       setResponseObj(res)
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }
  
  // return(
  //   <div className="play-container">
  //          <h2>Walk</h2>
  //          <Conditions 
  //           responseObj={responseObj}
  //          />
  //          <form onSubmit={getForecast}>
  //               <input
  //                   type="text"
  //                   placeholder="Enter City"
  //                   maxLength="50"
  //                   value={city}
  //                   onChange={(e) => setCity(e.target.value)}
  //                   />
  //               <button type="submit">Get Forecast</button>
  //         </form>

  //   </div>
  // )
}
export default Walk;