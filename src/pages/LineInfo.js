import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';
import stationsData from '../assets/emplacement-des-gares-idf.json';
import DisruptionInfo from '../components/DisruptionInfo';
import { checkDisruptions } from '../components/Trafic';

function LineInfo() {
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

  const disruption = disruptedLines.find(ligne => ligne.lineId === 'line:IDFM:' + line)

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 m-2 sm:m-6">
      <DisruptionInfo selectedDisruption={disruption} />

      <div className="bg-white rounded-lg p-6 flex">
        {(() => {
          try {
            const imageUrl = `https://me-deplacer.iledefrance-mobilites.fr/stif_static/assets_vianavigo/img/linesPlans/HD/${disruption.lineId.split(':').pop().replace(/:/g, '_')}.png`;
            return (
              <a href={imageUrl} target="_blank" rel="noopener noreferrer">
                <img src={imageUrl} alt={disruption.lineId} className="w-full border p-2 border-gray-300" />
              </a>
            );
          } catch (error) {
            return null;
          }
        })()}
      </div>
    </div>
  );

}

export default LineInfo;