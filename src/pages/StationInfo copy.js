import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import StationInfo from '../components/Header';
import TrainInfo from '../components/Timing2';
import Breadcrumb from "../components/breadcrumb";
import stationsData from '../assets/emplacement-des-gares-idf.json';

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
            {lines.map((line, index) => {
                return (
                    <div key={line} className="grid gap-2 lg:gap-4 m-2 sm:m-6">
                        <Breadcrumb lineID={line} stationID={stopArea} />
                        <div>             
                            <StationInfo lineID={line} stationID={stopArea} />
                            <TrainInfo lineID={line} stationName={stopArea} />  
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default Station;