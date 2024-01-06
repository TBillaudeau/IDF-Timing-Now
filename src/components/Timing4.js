import React, { useEffect, useState } from 'react';
import { getLineColorByLineID, LineLogoByLineID, getTransportByLineID } from '../utils/dataHelpers';
import LineSVG from './tools/createLineLogo';

function TrainInfo({ lineID, stationName }) {
  // Fetch train departure every 2 seconds
  const [trainData, setTrainData] = useState([]);
  const [status, setStatus] = useState('');
  const [activeTab, setActiveTab] = useState('current');
  const [selectedLogo, setSelectedLogo] = useState(null);

  const calculateMinutesFromNow = (time) => {
    return Math.floor((new Date(time) - new Date()) / 60000);
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
            stopPointName: journey?.MonitoredVehicleJourney?.MonitoredCall?.StopPointName[0]?.value,
            directionName: journey?.MonitoredVehicleJourney?.DirectionName[0]?.value,
            destinationName: journey?.MonitoredVehicleJourney?.DestinationName[0]?.value,
            vehicleJourneyName: journey?.MonitoredVehicleJourney?.JourneyNote[0]?.value,
            expectedArrivalTime: journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedArrivalTime,
            aimedArrival: journey?.MonitoredVehicleJourney?.MonitoredCall?.AimedArrival,
            expectedDepartureTime: journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedDepartureTime,
            aimedDepartureTime: journey?.MonitoredVehicleJourney?.MonitoredCall?.aimedDepartureTime,
            arrivalStatus: journey?.MonitoredVehicleJourney?.MonitoredCall?.ArrivalStatus,
            departureStatus: journey?.MonitoredVehicleJourney?.MonitoredCall?.DepartureStatus,
            vehicleAtStop: journey?.MonitoredVehicleJourney?.MonitoredCall?.VehicleAtStop,
            arrivalPlatform: journey?.MonitoredVehicleJourney?.MonitoredCall?.ArrivalPlatformName?.value,
            trainNumber: journey?.MonitoredVehicleJourney?.TrainNumber?.TrainNumberRef[0]?.value,
            minutesFromNow: calculateMinutesFromNow(journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedDepartureTime || journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedArrivalTime),
          }));

          setData(departures.sort((a, b) => a.minutesFromNow - b.minutesFromNow));
        })
        .catch(error => console.error(error));
    };

    fetchData(url, setTrainData, setStatus);
    const intervalId = setInterval(() => fetchData(url, setTrainData, setStatus), 2000);
    return () => clearInterval(intervalId);
  }, []);

  if (status === 'NO_REALTIME_SCHEDULES_FOUND') {
    return <div className="flex items-center justify-center text-center text-xs lg:text-base bg-white dark:bg-gray-700 dark:text-gray-200 rounded-lg shadow-md p-4 mb-3 h-[44px] lg:h-[72px]"><p className='animate-pulse'>Information en direct indisponible</p></div>;
  }



  const groupedData = trainData.reduce((acc, train) => {
    const lineRef = train.lineRef;

    if (!acc[lineRef]) {
      acc[lineRef] = {};
    }

    const destination = train.destinationName;

    if (!acc[lineRef][destination]) {
      acc[lineRef][destination] = [];
    }

    acc[lineRef][destination].push(train);

    return acc;
  }, {});

  // Afficher les départs de train groupés par ligne et destination
  return (
    <div className="">
      {Object.entries(groupedData).map(([lineRef, destinations]) => (
        <div key={lineRef}>

          {Object.entries(destinations).sort(([a], [b]) => a.localeCompare(b)).map(([destination, trains]) => (
            
            <div key={destination} className="flex flex-col justify-start gap-4 bg-white border-gray-400 dark:text-white dark:bg-gray-700 min-h-[44px] max-h-[72px] p-1 lg:p-4">      
                    <div className="ml-2 lg:ml-4 text-sm lg:text-base flex flex-row">
                <img src={process.env.PUBLIC_URL + `/images/${getTransportByLineID(lineRef.split("::").pop().split(":")[0])}${localStorage.theme === 'dark' ? '_LIGHT' : ''}.svg`} alt={getTransportByLineID(lineRef.split("::").pop().split(":")[0])} className="h-5 lg:h-10 mr-1" />
            <LineLogoByLineID lineID={lineRef.split("::").pop().split(":")[0]} className="h-5 lg:h-10" />
          
              <p className='ml-2'>{destination}</p>
            </div>
              <div className="space-x-2">
                {trains.map((train, index) => (
                  <>
                    <span key={index} className={`text-sm lg:text-2xl font-bold text-green-600 dark:text-green-500 ${train.minutesFromNow === '0' ? 'animate-pulse' : ''}`}>
                      {train.minutesFromNow}<span className="text-xs lg:text-lg">ᵐⁱⁿ</span>
                    </span>
                  </>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TrainInfo;
