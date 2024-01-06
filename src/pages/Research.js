import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { lineTypes } from '../components/Trafic';
import SearchBar from '../components/SearchBar';
import { getTransportLogoByLineID, getLineNameByLineID, LineLogoByLineID } from '../utils/dataHelpers';
import ficheHorairesPlans from '../data/fiches-horaires-et-plans.json';

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
          <LineLogoByLineID lineID={line.value.split(":").pop()} className="h-8" />
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
      name: 'Plan réseau régional',
      url: 'https://eu.ftp.opendatasoft.com/stif/PlansRegion/Plans/REGION_GF.pdf'
  },
  {
      id: 'Noctilien',
      name: 'Plan réseau de Nuit',
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
    <div className="grid grid-cols-1 gap-2 lg:m-0">
      <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 grid gap-2">
        <h1 className="text-xl font-bold dark:text-white">Recherche station</h1>
        <SearchBar placeholder="Gare, station, arrêt" type="stop_area" onSelectionChange={setStation} />
      </div>

      <div className="bg-purple-900 p-4 lg:p-6 grid gap-2">
        <h1 className="text-xl font-bold text-white">Recherche itinéraire</h1>
        <SearchBar label="Départ" placeholder="Partir de..." type="" onSelectionChange={setFromStation} />
        <SearchBar label="Arrivée" placeholder="Aller à..." type="" onSelectionChange={setToStation} />
      </div>

      <div className="bg-white dark:text-white dark:bg-gray-800 p-4 lg:p-6">
        <select 
        onChange={(e) => window.open(e.target.value, "_blank")}
        className="bg-gray-50 border border-gray-300 text-gray-900 h-12 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option value="">Plan du réseau en Île-de-France</option>
          {maps.map((map, index) => (
            <option key={index} value={map.url}>
              {map.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 lg:p-6 grid gap-2">
        <h1 className="text-xl font-bold dark:text-white">Recherche ligne</h1>
        <TransportModeSelector selectedMode={selectedLineType} onSelect={handleModeSelect} transportModes={lineTypes} />
        {selectedLineType && (
          <LineOptionsSelector selectedLine={selectedLineID} onSelect={handleLineSelect} lines={lineOptions} />
        )}
      </div>

    </div>
  );
}

export default Research;