import React from 'react'
import $ from 'jquery'
export default function forecast() {

    let date = new Date();
    let year = date.getFullYear(); //2024
    let month = '0' + date.getMonth() + 1; //02
    let month2 = month.substring(-2);
    let day = '0' + date.getDate(); //09
    let day2 = day.substring(-2);
    let initDate = year + month2 + day2;
    console.log(initDate);

    let forecast_url = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=W9yTTVsj5jaa3NvKQGwX%2FD4fsm7sdVjTbvLTfj4PaQmK%2BZH5PrEoLtQHTy0vbbRQKhG9go7HNomj%2BpNPslsysw%3D%3D&pageNo=1&numOfRows=1000&dataType=json&base_date=20240209&base_time=0500&nx=58&ny=127`
    $.ajax({
        url: forecast_url,
        success: function (result) {
            console.log(result);
        }
    });


    return (
        <div className='container '>
            <form action=''>
                <label htmlFor="datepick">날짜선택</label>
                <input type="date" id="datepick" />
                <button>조회</button>
            </form>
            <table className='table table-hover'>
                <thead>
                    <tr>
                        <th>날짜</th>
                        <th>시간</th>
                        <th>온도</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan="3">조회 내용이 없습니다.</td>
                    </tr>
                </tbody>

            </table>
        </div >
    )
}
