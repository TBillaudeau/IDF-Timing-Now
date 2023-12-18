import relations from '../data/relations.json';
import zonesDarrets from '../data/zones-d-arrets.json';
import referentielDesLignes from '../data/referentiel-des-lignes.json';
import stationsData from '../data/emplacement-des-gares-idf.json';

export const getStopIdByLineId = (lineId) => {
    // Logic to search the data referential and return the stop ID
};

// Function to get the station name
const getStationName = () => {
const stations = zonesDarrets.filter((station) => station.fields.zdcid === stationID);
return (
    stations.find((station) => station.fields.zdatype === 'railStation')?.fields.zdaname ||
    stations.find((station) => station.fields.zdatype === 'metroStation')?.fields.zdaname ||
    stations.find((station) => station.fields.zdatype === 'onstreetTram')?.fields.zdaname ||
    (stations.find((station) => station.fields.zdatype === 'onstreetBus')?.fields.zdaname +
    ' (' +
    stations.find((station) => station.fields.zdatype === 'onstreetBus')?.fields.zdatown +
    ')')
);
};

// Function to get the line name
const getLineName = () => {
const lineInfo = referentielDesLignes.find((line) => line.fields.id_line === lineID).fields;
return lineInfo.transportmode === 'rail'
    ? lineInfo.shortname_groupoflines
    : lineInfo.transportmode.toUpperCase() + ' ' + lineInfo.name_line;
};


// Get transportLogo from lineID
const station = referentielDesLignes.find(station => station.fields.id_line === lineID);
let transportLogo = station.fields.transportmode;
if (transportLogo === 'rail') {
    const networkName = station.fields.networkname;
    transportLogo = networkName === 'RER' ? 'rer' : networkName === 'Transilien' ? 'train' : 'cable';
} 
transportLogo = transportLogo.toUpperCase();

// Get stationName from stationID
var stations = stationID !== undefined ? zonesDarrets.filter(station => station.fields.zdcid === stationID) : [];
var stationName = stations.find(station => station.fields.zdatype === 'railStation')?.fields.zdaname
    || stations.find(station => station.fields.zdatype === 'metroStation')?.fields.zdaname  
    || stations.find(station => station.fields.zdatype === 'onstreetTram')?.fields.zdaname
    || stations.find(station => station.fields.zdatype === 'onstreetBus')?.fields.zdaname + ' (' + stations.find(station => station.fields.zdatype === 'onstreetBus')?.fields.zdatown + ')';
