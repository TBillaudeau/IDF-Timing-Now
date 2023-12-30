import React, { useEffect, Suspense } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BottomNavbar from './components/layout/BottomNavbar';
import InfoTrafic from './pages/InfoTrafic';

const Search = lazyWithPreload(() => import('./pages/SearchResult'));
const Research = lazyWithPreload(() => import('./pages/Research'));
const LineInfo = lazyWithPreload(() => import('./pages/LineInfo'));
const StationInfo = lazyWithPreload(() => import('./pages/StationInfo'));
const StopInfo = lazyWithPreload(() => import('./pages/StopInfo'));
const Login = lazyWithPreload(() => import('./pages/login'));
const Plans = lazyWithPreload(() => import('./pages/Plans'));
const Favorites = lazyWithPreload(() => import('./pages/Favorites'));
const Poles = lazyWithPreload(() => import('./pages/Poles'));
const Location = lazyWithPreload(() => import('./pages/Proximity'));
const Trip = lazyWithPreload(() => import('./pages/Itineraire'));
const Chatelet = lazyWithPreload(() => import('./pages/Chatelet'));
const Fosses = lazyWithPreload(() => import('./pages/Fosses'));
const About = lazyWithPreload(() => import('./pages/About'));
const NotFound = lazyWithPreload(() => import('./pages/NotFound'));

function lazyWithPreload(factory) {
  const Component = React.lazy(factory);
  Component.preload = factory;
  return Component;
}

function App() {
  useEffect(() => {
    setTimeout(() => {
      Promise.all([
        Search.preload(),
        Research.preload(),
        LineInfo.preload(),
        StationInfo.preload(),
        StopInfo.preload(),
        Login.preload(),
        Plans.preload(),
        Favorites.preload(),
        Poles.preload(),
        Location.preload(),
        Trip.preload(),
        Chatelet.preload(),
        Fosses.preload(),
        About.preload(),
        NotFound.preload()
      ]);
    }, 1000);
  }, []);

  return (
    <>
      <div className='h-screen flex flex-col bg-gray-100 dark:bg-gray-900'>
        <Navbar />
        <main className='flex-1 w-full overflow-y-auto lg:max-h-screen' style={{ maxHeight: 'calc(100vh - 130px)' }}>
          <section className='max-w-screen-xl flex-wrap justify-between mx-auto'>
            <Suspense fallback={<div className="flex items-center justify-center" style={{ height: 'calc(100vh - 130px)' }}><HashLoader size={30} color="#6D28D9" /></div>}>
              <Routes>
                <Route exact path="/" element={<InfoTrafic />} />
                <Route path="/infos-trafic" element={<InfoTrafic />} />
                <Route path="/line/:lineID" element={<LineInfo />} />
                <Route path="/station/:stationID" element={<StationInfo />} />
                <Route path="/:lineID/:stationID" element={<StopInfo />} />
                <Route path="/search" element={<Search />} />
                <Route path="/recherche" element={<Research />} />
                <Route path="/plans" element={<Plans />} />
                <Route path="/poles" element={<Poles />} />
                <Route path="/a-proximite" element={<Location />} />
                <Route path="/itineraire" element={<Trip />} />

                <Route exact path="/infos-trafic" element={<InfoTrafic />} />
                <Route path="/chatelet" element={<Chatelet />} />
                <Route path="/fosses" element={<Fosses />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favorites" element={<Favorites />} />

                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </section>
        </main>
        <BottomNavbar />
        {/* <Footer className='flex-shrink-0' /> */}
      </div>
    </>
  );
}

export default App;