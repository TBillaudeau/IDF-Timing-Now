import StationInfo from '../components/Header';
import TrainInfo from '../components/Timing';

const stations = [
  {
    transportLogo: "RER",
    lineID: "C01742", // RER A
    stationCode: "474151", // Châtelet-Les Halles
    stationName: "Châtelet-Les Halles"
  },
  {
    transportLogo: "RER",
    lineID: "C01743", // RER B
    stationCode: "474151", // Châtelet-Les Halles
    stationName: "Châtelet-Les Halles"
  },
  {
    transportLogo: "RER",
    lineID: "C01728", // RER D
    stationCode: "474151", // Châtelet-Les Halles
    stationName: "Châtelet-Les Halles"
  },
  {
    transportLogo: "METRO",
    lineID: "C01377", // LIGNE 7
    stationCode: "71264", // Châtelet
    stationName: "Châtelet"
  },
  {
    transportLogo: "METRO",
    lineID: "C01371", // LIGNE 1
    stationCode: "71517", // Châtelet
    stationName: "Châtelet"
  },
  {
    transportLogo: "METRO",
    lineID: "C01374", // LIGNE 4
    stationCode: "73794", // Les Halles
    stationName: "Les Halles"
  }
];

function Chatelet() {

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

export default Chatelet;