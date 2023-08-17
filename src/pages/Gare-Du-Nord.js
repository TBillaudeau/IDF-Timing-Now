import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';

function App() {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"C01743"} stationName={"Gare Du Nord"} />
        <TrainInfo lineID={"C01743"} stationName={"71410"} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"C01728"} stationName={"Paris Nord"} />
        <TrainInfo lineID={"C01728"} stationName={"71410"} />
      </div>

      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={"RER"} lineLogo={"C01729"} stationName={"Magenta"} />
        <TrainInfo lineID={"C01729"} stationName={"478733"} />
      </div>

    </div>
  );
}

export default App;