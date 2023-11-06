import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import StationInfo from '../components/Header';
import TrainInfo from '../components/Timing';
import Breadcrumb from "../components/breadcrumb";
import stationsData from '../assets/emplacement-des-gares-idf.json';
import Schedules from "../components/Schedules";

import zonesDarrets from '../assets/zones-d-arrets.json';
import referentielDesLignes from '../assets/referentiel-des-lignes.json';

function StopInfo() {
  const { lineID } = useParams();
  const { stationID } = useParams();
  
  return (

    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 m-2 sm:m-6'>
      <div className="xl:col-span-2">
        <Breadcrumb lineID={lineID} stationName={stationID} />
      </div>
        <div className="">
            <StationInfo  lineID={lineID} stationID={stationID} />
            <TrainInfo lineID={lineID} stationName={stationID} />   
        </div>
        <div className="lg:p-1">
            <Schedules lineID={lineID} stationName={stationID} /> 
        </div>
    </div>
    
  );
}

export default StopInfo;