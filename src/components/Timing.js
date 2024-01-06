import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { removeGareDePrefix } from '../utils/stringUtils';
import { lineTypes } from '../components/Trafic';
import relations from '../data/relations.json';
import zonesDarrets from '../data/zones-d-arrets.json';
import referentielDesLignes from '../data/referentiel-des-lignes.json';
import { LineLogoByLineID } from '../utils/dataHelpers';

function TrainInfo({ lineID, stationName }) {
  const stationID = stationName;

  // Fetch train departure every 2 seconds
  const [trainData, setTrainData] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchData = async (url) => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        const nextDepartures = data.nextDepartures.data;

        if (nextDepartures.length === 0 || !nextDepartures.every(train => train.lineDirection)) {
          setStatus('NO_REALTIME_SCHEDULES_FOUND');
        } else {
          const zoneAreas = [];
          nextDepartures.forEach(train => {
            if (lineTypes.TRAIN.includes(train.lineId)) { //
              const correspondingRelation = relations.find(relation => relation.arrid === train.destination.stopPointId.split(':').pop());
  
              if (correspondingRelation) {
                const zoneArea = correspondingRelation.zdcid;
                if (!zoneAreas.includes(zoneArea)) {
                  zoneAreas.push(zoneArea);
                }
              }
            }
          });


          function getStationName(zoneArea) {
            var stations = stationID !== undefined ? zonesDarrets.filter(station => station.fields.zdcid === zoneArea) : [];
            return stations.find(station => station.fields.zdatype === 'railStation')?.fields.zdaname
                || stations.find(station => station.fields.zdatype === 'metroStation')?.fields.zdaname  
                || stations.find(station => station.fields.zdatype === 'onstreetTram')?.fields.zdaname
                || stations.find(station => station.fields.zdatype === 'onstreetBus')?.fields.zdaname + ' (' + stations.find(station => station.fields.zdatype === 'onstreetBus')?.fields.zdatown + ')'
          }

          if (zoneAreas.length > 0) {
            const fetchPromises = zoneAreas.map(zoneArea => {
              const newURL = `https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:${lineID}/stops/stop_area:IDFM:${stationID}/to/stop_area:IDFM:${zoneArea}/realTime`;
              console.log(newURL)
              return fetch(newURL).then(response => response.json());
            });

          Promise.all(fetchPromises).then(results => {
            let combinedNextDepartures = results.reduce((combined, result, index) => {
              if (result && result.nextDepartures && result.nextDepartures.data) {
                const zoneArea = zoneAreas[index];
                const stationName = getStationName(zoneArea);
                result.nextDepartures.data.forEach(train => {
                  if (!train.lineDirection) {
                    train.lineDirection = stationName;
                  }
                });
                return combined.concat(result.nextDepartures.data);
              }
              return combined;
            }, []);
          
            // Sort the combinedNextDepartures array by the time property
            combinedNextDepartures.sort((a, b) => parseInt(a.time) - parseInt(b.time));
          
            // Helper function to check for identical objects
            const isIdentical = (obj1, obj2) => {
              return JSON.stringify(obj1) === JSON.stringify(obj2);
            };
          
            // Remove identical objects from combinedNextDepartures
            combinedNextDepartures = combinedNextDepartures.filter(
              (value, index, self) => self.findIndex(obj => isIdentical(obj, value)) === index
            );
            
            setTrainData(combinedNextDepartures);
            setStatus(data.errorMessage);
            });
          } else {
            setTrainData(nextDepartures);
            setStatus(data.errorMessage);
          }
        }
      } catch (error) {
        // Handle error
      }
    };

    const url = `https://api-iv.iledefrance-mobilites.fr/lines/v2/line:IDFM:${lineID}/stops/stop_area:IDFM:${stationID}/realTime`;
    console.log(url)
    fetchData(url);

    const intervalId = setInterval(() => {
      fetchData(url);
    }, 2000);

    return () => clearInterval(intervalId);
  }, [lineID, stationID]);


  if (status === 'NO_REALTIME_SCHEDULES_FOUND') {
    return <Link to={`/${lineID}/${stationID}`}><div className="shadow-[inset_0rem_0.2rem_0.4rem_0_rgb(0,0,0,0.1)] flex items-center justify-center text-center text-xs lg:text-base bg-white dark:bg-gray-700 dark:text-gray-200 p-4 mb-3 h-[44px] lg:h-[72px]"><p className='animate-pulse'>Information en direct indisponible</p></div></Link>;
  }

  // Display loading animation
  if (trainData.length === 0) {
    return (
      <div className="overflow-y-auto max-h-[27rem] animate-pulse">
        <div className="flex items-center bg-white dark:bg-gray-800 shadow-[inset_0rem_0.2rem_0.4rem_0_rgb(0,0,0,0.1)] h-[44px] lg:h-[72px] p-1 lg:p-4 mb-1 lg:mb-3">
          <div role="status" class="flex items-center justify-center w-4 lg:w-10 h-4 lg:h-10 ml-1 lg:ml-0 mr-2 lg:mr-4 p-1 bg-gray-300 rounded-sm lg:rounded-lg dark:bg-gray-700">
            <svg class="w-5 h-5 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
              <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
            </svg>
          </div>

          <div className="flex-grow">
            <div class="w-12 lg:w-24 h-1 lg:h-2.5 mb-1 lg:mb-2.5 bg-gray-300 rounded-full dark:bg-gray-600"></div>
            <div class="w-16 lg:w-32 h-1 lg:h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
          </div>

          <div className="ml-2 lg:ml-5 min-w-max pr-2 text-right">
            <div class="w-6 lg:w-12 h-1 lg:h-2.5 mb-1 lg:mb-2.5 mr-1 bg-gray-300 rounded-full dark:bg-gray-700"></div>
            <div class="w-4 lg:w-8 h-1 lg:h-2 mr-1 bg-gray-200 rounded-full float-right dark:bg-gray-700"></div>
          </div>
        </div>
      </div>
    );
  }

  // Display train departure
  const groupedTrains = {};
  trainData.forEach((train) => {
    const sens = train.sens || 'other';
    if (!groupedTrains[sens]) {
      groupedTrains[sens] = [];
    }
    groupedTrains[sens].push(train);
  });

  var lineColor = referentielDesLignes.find(line => line.fields.id_line == lineID)?.fields.colourweb_hexa;
  function blendColor(color, blendWith, alpha) {
    const [r1, g1, b1] = [parseInt(color.slice(0, 2), 16), parseInt(color.slice(2, 4), 16), parseInt(color.slice(4, 6), 16)];
    const [r2, g2, b2] = [parseInt(blendWith.slice(0, 2), 16), parseInt(blendWith.slice(2, 4), 16), parseInt(blendWith.slice(4, 6), 16)];

    const r = Math.round(r1 * (1 - alpha) + r2 * alpha);
    const g = Math.round(g1 * (1 - alpha) + g2 * alpha);
    const b = Math.round(b1 * (1 - alpha) + b2 * alpha);

    return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
  }
  var lighterColor = blendColor(lineColor, 'ffffff', 0.5);


  return (
    <div className="overflow-y-auto max-h-[27rem]">
      {Object.keys(groupedTrains).map((sens) => (
        <div key={sens}>
          {sens !== 'other' && (
            <h2 className="text-xs font-bold mb-2">
              {sens === '1' ? '' : 'Direction -1'}
            </h2>
          )}
          {groupedTrains[sens].map((train, index) => (
            // <Link to={`/search?line=${lineID}&stop_area=${stationID}`}>
            <Link to={`/${lineID}/${stationID}`}>
            <div 
              key={train.time + index} 
              className="flex items-center bg-white border-gray-400 dark:text-white dark:bg-gray-800 min-h-[44px] max-h-[72px] p-1 lg:p-4 relative" 
              style={{borderBottom: `2px solid #${lineColor}`}}
            >
              <div className='shrink-0'>
                <LineLogoByLineID lineID={lineID} className="h-4 lg:h-10 pl-1 lg:pl-0" />
                <h3 className='text-[8px] lg:text-xs justify-center flex mx-auto mt-0.5 pl-0.5 lg:pl-0'>{removeGareDePrefix(train.vehicleName)}</h3>
              </div>
              <div className="flex-grow overflow-hidden">
                <h2 className='font-bold text-[11px] lg:text-lg line-clamp-2 ml-2 lg:ml-4'>{removeGareDePrefix(train.lineDirection)}</h2>
              </div>
              <div className="ml-1 lg:ml-5 pr-2 text-right">
                {train.code === 'message' ? (
                    <p className="text-[10px] lg:text-base font-bold text-green-600 dark:text-green-500 whitespace-normal">{train.schedule}</p>
                ) : (
                  <>
                    <p className={`text-sm lg:text-2xl font-bold text-green-600 dark:text-green-500${train.time === '0' ? 'animate-pulse' : ''}`}>{train.time}<span className="text-xs lg:text-lg">ᵐⁱⁿ</span></p>
                    <p className="text-xs lg:text-sm text-right text-gray-400 dark:text-white">{new Date(Date.now() + (train.code === 'message' ? train.schedule : train.time) * 60000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </>
                )}
              </div>
              <div 
                className="absolute top-0 right-0 bottom-0 left-0 lg:left-0 bg-gradient-to-r from-transparent to-white dark:to-gray-800" 
                style={{
                  backgroundImage: `linear-gradient(to right, transparent, rgba(${parseInt(lighterColor.slice(0, 2), 16)}, ${parseInt(lighterColor.slice(2, 4), 16)}, ${parseInt(lighterColor.slice(4, 6), 16)}, 0.1))`
                }}
              />
            </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}

export default TrainInfo;