// Remove "Gare de" or "Gare " from lineDirection
export default function removeGareDePrefix(lineDirection) {
    try {
        const withoutGarePrefix = lineDirection.replace('Gare des', 'Les').replace(/^(Gare de |Gare D'|Gare )/i, ''); // Removes "Gare de" or "Gare " or "Gare D'"  (case-insensitive) & replace "Gare des" with "Les" 
        return withoutGarePrefix.charAt(0).toUpperCase() + withoutGarePrefix.slice(1); // Capitalize first letter
    } catch (error) {
        return lineDirection;
    }
};