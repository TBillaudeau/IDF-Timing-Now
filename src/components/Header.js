import React, { useEffect, useState } from 'react';
import { checkDisruptions } from '../components/Trafic';

function StationInfo({ transportLogo, lineLogo, stationName }) {

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

    const disrupted = disruptedLines.some(line => line.lineId === 'line:IDFM:'+lineLogo && line.disrupted === true);
    
    // Display station header
    return (
        // <div className="flex items-center bg-slate-700 text-white p-4 mb-4 rounded-lg shadow-md">
        <div className="flex items-center bg-white border-slate-700 border-solid border-2 p-2 xl:p-4 mb-4 rounded-lg shadow-md min-h-[52px]" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
            {disrupted && (
                <span className="relative">
                {isHovered && (
                    <div data-popover id="popover-top" role="tooltip" className="absolute z-10 inline-block w-40 xl:w-80 text-sm text-gray-500 transition-opacity duration-300 bg-white border border-gray-200 rounded-lg shadow-sm opacity-100 dark:text-gray-400 dark:border-gray-600 dark:bg-gray-800">
                        <div className="px-3 py-2 bg-gray-100 border-b border-gray-200 rounded-t-lg dark:border-gray-600 dark:bg-gray-700">
                            <h3 className="font-semibold text-gray-900 dark:text-white">{disruptedLines.find(line => line.lineId === lineLogo)?.disruption.cause}</h3>
                        </div>
                        <div className="px-3 py-2">
                            <p>{disruptedLines.find(line => line.lineId === 'line:IDFM:'+lineLogo)?.disruption.title}</p>
                        </div>
                    </div>
                )}
                <span className="absolute top-[-1rem] right-[-0.4rem] xl:top-[-1.8rem] xl:right-[-0.7rem]">
                    <span className="relative flex h-3 w-3 xl:h-5 xl:w-5">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${disruptedLines.find(line => line.lineId === lineLogo)?.disruption.severity === 'BLOQUANTE' ? 'bg-red-600' : 'bg-yellow-400'}`}></span>
                    <span className={`relative inline-flex rounded-full h-3 w-3 xl:h-5 xl:w-5 ${disruptedLines.find(line => line.lineId === lineLogo)?.disruption.severity === 'BLOQUANTE' ? 'bg-red-600' : 'bg-yellow-400'}`}></span>
                    </span>
                </span>
                </span>
            )}
            <img src={process.env.PUBLIC_URL + `/images/${transportLogo}.svg`} alt={transportLogo} className="h-5 xl:h-10 mr-1" />
            <img src={process.env.PUBLIC_URL + `/images/${lineLogo}.svg`} alt={lineLogo} className="h-5 xl:h-10 mr-2 xl:mr-4" />
            <p className='text-xs xl:text-base font-medium flex-grow'>{stationName}</p>
            <p className='hidden xl:block text-slate-400 text-xs font-bold pr-3'>Attente</p>
        </div>
    );
}

export default StationInfo;