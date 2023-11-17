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
import Favorites from './pages/Favorites';
import Poles from './pages/Poles';

import InfoTrafic from './pages/InfoTrafic';
import Suresnes from './pages/Suresnes';
import Chatelet from './pages/Chatelet';
import Fosses from './pages/Fosses';

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
            <Route path="/poles" element={<Poles />} />

            <Route exact path="/infos-trafic" element={<InfoTrafic />} />
            <Route path="/suresnes" element={<Suresnes />} />
            <Route path="/chatelet" element={<Chatelet />} />
            <Route path="/fosses" element={<Fosses />} />
            <Route path="/login" element={<Login />} />
            <Route path="/favorites" element={<Favorites />} />

            <Route path="/about" element={<About />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer className='flex-shrink-0' />
      </div>
    </>
  );
}

export default App;
