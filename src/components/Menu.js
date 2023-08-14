import React, { useEffect, useState } from 'react';
import { parse } from 'date-fns';

function Disruption({ lineId }) {
  const [disruptionDetails, setDisruptionDetails] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch API data
        const response = await fetch('https://api-iv.iledefrance-mobilites.fr/disruptions/v2');
        const data = await response.json();

        // Get the current timestamp
        const currentTimestamp = new Date();

        // Find the line with the given line id
        const matchingLine = data.lines.find((line) => line.id === lineId);

        if (matchingLine) {
          // Get the associated disruptionIds for the line
          const disruptionIds = matchingLine.impactedObjects[0].disruptionIds;

          // Find the disruption based on disruptionIds and applicationPeriods
          const matchedDisruption = data.disruptions.find((disruption) =>
            disruptionIds.includes(disruption.id) &&
            disruption.applicationPeriods.some((period) => {
              const beginTimestamp = parse(period.begin, 'yyyyMMdd\'T\'HHmmss', new Date());
              const endTimestamp = parse(period.end, 'yyyyMMdd\'T\'HHmmss', new Date());

              return beginTimestamp <= currentTimestamp && currentTimestamp <= endTimestamp;
            })
          );

          if (matchedDisruption) {
            setDisruptionDetails({
              cause: matchedDisruption.cause,
              severity: matchedDisruption.severity,
              title: matchedDisruption.title,
              message: matchedDisruption.message
            });
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [lineId]);

  return disruptionDetails
}

export default Disruption;
