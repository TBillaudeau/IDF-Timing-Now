import SearchBar from '../components/SearchBar'
import { lineTypes, checkDisruptions } from '../components/Trafic'

function Research() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 m-2 sm:m-6">
        <div className="bg-white border rounded-lg dark:bg-gray-800 p-4 lg:p-6">
            <h1 className="text-2xl font-bold dark:text-white pb-4 lg:pb-6">Recherche rapide</h1>
            <SearchBar />
        </div>
        <div className="bg-white border rounded-lg dark:text-white dark:bg-gray-800 p-4 lg:p-6">
            <h1 className="text-2xl font-bold pb-4 lg:pb-6">Rechercher un horaire</h1>
            {Object.entries(lineTypes).map(([lineType, lineIds]) => (
                <div key={lineType} className="flex flex-row p-1 xl:p-2">
                    <img src={process.env.PUBLIC_URL + `/images/${lineType}${localStorage.theme === 'dark' ? '_LIGHT' : ''}.svg`} alt={lineType} className="h-8 xl:h-10 mt-1.5 mr-2 lg:mr-4" />
                </div>
                ))}
        </div>
    </div>
  );

}

export default Research;