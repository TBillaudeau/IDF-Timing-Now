import React from "react";
import { Link, useLocation } from "react-router-dom";
import Clock from '../elements/clock';
import DarkMode from '../elements/darkmode';

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const location = useLocation();

  const suresnesURL = "/search?line=C01740&stop_area=70829&line=C01390&stop_area=70845&line=C01741&stop_area=70829&line=C01106&stop_area=70823&line=C01196&stop_area=70822&line=C01124&stop_area=70844&line=C01239&stop_area=70823&line=C01240&stop_area=70823"
  const saintLazareURL = "/search?line=C01740&stop_area=71370&line=C01729&stop_area=73688&line=C01739&stop_area=71370&line=C01384&stop_area=71370"
  const gareDuNordURL = "/search?line=C01743&stop_area=71410&line=C01728&stop_area=71410&line=C01729&stop_area=478733&line=C01737&stop_area=71410&line=C01738&stop_area=71410&line=C01374&stop_area=71410"
  const clichyLevalloisURL = "/search?line=C01740&stop_area=72073&line=C01371&stop_area=425779&line=C01124&stop_area=71497&line=C01240&stop_area=71379"
  const laDefenseURL = "/search?line=C01742&stop_area=71517&line=C01740&stop_area=71517&line=C01390&stop_area=71517&line=C01741&stop_area=71517&line=C01371&stop_area=71517"
  // const chateletURL = "/search?line=C01742&stop_area=474151&line=C01743&stop_area=474151&line=C01728&stop_area=474151&line=C01374&stop_area=73794&line=C01377&stop_area=71264&line=C01371&stop_area=71264&line=C01374&stop_area=71264&line=C01381&stop_area=71264"
  const chateletURL = "/Chatelet"
  const villejuifURL = "/search?line=C01377&stop_area=70143&line=C01201&stop_area=70143&line=C01193&stop_area=415734&line=C01774&stop_area=70143"
  const luxembourgURL = "/search?line=C01390&stop_area=70811&line=C01743&stop_area=71161&line=C01374&stop_area=73618"

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md">
        <div className="flex flex-wrap items-center justify-between mx-auto p-2 lg:p-4">
          <Link
            className="flex items-center"
            to="/"
            onClick={() => setNavbarOpen(false)}
          >
            {/* <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="Flowbite Logo" /> */}
            <Clock />
          </Link>
          <div className="flex xl:order-2">
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              onClick={() => window.history.back()}
            >
              <span className="sr-only">Go back</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
              onClick={() => window.location.reload()}
            >
              <span className="sr-only">Open main menu</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97" />
              </svg>
            </button>
            <DarkMode />
            {/* <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
              onClick={() => window.location.reload()}
            >
              <span className="sr-only">Open main menu</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 14h6m-3 3v-6M1.857 1h4.286c.473 0 .857.384.857.857v4.286A.857.857 0 0 1 6.143 7H1.857A.857.857 0 0 1 1 6.143V1.857C1 1.384 1.384 1 1.857 1Zm10 0h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857h-4.286A.857.857 0 0 1 11 6.143V1.857c0-.473.384-.857.857-.857Zm-10 10h4.286c.473 0 .857.384.857.857v4.286a.857.857 0 0 1-.857.857H1.857A.857.857 0 0 1 1 16.143v-4.286c0-.473.384-.857.857-.857Z"/>
              </svg>
            </button> */}
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg xl:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-search"
              aria-expanded="false"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <div className={"items-center justify-between w-full xl:flex xl:w-auto xl:order-1" + (navbarOpen ? " flex" : " hidden")}>
            <ul className="flex flex-col p-4 xl:p-0 mt-4 w-full font-medium border border-gray-50 rounded-lg bg-gray-100 xl:flex-row xl:space-x-8 xl:mt-0 xl:border-0 xl:bg-white dark:bg-gray-800 xl:dark:bg-gray-900 dark:border-gray-700">

              {/* <svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25" />
              </svg> */}

              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/infos-trafic" ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to="/infos-trafic"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Infos Trafic</span>
                </Link>
              </li>
              <div className="xl:hidden bg-gray-800 dark:bg-gray-200 h-px w-full my-2"></div>
              <li>

                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname + location.search === suresnesURL ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to={suresnesURL}
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Suresnes</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname + location.search === saintLazareURL ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to={saintLazareURL}
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Saint-Lazare</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname + location.search === gareDuNordURL ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to={gareDuNordURL}
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Gare Du Nord</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname + location.search === clichyLevalloisURL ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to={clichyLevalloisURL}
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Neuilly Levallois</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname + location.search === laDefenseURL ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to={laDefenseURL}
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">La Défense</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname + location.search === chateletURL ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to={chateletURL}
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Châtelet</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname + location.search === villejuifURL ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to={villejuifURL}
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Villejuif</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname + location.search === luxembourgURL ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to={luxembourgURL}
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Luxembourg</span>
                </Link>
              </li>
              <div className="xl:hidden bg-gray-800 dark:bg-gray-200 h-px w-full my-2"></div>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/login" ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to="/login"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Compte</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/About" ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to="/About"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">À propos</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


    </>
  );
}