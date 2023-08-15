import React, { useState, useEffect } from 'react';
import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';

function App() {
  const [trainDataA, setTrainDataA] = useState([]); // RER A
  const [trainDataB, setTrainDataB] = useState([]); // LIGNE L
  const [trainDataC, setTrainDataC] = useState([]); // T2
  const [trainDataD, setTrainDataD] = useState([]); // LIGNE U
  const [trainDataE, setTrainDataE] = useState([]); // METRO 1

  const urlA = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01742/stops/stop_area:IDFM:71517/realtime'
  const urlB = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01740/stops/stop_area:IDFM:71517/realtime'
  const urlC = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01390/stops/stop_area:IDFM:71517/realtime'
  const urlD = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01741/stops/stop_area:IDFM:71517/realtime'
  const urlE = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01371/stops/stop_area:IDFM:71517/realtime'

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
    fetchData(urlE, setTrainDataE);

    const intervalId = setInterval(() => {
        fetchData(urlA, setTrainDataA);
        fetchData(urlB, setTrainDataB);
        fetchData(urlC, setTrainDataC);
        fetchData(urlD, setTrainDataD);
        fetchData(urlE, setTrainDataE);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <div className="m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"line:IDFM:C01742"} stationName={"La Défense"} />
        <TrainInfo logo={"line:IDFM:C01742"} trainData={trainDataA} />
      </div>

      <div className="m-6">
        <StationInfo transportLogo={"TRAIN"} lineLogo={"line:IDFM:C01740"} stationName={"La Défense"} />
        <TrainInfo logo={"line:IDFM:C01740"} trainData={trainDataB} />
      </div>

      <div className="m-6">
        <StationInfo transportLogo={"TRAM"} lineLogo={"line:IDFM:C01390"} stationName={"La Défense"} />
        <TrainInfo logo={"line:IDFM:C01390"} trainData={trainDataC} />
      </div>

      <div className="m-6">
        <StationInfo transportLogo={"TRAIN"} lineLogo={"line:IDFM:C01741"} stationName={"La Défense"} />
        <TrainInfo logo={"line:IDFM:C01741"} trainData={trainDataD} />
      </div>

      <div className="m-6">
        <StationInfo transportLogo={"METRO"} lineLogo={"line:IDFM:C01371"} stationName={"La Défense"} />
        <TrainInfo logo={"line:IDFM:C01371"} trainData={trainDataE} />
      </div>

    </div>
  );
}

export default App;