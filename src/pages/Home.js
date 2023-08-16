import React, { useEffect, useState } from "react";
import { parse } from 'date-fns';
import ReactImageZoom from 'react-image-zoom';
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
        <div className="flex justify-center items-center min-h-screen">
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
                  <img src={process.env.PUBLIC_URL + `/images/${lineType.replace(/:/g, '_')}.png`} alt={lineType} className="h-10 xl:h-12 mt-1 mr-4" />
                  <div className="flex flex-row flex-wrap">
                    {lineIds.map((lineId) => {
                      const disruptedLine = disruptedLines.find(({ lineId: disruptedLineId }) => disruptedLineId === lineId);
                      return (
                        <img
                          key={lineId}
                          src={process.env.PUBLIC_URL + `/images/${lineId.replace(/:/g, '_')}.png`}
                          alt={lineId}
                          onClick={() => handleLineClick(disruptedLine)}
                          className={`h-10 xl:h-12 m-1 p-1 border-4 rounded-lg ${disruptedLine && disruptedLine.disrupted ? 'border-red-500 cursor-pointer' : 'border-green-600'}`}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col m-6 p-6 xl:w-2/3 lg:w-full bg-white rounded-lg">
              {selectedDisruption ? (
                <div>
                  {selectedDisruption.disruption ? (
                    <>
                    <div className="flex items-center mb-6">
                      <img
                        src={process.env.PUBLIC_URL + `/images/${selectedDisruption.lineId.replace(/:/g, '_')}.png`}
                        alt={selectedDisruption.lineId}
                        className="h-8 mr-2"
                      />
                      <p className="text-sm xl:text-base xl:font-semibold flex grow">{selectedDisruption.disruption.title}</p>
                      <p className="hidden xl:block font-semibold mr-4"> {selectedDisruption.disruption.cause}</p>
                    </div>
                    <a href={`https://me-deplacer.iledefrance-mobilites.fr/stif_static/assets_vianavigo/img/linesPlans/HD/${selectedDisruption.lineId.split(':').pop().replace(/:/g, '_')}.png`} target="_blank" rel="noopener noreferrer">
                      <img
                        src={`https://me-deplacer.iledefrance-mobilites.fr/stif_static/assets_vianavigo/img/linesPlans/HD/${selectedDisruption.lineId.split(':').pop().replace(/:/g, '_')}.png`}
                        alt={selectedDisruption.lineId}
                        className="w-full border p-2 border-gray-300"
                      />
                    </a>
                    
                      <div
                        dangerouslySetInnerHTML={{ __html: selectedDisruption.disruption.message }}
                        className="border border-gray-300 p-4 rounded-lg mt-2 overflow-y-auto	max-h-[25rem]"
                      />
                    </>
                  ) : (
                    <p>No disruption details available for this line.</p>
                  )}
                </div>
              ) : (
                <p className="text-gray-500">Click on a train line to view disruption details.</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}