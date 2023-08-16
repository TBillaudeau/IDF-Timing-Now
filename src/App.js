import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Suresnes from './pages/Suresnes';
import SaintLazare from './pages/Saint-Lazare';
import ClichyLevallois from './pages/Clichy-Levallois';
import GareNord from './pages/Gare-Du-Nord';
import LaDefense from './pages/La-Defense';
import Chatelet from './pages/Chatelet';
import Villejuif from './pages/Villejuif';
import About from './pages/About';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>
      <Navbar />
      <div className='max-w-screen-xl flex-wrap justify-between mx-auto'>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/Suresnes" element={<Suresnes />} />
          <Route path="/Saint-Lazare" element={<SaintLazare />} />
          <Route path="/Gare-Du-Nord" element={<GareNord />} />
          <Route path="/Clichy-Levallois" element={<ClichyLevallois />} />
          <Route path="/La-Defense" element={<LaDefense />} />
          <Route path="/Chatelet" element={<Chatelet />} />
          <Route path="/Villejuif" element={<Villejuif />} />

          <Route path="/About" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
