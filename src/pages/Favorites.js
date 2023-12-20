import { Link } from "react-router-dom";

function Favorites() {
      return (
        <main className="flex items-center justify-center bg-gradient-to-r from-violet-300 to-blue-300 p-6" style={{ height: 'calc(100vh - 130px)' }}>
            <div className="text-center">
                <div className="flex justify-center space-x-1">
                  <div className="animate-bounce w-24 h-24 bg-white rounded-full mb-4 flex items-center justify-center">
                      <div className="w-4 h-4 bg-black rounded-full"></div>
                  </div>
                  <div className="animate-bounce w-24 h-24 bg-white rounded-full mb-4 flex items-center justify-center">
                      <div className="w-4 h-4 bg-black rounded-full"></div>
                  </div>
                </div>
                <h1 className="text-4xl font-bold text-gray-900 mt-4">Coming Soon...</h1>
                <p className="text-gray-600 mt-4">Stay tunned</p>
                <Link to="/" className="mt-8 inline-block bg-violet-700 text-white font-semibold px-4 py-2 rounded shadow hover:bg-violet-800">Go back home</Link>
            </div>
        </main>
    );
}

export default Favorites;