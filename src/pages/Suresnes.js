import React, { useState, useEffect } from 'react';
import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';

function App() {
  const [trainDataA, setTrainDataA] = useState([]); // TRAIN L
  const [trainDataB, setTrainDataB] = useState([]); // TRAM 2
  const [trainDataC, setTrainDataC] = useState([]); // TRAIN U
  const [trainDataD, setTrainDataD] = useState([]); // BUS 70
  const [trainDataE, setTrainDataE] = useState([]); // BUS 175
  const [trainDataF, setTrainDataF] = useState([]); // BUS 93
  const [trainDataG, setTrainDataG] = useState([]); // BUS 241
  const [trainDataH, setTrainDataH] = useState([]); // BUS 244


  const urlA = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01740/stops/stop_area:IDFM:70829/realtime'
  const urlB = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01390/stops/stop_area:IDFM:70845/realtime'
  const urlC = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01741/stops/stop_area:IDFM:70829/realtime'
  const urlD = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01106/stops/stop_area:IDFM:70823/realtime'
  const urlE = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01196/stops/stop_area:IDFM:70822/realtime'
  const urlF = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01124/stops/stop_area:IDFM:70822/realtime'
  const urlG = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01239/stops/stop_area:IDFM:70823/realtime'
  const urlH = 'https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:C01240/stops/stop_area:IDFM:70823/realtime'

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
    fetchData(urlD, setTrainDataE);
    fetchData(urlF, setTrainDataF);
    fetchData(urlG, setTrainDataG);
    fetchData(urlH, setTrainDataH);


    const intervalId = setInterval(() => {
      fetchData(urlA, setTrainDataA);
      fetchData(urlB, setTrainDataB);
      fetchData(urlC, setTrainDataC);
      fetchData(urlD, setTrainDataD);
      fetchData(urlE, setTrainDataE);
      fetchData(urlF, setTrainDataF);
      fetchData(urlG, setTrainDataG);
      fetchData(urlH, setTrainDataH);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"TRAIN"} lineLogo={"C01740"} stationName={"Suresnes Mont-Valérien"} />
        <TrainInfo logo={"C01740"} trainData={trainDataA} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"TRAM"} lineLogo={"C01390"} stationName={"Belvédère"} />
        <TrainInfo logo={"C01390"} trainData={trainDataB} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"TRAIN"} lineLogo={"C01741"} stationName={"Suresnes Mont-Valérien"} />
        <TrainInfo logo={"C01741"} trainData={trainDataC} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"BUS"} lineLogo={"C01106"} stationName={"Mairie de Suresnes"} />
        <TrainInfo logo={"C01106"} trainData={trainDataD} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"BUS"} lineLogo={"C01196"} stationName={"Nieuport"} />
        <TrainInfo logo={"C01196"} trainData={trainDataE} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"BUS"} lineLogo={"C01124"} stationName={"Berty Albrecht"} />
        <TrainInfo logo={"C01124"} trainData={trainDataF} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"BUS"} lineLogo={"C01239"} stationName={"Suresnes de Gaulle"} />
        <TrainInfo logo={"C01239"} trainData={trainDataG} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"BUS"} lineLogo={"C01240"} stationName={"Suresnes de Gaulle"} />
        <TrainInfo logo={"C01240"} trainData={trainDataH} />
      </div>

    </div>
  );
}

export default App;