import { useLocation } from "react-router-dom";
import StationInfo from '../components/Header';
import TrainInfo from '../components/Timing';
import stationsData from '../assets/emplacement-des-gares-idf.json';

function SearchResult() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lines = params.getAll('line');
  const stopAreas = params.getAll('stop_area');

  return (

    <div className={`mx-auto ${lines.length === 1 ? 'grid grid-cols-1 max-w-screen-sm' : 'grid grid-cols-2 max-w-screen-lg'}`}>
      {lines.map((line, index) => {
        const stationName = stationsData.find(station => station.fields.id_ref_lda == stopAreas[index]).fields.nom_zdl;

        return (
          <div key={line} className="m-2 sm:m-6">
            <StationInfo transportLogo={stationsData.find(station => station.fields.idrefligc == line).fields.res_com.split(' ')[0]} lineLogo={line} stationName={stationName} />
            <TrainInfo lineID={line} stationName={stopAreas[index]} />        
          </div>
        );

      })}
    </div>
    
  );
}

export default SearchResult;