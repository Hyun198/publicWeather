import React, { useEffect, useState } from 'react';
import $ from 'jquery'
import './App.css';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'




function App() {

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [weatherData, setWeatherData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [selectedDate]);


  const fetchData = () => {
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
        console.log('리렌더링!')
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
          {weatherData.map(item => (
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

  return (
    <>
      <div className='app'>
        <h1>기상청 날씨 API</h1>
        <h2>김포시 단기예보 날씨 조회 금일 오전 6시 기준</h2>
        <form action="#" onSubmit={(e) => { e.preventDefault(); fetchData(); }}>
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
      </div >
    </>
  );
}

export default App;
