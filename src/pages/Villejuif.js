import React, { useState, useEffect } from 'react';
import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';

function App() {
  const [trainDataA, setTrainDataA] = useState([]); // METRO 7
  const [trainDataB, setTrainDataB] = useState([]); // BUS 180
  const [trainDataC, setTrainDataC] = useState([]); // BUS 172
  const [trainDataD, setTrainDataD] = useState([]); // TRAM 7

  const urlA = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01377/stops/stop_area:IDFM:70143/realtime'
  const urlB = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01201/stops/stop_area:IDFM:70143/realtime'
  const urlC = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01193/stops/stop_area:IDFM:415734/realtime'
  const urlD = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01774/stops/stop_area:IDFM:70143/realtime'

  useEffect(() => {
    const fetchData = (url, setData) => {
      fetch(url)
      .then(response => response.status === 404 ? null : response.json())
      .then(data => setData(data.nextDepartures.data))
      .catch(error => console.error(error));
    };
    
    fetchData(urlA, setTrainDataA);
    fetchData(urlB, setTrainDataB);
    fetchData(urlC, setTrainDataC);
    fetchData(urlD, setTrainDataD);

    const intervalId = setInterval(() => {
        fetchData(urlA, setTrainDataA);
        fetchData(urlB, setTrainDataB);
        fetchData(urlC, setTrainDataC);
        fetchData(urlD, setTrainDataD);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-screen-xl flex-wrap justify-between mx-auto">
      <div className="m-6">
        <StationInfo transportLogo={"METRO"} lineLogo={"line:IDFM:C01377"} stationName={"Villejuif - Louis Aragon"} />
        <TrainInfo logo={"line:IDFM:C01377"} trainData={trainDataA} />
      </div>

      <div className="m-6">
        <StationInfo transportLogo={"BUS"} lineLogo={"line:IDFM:C01201"} stationName={"Villejuif - Louis Aragon"} />
        <TrainInfo logo={"line:IDFM:C01201"} trainData={trainDataB} />
      </div>

      <div className="m-6">
        <StationInfo transportLogo={"BUS"} lineLogo={"line:IDFM:C01193"} stationName={"Villejuif - Louis Aragon"} />
        <TrainInfo logo={"line:IDFM:C01193"} trainData={trainDataC} />
      </div>

      <div className="m-6">
        <StationInfo transportLogo={"TRAM"} lineLogo={"line:IDFM:C01774"} stationName={"Villejuif - Louis Aragon"} />
        <TrainInfo logo={"line:IDFM:C01774"} trainData={trainDataD} />
      </div>

    </div>
  );
}

export default App;