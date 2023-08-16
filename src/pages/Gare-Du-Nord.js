import React, { useState, useEffect } from 'react';
import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';

function App() {
  const [trainDataA, setTrainDataA] = useState([]); // RER B
  const [trainDataB, setTrainDataB] = useState([]); // RER D
  const [trainDataC, setTrainDataC] = useState([]); // RER E

  const urlA = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01743/stops/stop_area:IDFM:71410/realtime'
  const urlB = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01728/stops/stop_area:IDFM:71410/realtime'
  const urlC = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01729/stops/stop_area:IDFM:478733/realtime'

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

    const intervalId = setInterval(() => {
      fetchData(urlA, setTrainDataA);
      fetchData(urlB, setTrainDataB);
      fetchData(urlC, setTrainDataC);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 max-w-screen-xl flex-wrap justify-between mx-auto">
      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"line:IDFM:C01743"} stationName={"Gare Du Nord"} />
        <TrainInfo logo={"line:IDFM:C01743"} trainData={trainDataA} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"line:IDFM:C01728"} stationName={"Paris Nord"} />
        <TrainInfo logo={"line:IDFM:C01728"} trainData={trainDataB} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"line:IDFM:C01729"} stationName={"Magenta"} />
        <TrainInfo logo={"line:IDFM:C01729"} trainData={trainDataC} />
      </div>

    </div>
  );
}

export default App;