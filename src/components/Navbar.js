import React from "react";
import { Link, useLocation } from "react-router-dom";
import Clock from '../components/clock';

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between mx-auto min-h-[6rem]  px-2 py-3 bg-white dark:bg-gray-900 shadow-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between xl:w-auto xl:static xl:block xl:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              to="/"
            >
              <Clock />
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block xl:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars">=</i>
            </button>
          </div>
          <div
            className={
              "xl:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col xl:flex-row list-none xl:ml-auto">
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/" ? "bg-sky-700 rounded-lg p-2" : ""}`}
                  to="/"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Accueil</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Suresnes" ? "bg-sky-700 rounded-lg p-2" : ""}`}
                  to="/Suresnes"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Suresnes</span>
                </Link>
              </li>
              <li className="nav-item mr-2 ">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Saint-Lazare" ? "bg-sky-700 rounded-lg p-2" : ""}`}
                  to="/Saint-Lazare"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Saint-Lazare</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Gare-Du-Nord" ? "bg-sky-700 rounded-lg p-2" : ""}`}
                  to="/Gare-Du-Nord"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Gare Du Nord</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Clichy-Levallois" ? "bg-sky-700 rounded-lg p-2" : ""}`}
                  to="/Clichy-Levallois"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Clichy-Levallois</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/La-Defense" ? "bg-sky-700 rounded-lg p-2" : ""}`}
                  to="/La-Defense"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">La Défense</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Chatelet" ? "bg-sky-700 rounded-lg p-2" : ""}`}
                  to="/Chatelet"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Châtelet</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Villejuif" ? "bg-sky-700 rounded-lg p-2" : ""}`}
                  to="/Villejuif"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Villejuif</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Luxembourg" ? "bg-sky-700 rounded-lg p-2" : ""}`}
                  to="/Luxembourg"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Luxembourg</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Fosses" ? "bg-sky-700 rounded-lg p-2" : ""}`}
                  to="/Fosses"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Fosses</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}