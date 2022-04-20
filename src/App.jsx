import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

import img from "./wt.svg"

import "./app.css";

const App = () => {
  const api_call = "7973f7c02b999b1d3504034b5a019ef1";
  const api_url = "https://api.openweathermap.org/data/2.5/weather?"

  const [data, setdata] = useState({ main: { temp: Number, humidity: Number, feels_like: Number, pressure: Number }, wind: { speed: Number } });


  useEffect(() => {
    
    navigator.geolocation.getCurrentPosition((p) => { fetch_place(p.coords.longitude, p.coords.latitude) })

  }, [1000])



  const fetch_place = (lon, lat) => {
    axios.get(`${api_url}lat=${lat}&lon=${lon}&appid=${api_call}`)
      .then((res) => { setdata(res.data) })
  }


  const [city, setcity] = useState("");

  const fetch_city_data = () => {

    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_call}`)
    .then( (res) => {console.log(res.data)} )

  }




  return (

    <div>


      {data !== {} ?





        <div className="parent" >

          <div>
            <div className="city_input">  <input className="form-control"  type="text" onChange={(e) => setcity(e.target.value)} /></div>
            <button className="btn btn-outline-warning" onClick={() => fetch_city_data()} >Show in console
            </button>
          </div>


          <div className="temperature" > <h1>{(data.main.temp - 273.15).toFixed(2)} </h1> </div>


          <div className="extra">

            <div className="city" > <h6>{data.name} </h6> </div>
            <span>  <p> Feels Like : {(data.main.feels_like - 273.15).toFixed(2)} </p> </span>
            <span>  <p> Presure : {data.main.pressure} </p></span>
            <span>  <p> Humidity : {data.main.humidity}  </p></span>
            <span>  <p> Wind : {data.wind.speed} </p></span>

          </div>



        </div>

        :
        null
      }

    </div>
  )

}

export default App;
