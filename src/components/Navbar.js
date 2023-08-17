import React from "react";
import { Link, useLocation } from "react-router-dom";
import Clock from '../components/clock';
import DarkMode from '../components/darkmode';

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center">
          {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" /> */}
          <Clock />        
        </Link>
        <div className="flex lg:order-2">

          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-search"
            aria-expanded="false"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>

        <div className={"items-center justify-between w-full lg:flex lg:w-auto lg:order-1" + (navbarOpen ? " flex" : " hidden")}>
          <ul className="flex flex-col p-4 lg:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 lg:flex-row lg:space-x-8 lg:mt-0 lg:border-0 lg:bg-white dark:bg-gray-800 lg:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/infos-trafic" ? "text-blue-700" : ""}`}
                  to="/infos-trafic"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Infos Trafic</span>
              </Link>
            </li>
            <li>
              <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/Suresnes" ? "text-blue-700" : ""}`}
                  to="/Suresnes"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Suresnes</span>
              </Link>
            </li>
            <li>
              <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/Saint-Lazare" ? "text-blue-700" : ""}`}
                  to="/Saint-Lazare"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Saint-Lazare</span>
              </Link>
            </li>
            <li>
              <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/Gare-Du-Nord" ? "text-blue-700" : ""}`}
                  to="/Gare-Du-Nord"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Gare Du Nord</span>
              </Link>            
            </li>
            <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/Clichy-Levallois" ? "text-blue-700" : ""}`}
                  to="/Clichy-Levallois"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Clichy-Levallois</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/La-Defense" ? "text-blue-700" : ""}`}
                  to="/La-Defense"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">La Défense</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/Chatelet" ? "text-blue-700" : ""}`}
                  to="/Chatelet"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Châtelet</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/Villejuif" ? "text-blue-700" : ""}`}
                  to="/Villejuif"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Villejuif</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/Luxembourg" ? "text-blue-700" : ""}`}
                  to="/Luxembourg"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Luxembourg</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-blue-700 lg:p-0 lg:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/Fosses" ? "text-blue-700" : ""}`}
                  to="/Fosses"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Fosses</span>
                </Link>
              </li>
          </ul>
          <DarkMode />
        </div>
      </div>
    </nav>
    </>
  );
}