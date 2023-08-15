function TrainInfo({ logo, trainData }) {
    const removeGareDePrefix = (lineDirection) => {
      try {
        const withoutGarePrefix = lineDirection.replace(/^(Gare de |Gare )/i, ''); // Removes "Gare de" or "Gare " (case-insensitive)
        return withoutGarePrefix.charAt(0).toUpperCase() + withoutGarePrefix.slice(1); // Capitalize first letter
      } catch (error) {
        return lineDirection;
      }
    };
    
    if (trainData.length === 0) {
      return <div className="flex items-center justify-center text-center text-xs xl:text-base bg-white rounded-lg shadow-md p-4 mb-3 h-[72px] animate-pulse">Pas de prochains passages dans l'heure      </div>;
    }

    return (
        <div className="overflow-y-auto max-h-[27rem]">
          {trainData.map((train, index) => (
            <div key={train.time + index} className="flex items-center bg-white rounded-lg shadow-md p-2 xl:p-4 mb-3 min-h-[52px] max-h-[72px]">
              <img src={process.env.PUBLIC_URL + `/images/${logo.replace(/:/g, '_')}.png`} alt={train.shortName} className="h-5 xl:h-10 mr-2 xl:mr-4" />
              <div className="flex-grow">
                <h2 className='font-bold pb-1 text-xs xl:text-xl'>{removeGareDePrefix(train.lineDirection)}</h2>
              </div>
              <div className="ml-5 min-w-max">
                {/* {train.time < 60 ? (
                  <p className={`text-sm xl:text-2xl font-bold pr-1 xl:pr-2 text-green-600 ${train.time === '0' ? 'animate-pulse' : ''}`}>{train.time}ᵐⁱⁿ</p>
                ) : (
                  <div>
                    <p className="text-2xl font-bold pr-2 text-green-600">
                      {String(Math.floor(train.time / 60)).padStart(2, '0')}ʰ{' '}
                      {String(train.time % 60).padStart(2, '0')}ᵐⁱⁿ
                    </p>
                    <p className="text-gray-500">
                      {new Date(Date.now() + train.time * 60000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})} - {train.time}ᵐⁱⁿ
                    </p>
                  </div>
                )} */}
                  <p className={`text-sm xl:text-2xl font-bold pr-1 xl:pr-2 text-green-600 ${train.time === '0' ? 'animate-pulse' : ''}`}>{train.time}ᵐⁱⁿ</p>
                  <p className="text-xs xl:text-sm text-right pr-1 xl:pr-2 text-gray-400">{new Date(Date.now() + train.time * 60000).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
              </div>
            </div>
          ))}
        </div>
    );
}

export default TrainInfo;