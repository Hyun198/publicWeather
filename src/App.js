import React, { useEffect, useState } from 'react';
import './App.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import clear from './assets/clear.png';



function App() {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState([]);

  const [dustData, setDustData] = useState({
    pm10Value: null,
    pm25Value: null,
    dustStatus: null
  });



  const fetch_WeatherData = async () => {
    let initDate = selectedDate.toISOString().slice(0, 10).replace(/-/g, '');
    const now = new Date();
    let hour = now.getHours();
    hour = String(hour).padStart(2, '0');

    const base_time = `${hour}00`;
    console.log(base_time);

    let forecast_url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=W9yTTVsj5jaa3NvKQGwX%2FD4fsm7sdVjTbvLTfj4PaQmK%2BZH5PrEoLtQHTy0vbbRQKhG9go7HNomj%2BpNPslsysw%3D%3D&pageNo=1&numOfRows=15&dataType=json&base_date=${initDate}&base_time=${base_time}&nx=58&ny=127`

    const response = await fetch(forecast_url);
    if (!response) {
      console.log("no data now");
    }
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
    firstWind = firstWind


    setWeatherData({ firstTemp, firstCloudy, firstHumidity, firstRainy, firstWind });
  };

  useEffect(() => {
    fetch_WeatherData();
  }, [selectedDate]);

  function determineDustStatus(pm10Value, pm25Value) {
    // 미세먼지 지수에 따라 상태를 결정합니다.
    if (pm10Value <= 30 && pm25Value <= 15) {
      return '좋음';
    } else if ((pm10Value <= 80 && pm25Value <= 35) || (pm10Value <= 150 || pm25Value <= 75)) {
      return '보통';
    } else if ((pm10Value <= 150 && pm25Value <= 75) || (pm10Value <= 250 && pm25Value <= 150)) {
      return '나쁨';
    } else {
      return '매우 나쁨';
    }
  }

  const fetch_DustData = async () => {
    //시군구별 실시간 평균정보 조회 (경기)
    let Dustdata_url = 'https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst?serviceKey=W9yTTVsj5jaa3NvKQGwX%2FD4fsm7sdVjTbvLTfj4PaQmK%2BZH5PrEoLtQHTy0vbbRQKhG9go7HNomj%2BpNPslsysw%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EA%B2%BD%EA%B8%B0&searchCondition=DAILY';
    let response = await fetch(Dustdata_url);
    let data = await response.json();
    let items = data.response.body.items;
    const filteredItems = items.filter(item => item.cityName === '김포시');
    const firstData = filteredItems[0];

    const dustStatus = determineDustStatus(firstData.pm10Value, firstData.pm25Value);
    setDustData({ ...firstData, dustStatus });

  };

  useEffect(() => {
    fetch_DustData();
  }, []);


  return (
    <>
      <div className='card'>
        <div className="weather">
          <h2 className='city'>Weather in 김포</h2>
          <h1 className="temp"> {weatherData && weatherData.firstTemp ? weatherData.firstTemp.fcstValue : '불러오는 중...'}°C</h1>
          <img src="" alt="" className='icon' />
          <div className='description'>Cloudy : {weatherData && weatherData.firstCloudy ? weatherData.firstCloudy.fcstValue : '불러오는 중...'} </div>
          <div className='humidity'>습도 : {weatherData && weatherData.firstHumidity ? weatherData.firstHumidity.fcstValue : '불러오는 중...'} %</div>
          <div className='rainy'>강수확률 : {weatherData && weatherData.firstRainy ? weatherData.firstRainy.fcstValue : '불러오는 중...'}  % </div>
          <div className="wind">풍속 : {weatherData && weatherData.firstWind ? weatherData.firstWind.fcstValue : '불러오는 중...'} m/s</div>
          <div className="dust">미세먼지: {dustData.dustStatus}</div>
        </div>
      </div>

    </>
  );
}

export default App;
