import React from 'react';
import Image from 'react-bootstrap/Image'

const Conditions = (props) => {

    const imageUrl = () => {
        let url =`http://openweathermap.org/img/wn/${props.responseObj.weather[0].icon}@2x.png`
        return url
    }

    return (
        <div>
            {props.responseObj.cod === 200 ?
                <div>
                    <Image src={imageUrl()} alt="weather-icon" className="weather-icon"></Image>
                    <p><strong className="forecast-location journal-form">{props.responseObj.name}</strong></p>
                    <p className="forecast journal-form">It is currently {Math.round(props.responseObj.main.temp)} degrees out with {props.responseObj.weather[0].description}.</p>
                </div>
            : null
            }
        </div>
    )
}
export default Conditions;