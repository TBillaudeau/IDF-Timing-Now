import React, { useState } from 'react';
import { lineTypes } from '../components/Trafic';
import referentielDesLignes from '../data/referentiel-des-lignes.json';
import SearchBar from '../components/SearchBar';
import SearchBar2 from '../components/SearchBar2';
import { useNavigate } from 'react-router-dom';
import { getTransportLogoByLineID } from '../utils/dataHelpers';

function Research() {
  const [selectedLineType, setSelectedLineType] = useState('');
  const [selectedLineID, setSelectedLineID] = useState('');
  const navigate = useNavigate();

  const handleDropdownChange = (event, setter) => {
    setter(event.target.value);
  };

  const getLineName = (lineID) => {
    const lineInfo = lineID !== undefined ? referentielDesLignes.find(line => line.fields.id_line === lineID).fields : '';
    return lineInfo.transportmode === 'rail' ? lineInfo.shortname_groupoflines : `${lineInfo.transportmode.toUpperCase()} ${lineInfo.name_line}`;
  };

  return (
    <div className="grid grid-cols-1 gap-4 m-2 lg:m-0">
      <div className="bg-white dark:bg-gray-800 p-4 lg:p-6">
        <h1 className="text-xl font-bold dark:text-white">Recherche rapide</h1>
        <SearchBar />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 lg:p-6">
        <h1 className="text-xl font-bold pb-4 dark:text-white">Recherche station • ligne</h1>

        <div className='mt-2'>
          <label htmlFor="mode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mode de transport</label>
          <select
            id="mode"
            className="bg-gray-50 border border-gray-300 text-gray-900 h-12 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedLineType}
            onChange={(event) => {
              handleDropdownChange(event, setSelectedLineType);
              setSelectedLineID('');
            }}
          >
            <option value="">Sélectionnez un mode de transport</option>
            {Object.entries(lineTypes).map(([lineType]) => (
              <option key={lineType} value={lineType}>{lineType}</option>
            ))}
          </select>
        </div>

        <div className='mt-4'>
          <label htmlFor="line" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ligne</label>
          <select
            id="line"
            className="bg-gray-50 border border-gray-300 text-gray-900 h-12 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            value={selectedLineID}
            onChange={(event) => handleDropdownChange(event, setSelectedLineID)}
          >
            <option value="">Sélectionnez une ligne</option>
            {lineTypes[selectedLineType]?.map((lineId) => (
              <option key={lineId} value={lineId}>
                {getLineName(lineId.split(':').pop())}
              </option>
            ))}
          </select>
        </div>

        {selectedLineID && (
          <div className='mt-4'>
            <div className="flex items-center space-x-4">
              <div className="flex-grow w-full">
                <label htmlFor="station" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Station</label>
                <SearchBar2 key={selectedLineID} lineIDparams={selectedLineID.split(':').pop()} />
              </div>
              <div className="flex-grow flex-shrink-0">
                <label htmlFor="line" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ligne</label>
                <button
                  className="h-full bg-violet-700 hover:bg-violet-800 text-white text-sm font-bold py-2 px-4 rounded flex justify-center items-center"
                  onClick={() => navigate(`/line/${selectedLineID.split(':').pop()}`)}
                >
                  <img src={process.env.PUBLIC_URL + `/images/${getTransportLogoByLineID(selectedLineID.split(':').pop())}_LIGHT.svg`} alt={getTransportLogoByLineID(selectedLineID.split(':').pop())} className="h-5 lg:h-10 mr-1" />
                  <img src={process.env.PUBLIC_URL + `/images/${selectedLineID.split(':').pop()}.svg`} alt={selectedLineID.split(':').pop()} className="h-5 lg:h-10 mr-2 lg:mr-4" />
                  <svg class="ml-1 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 15">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 7.5h11m0 0L8 3.786M12 7.5l-4 3.714M12 1h3c.53 0 1.04.196 1.414.544.375.348.586.82.586 1.313v9.286c0 .492-.21.965-.586 1.313A2.081 2.081 0 0 1 15 14h-3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Research;