import React, { useState, useEffect } from 'react';
import { lineTypes } from '../components/Trafic'; // Import your lineTypes constant here

const API_URL = 'https://data.iledefrance-mobilites.fr/explore/embed/dataset/arrets-lignes/table/';

const DeparturesPage = () => {
  const [selectedLine, setSelectedLine] = useState('');
  const [selectedStops, setSelectedStops] = useState([]);
  const [departures, setDepartures] = useState([]);

  const handleLineChange = (event) => {
    const selectedLine = event.target.value;
    setSelectedLine(selectedLine);
    setSelectedStops([]);
    setDepartures([]);
  };

  const handleStopChange = async (event) => {
    const selectedStop = event.target.value;

    try {
      const response = await fetch(`${API_URL}`);
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const departuresData = processDeparturesResponse(data);
        setDepartures(departuresData);
      } else {
        console.error('Error fetching departures');
      }
    } catch (error) {
      console.error('Error fetching departures:', error);
    }
  };

  const processDeparturesResponse = (data) => {
    // Process the response to extract departure information
    // Modify this function according to the structure of the API response
    return data.map((entry) => ({
      departure_time: entry.departure_time,
      // Extract other relevant departure information
    }));
  };

  useEffect(() => {
    if (selectedLine) {
      // Find the stops associated with the selected line
      const lineType = selectedLine.split(':')[2]; // Extracting the line type from the selectedLine
      const associatedStops = lineTypes[lineType] || [];
      setSelectedStops(associatedStops);
    }
  }, [selectedLine]);

  return (
    <div>
      <h1>Train Departures</h1>
      <div>
        <label>Select Line: </label>
        <select value={selectedLine} onChange={handleStopChange}>
          <option value="">Select a line</option>
          {Object.keys(lineTypes).map((lineType) => (
            <optgroup key={lineType} label={lineType}>
              {lineTypes[lineType].map((line) => (
                <option key={line} value={line}>
                  {line}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>
      {selectedLine && (
        <div>
          <label>Select Stop: </label>
          <select onChange={handleStopChange}>
            <option value="">Select a stop</option>
            {selectedStops.map((stop) => (
              <option key={stop} value={stop}>
                {stop}
              </option>
            ))}
          </select>
        </div>
      )}
      {departures.length > 0 && (
        <div>
          <h2>Departures</h2>
          <ul>
            {departures.map((departure, index) => (
              <li key={index}>{departure.departure_time}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeparturesPage;
