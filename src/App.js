import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BottomNavbar from './components/layout/BottomNavbar';

import Search from './pages/SearchResult';
import Research from './pages/Research';
import LineInfo from './pages/LineInfo';
import StationInfo from './pages/StationInfo';
import StopInfo from './pages/StopInfo';
import Login from './pages/login';
import Plans from './pages/Plans';
import Favorites from './pages/Favorites';
import Poles from './pages/Poles';
import Location from './pages/Locate';
import Trip from './pages/Trip';

import InfoTrafic from './pages/InfoTrafic';
import Chatelet from './pages/Chatelet';
import Fosses from './pages/Fosses';

import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <div className='h-screen flex flex-col'>
        <Navbar />
        <main className='flex-1 w-screen overflow-y-scroll lg:max-h-screen' style={{ maxHeight: 'calc(100vh - 130px)' }}>
          <section className='max-w-screen-xl flex-wrap justify-between mx-auto'>
            <Routes>
              <Route exact path="/" element={<InfoTrafic />} />
              <Route path="/line/:lineID" element={<LineInfo />} />
              <Route path="/station/:stationID" element={<StationInfo />} />
              <Route path="/:lineID/:stationID" element={<StopInfo />} />
              <Route path="/search" element={<Search />} />
              <Route path="/research" element={<Research />} />
              <Route path="/plans" element={<Plans />} />
              <Route path="/poles" element={<Poles />} />
              <Route path="/locate" element={<Location />} />
              <Route path="/trip" element={<Trip />} />

              <Route exact path="/infos-trafic" element={<InfoTrafic />} />
              <Route path="/chatelet" element={<Chatelet />} />
              <Route path="/fosses" element={<Fosses />} />
              <Route path="/login" element={<Login />} />
              <Route path="/favorites" element={<Favorites />} />

              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </section>
        </main>
        <BottomNavbar />
        {/* <Footer className='flex-shrink-0' /> */}
      </div>
    </>
  );
}

export default App;
