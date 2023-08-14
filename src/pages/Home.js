import React, { useEffect, useState } from "react";
import { parse } from 'date-fns';

const lineTypes = {
  RER: [
    'line:IDFM:C01742', // RERA
    'line:IDFM:C01743', // RERB
    'line:IDFM:C01727', // RERC
    'line:IDFM:C01728', // RERD
    'line:IDFM:C01729', // RERE
  ],
  METRO: [
    'line:IDFM:C01371', // METRO1
    'line:IDFM:C01372', // METRO2
    'line:IDFM:C01373', // METRO3
    'line:IDFM:C01386', // METRO3bis
    'line:IDFM:C01374', // METRO4
    'line:IDFM:C01375', // METRO5
    'line:IDFM:C01376', // METRO6
    'line:IDFM:C01377', // METRO7
    'line:IDFM:C01387', // METRO7bis
    'line:IDFM:C01378', // METRO8
    'line:IDFM:C01379', // METRO9
    'line:IDFM:C01380', // METRO10
    'line:IDFM:C01381', // METRO11
    'line:IDFM:C01382', // METRO12
    'line:IDFM:C01383', // METRO13
    'line:IDFM:C01384', // METRO14
  ],
  TRAM: [
    'line:IDFM:C01389', // TRAM1
    'line:IDFM:C01390', // TRAM2
    'line:IDFM:C01391', // TRAM3a
    'line:IDFM:C01679', // TRAM3b
    'line:IDFM:C01843', // TRAM4
    'line:IDFM:C01684', // TRAM5
    'line:IDFM:C01794', // TRAM6
    'line:IDFM:C01774', // TRAM7
    'line:IDFM:C01795', // TRAM8
    'line:IDFM:C02317', // TRAM9
    'line:IDFM:C02528', // TRAM10
    'line:IDFM:C01999', // TRAM11
    'line:IDFM:C02344', // TRAM13
  ],
  TRAIN: [
    'line:IDFM:C01737', // TRAINH
    'line:IDFM:C01739', // TRAINJ
    'line:IDFM:C01738', // TRAINK
    'line:IDFM:C01740', // TRAINL
    'line:IDFM:C01736', // TRAINN
    'line:IDFM:C01730', // TRAINP
    'line:IDFM:C01731', // TRAINR
    'line:IDFM:C01741', // TRAINU
  ],
  BUS: [
    'line:IDFM:C01106', // 70
    'line:IDFM:C01124', // 93
    'line:IDFM:C01169', // 144
    'line:IDFM:C01193', // 172
    'line:IDFM:C01196', // 175
    'line:IDFM:C01201', // 180
    'line:IDFM:C01239', // 241
    'line:IDFM:C01240', // 244
    'line:IDFM:C01409', // N53
  ]
};


export default function Home() {
  const [disruptedLines, setDisruptedLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDisruption, setSelectedDisruption] = useState(null);

  async function fetchAllDisruptions() {
    try {
      const response = await fetch('https://api-iv.iledefrance-mobilites.fr/disruptions/v2');
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  }

  useEffect(() => {
    const checkDisruptions = async () => {
      const data = await fetchAllDisruptions();

      if (!data) {
        setLoading(false);
        return;
      }

      const currentTimestamp = new Date();

      const allDisruptedLines = [];

      for (const [lineType, lineIds] of Object.entries(lineTypes)) {
        lineIds.forEach((lineId) => {
          const matchingLine = data.lines.find((line) => line.id === lineId);

          if (matchingLine) {
            const disruptionIds = matchingLine.impactedObjects[0].disruptionIds;

            const matchedDisruption = data.disruptions.find((disruption) =>
              disruptionIds.includes(disruption.id) &&
              disruption.applicationPeriods.some((period) => {
                const beginTimestamp = parse(period.begin, 'yyyyMMdd\'T\'HHmmss', new Date());
                const endTimestamp = parse(period.end, 'yyyyMMdd\'T\'HHmmss', new Date());
                return beginTimestamp <= currentTimestamp && currentTimestamp <= endTimestamp;
              })
            );

            allDisruptedLines.push({
              lineId,
              disrupted: !!matchedDisruption,
              disruption: matchedDisruption || null
            });
          }
        });
      }

      setDisruptedLines(allDisruptedLines);
      setLoading(false);
    };

    checkDisruptions();
  }, []);

  const handleLineClick = (disruption) => {
    setSelectedDisruption(disruption);
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-slate-700"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row">
            <div className="flex flex-col m-2 sm:m-6 p-2 sm:p-6 xl:w-2/3 lg:w-full bg-white rounded-lg">
              {Object.entries(lineTypes).map(([lineType, lineIds]) => (
                <div key={lineType} className="flex flex-row items-center p-2">
                  <img src={`../images/${lineType.replace(/:/g, '_')}.png`} alt={lineType} className="w-12 h-12 mr-4" />
                  <div className="flex flex-row flex-wrap">
                    {lineIds.map((lineId) => {
                      const disruptedLine = disruptedLines.find(({ lineId: disruptedLineId }) => disruptedLineId === lineId);
                      return (
                        <img
                          key={lineId}
                          src={`../images/${lineId.replace(/:/g, '_')}.png`}
                          alt={lineId}
                          onClick={() => handleLineClick(disruptedLine)}
                          className={`h-12 m-1 p-1 border-4 rounded-lg ${disruptedLine && disruptedLine.disrupted ? 'border-red-500 cursor-pointer' : 'border-green-600'}`}
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
                        src={`../images/${selectedDisruption.lineId.replace(/:/g, '_')}.png`}
                        alt={selectedDisruption.lineId}
                        className="h-8 mr-2"
                      />
                      <p className="font-semibold flex grow">{selectedDisruption.disruption.title}</p>
                      <p className="font-semibold mr-4"> {selectedDisruption.disruption.cause}</p>
                    </div>
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