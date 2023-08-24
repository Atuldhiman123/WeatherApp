import React, { useState } from 'react'
import axios from 'axios'
import "./wheather.css"
// import search from '../WheatherApp/searchicon1.png'
// import cloud1 from '../WheatherApp/cloud2.png'
// import humidity from '../WheatherApp/wave_2.png'
// import wind from '../WheatherApp/wave1.png'
const WheatherHome = () => {
    const [data, setData] = useState({
        celcius: 10,
        name: "London",
        cloud: "clouds",
        humidity: 10,
        min: 10,
        max:25,
        speed: 2,
    image:'/images1/1clouds-.png'
    })

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        if (inputValue==="") {
            setError("")
        }  setName(inputValue);
    }

    
    const [name, setName] = useState('')
    const [error,setError]= useState('')
    const handleClick = () => {
        if (name !=="") {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=16f1db8b9338a87d910f1a98966da8e5&&units=metric`;
            axios.get(apiUrl)
                .then(res => {
                    let imagePath = '';
                    if (res.data.weather[0].main === "Clouds") {
                        imagePath="/images1/1clouds-.png"
                    }
                    else if (res.data.weather[0].main === "Clear") {
                        imagePath="/images1/clear.png"
                    }
                    else if (res.data.weather[0].main === "Rain") {
                        imagePath="images1/rain.png"
                    }
                    else if (res.data.weather[0].main === "Drizzle") {
                        imagePath="images1/drizzle.png"
                    }
                    else if (res.data.weather[0].main === "Mist") {
                        imagePath="images1/mist.png"
                    }
                    else {
                        imagePath="/images1/1clouds-.png"
                    }
                    console.log(res.data)
                    setData({ ...data, celcius: res.data.main.temp, name: res.data.name, humidity: res.data.main.humidity, speed: res.data.wind.speed, image: imagePath, min: res.data.main.temp_min, max: res.data.main.temp_max, cloud: res.data.weather[0].description})
                    setError("");
            })
                .catch(err => {
                    if (err.response.status === 404) {
                        setError("Invalid City Name")
                    } else {
                        setError("");
                    }
                    console.log(err)
                });
        }
    }

  return (
      <>
          <div className='container'>
      <div className="weather">
       <div className="search">
                      <input type="text" placeholder='Enter City Name'  onChange={(e) => { handleInputChange(e); setName(e.target.value) }}  onKeyDown={e => {
        if (e.key === 'Enter') {
            handleClick();
        }
    }}  />
        <button><img src="/images1/search_icon.png" alt="" onClick={handleClick} /></button>
                  </div> 
                  <div className='error'>
                      <p>{error }</p>
                  </div>
       <div className="winfo">
                      <img src={data.image} alt="" />
                      <p>{data.cloud}</p>
                      <h1>{Math.round(data.celcius)}°C</h1>
                      <p> Min:{Math.round(data.min)}°C &nbsp; &nbsp; Max:{Math.round(data.max)}°C</p>
                    <br/>
                      <h2>{data.name }</h2>
        <div className="details">
         <div className="col">
          <img src="/images1/Humidity1.png" alt="" />
          <div className='humidity'>
                                  <p>{ data.humidity}%</p>
           <p>Humidity</p>
          </div>
         </div>
         <div className="col">
         <img src="/images1/windy.png" alt="" />
          <div className='wind'>
                                  <p>{Math.round(data.speed) }km/h</p>
                                  
                                  <p>Wind</p>
          </div>
         </div>
        </div>
       </div>
      </div>
    </div>
     </>
  )
}

export default WheatherHome