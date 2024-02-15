import React, { useEffect, useState } from 'react';
import './App.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'




function App() {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState([]);

  const [dustData, setDustData] = useState([]);

  useEffect(() => {
    fetch_WeatherData();
  }, [selectedDate]);

  useEffect(() => {
    fetch_DustData();

  }, []);

  const fetch_WeatherData = () => {
    let initDate = selectedDate.toISOString().slice(0, 10).replace(/-/g, '');
    let forecast_url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=W9yTTVsj5jaa3NvKQGwX%2FD4fsm7sdVjTbvLTfj4PaQmK%2BZH5PrEoLtQHTy0vbbRQKhG9go7HNomj%2BpNPslsysw%3D%3D&pageNo=1&numOfRows=1000&dataType=json&base_date=${initDate}&base_time=0500&nx=58&ny=127`

    fetch(forecast_url)
      .then(response => {
        if (!response.ok) {
          throw new Error('network response was not ok');

        }
        return response.json();
      }).then(data => {
        const items = data.response.body.items.item;
        const filteredItems = items.filter(item => item.category === 'TMP');
        setWeatherData(filteredItems);
      })
      .catch(error => {
        console.error(error);
      });

  };

  const makeTable = () => {
    return (
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>날짜</th>
            <th>시간</th>
            <th>온도</th>
          </tr>
        </thead>
        <tbody>
          {weatherData.slice(0, 10).map(item => (
            <tr key={item.fcstDate + item.fcstTime}>
              <td>{item.fcstDate}</td>
              <td>{item.fcstTime}</td>
              <td>{item.fcstValue}</td>
            </tr>
          ))}
        </tbody>
      </table>



    );
  };

  const fetch_DustData = () => {
    let Dustdata_url = 'https://apis.data.go.kr/B552584/ArpltnStatsSvc/getCtprvnMesureSidoLIst?serviceKey=W9yTTVsj5jaa3NvKQGwX%2FD4fsm7sdVjTbvLTfj4PaQmK%2BZH5PrEoLtQHTy0vbbRQKhG9go7HNomj%2BpNPslsysw%3D%3D&returnType=json&numOfRows=100&pageNo=1&sidoName=%EA%B2%BD%EA%B8%B0&searchCondition=DAILY';

    fetch(Dustdata_url)
      .then(response => {
        if (!response.ok) {
          throw new Error('network response was not ok');
        }
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
  }, [dustData]);

  const makeDustTable = () => {
    const firstData = dustData.length > 0 ? dustData[0] : null;
    return (
      <table className='table table-hover'>
        <thead>
          <tr>
            <th>pm10 μg/m³</th>
            <th>pm25 μg/m³</th>
          </tr>
        </thead>
        <tbody>
          {firstData && (
            <tr key={firstData.dataTime}>
              <td>{firstData.pm10Value}</td>
              <td>{firstData.pm25Value}</td>
            </tr>
          )}
        </tbody>
      </table>
    );


  }


  return (
    <>
      <div className='app'>
        <h1>기상청 날씨 API</h1>
        <h2>김포시 단기예보 날씨 조회 금일 오전 6시 기준</h2>
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

      <div className='container '>
        {makeTable()}
      </div>

      <div className='container2'>
        {makeDustTable()}
      </div>
    </>
  );
}

export default App;
