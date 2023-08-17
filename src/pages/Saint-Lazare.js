import React, { useState, useEffect } from 'react';
import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';

function App() {
  const [trainDataA, setTrainDataA] = useState([]); // TRAIN L
  const [trainDataB, setTrainDataB] = useState([]); // RER E

  const urlA = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01740/stops/stop_area:IDFM:71370/realtime'
  const urlB = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01729/stops/stop_area:IDFM:73688/realtime'

  useEffect(() => {
    const fetchData = (url, setData) => {
      fetch(url)
      .then(response => response.status === 404 ? null : response.json())
      .then(data => setData(data.nextDepartures.data))
      .catch(error => console.error(error));
    };
    
    fetchData(urlA, setTrainDataA);
    fetchData(urlB, setTrainDataB);

    const intervalId = setInterval(() => {
      fetchData(urlA, setTrainDataA);
      fetchData(urlB, setTrainDataB);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
      <div className="m-6">
        <StationInfo transportLogo={"TRAIN"} lineLogo={"C01740"} stationName={"Paris Saint-Lazare"} />
        <TrainInfo logo={"C01740"} trainData={trainDataA} />
      </div>

      <div className="m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"C01729"} stationName={"Haussmann Saint-Lazare"} />
        <TrainInfo logo={"C01729"} trainData={trainDataB} />
      </div>

    </div>
  );
}

export default App;