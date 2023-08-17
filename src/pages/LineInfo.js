import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';

function App() {
  const [trainDataA, setTrainDataA] = useState([]);

  const { line } = useParams();
    console.log(line);

  return (
    <div className="grid max-w-screen-xl flex-wrap justify-between mx-auto">
    <a href={`https://me-deplacer.iledefrance-mobilites.fr/stif_static/assets_vianavigo/img/linesPlans/HD/${line}.png`} target="_blank" rel="noopener noreferrer">
        <img
        src={`https://me-deplacer.iledefrance-mobilites.fr/stif_static/assets_vianavigo/img/linesPlans/HD/${line}.png`}
        alt={line}
        className="w-full border p-2 border-gray-300 bg-white"
        />
    </a>
      <div className="m-6">
        <StationInfo transportLogo={"TRAIN"} lineLogo={line} stationName={"Paris Saint-Lazare"} />
        <TrainInfo logo={line} trainData={trainDataA} />
      </div>

    </div>
  );
}

export default App;