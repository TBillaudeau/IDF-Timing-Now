import React, { useEffect, useState } from 'react';
import tracesDesLignes from '../assets/traces-des-lignes.json';
import tracesDuReseauFerre from '../assets/traces-du-reseau-ferre-idf.json';
import arretsLignes from '../assets/arrets-lignes.json';
import { MapContainer, TileLayer, Marker, Tooltip, Popup } from 'react-leaflet';
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

// Define the Lambert II étendu and WGS84 projections
const lambert2e = "+proj=lcc +lat_1=46.8 +lat_0=46.8 +lon_0=0 +k_0=0.99987742 +x_0=600000 +y_0=2200000 +a=6378249.2 +b=6356515 +towgs84=-168,-60,320,0,0,0,0 +pm=paris +units=m +no_defs";
const wgs84 = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs";


function Schedules({ lineID, stationName }) {
    const [trainData, setTrainData] = useState([]);
    const [coordinates, setCoordinates] = useState([]);
    const [status, setStatus] = useState('');
    const [activeTab, setActiveTab] = useState('current');

    const handleClick = (tab) => {
        setActiveTab(tab);
    };
    
    const fetchData = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();

            setTrainData(data);
            setStatus(data.errorMessage);

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

    // 
    const usedNames = {};
    const markers = arretsLignes
        .filter(stop => stop.fields.id.split(':').pop() === lineID)
        .map((stop, index) => {
            const divIcon = L.divIcon({
                className: 'font-bold bg-red-500 p-1 rounded',
                html: `<span style="display:block; width:120px;">${usedNames[stop.fields.stop_name] ? '' : stop.fields.stop_name}</span>`            });
            usedNames[stop.fields.stop_name] = true;

            return (
                <Marker key={index} position={[stop.fields.stop_lat, stop.fields.stop_lon]} icon={divIcon}>
                    <Popup>
                        {stop.fields.stop_name}
                    </Popup>
                </Marker>
            );
        });

     return (
        <>
            <div className="grid grid-cols-2 gap-4 mb-4">
                {trainData.schedules && trainData.schedules.map((schedule) => (
                    <div key={schedule.routeId} className="">
                        <div className="flex items-center text-white bg-gray-800 shadow-md py-2 px-4 mb-1">
                            <div className="flex-grow overflow-hidden">
                            </div>
                            <div className="ml-1 lg:ml-5 text-right">
                            <p className="text-xs lg:text-sm font-medium">{schedule.from}</p>
                                <p className="text-xs lg:text-sm font-medium">{schedule.to}</p>
                            </div>
                        </div>

                        {schedule.first && (
                            <div className="flex items-center bg-white shadow-md h-8 xl:h-10 p-3 lg:p-4 mb-1">
                                <div className="flex-grow overflow-hidden">
                                    <h2 className='font-medium text-xs lg:text-sm line-clamp-2'>
                                    Premier départ :
                                    </h2>
                                </div>
                                <div className="ml-1 lg:ml-5 text-right">
                                    <p className="text-xs lg:text-sm font-medium">{schedule.first}</p>
                                </div>
                            </div>
                        )}
                        {schedule.last && (
                            <div className="flex items-center bg-white shadow-md h-8 xl:h-10 p-3 lg:p-4 mb-1">
                                <div className="flex-grow overflow-hidden">
                                    <h2 className='font-medium text-xs lg:text-sm line-clamp-2'>
                                    Dernier départ :
                                    </h2>
                                </div>
                                <div className="ml-1 lg:ml-5 text-right">
                                    <p className="text-xs lg:text-sm font-medium">{schedule.last}</p>
                                </div>
                            </div>
                        )}

                         <div className="flex items-center text-white bg-gray-800 shadow-md h-8 xl:h-10 p-2 lg:p-4 mb-1">
                            <div className="flex-grow overflow-hidden">
                                <h2 className='font-medium text-xs lg:text-sm line-clamp-2'>
                                Tranche horaire	
                                </h2>
                            </div>
                            <div className="ml-1 lg:ml-5 text-right">
                                <p className="text-xs lg:text-sm font-medium">Fréquence</p>
                            </div>
                        </div>
                        {schedule.frequencies.map((frequency) => (
                            <div key={frequency.periodStart} className="flex items-center bg-white shadow-md h-8 xl:h-10 p-3 lg:p-4 mb-1">
                                <div className="flex-grow overflow-hidden">
                                    <h2 className='font-medium text-xs lg:text-sm line-clamp-2'>
                                        {frequency.periodStart && frequency.periodEnd
                                            ? `${frequency.periodStart} - ${frequency.periodEnd}`
                                            : frequency.periodStart
                                                ? `Après ${frequency.periodStart}`
                                                : frequency.periodEnd
                                                    ? `Avant ${frequency.periodEnd}`
                                                    : ''
                                        }
                                    </h2>
                                </div>
                                <div className="ml-1 lg:ml-5 text-right">
                                    <p className="text-sm lg:text-base font-semibold">{frequency.first && frequency.last && `${frequency.first} - ${frequency.last} `}{frequency.frequency}<span className="text-xs lg:text-xs">min</span></p>
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            
            </div>

            <div>
            {trainData.stop && (

                <MapContainer key={coordinates} className="h-72 z-0" center={coordinates} zoom={15} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                    />

                    <Marker position={coordinates}>
                        <Tooltip permanent>
                            {trainData.stop.name}
                        </Tooltip>
                    </Marker>
                    
                    {markers}
                    
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
        </>
        );
}

export default Schedules;