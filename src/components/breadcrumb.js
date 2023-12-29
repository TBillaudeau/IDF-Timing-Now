import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { getStationNameByStationID, getLineNameByLineID } from '../utils/dataHelpers';

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

  return (
    <nav className="flex sm:flex-row h-10 pl-4 bg-white dark:bg-gray-800 dark:text-white border-b border-gray-700 dark:border-gray-400" ref={navRef} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3 flex-none">
        {lineID && (
          <li>
            <div className="flex items-center">
              <svg className="w-3 h-3 text-gray-400 xl:mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
              </svg>
              <Link to={`/line/${lineID}`} className="mx-1 text-xs lg:text-sm font-medium hover:text-blue-600 md:ml-2">
                {getLineNameByLineID(lineID)}
              </Link>
              {stationID && (
                <svg className="w-3 h-3 text-gray-400 xl:mx-1 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                </svg>
              )}
            </div>
          </li>
        )}
      </ol>
      {stationID && (
        <ol className="inline-flex items-center space-x-1 md:space-x-3 w-full sm:w-auto">
          <li aria-current="page">
            <div className="flex items-center">
              <Link to={`/station/${stationID}`} className="text-xs lg:text-sm font-medium text-gray-500 hover:text-blue-600 md:ml-2 line-clamp-1">
                {getStationNameByStationID(stationID)}
              </Link>
            </div>
          </li>
        </ol>
      )}
    </nav>
  );
}

export default Breadcrumb;