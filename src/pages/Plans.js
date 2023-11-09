import React, { useEffect, useState } from 'react';
import Plan from '../components/showPlan';

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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 m-2 sm:m-6">
        <div className="bg-white border rounded-lg dark:text-white dark:bg-gray-800 p-4 lg:p-6">
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

            <h1 className="text-xl font-bold mb-4 lg:pb-6">Plans des lignes en Île-de-France</h1>

        </div>
    </div>
  );

}

export default Plans;