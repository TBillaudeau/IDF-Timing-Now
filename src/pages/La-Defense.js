import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';

function App() {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"C01742"} stationName={"La Défense"} />
        <TrainInfo lineID={"C01742"} stationName={"71517"} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"TRAIN"} lineLogo={"C01740"} stationName={"La Défense"} />
        <TrainInfo lineID={"C01740"} stationName={"71517"} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"TRAM"} lineLogo={"C01390"} stationName={"La Défense"} />
        <TrainInfo lineID={"C01390"} stationName={"71517"} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"TRAIN"} lineLogo={"C01741"} stationName={"La Défense"} />
        <TrainInfo lineID={"C01741"} stationName={"71517"} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"METRO"} lineLogo={"C01371"} stationName={"La Défense"} />
        <TrainInfo lineID={"C01371"} stationName={"71517"} />
      </div>

    </div>
  );
}

export default App;