import { useLocation } from "react-router-dom";
import StationInfo from '../components/Header';
import TrainInfo from '../components/Timing';

function SearchResult() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lines = params.getAll('line');
  const stopAreas = params.getAll('stop_area');

  return (
    <div className={`grid  ${lines.length === 1 ? 'grid-cols-1 max-w-screen-sm' : 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'} gap-2 lg:gap-4 m-2 sm:m-6`}>
      {lines.map((line, index) => {
          return (
              <div key={line} className="bg-white">
                  {/* <Breadcrumb lineID={line} stationID={stopAreas[index]} /> */}
                  <div>                        
                      <StationInfo lineID={line} stationID={stopAreas[index]} />
                      <TrainInfo lineID={line} stationName={stopAreas[index]} />  
                  </div>
              </div>
          );
      })}
  </div>
  );
}

export default SearchResult;