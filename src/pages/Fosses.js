import StationInfo from '../components/Header';
import TrainInfo from '../components/Timing';

const stations = [
  {
    transportLogo: "RER",
    lineID: "C01728", // RER D
    stationCode: "69450", // Survilliers - Fosses
    stationName: "Survilliers - Fosses"
  },
  {
    transportLogo: "RER",
    lineID: "C01742", // RER A
    stationCode: "70956", // Nanterre Université
    stationName: "Nanterre Université"
  },
  {
    transportLogo: "BUS",
    lineID: "C02600", // N146
    stationCode: "69450", // Survilliers - Fosses
    stationName: "Survilliers - Fosses"
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