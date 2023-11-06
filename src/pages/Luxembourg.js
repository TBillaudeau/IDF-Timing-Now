import StationInfo from '../components/Header';
import TrainInfo from '../components/Timing';

const stations = [
  {
    transportLogo: "TRAIN",
    lineID: "C01740", // Ligne L
    stationCode: "70829", // Suresnes Mont-Valérien
    stationName: "Suresnes Mont-Valérien"
  },
  {
    transportLogo: "TRAM",
    lineID: "C01390", // T2
    stationCode: "70845", // Belvédère
    stationName: "Belvédère"
  },
  {
    transportLogo: "TRAIN",
    lineID: "C01741", // Ligne U
    stationCode: "70829", // Suresnes Mont-Valérien
    stationName: "Suresnes Mont-Valérien"
  },
  {
    transportLogo: "BUS",
    lineID: "C01106", // 70
    stationCode: "70823", // Mairie de Suresnes
    stationName: "Mairie de Suresnes"
  },
  {
    transportLogo: "BUS",
    lineID: "C01196", // 175
    stationCode: "70822", // Nieuport
    stationName: "Nieuport"
  },
  {
    transportLogo: "BUS",
    lineID: "C01124", // 93
    stationCode: "70844", // Berty Albrecht
    stationName: "Berty Albrecht"
  },
  {
    transportLogo: "BUS",
    lineID: "C01239", // 241
    stationCode: "70823", // Suresnes de Gaulle
    stationName: "Suresnes de Gaulle"
  },
  {
    transportLogo: "BUS",
    lineID: "C01240", // 244
    stationCode: "70823", // Suresnes de Gaulle
    stationName: "Suresnes de Gaulle"
  }
];

function Suresnes() {

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3">
      {stations.map((station, index) => (
        <div key={index} className="m-2 sm:m-6">
          <StationInfo lineID={station.lineID} stationID={station.stationCode} />
          <TrainInfo lineID={station.lineID} stationName={station.stationCode} />
        </div>
      ))}
    </div>
  );
  
}

export default Suresnes;