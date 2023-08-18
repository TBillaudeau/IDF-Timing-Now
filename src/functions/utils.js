// Remove "Gare de" or "Gare " from lineDirection
export default function removeGareDePrefix(lineDirection) {
    try {
        const withoutGarePrefix = lineDirection.replace(/^(Gare de |Gare )/i, ''); // Removes "Gare de" or "Gare " (case-insensitive)
        return withoutGarePrefix.charAt(0).toUpperCase() + withoutGarePrefix.slice(1); // Capitalize first letter
    } catch (error) {
        return lineDirection;
    }
};