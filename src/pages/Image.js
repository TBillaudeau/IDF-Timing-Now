import React, { useEffect, useState, useRef } from 'react';
import { getLineColorByLineID, LineLogoByLineID, getTransportByLineID } from '../utils/dataHelpers';
import { PulseLoader } from 'react-spinners';

function Image() {

    const divRef = useRef(null);

    const goFullScreen = () => {
        if (divRef.current) {
            divRef.current.requestFullscreen();
        }
    }

    const translateStatus = (status) => {
        switch (status) {
            case 'onTime':
                return 'à l\'heure';
            case 'delayed':
                return 'retardé';
            case 'cancelled':
                return 'supprimé';
            default:
                return status;
        }
    }
    

    let stationName = '474151';
    let lineID = 'C01788';
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
                            expectedArrivalTime: journey?.MonitoredVehicleJourney?.MonitoredCall?.ExpectedArrivalTime,
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
        <div ref={divRef} className="space-y-1 bg-gray-100">
                        <button onClick={goFullScreen}>Go Fullscreen</button>

            {trainData.map((train, index) => {
                return (
                    <div
                        key={index}
                        className={`flex items-center h-20 bg-white text-indigo-600 relative gap-2`}
                    >
                        <div className="flex items-center w-3/5 gap-x-4 shrink-0">
                            <div className="w-20 pl-1 h-full bg-indigo-600 text-white font-semibold shrink-0">
                                {train.vehicleJourneyName}
                            </div>

                            <div className="text-3xl font-bold line-clamp-1">
                                {train.destinationName}
                            </div>
                        </div>

                        <div className='flex items-center w-full h-full gap-2 text-5xl font-bold bg-gray-200'>
                            <div className={`inline-flex items-center justify-center h-full min-w-[5rem] px-3 bg-black text-yellow-500`}>
                                {train.vehicleAtStop ? 'à quai' : (train.minutesFromNow < 0 ? <PulseLoader color="#eab308" size={10} speedMultiplier={0.5} /> : (train.minutesFromNow === 0 ? 'à l\'approche' : (isNaN(train.minutesFromNow) ? '' : train.minutesFromNow + '')))}
                            </div>
                            <div className='text-3xl'>
                                {
                                    train.arrivalStatus === 'onTime' || train.departureStatus === 'onTime' ? '' :
                                        train.expectedArrivalTime && !train.expectedDepartureTime ? 'terminus' :
                                            !train.expectedArrivalTime && train.expectedDepartureTime ? 'départ' :
                                            translateStatus(train.arrivalStatus) || translateStatus(train.departureStatus)
                                }
                            </div>
                        </div>
                    </div>
                )
            })}

        </div>
    );
}

export default Image;