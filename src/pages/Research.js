import SearchBar from '../components/SearchBar'

function Research() {

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 m-2 sm:m-6">
        <div className="bg-white border rounded-lg dark:text-white dark:bg-gray-800 p-4 lg:p-6">
            <h1 className="text-2xl font-bold pb-4 lg:pb-6">Recherche</h1>
            <SearchBar />
        </div>
    </div>
  );

}

export default Research;