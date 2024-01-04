import React, { useState, useEffect } from 'react';
import SVG from 'react-inlinesvg';
import referentielDesLignes from '../../data/referentiel-des-lignes.json';

function LineSVG({ lineID, className }) {
    const [svgSrc, setSvgSrc] = useState('');

    useEffect(() => {
        const item = referentielDesLignes.find(item => item.fields.id_line === lineID);

        if (item) {
            const name = item.fields.name_line;
            if (true) {
                const color = "#" + item.fields.colourweb_hexa;
                const text_color = "#" + item.fields.textcolourweb_hexa;
                const estimatedWidth = name.length * 30;

                setSvgSrc(`
                    <svg viewBox="0 0 ${estimatedWidth} 120">
                        <rect x="0" y="${(120 - 77) / 2}" width="100%" height="77" rx="10" ry="10" fill="${color}" />
                        <text x="50%" y="53%" fill="${text_color}" font-family="Arial" font-size="45" text-anchor="middle" alignment-baseline="middle" font-weight="bold">${name}</text>
                    </svg>
                `);
            }
        }
    }, [lineID]);

    return <SVG src={svgSrc} className={className}/>;
}

export default LineSVG;