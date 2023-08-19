import { useParams } from "react-router-dom";
import StationInfo from '../components/Header';
import TrainInfo from '../components/Timing';
import stationsData from '../assets/emplacement-des-gares-idf.json';

function SearchResult() {
  const { line } = useParams();
  const { stop_area } = useParams();
  const stationName = stationsData.find(station => station.fields.id_ref_lda == stop_area).fields.nom_zdl

  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="m-2 sm:m-6">
        <StationInfo transportLogo={stationsData.find(station => station.fields.idrefligc == line).fields.res_com.split(' ')[0]} lineLogo={line} stationName={stationName} />
        <TrainInfo lineID={line} stationName={stop_area} />        
      </div>

    </div>
  );
  
}

export default SearchResult;