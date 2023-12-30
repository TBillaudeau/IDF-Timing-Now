import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLng } from 'leaflet';
import { useLocation } from "react-router-dom";
import { convertTransportMode } from '../utils/stringUtils';

function JourneyDetails({ journeyData }) {
    // Helper function to format date and time
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        if (!isNaN(date.getTime())) {
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
        }
        return 'Unavailable';
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
            departure: new Date(section.departure_date_time.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6Z")).toLocaleString(),
            arrival: new Date(section.arrival_date_time.replace(/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/, "$1-$2-$3T$4:$5:$6Z")).toLocaleString(),
            duration: Math.ceil(section.duration / 60),
        };
    });

    // Helper function to format the total duration
    const formatDuration = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        return hours === 0 ? `${minutes} min` : `${hours} h ${minutes} min`;
    };

    return (
        <div className="max-w-4xl mx-auto p-2">
            <h2 className="text-2xl font-bold text-center mb-6">Journey Overview</h2>

            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
                <div className="grid grid-cols-2 gap-4">
                    <p><strong>Departure:</strong> {formatDateTime(journeyData.departure_date_time)}</p>
                    <p><strong>Arrival:</strong> {formatDateTime(journeyData.arrival_date_time)}</p>
                    <p><strong>Duration:</strong> {Math.ceil(journeyData.durations.total / 60)} minutes</p>
                    <p><strong>Walking distance:</strong> {journeyData.distances.walking} meters</p>
                    <p><strong>CO2 Emission:</strong> {journeyData.co2_emission.value} {journeyData.co2_emission.unit}</p>
                </div>
            </div>

            {sectionDetails.length > 0 && (
                <div>
                    <h3 className="text-lg font-semibold mb-4">Journey Path</h3>
                    <MapContainer 
                        style={{ height: '400px', width: '100%' }} 
                        center={[
                            (sectionDetails[0].coordinates[0][0] + sectionDetails[sectionDetails.length - 1].coordinates[0][0]) / 2,
                            (sectionDetails[0].coordinates[0][1] + sectionDetails[sectionDetails.length - 1].coordinates[0][1]) / 2
                        ]}
                        zoom={new LatLng(sectionDetails[0].coordinates[0][0], sectionDetails[0].coordinates[0][1]).distanceTo(new LatLng(sectionDetails[sectionDetails.length - 1].coordinates[0][0], sectionDetails[sectionDetails.length - 1].coordinates[0][1])) < 1000 ? 13 : new LatLng(sectionDetails[0].coordinates[0][0], sectionDetails[0].coordinates[0][1]).distanceTo(new LatLng(sectionDetails[sectionDetails.length - 1].coordinates[0][0], sectionDetails[sectionDetails.length - 1].coordinates[0][1])) < 5000 ? 12 : new LatLng(sectionDetails[0].coordinates[0][0], sectionDetails[0].coordinates[0][1]).distanceTo(new LatLng(sectionDetails[sectionDetails.length - 1].coordinates[0][0], sectionDetails[sectionDetails.length - 1].coordinates[0][1])) < 10000 ? 11 : 10}
                        attributionControl={false}
                    >                       
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                        {sectionDetails.map((section, idx) => (
                            <React.Fragment key={idx}>
                                <Polyline positions={section.coordinates} color={section.color} />
                                {section.coordinates[0] && section.duration > 1 && (
                                    <>
                                        {section.lineID && (
                                            <Marker 
                                                position={section.coordinates[0]} 
                                                icon={L.icon({
                                                    iconUrl: process.env.PUBLIC_URL + `/images/${section.lineID.split(":").pop()}.svg`,
                                                    iconSize: [25, ], // size of the icon
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
                const isCorrespondence = section.from && section.to && section.from.name === section.to.name;
                const isWaitingTime = !section.from && !section.to && section.duration;
                const color = section.color;

                return (
                    <div key={section.index} className="bg-white relative flex p-6">
                        <div className="mr-4 w-20">
                            <div style={{backgroundColor: color}} className="absolute top-16 w-1 h-full"></div>
                            <div className="flex items-center mb-2">
                                <img src={process.env.PUBLIC_URL + `/images/${convertTransportMode(section.mode)}${localStorage.theme === 'dark' ? '_LIGHT' : ''}.svg`} alt={convertTransportMode(section.mode)} className="h-5 lg:h-10 mr-1" />
                                {section.lineID && <img src={process.env.PUBLIC_URL + `/images/${section.lineID.split(":").pop()}.svg`} alt={section.lineID.split(":").pop()} className="h-5 lg:h-10 mr-2 lg:mr-4" />}
                            </div>
                        </div>
                        <div>
                            {isCorrespondence ? (
                                <p>Correspondance - {section.duration} minutes</p>
                            ) : isWaitingTime ? (
                                <p>Temps d'attente : {section.duration} minutes</p>
                            ) : (
                                <>
                                    <div className="flex justify-between">
                                        <p>{section.from?.name}</p>
                                        <p>{section.departure}</p>
                                    </div>
                                    <p><strong>Terminus:</strong> {section.terminus}</p>
                                    <div className="flex justify-between">
                                        <p>{section.to?.name}</p>
                                        <p>{section.arrival}</p>
                                    </div>
                                    <p><strong>Duration:</strong> {section.duration} minutes</p>
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