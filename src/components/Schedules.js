import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import removeGareDePrefix from '../functions/utils';
import { set } from 'date-fns';

function Schedules({ lineID, stationName }) {
    const [trainData, setTrainData] = useState([]);
    const [status, setStatus] = useState('');
    const [activeTab, setActiveTab] = useState('current');

    const handleClick = (tab) => {
        setActiveTab(tab);
    };
    
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();

            setTrainData(data);
            setStatus(data.errorMessage);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const url = `https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:${lineID}/stops/stop_area:IDFM:${stationName}/schedules`;
        fetchData(url);
    }, [lineID, stationName]);

     return (
        <>
            <div className="grid grid-cols-2 gap-4">
                {trainData.schedules && trainData.schedules.map((schedule) => (
                    <div key={schedule.routeId} className="">
                        <div className="flex items-center text-white bg-gray-700 shadow-md py-2 px-4 mb-1">
                            <div className="flex-grow overflow-hidden">
                            </div>
                            <div className="ml-1 lg:ml-5 text-right">
                            <p className="text-xs lg:text-sm font-medium">{schedule.from}</p>
                                <p className="text-xs lg:text-sm font-medium">{schedule.to}</p>
                            </div>
                        </div>

                        {schedule.first && (
                            <div className="flex items-center bg-white shadow-md h-8 xl:h-10 p-3 lg:p-4 mb-1">
                                <div className="flex-grow overflow-hidden">
                                    <h2 className='font-medium text-xs lg:text-sm line-clamp-2'>
                                    Premier départ :
                                    </h2>
                                </div>
                                <div className="ml-1 lg:ml-5 text-right">
                                    <p className="text-xs lg:text-sm font-medium">{schedule.first}</p>
                                </div>
                            </div>
                        )}
                        {schedule.last && (
                            <div className="flex items-center bg-white shadow-md h-8 xl:h-10 p-3 lg:p-4 mb-1">
                                <div className="flex-grow overflow-hidden">
                                    <h2 className='font-medium text-xs lg:text-sm line-clamp-2'>
                                    Dernier départ :
                                    </h2>
                                </div>
                                <div className="ml-1 lg:ml-5 text-right">
                                    <p className="text-xs lg:text-sm font-medium">{schedule.last}</p>
                                </div>
                            </div>
                        )}

                         <div className="flex items-center text-white bg-gray-700 shadow-md h-8 xl:h-10 p-2 lg:p-4 mb-1">
                            <div className="flex-grow overflow-hidden">
                                <h2 className='font-medium text-xs lg:text-sm line-clamp-2'>
                                Tranche horaire	
                                </h2>
                            </div>
                            <div className="ml-1 lg:ml-5 text-right">
                                <p className="text-xs lg:text-sm font-medium">Fréquence</p>
                            </div>
                        </div>
                        {schedule.frequencies.map((frequency) => (
                            <div key={frequency.periodStart} className="flex items-center bg-white shadow-md h-8 xl:h-10 p-3 lg:p-4 mb-1">
                                <div className="flex-grow overflow-hidden">
                                    <h2 className='font-medium text-xs lg:text-sm line-clamp-2'>
                                        {frequency.periodStart && frequency.periodEnd
                                            ? `${frequency.periodStart} - ${frequency.periodEnd}`
                                            : frequency.periodStart
                                                ? `Après ${frequency.periodStart}`
                                                : frequency.periodEnd
                                                    ? `Avant ${frequency.periodEnd}`
                                                    : ''
                                        }
                                    </h2>
                                </div>
                                <div className="ml-1 lg:ml-5 pr-2 text-right">
                                    <p className="text-sm lg:text-base font-semibold">{frequency.first && frequency.last && `${frequency.first} - ${frequency.last} `}{frequency.frequency}<span className="text-xs lg:text-xs">min</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}

            </div>


                </>

        );
}

export default Schedules;