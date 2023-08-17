import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';
import stationsData from '../emplacement-des-gares-idf.json';
import DisruptionInfo from '../components/DisruptionInfo';
import { checkDisruptions } from '../components/Trafic';

function App() {
  const { line } = useParams();

  const [trainDataA, setTrainDataA] = useState([]);
    // Fetch & check disruptions
    const [disruptedLines, setDisruptedLines] = useState([]);

    useEffect(() => {
        const fetchDisruptions = async () => {
        const { disruptedLines } = await checkDisruptions();
        setDisruptedLines(disruptedLines);
        };

        fetchDisruptions();
    }, []);

    const disruption = disruptedLines.find(ligne => ligne.lineId === 'line:IDFM:'+line)

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

        <DisruptionInfo selectedDisruption={disruption} />

      </div>
    );
}

export default App;