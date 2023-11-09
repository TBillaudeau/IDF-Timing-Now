import React, { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import stationsData from '../assets/emplacement-des-gares-idf.json';
import zonesDarrets from '../assets/zones-d-arrets.json';
import referentielDesLignes from '../assets/referentiel-des-lignes.json';

function Breadcrumb({ lineID, stationID }) {
    const navRef = useRef(null);

    useEffect(() => {
      const resizeListener = () => {
        const classList = navRef.current.classList;
        classList.toggle('flex-col', navRef.current.offsetWidth <= 200);
        classList.toggle('sm:flex-row', navRef.current.offsetWidth > 200);
      };
  
      window.addEventListener('resize', resizeListener);
      resizeListener();
  
      return () => window.removeEventListener('resize', resizeListener);
    }, []);
  
    // Get stationName from stationID    
    var stations = stationID !== undefined ? zonesDarrets.filter(station => station.fields.zdcid == stationID) : [];
    var stationName = stations.find(station => station.fields.zdatype == 'railStation')?.fields.zdaname
        || stations.find(station => station.fields.zdatype == 'metroStation')?.fields.zdaname  
        || stations.find(station => station.fields.zdatype == 'onstreetTram')?.fields.zdaname
        || stations.find(station => station.fields.zdatype == 'onstreetBus')?.fields.zdaname + ' (' + stations.find(station => station.fields.zdatype == 'onstreetBus')?.fields.zdatown + ')'
    
    // Get lineName from lineID
    var lineName = lineID !== undefined ? referentielDesLignes.find(line => line.fields.id_line == lineID).fields : '';
    if (lineName.transportmode === 'rail') {
        lineName = lineName.shortname_groupoflines;
    }  else {
        lineName = lineName.transportmode.toUpperCase() + ' ' + lineName.name_line;
    }

    return (
        <nav className="flex sm:flex-row h-10 pl-4 bg-white border-b     border-gray-900" ref={navRef} aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3 flex-none">
                {/* <li className="inline-flex items-center">
                    <a href="#" className="inline-flex items-center text-xs lg:text-sm font-medium hover:text-blue-600">
                        Trafic
                    </a>
                </li> */}
                {lineID && (
                    <li>
                        <div className="flex items-center">
                            <svg className="w-3 h-3 text-gray-400  xl:mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            <Link to={`/line/${lineID}`} className="mx-1 text-xs lg:text-sm font-medium hover:text-blue-600 md:ml-2">{lineName}</Link>
                            {stationName && (
                            <svg className="w-3 h-3 text-gray-400 xl:mx-1 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                            )}
                        </div>
                    </li>
                )}
            </ol>
            {stationName && (
                <ol className="inline-flex items-center space-x-1 md:space-x-3 w-full sm:w-auto">
                    <li aria-current="page">
                        <div className="flex items-center">
                            <Link to={`/station/${stationID}`} className="text-xs lg:text-sm font-medium text-gray-500 hover:text-blue-600 md:ml-2 line-clamp-1">{stationName}</Link>
                        </div>
                    </li>
                </ol>
            )}
        </nav>
    );
    }

export default Breadcrumb;