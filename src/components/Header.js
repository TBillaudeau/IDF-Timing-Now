function StationInfo({ transportLogo, lineLogo, stationName }) {
    return (
        // <div className="flex items-center bg-slate-700 text-white p-4 mb-4 rounded-lg shadow-md">
        <div className="flex items-center bg-white border-slate-700 border-solid border-2 p-4 mb-4 rounded-lg shadow-md">
            <img src={process.env.PUBLIC_URL + `/images/${transportLogo.replace(/:/g, '_')}.png`} alt={transportLogo} className="h-10 mr-1" />
            <img src={process.env.PUBLIC_URL + `/images/${lineLogo.replace(/:/g, '_')}.png`} alt={lineLogo} className="h-10 mr-4" />
            <p className='font-medium flex-grow'>{stationName}</p>
            <p className='text-slate-400 text-xs font-bold pr-3'>Attente</p>
        </div>
    );
}

export default StationInfo;