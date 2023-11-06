import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Search from './pages/SearchResult';
import Research from './pages/Research';
import LineInfo from './pages/LineInfo';
import StationInfo from './pages/StationInfo';
import StopInfo from './pages/StopInfo';
import Login from './pages/login';
import Plans from './pages/Plans';

import InfoTrafic from './pages/InfoTrafic';
import Suresnes from './pages/Suresnes';
import SaintLazare from './pages/SaintLazare';
import ClichyLevallois from './pages/ClichyLevallois';
import GareNord from './pages/GareDuNord';
import LaDefense from './pages/LaDefense';
import Chatelet from './pages/Chatelet';
import Villejuif from './pages/Villejuif';
import Fosses from './pages/Fosses';
import Luxembourg from './pages/Luxembourg';

import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <div className='h-screen flex flex-col'>
        <Navbar />
        <main className='max-w-screen-xl flex-wrap justify-between mx-auto flex-1 w-full'>
          <Routes>
            <Route exact path="/" element={<InfoTrafic />} />
            <Route path="/line/:lineID" element={<LineInfo />} />
            <Route path="/station/:stationID" element={<StationInfo />} />
            <Route path="/:lineID/:stationID" element={<StopInfo />} />
            <Route path="/search" element={<Search />} />
            <Route path="/research" element={<Research />} />
            <Route path="/plans" element={<Plans />} />

            <Route exact path="/infos-trafic" element={<InfoTrafic />} />
            <Route path="/suresnes" element={<Suresnes />} />
            <Route path="/saint-lazare" element={<SaintLazare />} />
            <Route path="/gare-du-nord" element={<GareNord />} />
            <Route path="/clichy-levallois" element={<ClichyLevallois />} />
            <Route path="/la-defense" element={<LaDefense />} />
            <Route path="/chatelet" element={<Chatelet />} />
            <Route path="/villejuif" element={<Villejuif />} />
            <Route path="/fosses" element={<Fosses />} />
            <Route path="/luxembourg" element={<Luxembourg />} />
            <Route path="/login" element={<Login />} />

            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {/* <Footer className='flex-shrink-0' /> */}
      </div>
    </>
  );
}

export default App;
