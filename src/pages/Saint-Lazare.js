import StationInfo from '../components/Header';
import TrainInfo from '../components/Timing';

const stations = [
  {
    transportLogo: "TRAIN",
    lineID: "C01740", // LIGNE L
    stationCode: "71370", // Saint Lazare
    stationName: "Paris Saint-Lazare"
  },
  {
    transportLogo: "RER",
    lineID: "C01729", // RER E
    stationCode: "73688", // Haussmann Saint-Lazare
    stationName: "Haussmann Saint-Lazare"
  }
];

function App() {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
      {stations.map((station, index) => (
        <div key={index} className="m-2 sm:m-6">
          <StationInfo transportLogo={station.transportLogo} lineLogo={station.lineID} stationName={station.stationName}/>
          <TrainInfo lineID={station.lineID} stationName={station.stationCode} />
        </div>
      ))}
    </div>
  );
}

export default App;