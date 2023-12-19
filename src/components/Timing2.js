import React, { useEffect, useState } from 'react';
import { removeGareDePrefix } from '../utils/stringUtils';
import { set } from 'date-fns';
import relations from '../data/relations.json';
import zonesDarrets from '../data/zones-d-arrets.json';
import referentielDesLignes from '../data/referentiel-des-lignes.json';

function TrainInfo({ lineID, stationName }) {

  // Fetch train departure every 2 seconds
  const [trainData, setTrainData] = useState([]);
  const [status, setStatus] = useState('');

  const calculateMinutesFromNow = (time) => {
    return Math.round((new Date(time) - new Date()) / 60000);
  };

  const url = `https://prim.iledefrance-mobilites.fr/marketplace/stop-monitoring?MonitoringRef=STIF:StopArea:SP:${stationName}:`;
  useEffect(() => {
    const fetchData = (url, setData, setStatus) => {
      fetch(url, {
        headers: {
          'Accept': 'application/json',
          'apikey': process.env.REACT_APP_IDFM_API_KEY
        }
      })
      .then(response => response.status === 404 ? null : response.json())
      .then(data => {
        const departures = data?.Siri?.ServiceDelivery?.StopMonitoringDelivery[0]?.MonitoredStopVisit?.map(journey => ({
          lineRef: journey?.MonitoredVehicleJourney?.LineRef?.value,
          operatorRef: journey?.MonitoredVehicleJourney?.OperatorRef?.value,
          directionName: journey?.MonitoredVehicleJourney?.DirectionName[0]?.value,
          destinationName: journey?.MonitoredVehicleJourney?.DestinationName[0]?.value,
          vehicleJourneyName: journey?.MonitoredVehicleJourney?.VehicleJourneyName[0]?.value,
          expectedArrivalTime: journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedArrivalTime,
          aimedArrival: journey?.MonitoredVehicleJourney?.MonitoredCall?.AimedArrival,
          expectedDepartureTime: journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedDepartureTime,
          aimedDepartureTime: journey?.MonitoredVehicleJourney?.MonitoredCall?.aimedDepartureTime,
          arrivalStatus: journey?.MonitoredVehicleJourney?.MonitoredCall?.ArrivalStatus,
          departureStatus: journey?.MonitoredVehicleJourney?.MonitoredCall?.DepartureStatus,
          vehicleAtStop: journey?.MonitoredVehicleJourney?.MonitoredCall?.VehicleAtStop,
          minutesFromNow: calculateMinutesFromNow(journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedDepartureTime || journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedArrivalTime),
        }));
        
        setData(departures.sort((a, b) => a.minutesFromNow - b.minutesFromNow));
        setStatus(data.nextDepartures.errorMessage);
      })
      .catch(error => console.error(error));
    };

    fetchData(url, setTrainData, setStatus);
    const intervalId = setInterval(() => fetchData(url, setTrainData, setStatus), 2000);
    return () => clearInterval(intervalId);
  }, [stationName]);

  function getLighterColor(lineID) {
    var lineColor = referentielDesLignes.find(line => line.fields.id_line == lineID)?.fields.colourweb_hexa;

    function blendColor(color, blendWith, alpha) {
      const [r1, g1, b1] = [parseInt(color.slice(0, 2), 16), parseInt(color.slice(2, 4), 16), parseInt(color.slice(4, 6), 16)];
      const [r2, g2, b2] = [parseInt(blendWith.slice(0, 2), 16), parseInt(blendWith.slice(2, 4), 16), parseInt(blendWith.slice(4, 6), 16)];

      const r = Math.round(r1 * (1 - alpha) + r2 * alpha);
      const g = Math.round(g1 * (1 - alpha) + g2 * alpha);
      const b = Math.round(b1 * (1 - alpha) + b2 * alpha);

      return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
    }

    return blendColor(lineColor, 'ffffff', 0.5);
  }


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
    <div className="">
      {trainData.map((train, index) => (
        <div 
          key={index} 
          className="flex items-center bg-white border-gray-400 dark:text-white dark:bg-gray-700 min-h-[44px] max-h-[72px] p-1 lg:p-4 relative mb-1 lg:mb-3 shadow-md" 
          style={{borderBottom: `2px solid #${getLighterColor(train.lineRef.replace(/:$/, '').split(':').pop())}`}} // Replace lineColor with your desired color
        >
          <div className='shrink-0'>
            <img 
              src={process.env.PUBLIC_URL + `/images/${train.lineRef.replace(/:$/, '').split(':').pop()}.svg`} 
              alt={train.lineRef.replace(/:$/, '').split(':').pop()} 
              className="h-4 lg:h-10 pl-1 lg:pl-0 mr-2 lg:mr-4" 
            />
            <h3 className='text-[8px] lg:text-xs justify-center flex mx-auto mt-0.5 pl-0.5 lg:pl-0'>{train.vehicleJourneyName}</h3>
          </div>
          <div className="flex-grow overflow-hidden">
            <h2 className='font-bold text-[11px] lg:text-lg line-clamp-2 ml-2 lg:ml-4'>{train.destinationName} - {train.departureStatus} - {train.vehicleAtStop}</h2>
          </div>
          <div className="ml-1 lg:ml-5 pr-2 text-right">
            <p className="text-sm lg:text-2xl font-bold">{train.minutesFromNow}ᵐⁱⁿ</p>
            <p className="text-xs lg:text-sm text-right text-gray-400 dark:text-white">{new Date(train.expectedArrivalTime).toLocaleTimeString()}</p>
            <p className="text-xs lg:text-sm text-right text-gray-400 dark:text-white">{new Date(train.expectedDepartureTime).toLocaleTimeString()}</p>
          </div>
          <div 
            className="absolute top-0 right-0 bottom-0 left-0 lg:left-0 bg-gradient-to-r from-transparent to-white dark:to-gray-700"
            style={{
              backgroundImage: `linear-gradient(to right, transparent, rgba(${parseInt(getLighterColor(train.lineRef.replace(/:$/, '').split(':').pop()).slice(0, 2), 16)}, ${parseInt(getLighterColor(train.lineRef.replace(/:$/, '').split(':').pop()).slice(2, 4), 16)}, ${parseInt(getLighterColor(train.lineRef.replace(/:$/, '').split(':').pop()).slice(4, 6), 16)}, 0.1))`
            }}
          />
        </div>
      ))}

    </div>
  );
}

export default TrainInfo;