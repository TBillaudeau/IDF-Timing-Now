import React, { useEffect, useState } from 'react';
// import removeGareDePrefix from '../functions/utils';
import { set } from 'date-fns';

function TrainInfo({ lineID, stationName }) {

  // Fetch train departure every 2 seconds
  const [trainData, setTrainData] = useState([]);
  const [status, setStatus] = useState('');

  const url = `https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:${lineID}/stops/stop_area:IDFM:${stationName}/realtime`;
  useEffect(() => {
    const fetchData = (url, setData, setStatus) => {
      fetch(url)
        .then(response => response.status === 404 ? null : response.json())
        .then(data => {
          setData(data.nextDepartures.data)
          setStatus(data.nextDepartures.errorMessage)
        })
        .catch(error => console.error(error));
    };

    fetchData(url, setTrainData, setStatus);

    const intervalId = setInterval(() => {
      fetchData(url, setTrainData, setStatus);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);


  if (status === 'NO_REALTIME_SCHEDULES_FOUND') {
    return <div className="flex items-center justify-center text-center text-xs lg:text-base bg-white dark:bg-gray-700 dark:text-gray-200 rounded-lg shadow-md p-4 mb-3 h-[44px] lg:h-[72px]"><p className='animate-pulse'>Information en direct indisponible</p></div>;
  }

  // Display loading animation
  if (trainData.length === 0) {
    return (
      <div className="overflow-y-auto max-h-[27rem] animate-pulse">
        <div className="flex items-center bg-white dark:bg-gray-800 rounded-lg shadow-md h-[44px] lg:h-[72px] p-1 lg:p-4 mb-1 lg:mb-3">
          <div role="status" class="flex items-center justify-center w-4 lg:w-10 h-4 lg:h-10 ml-1 lg:ml-0 mr-2 lg:mr-4 p-1 bg-gray-300 rounded-sm lg:rounded-lg dark:bg-gray-700">
            <svg class="w-5 h-5 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>

          <div className="flex-grow">
            <div class="w-12 lg:w-24 h-1 lg:h-2.5 mb-1 lg:mb-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
            <div class="w-16 lg:w-32 h-1 lg:h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>

          <div className="ml-2 lg:ml-5 min-w-max pr-2 text-right">
            <div class="w-6 lg:w-12 h-1 lg:h-2.5 mb-1 lg:mb-2.5 mr-1 bg-gray-300 rounded-full dark:bg-gray-700"></div>
            <div class="w-4 lg:w-8 h-1 lg:h-2 mr-1 bg-gray-200 rounded-full float-right dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    );
  }

  // Group train departures by line direction
  const groupedTrainData = trainData.reduce((acc, train) => {
    const lineDirection = removeGareDePrefix(train.lineDirection);
    if (!acc[lineDirection]) {
      acc[lineDirection] = [];
    }
    acc[lineDirection].push(train);
    return acc;
  }, {});

  // Display train departures grouped by line direction
  return (
    <div className="overflow-y-auto max-h-[27rem]">
      {Object.entries(groupedTrainData).map(([lineDirection, trains]) => (
        <div key={lineDirection} className="mb-3">
          <h2 className="font-bold text-lg mb-2">{lineDirection}</h2>
          {trains.map((train, index) => (
            <div key={train.time + index} className="flex items-center bg-white dark:text-white dark:bg-gray-700 rounded-lg shadow-md max-h-[72px] p-1 lg:p-4 mb-1 lg:mb-3">
              <img src={process.env.PUBLIC_URL + `/images/${lineID}.svg`} alt={train.shortName} className="h-4 lg:h-10 ml-1 lg:ml-0 mr-2 lg:mr-4" />
              <div className="flex-grow overflow-hidden">
                <h2 className='font-bold text-[11px] lg:text-lg'>{removeGareDePrefix(train.lineDirection)}</h2>
              </div>
              <div className="ml-2 lg:ml-5 min-w-max pr-2 text-right">
                <p className={`text-sm lg:text-2xl font-bold text-green-600 dark:text-green-500${train.time === '0' ? 'animate-pulse' : ''}`}>{train.time}<span className="text-xs lg:text-lg">ᵐⁱⁿ</span></p> {/*ᵐⁱⁿ*/}
                <p className="text-xs lg:text-sm text-right text-gray-400 dark:text-white">{new Date(Date.now() + train.time * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TrainInfo;