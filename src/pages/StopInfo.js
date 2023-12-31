import { useParams } from "react-router-dom";
import StationInfo from '../components/stationHeader';
import TrainInfo from '../components/Timing';
import Breadcrumb from "../components/breadcrumb";
import Schedules from "../components/shared/Schedules";
import LineMap from "../components/shared/lineMap";

function StopInfo() {
  const { lineID } = useParams();
  const { stationID } = useParams();

  return (

    <div className='grid grid-cols-1 sm:grid-cols-2 gap-2 my-2 sm:m-6'>
      <div className="xl:col-span-2">
        <Breadcrumb lineID={lineID} stationID={stationID} />
      </div>
      <div className="p-2">
        <StationInfo lineID={lineID} stationID={stationID} />
        <TrainInfo lineID={lineID} stationName={stationID} />
      </div>
      <div className="lg:p-1">
        <Schedules lineID={lineID} stationName={stationID} />
        <LineMap lineID={lineID} stationName={stationID} />
      </div>
    </div>

  );
}

export default StopInfo;