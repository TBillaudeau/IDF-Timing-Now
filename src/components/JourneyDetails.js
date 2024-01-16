import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet';
import { useLocation } from "react-router-dom";
import { convertTransportMode } from '../utils/stringUtils';
import TrainInfo from '../components/Timing';
import relations from '../data/relations.json';
import { getLineColorByLineID, LineLogoByLineID, getTransportByLineID } from '../utils/dataHelpers';
import ReactDOMServer from 'react-dom/server';

function JourneyDetails({ journeyData }) {
    const [showStops, setShowStops] = useState({});

    // Toggle showStops for a section
    const toggleStops = (sectionId) => {
        setShowStops(prevState => ({ ...prevState, [sectionId]: !prevState[sectionId] }));
    };


    // Extract coordinates and create markers for each section
    const sectionDetails = journeyData.sections.map((section, index) => {
        const coordinates = section.geojson?.coordinates.map(([lng, lat]) => [lat, lng]) || [];
        const color = section.display_informations && section.display_informations.color ? `#${section.display_informations.color}` : '#333333'; // Default to a dark color if not specified
        const markerPosition = coordinates[0] || null; // First coordinate as marker position

        return {
            index,
            coordinates,
            color,
            markerPosition,
            lineName: section.display_informations?.code || `Line ${index + 1}`,
            lineID: section.links[1]?.id,
            from: section.from,
            to: section.to,
            terminus: section.display_informations?.direction || 'Unknown',
            mode: section.display_informations?.commercial_mode || section.mode,
            stop_date_times: section.stop_date_times ? section.stop_date_times.slice(1, -1) : [],
            best_boarding_positions: section.best_boarding_positions,
            departure: new Date(section.departure_date_time.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6")).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            arrival: new Date(section.arrival_date_time.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6")).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            duration: Math.floor(section.duration / 60),
        };
    });

    const dx = sectionDetails[0].coordinates[0][0] - ((sectionDetails[0].coordinates[0][0] + sectionDetails[sectionDetails.length - 1].coordinates[0][0]) / 2);
    const dy = sectionDetails[0].coordinates[0][1] - ((sectionDetails[0].coordinates[0][1] + sectionDetails[sectionDetails.length - 1].coordinates[0][1]) / 2);
    const distance = Math.sqrt(dx * dx + dy * dy);
    const zoom = Math.floor(8 - Math.log(distance) / Math.log(2));

    const RecenterControl = () => {
        const map = useMap();

        useEffect(() => {
            const control = new L.Control({ position: 'bottomright' });

            control.onAdd = () => {
                const button = L.DomUtil.create('button', 'leaflet-bar leaflet-control leaflet-control-custom');
                button.innerHTML = '<svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20"><path d="M7 0a7 7 0 0 0-1 13.92V19a1 1 0 1 0 2 0v-5.08A7 7 0 0 0 7 0Zm0 5.5A1.5 1.5 0 0 0 5.5 7a1 1 0 0 1-2 0A3.5 3.5 0 0 1 7 3.5a1 1 0 0 1 0 2Z"/></svg>';
                button.style.cssText = 'background-color: white; padding: 6px; cursor: pointer;';
                button.onclick = () => map.flyTo([
                    (sectionDetails[0].coordinates[0][0] + sectionDetails[sectionDetails.length - 1].coordinates[0][0]) / 2,
                    (sectionDetails[0].coordinates[0][1] + sectionDetails[sectionDetails.length - 1].coordinates[0][1]) / 2
                ], zoom);
                return button;
            };

            control.addTo(map);

            return () => control.remove();
        }, [map]);

        return null;
    };

    return (
        <div className="max-w-4xl mx-auto">
            {sectionDetails.length > 0 && (
                <div>
                    <MapContainer
                        className="z-10 h-96"
                        center={[
                            (sectionDetails[0].coordinates[0][0] + sectionDetails[sectionDetails.length - 1].coordinates[0][0]) / 2,
                            (sectionDetails[0].coordinates[0][1] + sectionDetails[sectionDetails.length - 1].coordinates[0][1]) / 2
                        ]}
                        zoom={zoom}
                        attributionControl={false}
                        zoomControl={false}
                    >
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                        <RecenterControl />

                        {sectionDetails.map((section, idx) => (
                            <React.Fragment key={idx}>
                                <Polyline positions={section.coordinates} color={section.color} dashArray={section.mode === 'walking' ? '5, 5' : null}
                                />
                                {section.coordinates[0] && section.duration > 1 && (
                                    <>
                                        {section.lineID && (
                                            <Marker
                                                position={section.coordinates[0]}
                                                icon={L.divIcon({
                                                    className: 'my-div-icon',
                                                    html: ReactDOMServer.renderToString(<LineLogoByLineID lineID={section.lineID.split(":").pop()} className="h-5" />),
                                                    iconSize: [25,], // size of the icon
                                                    iconAnchor: [10, 20], // point of the icon which will correspond to marker's location
                                                    popupAnchor: [0, -40] // point from which the popup should open relative to the iconAnchor
                                                })}
                                            />
                                        )}
                                    </>
                                )}
                            </React.Fragment>
                        ))}
                    </MapContainer>
                </div>
            )}

            {sectionDetails.map((section, index) => {
                const isCorrespondence = section.from && section.to && section.from?.stop_point?.stop_area?.name === section.to?.stop_point?.stop_area?.name;
                const isWaitingTime = !section.from && !section.to && section.duration;
                const color = section.color;

                if (section.mode === 'walking' && section.duration === 0) {
                    return null;
                }

                return (
                    <div key={section.index} className="bg-white relative flex p-4">
                        <div className="w-10 flex justify-center mr-4 flex-wrap">                            <div
                            style={{
                                background: section.mode === 'walking' || section.mode === undefined
                                    ? `linear-gradient(${color} 50%, transparent 50%)`
                                    : color,
                                backgroundSize: '1px 10px'
                            }}
                            className="absolute w-1 h-full z-10 top-6"
                        ></div>
                            <div className="flex flex-col items-center space-y-2 mb-2 absolute z-20">
                                {section.mode !== undefined && !isCorrespondence ? (
                                    <img
                                        src={process.env.PUBLIC_URL + `/images/${convertTransportMode(section.mode)}.svg`}
                                        alt={convertTransportMode(section.mode)}
                                        className="bg-white h-6 lg:h-10" />
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 19 30" className="h-6 lg:h-10">
                                        <path fill="#fff" stroke="#000" stroke-width="2.5" d="M1.75 9a7.75 7.75 0 1 1 15.5 0v12a7.75 7.75 0 0 1-15.5 0V9Z"></path>
                                    </svg>
                                )}
                                {section.lineID && (
                                    // <img
                                    //     src={process.env.PUBLIC_URL + `/images/${section.lineID.split(":").pop()}.svg`}
                                    //     alt={section.lineID.split(":").pop()}
                                    //     className="h-6 lg:h-10"
                                    // />
                                    <LineLogoByLineID lineID={section.lineID.split(":").pop()} className="h-6 lg:h-10" />
                                )}
                            </div>
                        </div>

                        <div className="space-y-6 w-full">
                            {isCorrespondence ? (
                                <p className='text-sm'>{section.duration} minutes de correspondance</p>
                            ) : isWaitingTime ? (
                                <p className='text-sm'>{section.duration} minutes d'attente</p>
                            ) : (
                                <>
                                    <div>
                                        <div className="flex justify-between font-bold">
                                            <p>{section.from?.stop_point?.stop_area?.name || section.from?.name}</p>
                                            <p>{section.departure}</p>
                                        </div>
                                        {section.terminus !== 'Unknown' && (
                                            <div className="flex items-center text-xs">
                                                <svg className="w-2 h-2 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                </svg>
                                                {section.terminus}
                                            </div>
                                        )}
                                    </div>
                                    {section.mode !== 'walking' && section.mode !== undefined && (
                                        <TrainInfo
                                            lineID={section.lineID.split(':').pop()}
                                            stationName={
                                                (() => {
                                                    try {
                                                        let relation = relations.find(relation => relation.fields.arrid === section.from.id.split(":").pop());
                                                        console.log(relation);
                                                        if (!relation) {
                                                            relation = relations.find(relation => relation.fields.zdaid === section.from.id.split(":").pop());
                                                        }
                                                        return relation ? relation.fields.zdcid : '';
                                                    } catch (error) {
                                                        console.error('Error accessing zdcid:', error);
                                                        return '';
                                                    }
                                                })()
                                            }
                                            limit={5}
                                        />
                                    )}
                                    {section.best_boarding_positions && (
                                        <div>
                                            <div className="flex items-center text-xs">
                                                <svg className="w-2 h-2 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                                </svg>
                                                Positionnement dans la rame 
                                            </div>
                                            <div className="flex w-48 h-8">
                                                {['back', 'middle', 'front'].map((pos, index) => {
                                                    const isSelected = section.best_boarding_positions.includes(pos);
                                                    const color = isSelected ? `#${getLineColorByLineID(section.lineID.split(':').pop())}` : '#D1D5DB'; // #D1D5DB is equivalent to bg-gray-300 in Tailwind CSS
                                                    return (
                                                        <div key={index} className="flex-1 p-2 m-1 border-2 rounded" style={{ backgroundColor: color }}>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex items-center space-x-2 text-gray-500 text-sm">
                                        <p>{section.stop_date_times.length + 1} arrêts | {section.duration} min</p>

                                        <button onClick={() => toggleStops(section.id)}>
                                            {showStops ? (
                                                <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" />
                                                </svg>
                                            ) : (
                                                <svg class="w-2 h-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 8">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                                                </svg>
                                            )}
                                        </button>
                                    </div>
                                    {showStops[section.id] && (
                                        <ul>
                                            {section.stop_date_times.map((stop, index) => (
                                                <li key={index}>{stop.stop_point.name}</li>
                                            ))}
                                        </ul>
                                    )}
                                    <div className="flex justify-between font-bold">
                                        <p>{section.to?.stop_point?.stop_area?.name || section.to?.name}</p>
                                        <p>{section.arrival}</p>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}

        </div>
    );
}

export default JourneyDetails;