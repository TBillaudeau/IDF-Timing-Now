import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import StationInfo from '../components/Header';
import TrainInfo from '../components/Timing2';
import Breadcrumb from "../components/breadcrumb";
import stationsData from '../data/emplacement-des-gares-idf.json';

function Station() {
    const { stationID } = useParams();
    const stopArea = stationID
    const [lines, setLines] = useState([]);

    useEffect(() => {
        const matchingStations = stationsData.filter(
            (station) => station.fields.id_ref_lda == stopArea
        );
        const matchingLines = matchingStations.map((station) => station.fields.idrefligc);
        setLines(matchingLines);
    }, [stopArea]);

    return (
        <div className={`mx-auto ${lines.length === 1 ? 'grid grid-cols-1 max-w-screen-sm' : 'grid grid-cols-1 max-w-screen-lg'}`}>
            {/* <StationInfo line={null} stationID={stopArea} /> */}
            <TrainInfo line={null} stationName={stopArea} />  
        </div>
    );
}

export default Station;