import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from "react-router-dom";
import { convertTransportMode } from '../utils/stringUtils';
import JourneyDetails from "../components/JourneyDetails";
import { LineLogoByLineID } from "../utils/dataHelpers";
import HashLoader from "react-spinners/HashLoader";

function Trip() {
    let params = new URLSearchParams(useLocation().search);
    let from = params.get('from');
    let to = params.get('to');

    const [trainData, setTrainData] = useState([]);
    const [selectedJourney, setSelectedJourney] = useState(null);
    const journeyDetailsRef = useRef(null);

    useEffect(() => {
        const fetchLineData = async () => {
            const response = await fetch(`https://prim.iledefrance-mobilites.fr/marketplace/navitia/coverage/fr-idf/journeys?from=${from}&to=${to}`, {
                headers: {
                    'apikey': process.env.REACT_APP_IDFM_API_KEY
                }
            });
            const data = await response.json();
            console.log(data);
            setTrainData(data.journeys ? data.journeys : []);
        };

        fetchLineData();
    }, []);

    useEffect(() => {
        if (selectedJourney && journeyDetailsRef.current) {
            journeyDetailsRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [selectedJourney]);

    const handleJourneySelect = (journey) => {
        setSelectedJourney(journey);
    };

    // Helper function to format the total duration
    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return hours === 0 ? `${minutes} min` : `${hours} h ${minutes} min`;
    };

    // Helper function to format the cost
    const formatCost = (fare) => {
        if (!fare.found) return 'Not available';
        return `${(fare.total.value / 100).toFixed(2)} ${fare.total.currency === 'centime' ? 'EUR' : fare.total.currency}`;
    };

    return (
        <div>
            {trainData.length > 0 ? (
                <div>
                    {trainData.map((journey, index) => {
                        const totalDuration = formatDuration(journey.durations.total);
                        const totalCost = formatCost(journey.fare);
                        const departureTime = new Date(new Date(journey.departure_date_time.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6Z")).getTime() - 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        const arrivalTime = new Date(new Date(journey.arrival_date_time.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6Z")).getTime() - 60 * 60 * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                        return (
                            <div
                                key={index}
                                className={`flex flex-col p-2 bg-white dark:bg-gray-800 dark:text-white cursor-pointer ${selectedJourney === journey ? 'sticky top-0 z-50' : ''}`}
                                onClick={() => handleJourneySelect(journey)}
                            >                                <div className="flex overflow-x-auto py-2">
                                    {journey.sections.map((section, idx) => (
                                        <React.Fragment key={idx}>
                                            <div className='flex items-center gap-1 shrink-0'>
                                                {section.display_informations?.commercial_mode || section.mode ? (
                                                    section.mode !== 'walking' || (section.mode === 'walking' && section.duration >= 60) ? (
                                                        <img src={process.env.PUBLIC_URL + `/images/${convertTransportMode(section.display_informations?.commercial_mode || section.mode)}${localStorage.theme === 'dark' ? '_LIGHT' : ''}.svg`} alt={convertTransportMode(section.display_informations?.commercial_mode)} className="h-6 lg:h-10" />
                                                    ) : null
                                                ) : null}
                                                {section.links[1]?.id ? (
                                                    // <img src={process.env.PUBLIC_URL + `/images/${section.links[1]?.id.split(":").pop()}.svg`} alt={section.links[1]?.id.split(":").pop()} className="h-6 lg:h-10" />
                                                    <LineLogoByLineID lineID={section.links[1]?.id.split(":").pop()} className="h-6 lg:h-10" />

                                                ) : null}
                                                {idx < journey.sections.length - 1 && (section.display_informations?.commercial_mode || section.mode || section.links[1]?.id) && (
                                                    section.mode !== 'walking' || (section.mode === 'walking' && section.duration >= 60) ? (
                                                        idx !== journey.sections.length - 2 ? (
                                                            <svg className="w-2 h-2 mr-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1" />
                                                            </svg>
                                                        ) : null
                                                    ) : null
                                                )}
                                            </div>
                                        </React.Fragment>
                                    ))}
                                </div>
                                <div className="flex justify-between items-center">
                                    <p className='text-sm'>{totalCost}</p>
                                    <div className='text-right'>
                                        <p><strong>{totalDuration}</strong></p>
                                        <p className='text-sm'>{departureTime} - {arrivalTime}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {selectedJourney &&
                        <div ref={journeyDetailsRef}>
                            <JourneyDetails key={Date.now()} journeyData={selectedJourney} />
                        </div>
                    }
                </div>
            ) : (
                <div className="flex items-center justify-center" style={{ height: 'calc(100vh - 130px)' }}>
                    <HashLoader size={30} color="#6D28D9" />
                </div>
            )}

        </div>
    );
}

export default Trip;