# npm install

    필요한 패키지 다운로드

## npm start

    실행

## 단기예보 실황

    강수확률 POP
    습도 REH
    하늘상태 SKY  맑음(1), 구름많음(3), 흐림(4)
    1시간 기온 TMP
    풍속 VEC

    단 api를 제공하는 측에서 데이터 업로드하는데 시간이 걸리는 경우가 있어서, 현재시간 기준 -1시간을 하여 데이터를 불러옴.

    요청 속도를 줄이기 위해 필요한

## 측정소별 실시간 미세먼지 농도

    pm10Value, pm25Value 를 계산해서
    좋음, 보통, 나쁨, 매우나쁨으로 나눔.

    if (pm10Value <= 30 && pm25Value <= 15) {
      return '좋음';
    } else if ((pm10Value <= 80 && pm25Value <= 35) || (pm10Value <= 150 || pm25Value <= 75)) {
      return '보통';
    } else if ((pm10Value <= 150 && pm25Value <= 75) || (pm10Value <= 250 && pm25Value <= 150)) {
      return '나쁨';
    } else {
      return '매우 나쁨';
    }

## 해결해야하는 부분

    날씨 데이터를 제공하는 api에서 제공해주는 시간이 정확하지 않음.
    업데이트가 안되어 있으면 정보를 불러오지 못함.
