import StationInfo from '../components/Header';
import TrainInfo from '../components/Timing';

const stations = [
  {
    transportLogo: "METRO",
    lineID: "C01377", // METRO 7
    stationCode: "70143", // Villejuif - Louis Aragon
    stationName: "Villejuif - Louis Aragon"
  },
  {
    transportLogo: "BUS",
    lineID: "C01201", // 180
    stationCode: "70143", // Villejuif - Louis Aragon
    stationName: "Villejuif - Louis Aragon"
  },
  {
    transportLogo: "BUS",
    lineID: "C01193", // 172
    stationCode: "415734", // Villejuif - Louis Aragon
    stationName: "Villejuif - Louis Aragon"
  },
  {
    transportLogo: "TRAM",
    lineID: "C01774", // T7
    stationCode: "70143", // Villejuif - Louis Aragon
    stationName: "Villejuif - Louis Aragon"
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