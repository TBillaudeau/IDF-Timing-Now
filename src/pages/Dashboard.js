import { useParams } from "react-router-dom";
import TrainInfo1 from '../components/Timing2';
import TrainInfo2 from '../components/Timing4';
import { getStationNameByStationID } from "../utils/dataHelpers";

function Station() {
    const { stationID } = useParams();
    const stopArea = stationID

    return (
        <div className={`absolute left-0 grid lg:grid-cols-[2fr,1fr] grid-cols-1 gap-4 w-full`}>
            <TrainInfo1 line={null} stationName={stopArea} />
            <div className="border-l p-8">
                <h1 className="text-white text-center font-medium bg-slate-800 w-full rounded-t-lg p-3">{getStationNameByStationID(stopArea)}</h1>
                <TrainInfo2 line={null} stationName={stopArea} />
            </div>
        </div>
    );
}

export default Station;