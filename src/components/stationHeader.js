import React, { useEffect, useState } from 'react';
import { checkDisruptions } from './Trafic';
import { useNavigate } from 'react-router-dom';
import AddFav from './elements/fav'
import { getStationNameByStationID, getTransportByLineID, LineLogoByLineID } from '../utils/dataHelpers';

function StationInfo({ lineID, stationID }) {
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(`/line/${lineID}`);
    };

    // Fetch & check disruptions
    const [disruptedLines, setDisruptedLines] = useState([]);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const fetchDisruptions = async () => {
            const { disruptedLines } = await checkDisruptions();
            setDisruptedLines(disruptedLines);
        };

        fetchDisruptions();
    }, []);

    // Check if line is disrupted
    const disrupted = disruptedLines.some(line => line.lineId === 'line:IDFM:' + lineID && line.disrupted === true);

    // Display station header
    return (
        <div className="flex items-center bg-white dark:bg-gray-800 dark:text-white border-gray-900 dark:border-gray-800 border-solid border p-2 lg:p-4 mb-2 lg:mb-4 rounded-b-lg shadow-md min-h-[52px]" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {disrupted && (
                <span className="relative">
                    {isHovered && (
                        <div data-popover id="popover-top" role="tooltip" className="absolute z-10 inline-block w-40 lg:w-80 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                            <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700 flex flex-row">
                                <h3 className="flex-grow font-semibold text-gray-900 dark:text-white">{disruptedLines.find(line => line.lineId === 'line:IDFM:' + lineID)?.disruption.cause}</h3>
                            </div>
                            <div className="px-3 py-2">
                                <p>{disruptedLines.find(line => line.lineId === 'line:IDFM:' + lineID)?.disruption.title}</p>
                                <a class="bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 hover:dark:bg-gray-600 font-medium rounded-lg text-xs px-3 mt-3 text-center inline-flex items-center cursor-pointer" onClick={handleNavigate}>
                                    <svg class="-ml-0.5 mr-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                        <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
                                    </svg>
                                    En savoir plus
                                </a>
                            </div>
                        </div>
                    )}
                    <span className="absolute top-[-1rem] right-[-0.4rem] lg:top-[-1.8rem] lg:right-[-0.7rem]">
                        <span className="relative flex h-3 w-3 lg:h-5 lg:w-5">
                            <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${disruptedLines.find(line => line.lineId === 'line:IDFM:' + lineID)?.disruption.severity === 'BLOQUANTE' ? 'bg-red-600' : 'bg-yellow-400'}`}></span>
                            <span className={`relative inline-flex rounded-full h-3 w-3 lg:h-5 lg:w-5 ${disruptedLines.find(line => line.lineId === 'line:IDFM:' + lineID)?.disruption.severity === 'BLOQUANTE' ? 'bg-red-600' : 'bg-yellow-400'}`}></span>
                        </span>
                    </span>
                </span>
            )}
            <img src={process.env.PUBLIC_URL + `/images/${getTransportByLineID(lineID)}${localStorage.theme === 'dark' ? '_LIGHT' : ''}.svg`} alt={getTransportByLineID(lineID)} className="h-5 lg:h-10 mr-1" />
            <LineLogoByLineID lineID={lineID} className="h-5 lg:h-10 mr-2 lg:mr-4" />
            <p className='text-xs lg:text-base font-medium flex-grow line-clamp-2'>{getStationNameByStationID(stationID)}</p>
            <p className='text-slate-400 text-xs font-bold pr-0.5 lg:pr-2'>
                <AddFav />
            </p>
        </div>
    );
}

export default StationInfo;