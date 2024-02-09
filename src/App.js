import React from 'react';
import $ from 'jquery';
import './App.css';
import Forecast from './forecast';

function App() {

  /* useEffect(() => {
    
  }, []);  */
  let url = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtNcst?serviceKey=W9yTTVsj5jaa3NvKQGwX%2FD4fsm7sdVjTbvLTfj4PaQmK%2BZH5PrEoLtQHTy0vbbRQKhG9go7HNomj%2BpNPslsysw%3D%3D&pageNo=1&numOfRows=1000&dataType=json&base_date=20240209&base_time=0600&nx=55&ny=128"
  /* $.getJSON(url, function (data) {
    console.log(data);
    console.log(data.response.body.items.item[3].obsrValue);
    let item = data.response.body.items.item[3]
    let content = item.baseDate + '-' + item.baseTime + '-' + item.obsrValue;
    $('.result').text(content);
  }); */


  $.ajax({
    url: url,
    success: function (result) {
      /* console.log(result);
      console.log(result.response.body.items.item[3].obsrValue); */
      let item = result.response.body.items.item[3]
      let content = `${item.baseDate}, ${item.baseTime}, ${item.obsrValue}`;


      $('.result').text(content);
    },
  });

  return (
    <div className='app'>
      <h1>기상청 날씨 API</h1>
      <h2>김포시 단기예보 날씨 조회 금일 오전 6시 기준</h2>

      <Forecast />
    </div>
  );
}

export default App;
