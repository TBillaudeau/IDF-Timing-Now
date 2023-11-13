import SearchBar from '../components/SearchBar'
import React, { useState } from 'react';
import { lineTypes } from '../components/Trafic'
import referentielDesLignes from '../assets/referentiel-des-lignes.json';
import SearchBar2 from '../components/SearchBar2'

function Research() {
  const [selectedLineType, setSelectedLineType] = useState('');
  const [selectedLineID, setSelectedLineID] = useState('');

  const handleLineTypeDropdownChange = (event) => {
    setSelectedLineType(event.target.value);
  };

  const handleLineIDDropdownChange = (event) => {
    setSelectedLineID(event.target.value);
  };

  function getLineName(lineID) {
    const lineInfo = lineID !== undefined ? referentielDesLignes.find(line => line.fields.id_line === lineID).fields : '';
  
    if (lineInfo.transportmode === 'rail') {
      return lineInfo.shortname_groupoflines;
    } else {
      return lineInfo.transportmode.toUpperCase() + ' ' + lineInfo.name_line;
    }
  }

  return (
    <div className="grid grid-cols-1 gap-2 lg:gap-4 m-2 lg:m-0">
        <div className="bg-white dark:bg-gray-800 p-4 lg:p-6">
            <h1 className="text-xl font-bold dark:text-white pb-4 lg:pb-6">Recherche rapide</h1>
            <SearchBar />
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 lg:p-6">
          <h1 className="text-xl font-bold pb-4 lg:pb-6 dark:text-white">Rechercher un horaire</h1>
          
          <div className='mt-2'>
            <label htmlFor="mode" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Mode de transport</label>
            <select
              id="mode"
              className="bg-gray-50 border border-gray-300 text-gray-900 h-12 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              value={selectedLineType}
              onChange={handleLineTypeDropdownChange}
            >
              <option value="">Sélectionnez un mode de transport</option>
              {Object.entries(lineTypes).map(([lineType, lineIds]) => (
                <option key={lineType} value={lineType}>
                  {lineType}
                </option>
              ))}
            </select>            
          </div>
          <div className='mt-4'>
            <label htmlFor="line" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ligne</label>
              <select
                id="line"
                className="bg-gray-50 border border-gray-300 text-gray-900 h-12 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={selectedLineID}
                onChange={handleLineIDDropdownChange}
              >
                <option value="">Sélectionnez une ligne</option>
                {lineTypes[selectedLineType]?.map((lineId) => (
                  <option key={lineId} value={lineId}>
                    {getLineName(lineId.split(':').pop())}
                  </option>
                ))}
              </select>   
          </div>
          <div className='mt-4'>
            <label htmlFor="station" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Station</label>
            {selectedLineID && (
                <SearchBar2 key={selectedLineID} lineIDparams={selectedLineID.split(':').pop()} />
              )}            
          </div>
        </div>                
    </div>
  );

}

export default Research;