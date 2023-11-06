import StationInfo from '../components/Header';
import TrainInfo from '../components/Timing';

const stations = [
  {
    transportLogo: "RER",
    lineID: "C01743", // RER B
    stationCode: "71410", // Gare Du Nord
    stationName: "Gare Du Nord"
  },
  {
    transportLogo: "RER",
    lineID: "C01728", // RER D
    stationCode: "71410", // Gare Du Nord
    stationName: "Gare Du Nord"
  },
  {
    transportLogo: "RER",
    lineID: "C01729", // RER E
    stationCode: "478733", // Magenta
    stationName: "Magenta"
  },
  {
    transportLogo: "TRAIN",
    lineID: "C01737", // TRAIN H
    stationCode: "71410", // Gare Du Nord
    stationName: "Gare Du Nord"
  },
  {
    transportLogo: "TRAIN",
    lineID: "C01738", // TRAIN K
    stationCode: "71410", // Gare Du Nord
    stationName: "Gare Du Nord"
  },
  {
    transportLogo: "METRO",
    lineID: "C01374", // LIGNE 4
    stationCode: "71410", // Gare Du Nord
    stationName: "Gare Du Nord"
  }
];

function GareDuNord() {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
      {stations.map((station, index) => (
        <div key={index} className="m-2 sm:m-6">
          <StationInfo lineID={station.lineID} stationID={station.stationCode}/>
          <TrainInfo lineID={station.lineID} stationName={station.stationCode} />
        </div>
      ))}
    </div>
  );

}

export default GareDuNord;