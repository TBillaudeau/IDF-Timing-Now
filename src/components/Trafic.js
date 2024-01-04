import { parse } from 'date-fns';

export const lineTypes = {
  RER: [
    'line:IDFM:C01742', // RERA
    'line:IDFM:C01743', // RERB
    'line:IDFM:C01727', // RERC
    'line:IDFM:C01728', // RERD
    'line:IDFM:C01729', // RERE
  ],
  TRAIN: [
    'line:IDFM:C01737', // TRAINH
    'line:IDFM:C01739', // TRAINJ
    'line:IDFM:C01738', // TRAINK
    'line:IDFM:C01740', // TRAINL
    'line:IDFM:C01736', // TRAINN
    'line:IDFM:C01730', // TRAINP
    'line:IDFM:C01731', // TRAINR
    'line:IDFM:C01741', // TRAINU
  ],
  METRO: [
    'line:IDFM:C01371', // METRO1
    'line:IDFM:C01372', // METRO2
    'line:IDFM:C01373', // METRO3
    'line:IDFM:C01386', // METRO3bis
    'line:IDFM:C01374', // METRO4
    'line:IDFM:C01375', // METRO5
    'line:IDFM:C01376', // METRO6
    'line:IDFM:C01377', // METRO7
    'line:IDFM:C01387', // METRO7bis
    'line:IDFM:C01378', // METRO8
    'line:IDFM:C01379', // METRO9
    'line:IDFM:C01380', // METRO10
    'line:IDFM:C01381', // METRO11
    'line:IDFM:C01382', // METRO12
    'line:IDFM:C01383', // METRO13
    'line:IDFM:C01384', // METRO14
  ],
  TRAM: [
    'line:IDFM:C01389', // TRAM1
    'line:IDFM:C01390', // TRAM2
    'line:IDFM:C01391', // TRAM3a
    'line:IDFM:C01679', // TRAM3b
    'line:IDFM:C01843', // TRAM4
    'line:IDFM:C01684', // TRAM5
    'line:IDFM:C01794', // TRAM6
    'line:IDFM:C01774', // TRAM7
    'line:IDFM:C01795', // TRAM8
    'line:IDFM:C02317', // TRAM9
    'line:IDFM:C02528', // TRAM10
    'line:IDFM:C01999', // TRAM11
    'line:IDFM:C02529', // TRAM12
    'line:IDFM:C02344', // TRAM13
  ],
  BUS: [
    'line:IDFM:C01106', // 70
    'line:IDFM:C01124', // 93
    'line:IDFM:C01169', // 144
    'line:IDFM:C01193', // 172
    'line:IDFM:C01196', // 175
    'line:IDFM:C01201', // 180
    'line:IDFM:C01239', // 241
    'line:IDFM:C01240', // 244
    'line:IDFM:C01409', // N53

    'line:IDFM:C01417', // N15
    'line:IDFM:C01392', // N24
    'line:IDFM:C02600', // N146
    'line:IDFM:C01422', // N153
  ]
};

let cachedDisruptions = null;
let lastCacheTime = null;

async function fetchAllDisruptions() {
  try {
    const response = await fetch('https://api-iv.iledefrance-mobilites.fr/disruptions/v2');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
}


export async function checkDisruptions() {
  const currentTimestamp = new Date();

  // Use cached data if available and cache isn't too old
  if (cachedDisruptions && lastCacheTime && currentTimestamp - lastCacheTime < CACHE_EXPIRATION_TIME) {
    return cachedDisruptions;
  }

  const data = await fetchAllDisruptions();

  if (!data) {
    return {
      loading: false,
      disruptedLines: [],
    };
  }

  const allDisruptedLines = [];

  for (const [lineType, lineIds] of Object.entries(lineTypes)) {
    lineIds.forEach((lineId) => {
      const matchingLine = data.lines.find((line) => line.id === lineId);

      if (matchingLine) {
        const disruptionIds = matchingLine.impactedObjects[0].disruptionIds;

        const matchedDisruption = data.disruptions.find((disruption) =>
          disruptionIds.includes(disruption.id) &&
          disruption.applicationPeriods.some((period) => {
            const beginTimestamp = parse(period.begin, 'yyyyMMdd\'T\'HHmmss', new Date());
            const endTimestamp = parse(period.end, 'yyyyMMdd\'T\'HHmmss', new Date());
            return beginTimestamp <= currentTimestamp && currentTimestamp <= endTimestamp;
          })
        );

        allDisruptedLines.push({
          lineId,
          disrupted: !!matchedDisruption,
          disruption: matchedDisruption || null
        });
      }
    });
  }

  // Update cached data
  cachedDisruptions = {
    loading: false,
    disruptedLines: allDisruptedLines,
  };
  lastCacheTime = currentTimestamp;

  return cachedDisruptions;
}

// Set the cache expiration time (in milliseconds)
const CACHE_EXPIRATION_TIME = 1 * 60 * 1000; // 1 minutes