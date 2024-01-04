import React, { useEffect, useState } from 'react';
import tracesDesLignes from '../../data/traces-des-lignes.json';
import tracesDuReseauFerre from '../../data/traces-du-reseau-ferre-idf.json';
import arretsLignes from '../../data/arrets-lignes.json';
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'
import proj4 from 'proj4';
import { GeoJSON } from 'react-leaflet';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const redIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
});

// Define the Lambert II étendu and WGS84 projections
const lambert2e = "+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs";
const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";

function LineMap({ lineID, stationName }) {
    const [trainData, setTrainData] = useState([]);
    const [coordinates, setCoordinates] = useState([]);

    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();

            setTrainData(data);

            const [x, y] = proj4(lambert2e, wgs84, [data.stop.x, data.stop.y]);
            setCoordinates([y, x])
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const url = `https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:${lineID}/stops/stop_area:IDFM:${stationName}/schedules`;
        fetchData(url);
    }, [lineID, stationName]);

    const RecenterControl = () => {
        const map = useMap();

        useEffect(() => {
            const control = new L.Control({ position: 'bottomleft' });

            control.onAdd = () => {
                const button = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');
                button.innerHTML = '<svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20"><path d="M7 0a7 7 0 0 0-1 13.92V19a1 1 0 1 0 2 0v-5.08A7 7 0 0 0 7 0Zm0 5.5A1.5 1.5 0 0 0 5.5 7a1 1 0 0 1-2 0A3.5 3.5 0 0 1 7 3.5a1 1 0 0 1 0 2Z"/></svg>';
                button.style.cssText = 'background-color: white; padding: 6px; cursor: pointer;';
                button.onclick = () => coordinates && map.flyTo(coordinates, 15);
                return button;
            };

            control.addTo(map);

            return () => control.remove();
        }, [map]);

        return null;
    };


    function createMarkers(trainData) {
        const seenStops = new Set();
        return arretsLignes
            .filter(stop => stop.fields.id.split(':').pop() === lineID)
            .map(stop => {
                const isSeen = seenStops.has(stop.fields.stop_name);
                seenStops.add(stop.fields.stop_name);

                return stop.fields.stop_name === trainData.stop.name ? (
                    <Marker key={stop.fields.stop_id} position={[stop.fields.stop_lat, stop.fields.stop_lon]} icon={redIcon}>
                        <Tooltip permanent={!isSeen}>
                            {stop.fields.stop_name}
                        </Tooltip>
                    </Marker>
                ) : (
                    <Marker key={stop.fields.stop_id} position={[stop.fields.stop_lat, stop.fields.stop_lon]}>
                        <Tooltip>
                            {stop.fields.stop_name}
                        </Tooltip>
                    </Marker>
                );
            });
    }

    return (
        <div>
            {trainData.stop && (

                <MapContainer key={coordinates} className="h-72 z-0" center={coordinates} zoom={15} scrollWheelZoom={true} attributionControl={false}>
                    <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />


                    <RecenterControl />

                    {/* <Marker position={coordinates} icon={greenIcon}>
                        <Tooltip permanent>
                            {trainData.stop.name}
                        </Tooltip>
                    </Marker> */}

                    {createMarkers(trainData)}

                    {tracesDuReseauFerre.some(line => line.idrefligc === lineID) ? (
                        tracesDuReseauFerre.filter(line => line.idrefligc === lineID).map((line, index) => (
                            <GeoJSON key={index} data={line.geo_shape.geometry} style={{ color: '#' + line.colourweb_hexa }} />
                        ))
                    ) : (
                        tracesDesLignes.filter(line => line.route_id.split(':').pop() === lineID).map((line, index) => (
                            <GeoJSON key={index} data={line.shape.geometry} style={{ color: '#' + line.route_color }} />
                        ))
                    )}
                </MapContainer>
            )}
        </div>
    );
}

export default LineMap;