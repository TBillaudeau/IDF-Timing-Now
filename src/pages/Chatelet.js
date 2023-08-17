import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';

function App() {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"C01742"} stationName={"Châtelet-Les Halles"} />
        <TrainInfo lineID={"C01742"} stationName={"474151"} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"C01743"} stationName={"Châtelet-Les Halles"} />
        <TrainInfo lineID={"C01743"} stationName={"474151"} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"C01728"} stationName={"Châtelet-Les Halles"} />
        <TrainInfo lineID={"C01728"} stationName={"474151"} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"METRO"} lineLogo={"C01377"} stationName={"Châtelet"} />
        <TrainInfo lineID={"C01377"} stationName={"71264"} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"METRO"} lineLogo={"C01371"} stationName={"Châtelet"} />
        <TrainInfo lineID={"C01371"} stationName={"71517"} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"METRO"} lineLogo={"C01374"} stationName={"Les Halles"} />
        <TrainInfo lineID={"C01374"} stationName={"73794"} />
      </div>

    </div>
  );
}

export default App;