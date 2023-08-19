import React, { useEffect, useState } from "react";
import DisruptionInfo from '../components/DisruptionInfo';
import TrainDepartureDisplay from '../components/SearchBar'
import { lineTypes, checkDisruptions } from '../components/Trafic'

function InfoTrafic() {
  const [disruptedLines, setDisruptedLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDisruption, setSelectedDisruption] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { loading, disruptedLines } = await checkDisruptions();
      setDisruptedLines(disruptedLines);
      setLoading(loading);
    };

    fetchData();
  }, []);

  const handleLineClick = (disruption) => {
    setSelectedDisruption(disruption);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 m-2 sm:m-6">
      <div className="xl:col-span-2">
        <TrainDepartureDisplay />
      </div>
      <div className="bg-white rounded-lg p-4 lg:p-6">
        {Object.entries(lineTypes).map(([lineType, lineIds]) => (
          <div key={lineType} className="flex flex-row p-1 xl:p-2">
            <>
              {loading ? (
                <div role="status" class="shrink-0 flex items-center justify-center w-8 lg:w-12 h-8 lg:h-12 mt-1 mr-1 lg:mr-4 p-1 border-4 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                  <svg class="w-5 h-5 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                    <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                  </svg>
                </div>
              ) : (
                <img src={process.env.PUBLIC_URL + `/images/${lineType}.svg`} alt={lineType} className="h-8 xl:h-12 mt-1 mr-1 lg:mr-4" />
              )}
            </>
            <div className="flex flex-row flex-wrap">
              {lineIds.map((lineId) => {
                const disruptedLine = disruptedLines.find(({ lineId: disruptedLineId }) => disruptedLineId === lineId);
                return (
                  <>
                    {loading ? (
                      <div role="status" class="flex items-center justify-center w-9 xl:w-12 h-9 xl:h-12 m-[3px] p-1 border-4 bg-gray-300 rounded-lg animate-pulse dark:bg-gray-700">
                        <svg class="w-5 h-5 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                          <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
                        </svg>
                      </div>
                    ) : (
                      <img
                        key={lineId}
                        src={process.env.PUBLIC_URL + `/images/${lineId.split(':').pop()}.svg`}
                        alt={lineId}
                        onClick={() => handleLineClick(disruptedLine)}
                        className={`h-9 xl:h-12 m-[3px] p-1 border-4 rounded-lg ${disruptedLine && disruptedLine.disrupted ? 'outline-red-500 outline outline-4 outline-offset-[-4px] cursor-pointer' : 'outline-green-600 outline outline-2 outline-offset-[-2px] border-[#00000000]'}`}
                      />
                    )}
                  </>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {selectedDisruption && selectedDisruption.disruption && (
        <div className="">
          <DisruptionInfo selectedDisruption={selectedDisruption} />
        </div>
      )}
    </div>
  );

}

export default InfoTrafic;