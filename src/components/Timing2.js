import React, { useEffect, useState } from 'react';
import { set } from 'date-fns';
import relations from '../data/relations.json';
import zonesDarrets from '../data/zones-d-arrets.json';
import referentielDesLignes from '../data/referentiel-des-lignes.json';
import LineSVG from './tools/createLineLogo';
import { getLineColorByLineID, LineLogoByLineID, getTransportByLineID } from '../utils/dataHelpers';

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
              minutesFromNow: calculateMinutesFromNow(journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedDepartureTime || journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedArrivalTime),
            }));

          setData(departures.sort((a, b) => a.minutesFromNow - b.minutesFromNow));
        })
        .catch(error => console.error(error));
    };

    fetchData(url, setTrainData, setStatus);
    const intervalId = setInterval(() => fetchData(url, setTrainData, setStatus), 2000);
    return () => clearInterval(intervalId);
  }, [stationName]);

  if (status === 'NO_REALTIME_SCHEDULES_FOUND') {
    return <div className="flex items-center justify-center text-center text-xs lg:text-base bg-white dark:bg-gray-700 dark:text-gray-200 rounded-lg shadow-md p-4 mb-3 h-[44px] lg:h-[72px]"><p className='animate-pulse'>Information en direct indisponible</p></div>;
  }

  // Display train departures grouped by line direction
  return (
    <div className="space-y-2 m-2">
      {trainData.map((train, index) => {
        const transport = getTransportByLineID(train.lineRef.split("::").pop().split(":")[0]);
        return (
          <div
            key={index}
            className='flex items-center bg-white border-gray-400 dark:text-white dark:bg-gray-700 h-14 lg:h-16 p-2 lg:p-3 relative'
            style={{ borderBottom: `4px solid #${getLineColorByLineID(train.lineRef.replace(/:$/, '').split(':').pop())}` }} // Replace lineColor with your desired color
          >
            <div className="lg:w-20 text-sm lg:text-base flex flex-row">
              {transport &&
                <img src={process.env.PUBLIC_URL + `/images/${transport}${localStorage.theme === 'dark' ? '_LIGHT' : ''}.svg`} alt={getTransportByLineID(train.lineRef.replace(/:$/, '').split(':').pop())} className="h-5 lg:h-10 mr-1" />
              }
              <LineLogoByLineID lineID={train.lineRef.replace(/:$/, '').split(':').pop()} className="h-5 lg:h-10" />
            </div>
            <div className="text-[8px] lg:text-xs flex flex-col items-center justify-center w-12 lg:w-20">
              <h3>{train.vehicleJourneyNote}</h3>
              <h3>{train.vehicleJourneyName}</h3>
            </div>
            <div className="flex-grow overflow-hidden">
              <h2 className={`font-bold text-[11px] lg:text-lg line-clamp-2 ${train.expectedArrivalTime && !train.expectedDepartureTime ? 'text-gray-500' : ''}`}>
                {train.destinationName}
              </h2>
            </div>
            {((train.ArrivalStatus !== 'onTime' || train.departureStatus !== 'onTime') || (train.expectedArrivalTime && !train.expectedDepartureTime)) &&
              <div className={`px-2 py-1 rounded-full text-xs lg:text-base text-white`}>
                {train.expectedArrivalTime && !train.expectedDepartureTime ? ' (Terminus)' : ''}
                {train.ArrivalStatus !== 'onTime' ? train.ArrivalStatus : ''} {train.departureStatus !== 'onTime' ? train.departureStatus : ''}
              </div>
            }
            {train.arrivalPlatform &&
              <div className="w-6 lg:w-10 flex justify-center items-center text-xs lg:text-base bg-white border font-bold border-blue-800 rounded-md z-10">
                {train.arrivalPlatform ? `${train.arrivalPlatform}` : ''}
              </div>
            }

            <div className="w-16 lg:w-20 ml-1 lg:ml-5 pr-2 text-right">
              <p className={`text-sm lg:text-2xl font-bold ${train.expectedArrivalTime && !train.expectedDepartureTime ? 'text-gray-500' : ''}`}>{train.vehicleAtStop ? 'à quai' : (isNaN(train.minutesFromNow) ? '' : train.minutesFromNow + 'ᵐⁱⁿ')}</p>
              <p className="text-xs lg:text-sm text-right text-gray-400 dark:text-white">
                {
                  train.expectedArrivalTime ?
                    `${new Date(train.expectedArrivalTime).toLocaleTimeString()}` :
                    (train.expectedDepartureTime ?
                      `${new Date(train.expectedDepartureTime).toLocaleTimeString()}` :
                      `${new Date(train.aimedArrivalTime).toLocaleTimeString()}`
                    )
                }
              </p>
            </div>
            <div
              className="absolute top-0 right-0 bottom-0 left-0 lg:left-0 bg-gradient-to-r from-transparent to-white dark:to-gray-700"
              style={{
                backgroundImage: `linear-gradient(to right, transparent, rgba(${parseInt(getLineColorByLineID(train.lineRef.replace(/:$/, '').split(':').pop()).slice(0, 2), 16)}, ${parseInt(getLineColorByLineID(train.lineRef.replace(/:$/, '').split(':').pop()).slice(2, 4), 16)}, ${parseInt(getLineColorByLineID(train.lineRef.replace(/:$/, '').split(':').pop()).slice(4, 6), 16)}, 0.1))`
              }}
            />
          </div>
        )
      })}

    </div>
  );
}

export default TrainInfo;