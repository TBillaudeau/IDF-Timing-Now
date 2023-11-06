import StationInfo from '../components/Header';
import TrainInfo from '../components/Timing';

const stations = [
  {
    transportLogo: "TRAIN",
    lineID: "C01740", // LIGNE L
    stationCode: "71370", // Clichy-Levallois
    stationName: "Clichy-Levallois"
  },
  {
    transportLogo: "METRO",
    lineID: "C01371", // METRO 1
    stationCode: "425779", // Les Sablons
    stationName: "Les Sablons"
  }
];

function ClichyLevallois() {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
      {stations.map((station, index) => (
        <div key={index} className="m-2 sm:m-6">
          <StationInfo lineID={station.lineID} stationID={station.stationCode}/>
          <TrainInfo lineID={station.lineID} stationName={station.stationCode} />
        </div>
      ))}
    </div>
  );
  
}

export default ClichyLevallois;