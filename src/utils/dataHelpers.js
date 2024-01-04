import zonesDarrets from '../data/zones-d-arrets.json';
import referentielDesLignes from '../data/referentiel-des-lignes.json';
import LineSVG from '../components/tools/createLineLogo';
import React from 'react';

// Function to get the station name
export const getStationNameByStationID = (stationID) => {
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
export const getLineNameByLineID = (lineID) => {
    const lineInfo = referentielDesLignes.find((line) => line.fields.id_line === lineID).fields;
    return lineInfo.transportmode === 'rail'
        ? lineInfo.shortname_groupoflines
        : lineInfo.transportmode.toUpperCase() + ' ' + lineInfo.name_line;
};

// Function to get the lineID
export const getTransportByLineID = (lineID) => {
    const station = referentielDesLignes.find(station => station.fields.id_line === lineID);
    let transportLogo = station.fields.transportmode;
    if (transportLogo === 'rail') {
        const networkName = station.fields.networkname;
        transportLogo = networkName === 'RER' ? 'rer' : networkName === 'Transilien' ? 'train' : 'cable';
    }
    return transportLogo.toUpperCase();
};

// Function to get the line logo
export const LineLogoByLineID = ({ lineID }) => {
    const [hasError, setHasError] = React.useState(false);

    const handleError = () => {
        setHasError(true);
    };

    if (hasError) {
        return <LineSVG lineID={lineID} className="h-6 lg:h-10 pl-1 lg:pl-0 mr-2 lg:mr-4" />;
    } else {
        return <img src={`${process.env.PUBLIC_URL}/images/${lineID}.svg`} alt={lineID} className="h-5 lg:h-10 mr-2 lg:mr-4" onError={handleError} />;
    }
};

// Function to get the line color
export const getLineColorByLineID = (lineID, gradient=false) => {
    var lineColor = referentielDesLignes.find(line => line.fields.id_line == lineID)?.fields.colourweb_hexa;

    function gradientColor(color, blendWith, alpha) {
        const [r1, g1, b1] = [parseInt(color.slice(0, 2), 16), parseInt(color.slice(2, 4), 16), parseInt(color.slice(4, 6), 16)];
        const [r2, g2, b2] = [parseInt(blendWith.slice(0, 2), 16), parseInt(blendWith.slice(2, 4), 16), parseInt(blendWith.slice(4, 6), 16)];

        const r = Math.round(r1 * (1 - alpha) + r2 * alpha);
        const g = Math.round(g1 * (1 - alpha) + g2 * alpha);
        const b = Math.round(b1 * (1 - alpha) + b2 * alpha);

        return ((r << 16) + (g << 8) + b).toString(16).padStart(6, '0');
    }

    return gradient ? gradientColor(lineColor, 'ffffff', 0.5) : lineColor;
}