import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';

function App() {
  const [trainDataA, setTrainDataA] = useState([]);

  const { line } = useParams();
  const { stop_area } = useParams();


  const urlA = `https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:${line}/stops/stop_area:IDFM:${stop_area}/realtime`;
  console.log(urlA);

  useEffect(() => {
    const fetchData = (url, setData) => {
      fetch(url)
      .then(response => response.status === 404 ? null : response.json())
      .then(data => setData(data.nextDepartures.data))
      .catch(error => console.error(error));
    };
    
    fetchData(urlA, setTrainDataA);

    const intervalId = setInterval(() => {
      fetchData(urlA, setTrainDataA);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="">
      <div className="m-6">
        <StationInfo transportLogo={"TRAIN"} lineLogo={line} stationName={"Paris Saint-Lazare"} />
        <TrainInfo logo={line} trainData={trainDataA} />
      </div>

    </div>
  );
}

export default App;