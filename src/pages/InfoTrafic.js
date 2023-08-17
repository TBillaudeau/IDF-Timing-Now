import React, { useEffect, useState } from "react";
import DisruptionInfo from '../components/DisruptionInfo';
import TrainDepartureDisplay from '../components/Search'
import { lineTypes, checkDisruptions } from '../components/Trafic'

export default function Home() {
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
    <>
      {loading ? (
        <div className="flex justify-center items-center">
          {/* <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-slate-700"></div> */}
          
          <div role="status" class="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
              <div class="flex items-center justify-between">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <div class="flex items-center justify-between pt-4">
                  <div>
                      <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                      <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                  </div>
                  <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
              </div>
              <span class="sr-only">Loading...</span>
          </div>

        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row h-screen">
            <div className="flex flex-col m-2 sm:m-6 p-2 sm:p-6 xl:w-2/3 lg:w-full bg-white rounded-lg">
              {Object.entries(lineTypes).map(([lineType, lineIds]) => (
                <div key={lineType} className="flex flex-row p-1 xl:p-2">
                  <img src={process.env.PUBLIC_URL + `/images/${lineType}.svg`} alt={lineType} className="h-8 xl:h-12 mt-1 mr-1 lg:mr-4" />
                  <div className="flex flex-row flex-wrap">
                    {lineIds.map((lineId) => {
                      const disruptedLine = disruptedLines.find(({ lineId: disruptedLineId }) => disruptedLineId === lineId);
                      return (
                        <img
                          key={lineId}
                          src={process.env.PUBLIC_URL + `/images/${lineId.split(':').pop()}.svg`}
                          alt={lineId}
                          onClick={() => handleLineClick(disruptedLine)}
                          className={`h-9 xl:h-12 m-[3px] p-1 border-4 rounded-lg ${disruptedLine && disruptedLine.disrupted ? 'border-red-500 cursor-pointer' : 'border-green-600'}`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <DisruptionInfo selectedDisruption={selectedDisruption} />

          </div>
          <TrainDepartureDisplay />
        </>
      )}
    </>
  );
}