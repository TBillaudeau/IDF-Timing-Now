import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Search from './pages/SearchResult';
import LineInfo from './pages/LineInfo';
import fav from './pages/Favorites';

import InfoTrafic from './pages/InfoTrafic';
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
      <main className='max-w-screen-xl flex-wrap justify-between mx-auto'>
        <Routes>
          <Route exact path="/" element={<InfoTrafic />} />
          <Route path="/line/:line" element={<LineInfo />} />
          <Route path="/line/:line/:stop_area" element={<Search />} />

          <Route exact path="/infos-trafic" element={<InfoTrafic />} />
          <Route path="/suresnes" element={<Suresnes />} />
          <Route path="/saint-lazare" element={<SaintLazare />} />
          <Route path="/gare-du-nord" element={<GareNord />} />
          <Route path="/clichy-levallois" element={<ClichyLevallois />} />
          <Route path="/la-defense" element={<LaDefense />} />
          <Route path="/chatelet" element={<Chatelet />} />
          <Route path="/villejuif" element={<Villejuif />} />
          <Route path="/fosses" element={<Fosses />} />

          <Route path="/fav" element={<fav />} />

          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
