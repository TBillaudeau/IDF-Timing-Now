import React, { useState, useEffect } from 'react';
import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';

function App() {
  const [trainDataA, setTrainDataA] = useState([]); // RER A
  const [trainDataB, setTrainDataB] = useState([]); // RER B
  const [trainDataC, setTrainDataC] = useState([]); // RER D
  const [trainDataD, setTrainDataD] = useState([]); // METRO 7
  const [trainDataE, setTrainDataE] = useState([]); // METRO 1
  const [trainDataF, setTrainDataF] = useState([]); // METRO 4

  const urlA = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01742/stops/stop_area:IDFM:474151/realtime'
  const urlB = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01743/stops/stop_area:IDFM:474151/realtime'
  const urlC = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01728/stops/stop_area:IDFM:474151/realtime'
  const urlD = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01377/stops/stop_area:IDFM:71264/realtime'
  const urlE = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01371/stops/stop_area:IDFM:71517/realtime'
  const urlF = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01374/stops/stop_area:IDFM:73794/realtime'

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
    fetchData(urlF, setTrainDataF);

    const intervalId = setInterval(() => {
        fetchData(urlA, setTrainDataA);
        fetchData(urlB, setTrainDataB);
        fetchData(urlC, setTrainDataC);
        fetchData(urlD, setTrainDataD);
        fetchData(urlE, setTrainDataE);
        fetchData(urlF, setTrainDataF);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-screen-xl flex-wrap justify-between mx-auto">
      <div className="m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"C01742"} stationName={"Châtelet-Les Halles"} />
        <TrainInfo logo={"C01742"} trainData={trainDataA} />
      </div>

      <div className="m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"C01743"} stationName={"Châtelet-Les Halles"} />
        <TrainInfo logo={"C01743"} trainData={trainDataB} />
      </div>

      <div className="m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"C01728"} stationName={"Châtelet-Les Halles"} />
        <TrainInfo logo={"C01728"} trainData={trainDataC} />
      </div>

      <div className="m-6">
        <StationInfo transportLogo={"METRO"} lineLogo={"C01377"} stationName={"Châtelet"} />
        <TrainInfo logo={"C01377"} trainData={trainDataD} />
      </div>

      <div className="m-6">
        <StationInfo transportLogo={"METRO"} lineLogo={"C01371"} stationName={"Châtelet"} />
        <TrainInfo logo={"C01371"} trainData={trainDataE} />
      </div>

      <div className="m-6">
        <StationInfo transportLogo={"METRO"} lineLogo={"C01374"} stationName={"Les Halles"} />
        <TrainInfo logo={"C01374"} trainData={trainDataF} />
      </div>

    </div>
  );
}

export default App;