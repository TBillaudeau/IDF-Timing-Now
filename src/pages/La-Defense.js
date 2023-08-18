import StationInfo from '../components/Header';
import TrainInfo from '../components/Timing';

const stations = [
  {
    transportLogo: "RER",
    lineID: "C01742", // RER A
    stationCode: "71517", // La Défense
    stationName: "La Défense"
  },
  {
    transportLogo: "TRAIN",
    lineID: "C01740", // LIGNE L
    stationCode: "71517", // La Défense
    stationName: "La Défense"
  },
  {
    transportLogo: "TRAM",
    lineID: "C01390", // T2
    stationCode: "71517", // La Défense
    stationName: "La Défense"
  },
  {
    transportLogo: "TRAIN",
    lineID: "C01741", // LIGNE U
    stationCode: "71517", // La Défense
    stationName: "La Défense"
  },
  {
    transportLogo: "METRO",
    lineID: "C01371", // LIGNE 1
    stationCode: "71517", // La Défense
    stationName: "La Défense"
  }
];

function App() {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
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