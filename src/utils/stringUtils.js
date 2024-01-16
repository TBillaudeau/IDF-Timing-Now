export const removeAccents = (str) => {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
};

export const removeGareDePrefix = (lineDirection) => {
    const excludedStations = ["Gare de Lyon", "Gare du Nord", "Gare Saint-Lazare", "Gare Montparnasse", "Gare d'Austerlitz"];

    try {
        if (excludedStations.some(station => lineDirection.includes(station))) {
            return lineDirection;
        }
        const withoutGarePrefix = lineDirection.replace('Gare des', 'Les').replace(/^(Gare de |Gare D'|Gare )/i, ''); // Removes "Gare de" or "Gare " or "Gare D'"  (case-insensitive) & replace "Gare des" with "Les" 
        return withoutGarePrefix.charAt(0).toUpperCase() + withoutGarePrefix.slice(1); // Capitalize first letter
    } catch (error) {
        return lineDirection;
    }
};

const getLineIDfromStringID = (stringID) => {
    return stringID.replace(/:$/, '').split(':').pop();
};

export const convertTransportMode = (mode) => {
    switch (mode) {
        case 'Transilien':
            return 'TRAIN';
        case 'Train Transilien':
            return 'TRAIN';
        case 'Métro':
            return 'METRO';
        case 'Tramway':
            return 'TRAM';
        case 'walking':
            return 'WALKING';
        case 'TER':
            return 'TRAIN';
        default:
            return mode;
    }
};