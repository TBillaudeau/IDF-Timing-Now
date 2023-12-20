import React from 'react';
import { useEffect, useState } from 'react';

function JourneyDetails({ journeyData }) {
    const formatDateTime = (dateTime) => {
        const date = new Date(dateTime);
        return date.toLocaleTimeString();
    };

    return (
        <div className="journey-details">
            <h2>Journey Details</h2>
            {journeyData.sections.map((section, index) => (
                <div key={index} className="section">
                    <h3>Section {index + 1}</h3>
                    <p><strong>Mode:</strong> {section.display_informations ? section.display_informations.commercial_mode : section.mode}</p>
                    <p><strong>From:</strong> {section.from.name}</p>
                    <p><strong>To:</strong> {section.to.name}</p>
                    <p><strong>Departure:</strong> {formatDateTime(section.departure_date_time)}</p>
                    <p><strong>Arrival:</strong> {formatDateTime(section.arrival_date_time)}</p>
                    <p><strong>Duration:</strong> {Math.ceil(section.duration / 60)} minutes</p>
                </div>
            ))}
        </div>
    );
}

function Trip() {
    const [trainData, setTrainData] = useState([]);

    useEffect(() => {
        const fetchLineData = async () => {
          const response = await fetch(`https://prim.iledefrance-mobilites.fr/marketplace/navitia/coverage/fr-idf/journeys?from=stop_area%3AIDFM%3A70845&to=admin%3Afr%3A94076`, {
            headers: {
              'Accept': 'application/json',
              'apikey': process.env.REACT_APP_IDFM_API_KEY
            }
          })
          const data = await response.json();
          console.log(1);
          console.log(data);
          console.log(2);
          setTrainData(data);
        };
    
        fetchLineData();
      });

    return (
        <>
        {/* <JourneyDetails journeyData={trainData} /> */}
        </>
    );
}

export default Trip;