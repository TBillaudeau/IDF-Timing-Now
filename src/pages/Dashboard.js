import { useParams } from "react-router-dom";
import TrainInfo1 from '../components/Timing2';
import TrainInfo2 from '../components/Timing4';

function Station() {
    const { stationID } = useParams();
    const stopArea = stationID

    return (
        <div className={`absolute left-0 grid lg:grid-cols-[2fr,1fr] grid-cols-1 gap-4 w-full`}>
            <TrainInfo1 line={null} stationName={stopArea} />
            <TrainInfo2 line={null} stationName={stopArea} />
        </div>
    );
}

export default Station;