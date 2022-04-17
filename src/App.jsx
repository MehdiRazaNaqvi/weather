import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const App = () => {
  const api_call = "7973f7c02b999b1d3504034b5a019ef1";
  const api_url = "https://api.openweathermap.org/data/2.5/weather?"

  const [data, setdata] = useState({main : {temp : Number , humidity : Number , feels_like : Number , pressure : Number} , wind : {speed : Number}});


  useEffect(() => {
    navigator.geolocation.getCurrentPosition((p) => { fetch_place(p.coords.longitude, p.coords.latitude) })

  }, [1000])



  const fetch_place = (lon, lat) => {
    axios.get(`${api_url}lat=${lat}&lon=${lon}&appid=${api_call}`)
      .then((res) => { setdata(res.data) })
  }


  return (

    <div>



      {data !== {} ?
        <p>
          Temp : {data.main.temp} Humidity : {data.main.humidity} Pressure : {data.main.pressure} Feels Like : {data.main.feels_like} Wind Speed : {data.wind.speed}
        </p>
        :
        null
      }

    </div>
  )

}

export default App;
