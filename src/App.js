import React, { useEffect, Suspense, lazy } from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import HashLoader from "react-spinners/HashLoader";

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import BottomNavbar from './components/layout/BottomNavbar';
import InfoTrafic from './pages/InfoTrafic';

const Search = lazy(() => import('./pages/SearchResult'));
const Research = lazy(() => import('./pages/Research'));
const LineInfo = lazy(() => import('./pages/LineInfo'));
const StationInfo = lazy(() => import('./pages/StationInfo'));
const StopInfo = lazy(() => import('./pages/StopInfo'));
const Login = lazy(() => import('./pages/login'));
const Favorites = lazy(() => import('./pages/Favorites'));
const Poles = lazy(() => import('./pages/Poles'));
const Location = lazy(() => import('./pages/Proximity'));
const Trip = lazy(() => import('./pages/Itineraire'));
const Chatelet = lazy(() => import('./pages/Chatelet'));
const Fosses = lazy(() => import('./pages/Fosses'));
const About = lazy(() => import('./pages/About'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Settings = lazy(() => import('./pages/Settings'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Image = lazy(() => import('./pages/Image'));

const isPWA = () => {
  return true;
  return (window.matchMedia('(display-mode: standalone)').matches) || (window.navigator.standalone) || document.referrer.includes('android-app://');
}

function App() {

  return (
    <>
      <div className='h-screen flex flex-col bg-gray-50 dark:bg-gray-900'>
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
                <Route path="/poles" element={<Poles />} />
                <Route path="/a-proximite" element={<Location />} />
                <Route path="/itineraire" element={<Trip />} />
                <Route path="/dashboard/:stationID" element={<Dashboard />} />
                <Route path="/image" element={<Image />} />

                <Route exact path="/infos-trafic" element={<InfoTrafic />} />
                <Route path="/chatelet" element={<Chatelet />} />
                <Route path="/fosses" element={<Fosses />} />
                <Route path="/login" element={<Login />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/settings" element={<Settings />} />

                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </section>
        </main>
        {isPWA() && <BottomNavbar />}
        {/* <Footer className='flex-shrink-0' /> */}
      </div>
    </>
  );
}

export default App;