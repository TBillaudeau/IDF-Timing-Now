import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import TrainInfo from '../components/Timing4';
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
                    const response = await fetch(`https://prim.iledefrance-mobilites.fr/marketplace/navitia/coverage/fr-idf/coord/${position.lng};${position.lat}/stop_areas?distance=400`, {
                        headers: {
                            'apikey': process.env.REACT_APP_IDFM_API_KEY
                        }
                    });
                    const data = await response.json();
                    console.log(data);
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

    const RecenterControl = () => {
        const map = useMap();

        useEffect(() => {
            const control = new L.Control({ position: 'bottomright' });

            control.onAdd = () => {
                const button = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');
                button.innerHTML = '<svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20"><path d="M7 0a7 7 0 0 0-1 13.92V19a1 1 0 1 0 2 0v-5.08A7 7 0 0 0 7 0Zm0 5.5A1.5 1.5 0 0 0 5.5 7a1 1 0 0 1-2 0A3.5 3.5 0 0 1 7 3.5a1 1 0 0 1 0 2Z"/></svg>';
                button.style.cssText = 'background-color: white; padding: 6px; cursor: pointer;';
                button.onclick = () => initialPosition && map.flyTo(initialPosition, 13);
                return button;
            };

            control.addTo(map);

            return () => control.remove();
        }, [map]);

        return null;
    };

    return (
        <div style={{ height: 'calc(100vh - 130px)' }}>
            {initialPosition && (
                <MapContainer className="h-[40%]" whenCreated={setMapInstance => { mapRef.current = setMapInstance; }} center={initialPosition} zoom={13} attributionControl={false}>
                    <TileLayer url={`https://{s}.tile.jawg.io/jawg-streets/{z}/{x}/{y}{r}.png?access-token=${process.env.REACT_APP_JAWG_API_KEY}`} />
                    <CenterMarker />
                    <RecenterControl />
                    <MiddleMarker />
                    {tracesDuReseauFerre.map((line, index) => (
                        line.fields && line.fields.geo_shape && line.fields.geo_shape.coordinates ? (
                            <GeoJSON key={index} data={{
                                type: "LineString",
                                coordinates: line.fields.geo_shape.coordinates
                            }} style={{ color: '#' + line.fields.colourweb_hexa }} />
                        ) : null
                    ))}

                </MapContainer>
            )}
            {stopAreas && (
                <div className="h-[60%] overflow-y-scroll">
                    <div className="space-y-4 border">
                        {stopAreas.map((stopArea, index) => (
                            <>
                                <h1 className="inline-block text-white bg-blue-900 p-2">{stopArea.name}</h1>
                                <TrainInfo key={stopArea.id} line={null} stationName={stopArea.id.split(':').pop()} />
                            </>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Location;