import React from "react";
import { Link, useLocation } from "react-router-dom";
import Clock from '../components/clock';

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const location = useLocation();

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-slate-800 shadow-lg">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <Link
              className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
              to="/"
            >
              <Clock />
            </Link>
            <button
              className="text-white cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="fas fa-bars">=</i>
            </button>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/" ? "bg-slate-700 rounded-lg p-2" : ""}`}
                  to="/"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Accueil</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Suresnes" ? "bg-slate-700 rounded-lg p-2" : ""}`}
                  to="/Suresnes"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Suresnes</span>
                </Link>
              </li>
              <li className="nav-item mr-2 ">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Saint-Lazare" ? "bg-slate-700 rounded-lg p-2" : ""}`}
                  to="/Saint-Lazare"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Saint-Lazare</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Gare-Du-Nord" ? "bg-slate-700 rounded-lg p-2" : ""}`}
                  to="/Gare-Du-Nord"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Gare Du Nord</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Clichy-Levallois" ? "bg-slate-700 rounded-lg p-2" : ""}`}
                  to="/Clichy-Levallois"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Clichy-Levallois</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/La-Defense" ? "bg-slate-700 rounded-lg p-2" : ""}`}
                  to="/La-Defense"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">La Défense</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Chatelet" ? "bg-slate-700 rounded-lg p-2" : ""}`}
                  to="/Chatelet"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Châtelet</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Villejuif" ? "bg-slate-700 rounded-lg p-2" : ""}`}
                  to="/Villejuif"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Villejuif</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Luxembourg" ? "bg-slate-700 rounded-lg p-2" : ""}`}
                  to="/Luxembourg"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Luxembourg</span>
                </Link>
              </li>
              <li className="nav-item mr-2">
                <Link
                  className={`px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75 ${location.pathname === "/Fosses" ? "bg-slate-700 rounded-lg p-2" : ""}`}
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