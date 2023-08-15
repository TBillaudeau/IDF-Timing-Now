import React, { useEffect, useState } from 'react';
import { checkDisruptions } from '../components/Trafic';

function StationInfo({ transportLogo, lineLogo, stationName }) {
    const [disruptedLines, setDisruptedLines] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
        const { disruptedLines } = await checkDisruptions();
        setDisruptedLines(disruptedLines);
        };

        fetchData();
    }, []);

    const disrupted = disruptedLines.some(line => line.lineId === lineLogo && line.disrupted === true);

    return (
        // <div className="flex items-center bg-slate-700 text-white p-4 mb-4 rounded-lg shadow-md">
        <div className="flex items-center bg-white border-slate-700 border-solid border-2 p-4 mb-4 rounded-lg shadow-md">
            <img src={process.env.PUBLIC_URL + `/images/${transportLogo.replace(/:/g, '_')}.png`} alt={transportLogo} className="h-10 mr-1" />
            <img src={process.env.PUBLIC_URL + `/images/${lineLogo.replace(/:/g, '_')}.png`} alt={lineLogo} className="h-10 mr-4" />
            {disrupted && (
                <span className="relative">
                <span className="absolute top-[-1.8rem] right-[0.6rem]">
                    <span className="relative flex h-5 w-5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-500 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-orange-500"></span>
                    </span>
                </span>
                </span>
            )}
            <p className='font-medium flex-grow'>{stationName}</p>
            <p className='text-slate-400 text-xs font-bold pr-3'>Attente</p>
        </div>
    );
}

export default StationInfo;