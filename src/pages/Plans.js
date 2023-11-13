import React, { useEffect, useState } from 'react';
import Plan from '../components/showPlan';
import SearchBar from '../components/SearchBar'
import { lineTypes } from '../components/Trafic'
import referentielDesLignes from '../assets/referentiel-des-lignes.json';
import { useNavigate, useParams } from 'react-router-dom';

let maps = [
    {
        id: 'Metro',
        name: 'Plan Métro',
        url: 'https://eu.ftp.opendatasoft.com/stif/PlansRegion/Plans/METRO.pdf'
    },
    {
        id: 'Région',
        name: 'Plan du réseau régional des transports',
        url: 'https://eu.ftp.opendatasoft.com/stif/PlansRegion/Plans/REGION_GF.pdf'
    },
    {
        id: 'Noctilien',
        name: 'Plan du réseau de Nuit (schématique)',
        url: 'https://eu.ftp.opendatasoft.com/stif/PlansRegion/Plans/NOCTILIEN_MF.pdf'
    },
];

function Plans() {
    const [selectedLineType, setSelectedLineType] = useState('');
    const [selectedLineID, setSelectedLineID] = useState('');
    const navigate = useNavigate();

    const handleLineTypeDropdownChange = (event) => {
      setSelectedLineType(event.target.value);
    };
  
    const handleLineIDDropdownChange = (event) => {
        navigate(`/line/${event.target.value.split(':').pop()}`);
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 m-2 sm:m-6">
        <div className="bg-white dark:text-white dark:bg-gray-800 p-4 lg:p-6">
            <h1 className="text-xl font-bold mb-4 lg:pb-6">Plan du réseau en Île-de-France</h1>
            {maps.map((map, index) => (
                <div key={index} className="mb-4">
                    <h2 className="text-lg font-medium lg:pb-6">{map.name}</h2>
                    <h2 className="font-bold border-1 mr-4">
                        <a href={map.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 hover:underline">
                        🗺 {map.id}
                        </a>
                        {/* <Plan planURL={map.url} /> */}
                    </h2>
                </div>
            ))}
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 lg:p-6">
          <h1 className="text-xl font-bold pb-4 lg:pb-6 dark:text-white">Plans des lignes en Île-de-France</h1>
          
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
        </div>
        
    </div>
  );

}

export default Plans;