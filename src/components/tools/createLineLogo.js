import React, { useState, useEffect } from 'react';
import SVG from 'react-inlinesvg';
import referentielDesLignes from '../../data/referentiel-des-lignes.json';

function LineSVG({ lineID, className }) {
    const [svgSrc, setSvgSrc] = useState('');

    useEffect(() => {
        const item = referentielDesLignes.find(item => item.fields.id_line === lineID);

        if (item) {
            const name = item.fields.shortname_line;
            const color = "#" + item.fields.colourweb_hexa;
            const text_color = "#" + item.fields.textcolourweb_hexa;

            // Define the maximum number of characters per line
            const maxCharsPerLine = 8;

            // Split the name into words
            const words = name.split(' ');

            // Group the words into lines of 10 characters maximum
            let lines = [''];
            let lineIndex = 0;
            for (let i = 0; i < words.length; i++) {
                if (lines[lineIndex].length + words[i].length <= maxCharsPerLine) {
                    lines[lineIndex] += (lines[lineIndex].length > 0 ? ' ' : '') + words[i];
                } else if (lineIndex < 2) {
                    lines[++lineIndex] = words[i];
                } else {
                    break;
                }
            }

            // Calculate the estimated width based on the longest line
            let estimatedWidth = Math.max(Math.max(...lines.map(line => line.length)) * 30, 120);

            // Calculate the estimated height based on the number of lines
            let estimatedHeight = lines.length > 1 ? 120 + (lines.length - 1) * 60 : 120;

            // Calculate the y position of the text based on the number of lines
            let textYPosition = lines.length > 2 ? "35%" : lines.length > 1 ? "40%" : "60%";
            
            // Calculate the y position of the rectangle based on the number of lines
            let rectYPosition = lines.length > 1 ? "0" : "20%";

            let svgText = `<tspan x="50%">${lines[0]}</tspan>`;
            for (let i = 1; i < lines.length; i++) {
                svgText += `<tspan x="50%" dy="1.2em">${lines[i]}</tspan>`;
            }

            setSvgSrc(`
                <svg viewBox="0 0 ${estimatedWidth} ${estimatedHeight}">
                    <rect x="0" y="${rectYPosition}" width="100%" height="${lines.length > 1 ? estimatedHeight : 70}" rx="10" ry="10" fill="${color}" />
                    <text x="50%" y="${textYPosition}" fill="${text_color}" font-family="'Roboto Mono', monospace" font-size="40" text-anchor="middle" alignment-baseline="middle" font-weight="bold">
                    ${svgText}
                    </text>
                </svg>
            `);
        }
    }, [lineID]);

    return <SVG src={svgSrc} className={className}/>;
}

export default LineSVG;