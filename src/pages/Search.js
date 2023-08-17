import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';
import stationsData from '../emplacement-des-gares-idf.json';

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
    <div className="max-w-screen-sm mx-auto">
      <div className="m-6">
        <StationInfo transportLogo={stationsData.find(station => station.fields.idrefligc == line).fields.res_com.split(' ')[0]} lineLogo={line} stationName={stationsData.find(station => station.fields.id_ref_lda == stop_area).fields.nom_zdl} />
        <TrainInfo logo={line} trainData={trainDataA} />        
      </div>

    </div>
  );
}

export default App;