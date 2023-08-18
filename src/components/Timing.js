import React, { useEffect, useState } from 'react';
import removeGareDePrefix from '../functions/utils';

function TrainInfo({ lineID, stationName }) {

  // Fetch train departure every 2 seconds
  const [trainData, setTrainData] = useState([]);
  const url = `https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:${lineID}/stops/stop_area:IDFM:${stationName}/realtime`;
  useEffect(() => {
    const fetchData = (url, setData) => {
      fetch(url)
      .then(response => response.status === 404 ? null : response.json())
      .then(data => setData(data.nextDepartures.data))
      .catch(error => console.error(error));
    };

    fetchData(url, setTrainData);

    const intervalId = setInterval(() => {
      fetchData(url, setTrainData);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);


    // Display loading animation if no data available
    if (trainData.length === 0) {
      return <div className="flex items-center justify-center text-center text-xs lg:text-base bg-white rounded-lg shadow-md p-4 mb-3 h-[72px] animate-pulse">Information momentanément indisponible      </div>;
    }
    
    // Display train departure
    return (
        <div className="overflow-y-auto max-h-[27rem]">
          {trainData.map((train, index) => (
            <div key={train.time + index} className="flex items-center bg-white rounded-lg shadow-md p-1 lg:p-4 mb-1 lg:mb-3">
              <img src={process.env.PUBLIC_URL + `/images/${lineID}.svg`} alt={train.shortName} className="h-4 lg:h-10 ml-1 lg:ml-0 mr-2 lg:mr-4" />
              <div className="flex-grow">
                <h2 className='font-bold text-[11px] lg:text-xl line-clamp-2'>{removeGareDePrefix(train.lineDirection)}</h2>
              </div>
              <div className="ml-2 lg:ml-5 min-w-max pr-2 text-right">
                  <p className={`text-sm lg:text-2xl font-bold text-green-600 ${train.time === '0' ? 'animate-pulse' : ''}`}>{train.time}<span className="text-xs lg:text-lg">ᵐⁱⁿ</span></p> {/*ᵐⁱⁿ*/}
                  <p className="text-xs lg:text-sm text-right text-gray-400">{new Date(Date.now() + train.time * 60000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
              </div>
            </div>
          ))}
        </div>
    );
}

export default TrainInfo;