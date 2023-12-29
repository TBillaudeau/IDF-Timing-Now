import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Clock from '../elements/clock';
import DarkMode from '../elements/darkmode';

const navLinks = [
  { name: "Infos Trafic", path: "/infos-trafic" },
  { separator: true },
  { name: "Suresnes", path: "/search?line=C01740&stop_area=70829&line=C01390&stop_area=70845&line=C01741&stop_area=70829&line=C01106&stop_area=70823&line=C01196&stop_area=70822&line=C01124&stop_area=70844&line=C01239&stop_area=70823&line=C01240&stop_area=70823" },
  { name: "Saint-Lazare", path: "/search?line=C01740&stop_area=71370&line=C01729&stop_area=73688&line=C01739&stop_area=71370&line=C01384&stop_area=71370" },
  { name: "Gare Du Nord", path: "/search?line=C01743&stop_area=71410&line=C01728&stop_area=71410&line=C01729&stop_area=478733&line=C01737&stop_area=71410&line=C01738&stop_area=71410&line=C01374&stop_area=71410" },
  { name: "Neuilly Levallois", path: "/search?line=C01740&stop_area=72073&line=C01371&stop_area=425779&line=C01124&stop_area=71497&line=C01240&stop_area=71379" },
  { name: "La Défense", path: "/search?line=C01742&stop_area=71517&line=C01740&stop_area=71517&line=C01390&stop_area=71517&line=C01741&stop_area=71517&line=C01371&stop_area=71517" },
  { name: "Châtelet", path: "/Chatelet" },
  { name: "Villejuif", path: "/search?line=C01377&stop_area=70143&line=C01201&stop_area=70143&line=C01193&stop_area=415734&line=C01774&stop_area=70143" },
  { name: "Luxembourg", path: "/search?line=C01390&stop_area=70811&line=C01743&stop_area=71161&line=C01374&stop_area=73618" },
  { separator: true },
  { name: "Compte", path: "/login" },
  { name: "À propos", path: "/About" }
];


function NavButton({ onClick, ariaLabel, icon: Icon }) {
  return (
    <button
      type="button"
      className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      aria-controls="navbar-search"
      aria-expanded="false"
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <Icon />
    </button>
  );
}

function BackSVG() {
  return (
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
    </svg>
  );
}

function ReloadSVG() {
  return (
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97" />
    </svg>
  );
}

function MenuSVG() {
  return (
    <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
    </svg>
  );
}

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname + location.search === path || location.pathname === path;

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md z-10">

        <div className="flex flex-wrap items-center justify-between mx-auto p-2 lg:p-4">
          <Link to="/" onClick={() => setNavbarOpen(false)}>
            <Clock />
          </Link>

          <div className="flex xl:order-2">
            <NavButton onClick={() => window.history.back()} ariaLabel="Go back" icon={BackSVG} />
            <NavButton onClick={() => window.location.reload()} ariaLabel="Reload page" icon={ReloadSVG} />
            <DarkMode />
            <NavButton onClick={() => setNavbarOpen(!navbarOpen)} ariaLabel="Open main menu" icon={MenuSVG} />
          </div>

          <div className={`${navbarOpen ? "flex" : "hidden"} items-center justify-between w-full xl:flex xl:w-auto xl:order-1`}>
            <ul className="flex flex-col p-4 mt-4 w-full font-medium border border-gray-50 rounded-lg bg-gray-100 xl:flex-row xl:space-x-8 xl:mt-0 xl:border-0 xl:bg-white dark:bg-gray-800 xl:dark:bg-gray-900 dark:border-gray-700">
              {navLinks.map((link, index) => {
                if (link.separator) {
                  return <li key={`separator-${index}`} className="bg-gray-800 dark:bg-gray-200 h-px my-2"></li>;
                } else {
                  return (
                    <li key={index}>
                      <Link
                        className={`block py-2 pl-3 pr-4 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent ${isActive(link.path) ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : "text-gray-900 dark:border-gray-700"}`}
                        to={link.path}
                        onClick={() => setNavbarOpen(false)}
                      >
                        <span className="text-sm">{link.name}</span>
                      </Link>
                    </li>
                  );
                }
              })}
            </ul>
          </div>

        </div>
      </nav>
    </>
  );
}