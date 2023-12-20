import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.locatecontrol' // Import plugin
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
import LocateControl from 'leaflet.locatecontrol';
import TrainInfo from '../components/Timing2';
import tracesDuReseauFerre from '../data/traces-du-reseau-ferre-idf.json';
import { GeoJSON } from 'react-leaflet';
import arretsLignes from '../data/arrets-lignes.json';

const Location = () => {
    const [initialPosition, setInitialPosition] = useState(null);
    const [stopAreas, setStopAreas] = useState('');
    const mapRef = useRef();

    const CenterMarker = () => {
        const [position, setPosition] = useState(null);
        useMapEvents({
            moveend: (e) => {
                const newPos = e.target.getCenter();
                setPosition(newPos);
            }
        });

        useEffect(() => {
            if (position) {
                const fetchData = async () => {
                    const response = await fetch(`https://api.navitia.io/v1/coverage/fr-idf/coord/${position.lng}%3B${position.lat}/stop_areas?distance=400`, {
                        headers: {
                            'Authorization': '75dc3bdf-f426-40b1-8292-980b14cb9fff'
                        }
                    });
                    const data = await response.json();
                    setStopAreas(data.stop_areas);
                };
                fetchData();
            }
        }, [position]);

        return null;
    };

    const MiddleMarker = () => {
        return (
            <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[1000] bg-violet-700 rounded-full p-2 border-4 border-white" />
        )
    };

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            setInitialPosition([position.coords.latitude, position.coords.longitude]);
        }, (error) => {
            console.error("Error occurred while getting geolocation: ", error);
            if (!initialPosition) {
                setInitialPosition([48.8598, 2.3470]);
            }
        });
    }, []);

    useEffect(() => {
        if (mapRef.current) {
            const locateControl = new LocateControl({
                position: 'topright',
                flyTo: true,
            });
            locateControl.addTo(mapRef.current.leafletElement);
        }
    }, [mapRef]);

    return (
        <div className="h-[80vh]">
            {initialPosition && (
                <MapContainer className="h-[50%]" whenCreated={setMapInstance => { mapRef.current = setMapInstance; }} center={initialPosition} zoom={13}>
                    <TileLayer url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png" />
                    <CenterMarker />
                    <MiddleMarker />
                    {tracesDuReseauFerre.map((line, index) => (
                        <GeoJSON key={index} data={line.geo_shape.geometry} style={{ color: '#' + line.colourweb_hexa }} />
                    ))}
                </MapContainer>
            )}
            {stopAreas && (
                <div className="h-[50%] overflow-y-scroll">
                    {stopAreas.map((stopArea, index) => (
                        <TrainInfo line={null} stationName={stopArea.id.split(':').pop()} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Location;