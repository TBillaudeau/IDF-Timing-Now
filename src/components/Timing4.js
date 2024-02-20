import React, { useEffect, useState } from 'react';
import { getLineColorByLineID, LineLogoByLineID, getTransportByLineID } from '../utils/dataHelpers';
import { removeGareDePrefix } from '../utils/stringUtils';
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
          const departures = data?.Siri?.ServiceDelivery?.StopMonitoringDelivery[0]?.MonitoredStopVisit
            ?.filter(journey => {
              const expectedDepartureTime = journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedDepartureTime;
              const vehicleAtStop = journey?.MonitoredVehicleJourney?.MonitoredCall?.VehicleAtStop;
              return !(vehicleAtStop && new Date(expectedDepartureTime) < new Date());
            })
            ?.map(journey => ({
              lineRef: journey?.MonitoredVehicleJourney?.LineRef?.value,
              operatorRef: journey?.MonitoredVehicleJourney?.OperatorRef?.value,
              stopPointName: journey?.MonitoredVehicleJourney?.MonitoredCall?.StopPointName[0]?.value,
              directionName: journey?.MonitoredVehicleJourney?.DirectionName[0]?.value,
              destinationName: journey?.MonitoredVehicleJourney?.DestinationName[0]?.value,
              vehicleJourneyNote: journey?.MonitoredVehicleJourney?.JourneyNote[0]?.value,
              vehicleJourneyName: journey?.MonitoredVehicleJourney?.VehicleJourneyName[0]?.value || journey?.MonitoredVehicleJourney?.TrainNumbers?.TrainNumberRef[0]?.value,
              expectedArrivalTime: journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedArrivalTime,
              aimedArrival: journey?.MonitoredVehicleJourney?.MonitoredCall?.AimedArrival,
              expectedDepartureTime: journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedDepartureTime,
              aimedArrivalTime: journey?.MonitoredVehicleJourney?.MonitoredCall?.AimedArrivalTime,
              arrivalStatus: journey?.MonitoredVehicleJourney?.MonitoredCall?.ArrivalStatus,
              departureStatus: journey?.MonitoredVehicleJourney?.MonitoredCall?.DepartureStatus,
              vehicleAtStop: journey?.MonitoredVehicleJourney?.MonitoredCall?.VehicleAtStop,
              arrivalPlatform: journey?.MonitoredVehicleJourney?.MonitoredCall?.ArrivalPlatformName?.value,
              trainNumber: journey?.MonitoredVehicleJourney?.TrainNumber?.TrainNumberRef[0]?.value,
              minutesFromNow: calculateMinutesFromNow(
                journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedArrivalTime ||
                journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedDepartureTime ||
                journey?.MonitoredVehicleJourney?.MonitoredCall?.AimedArrivalTime
              ),
            }));

          setData(departures.sort((a, b) => a.minutesFromNow - b.minutesFromNow));
          // setStatus(data.nextDepartures.errorMessage);
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
      {Object.entries(groupedData).map(([lineRef, destinations]) => {
        const transport = getTransportByLineID(lineRef.split("::").pop().split(":")[0]);
        return (
          <div key={lineRef} className="flex border-b-4 border-slate-800 border-x">
            <div className="flex items-start justify-center w-20 lg:w-32 pt-2 lg:pt-1.5 bg-white border-r">
              {transport &&
                <img src={process.env.PUBLIC_URL + `/images/${transport}.svg`} alt={transport} className="h-6 lg:h-8 mr-1" />
              }
              <LineLogoByLineID lineID={lineRef.split("::").pop().split(":")[0]} className="h-6 lg:h-8" />
            </div>

            <div className="flex flex-col justify-start w-full">
              {Object.entries(destinations).sort(([a], [b]) => a.localeCompare(b)).map(([destination, trains], index, array) => (
                <div key={destination} className={`flex items-center justify-between border-gray-400 dark:text-white dark:bg-gray-700 h-10 text-sm space-x-2 p-1 lg:p-4 ${index < array.length - 1 ? 'border-b' : ''}`}>
                  <p className='line-clamp-1'>{removeGareDePrefix(destination)}</p>
                  <div className="flex space-x-2 w-40 lg:w-48 overflow-auto justify-start shrink-0">
                    {trains.map((train, index) => (
                      <span key={index} className={`w-10 shrink-0 text-center text-sm font-bold text-yellow-500 bg-slate-800 rounded p-1 lg:py-1`}>
                        <span className={`${train.minutesFromNow <= 0 ? 'animate-pulse' : ''}`}>{train.minutesFromNow}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  );
}

export default TrainInfo;
