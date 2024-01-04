import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { lineTypes } from '../components/Trafic';
import SearchBar from '../components/SearchBar';
import { getTransportLogoByLineID, getLineNameByLineID } from '../utils/dataHelpers';

// TransportModeSelector Component
function TransportModeSelector({ selectedMode, onSelect, transportModes }) {
  return (
    <div className=''>
      {Object.entries(transportModes).map(([mode, logo]) => (
        <button
          key={mode}
          onClick={() => onSelect(selectedMode === mode ? '' : mode)}
          className={`p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedMode === mode ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
        >
          <img src={process.env.PUBLIC_URL + `/images/${mode}${localStorage.theme === 'dark' ? '_LIGHT' : ''}.svg`} alt={mode} className="h-8" />
        </button>
      ))}
    </div>
  );
}

// LineOptionsSelector Component
function LineOptionsSelector({ selectedLine, onSelect, lines }) {
  return (
    <div className='flex overflow-x-scroll pb-2'>
      {lines.map(line => (
        <button
          key={line.value}
          onClick={() => onSelect(selectedLine === line.value ? '' : line.value)}
          className={`flex-none p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 ${selectedLine === line.value ? 'bg-gray-300 dark:bg-gray-600' : ''}`}
        >
          <img src={process.env.PUBLIC_URL + `/images/${(line.value.split(":").pop())}.svg`} alt={line.value} className="h-8" />
        </button>
      ))}
    </div>
  );
}

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
]

function Research() {
  const [selectedLineType, setSelectedLineType] = useState('');
  const [selectedLineID, setSelectedLineID] = useState('');
  const [station, setStation] = useState(null);
  const [fromStation, setFromStation] = useState(null);
  const [toStation, setToStation] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (station) {
      navigate(`/station/${station.split(':').pop()}`);
    }
  }, [station, navigate]);

  useEffect(() => {
    if (fromStation && toStation) {
      navigate(`/itineraire?from=${fromStation}&to=${toStation}`);
    }
  }, [fromStation, toStation, navigate]);

  const handleModeSelect = (mode) => {
    setSelectedLineType(mode);
    setSelectedLineID('');
  };

  const handleLineSelect = (lineId) => {
    setSelectedLineID(lineId);
    navigate(`/line/${lineId.split(':').pop()}`);
  };

  const lineOptions = lineTypes[selectedLineType]?.map(lineId => ({
    value: lineId,
    label: getLineNameByLineID(lineId.split(':').pop())
  })) || [];

  return (
    <div className="grid grid-cols-1 gap-2 my-2 lg:m-0">
      <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 grid gap-4">
        <h1 className="text-xl font-bold dark:text-white">Recherche station</h1>
        <SearchBar placeholder="Gare, station, arrêt" type="stop_area" onSelectionChange={setStation} />
      </div>

      <div className="bg-purple-800 p-4 lg:p-6 grid gap-4">
        <h1 className="text-xl font-bold text-white">Recherche itinéraire</h1>
        <SearchBar placeholder="Partir de..." type="" onSelectionChange={setFromStation} />
        <SearchBar placeholder="Aller à..." type="" onSelectionChange={setToStation} />
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 grid gap-4">
        <h1 className="text-xl font-bold dark:text-white">Recherche ligne</h1>
        <TransportModeSelector selectedMode={selectedLineType} onSelect={handleModeSelect} transportModes={lineTypes} />
        {selectedLineType && (
          <LineOptionsSelector selectedLine={selectedLineID} onSelect={handleLineSelect} lines={lineOptions} />
        )}
      </div>

      <div className="bg-white dark:text-white dark:bg-gray-800 p-4 lg:p-6">
        <h1 className="text-xl font-bold mb-4 lg:pb-6">Plan du réseau en Île-de-France</h1>
        {maps.map((map, index) => (
          <div key={index} className="mb-4">
            <h2 className="font-bold border-1 mr-4">
              <a href={map.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 hover:underline">
                🗺 {map.name}
              </a>
            </h2>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Research;
