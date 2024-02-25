import React, { useEffect, useState } from 'react';
import './App.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import clear from './assets/clear.png';



function App() {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState([]);

  const [dustData, setDustData] = useState([]);



  const fetch_WeatherData = async () => {
    let initDate = selectedDate.toISOString().slice(0, 10).replace(/-/g, '');
    const now = new Date();
    let hour = now.getHours() - 1;
    hour = String(hour).padStart(2, '0');

    const base_time = `${hour}00`;
    console.log(base_time);

    let forecast_url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=W9yTTVsj5jaa3NvKQGwX%2FD4fsm7sdVjTbvLTfj4PaQmK%2BZH5PrEoLtQHTy0vbbRQKhG9go7HNomj%2BpNPslsysw%3D%3D&pageNo=1&numOfRows=50&dataType=json&base_date=${initDate}&base_time=${base_time}&nx=58&ny=127`

    const response = await fetch(forecast_url);
    const data = await response.json();
    const items = data.response.body.items.item;

    let temp = items.filter(item => item.category === 'TMP');
    let firstTemp = temp.length > 0 ? temp[0] : null;

    let cloudy = items.filter(item => item.category === 'SKY');
    let firstCloudy = cloudy.length > 0 ? cloudy[0] : null;


    let humidity = items.filter(item => item.category === 'REH');
    let firstHumidity = humidity.length > 0 ? humidity[0] : null;


    let rainy = items.filter(item => item.category === 'POP');
    let firstRainy = rainy.length > 0 ? rainy[0] : null;


    let wind = items.filter(item => item.category === 'VEC');
    let firstWind = wind.length > 0 ? wind[0] : null;


    setWeatherData({ firstTemp, firstCloudy, firstHumidity, firstRainy, firstWind });
  };

  useEffect(() => {
    fetch_WeatherData();
  }, [selectedDate]);


  /*  const fetch_DustData = () => {
     //시군구별 실시간 평균정보 조회 (경기)
     let Dustdata_url = 'https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst?serviceKey=W9yTTVsj5jaa3NvKQGwX%2FD4fsm7sdVjTbvLTfj4PaQmK%2BZH5PrEoLtQHTy0vbbRQKhG9go7HNomj%2BpNPslsysw%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EA%B2%BD%EA%B8%B0&searchCondition=DAILY';
 
     fetch(Dustdata_url)
       .then(response => {
         return response.json();
       }).then(data => {
         const items = data.response.body.items;
         const filteredItems = items.filter(item => item.cityName === '김포시');
         if (filteredItems.length > 0) {
           setDustData(filteredItems);
         } else {
           console.log("No dust data available");
         }
       }).catch(error => {
         console.error(error);
       });
   };
 
   useEffect(() => {
     console.log("Dust data changed, creating table");
   }, [dustData]); */

  const makeDustTable = () => {
    const firstData = dustData.length > 0 ? dustData[0] : null;
    return (
      <div className='dust-info'>
        {firstData && (
          <ul>
            <li>pm10 μg/m³: {firstData.pm10Value}</li>
            <li>pm25 μg/m³: {firstData.pm25Value}</li>
          </ul>
        )}
      </div>
    );
  }


  return (
    <>
      <div className='card'>
        <div className="weather">
          <h2 className='city'>Weather in 김포</h2>
          <h1 className="temp">24°C</h1>
          <img src="" alt="" className='icon' />
          <div className='description'>Cloudy : {weatherData && weatherData.firstCloudy ? weatherData.firstCloudy.fcstValue : '불러오는 중...'} </div>
          <div className='humidity'>Humidity : {weatherData && weatherData.firstHumidity ? weatherData.firstHumidity.fcstValue : '불러오는 중...'} </div>
          <div className='rainy'>rainy : {weatherData && weatherData.firstRainy ? weatherData.firstRainy.fcstValue : '불러오는 중...'} </div>
          <div className="wind">Wind speed : {weatherData && weatherData.firstWind ? weatherData.firstWind.fcstValue : '불러오는 중...'}</div>
        </div>
      </div>
      {/* <div className="header">
        <h1>기상청 날씨 API</h1>
        <h2>김포시 단기예보 날씨 조회 금일 오전 6시 기준</h2>
      </div>

      <div className="form-container">
        <form action="#" onSubmit={(e) => { e.preventDefault(); fetch_WeatherData(); }}>
          <DatePicker
            selected={selectedDate}
            onChange={date => setSelectedDate(date)}
            dateFormat="yyyyMMdd"
            minDate={new Date().setDate(new Date().getDate() - 1)}
            maxDate={new Date()}
            calendarStartDay={0}
          />
          <button type="submit">조회</button>
        </form>
      </div>


      <div className='container'>
        <div className='weather-info'>
          <img src={clear} alt="" />
          <h1 className='temp'>24°C</h1>
        </div>

        <div className="temp-list">
          {weatherData.slice(0, 10).map(item => (
            <ul key={item.fcstDate + item.fcstTime}>
              <li>{item.fcstTime}</li>
              <li>{item.fcstValue}°C</li>
            </ul>
          ))}
        </div>

        <div className='dust-info'>
          {makeDustTable()}
        </div>

      </div>


 */}

    </>
  );
}

export default App;
