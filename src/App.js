import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Search from './pages/SearchResult';
import InfoTrafic from './pages/InfoTrafic';
import LineInfo from './pages/LineInfo';

import Suresnes from './pages/Suresnes';
import SaintLazare from './pages/Saint-Lazare';
import ClichyLevallois from './pages/Clichy-Levallois';
import GareNord from './pages/Gare-Du-Nord';
import LaDefense from './pages/La-Defense';
import Chatelet from './pages/Chatelet';
import Villejuif from './pages/Villejuif';
import Fosses from './pages/Fosses';

import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Navbar />
      <div className='max-w-screen-xl flex-wrap justify-between mx-auto'>
        <Routes>
          <Route exact path="/" element={<InfoTrafic />} />
          <Route path="/line/:line" element={<LineInfo />} />
          <Route path="/line/:line/:stop_area" element={<Search />} />

          <Route exact path="/infos-trafic" element={<InfoTrafic />} />
          <Route path="/Suresnes" element={<Suresnes />} />
          <Route path="/Saint-Lazare" element={<SaintLazare />} />
          <Route path="/Gare-Du-Nord" element={<GareNord />} />
          <Route path="/Clichy-Levallois" element={<ClichyLevallois />} />
          <Route path="/La-Defense" element={<LaDefense />} />
          <Route path="/Chatelet" element={<Chatelet />} />
          <Route path="/Villejuif" element={<Villejuif />} />
          <Route path="/Fosses" element={<Fosses />} />
    
          <Route path="/About" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
