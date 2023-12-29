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



    return (
        <div className="max-w-4xl mx-auto p-4">
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
                                {/* {section.markerPosition && (
                                    <Marker position={section.markerPosition}>
                                        <Popup>{`Section ${section.index + 1}: ${section.lineID}`}</Popup>
                                    </Marker>
                                )} */}
                            </React.Fragment>
                        ))}
                    </MapContainer>
                </div>
            )}

            {sectionDetails.map((section) => (
                <div key={section.index} className="bg-white shadow-lg rounded-lg p-6 mb-4">
                    <h3 className="text-lg font-semibold mb-2">Section {section.index + 1}</h3>
                    <img src={process.env.PUBLIC_URL + `/images/${convertTransportMode(section.mode)}${localStorage.theme === 'dark' ? '_LIGHT' : ''}.svg`} alt={convertTransportMode(section.mode)} className="h-5 lg:h-10 mr-1" />
                    <img src={process.env.PUBLIC_URL + `/images/${section.lineID ? section.lineID.split(":").pop() : 'default'}.svg`} alt={section.lineID ? section.lineID.split(":").pop() : 'default'} className="h-5 lg:h-10 mr-2 lg:mr-4" />                    <p><strong>Line:</strong> {section.lineID}</p>
                    <p><strong>Mode:</strong> {section.mode}</p>
                    <p><strong>From (Stop Area ID):</strong> {section.from?.name || 'Unknown'}</p>
                    <p><strong>To (Stop Area ID):</strong> {section.to?.name || 'Unknown'}</p>
                    <p><strong>Terminus:</strong> {section.terminus}</p>
                    <p><strong>Departure:</strong> {section.departure}</p>
                    <p><strong>Arrival:</strong> {section.arrival}</p>
                    <p><strong>Duration:</strong> {section.duration} minutes</p>
                </div>
            ))}

        </div>
    );
}

export default JourneyDetails;