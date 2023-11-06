import React from "react";
import { Link, useLocation } from "react-router-dom";
import Clock from '../components/clock';
import DarkMode from '../components/darkmode';

export default function Navbar({ fixed }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const location = useLocation();
  
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
              aria-controls="navbar-search"
              aria-expanded="false"
              onClick={() => window.location.reload()}
            >
              <span className="sr-only">Open main menu</span>
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 1v5h-5M2 19v-5h5m10-4a8 8 0 0 1-14.947 3.97M1 10a8 8 0 0 1 14.947-3.97"/>
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
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/Suresnes" ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to="/Suresnes"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Suresnes</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/Saint-Lazare" ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to="/Saint-Lazare"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Saint-Lazare</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/Gare-Du-Nord" ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to="/Gare-Du-Nord"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Gare Du Nord</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/Clichy-Levallois" ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to="/Clichy-Levallois"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Clichy-Levallois</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/La-Defense" ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to="/La-Defense"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">La Défense</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/Chatelet" ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to="/Chatelet"
                  onClick={() => setNavbarOpen(false)}
                >
                  <span className="text-sm">Châtelet</span>
                </Link>
              </li>
              <li>
                <Link
                  className={`block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 xl:hover:bg-transparent xl:hover:text-blue-700 xl:p-0 xl:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white xl:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/Villejuif" ? "bg-gray-200 dark:bg-gray-700 xl:bg-transparent xl:text-blue-700" : ""}`}
                  to="/Villejuif"
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
{/* border-b-[18px] border-white */}
  <div className="fixed bottom-0 z-50 w-full -translate-x-1/2 shadow-[0px_-1px_6px_-1px_rgba(0,0,0,0.1)] bg-white  left-1/2 dark:bg-gray-700 dark:border-gray-700 md:hidden">
    <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
        <Link to="/" onClick={() => setNavbarOpen(false)} data-tooltip-target="tooltip-home" className={`inline-flex flex-col items-center justify-center m-1 group rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${location.pathname === "/" ? "bg-gray-100 dark:bg-gray-800" : ""}`}>
            <svg class={`w-4 h-4 mb-1 text-gray-500 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            <span class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Trafic</span>
        </Link>

        <Link to="/research" onClick={() => setNavbarOpen(false)} data-tooltip-target="tooltip-home" className={`inline-flex flex-col items-center justify-center m-1 group rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${location.pathname === "/research" ? "bg-gray-100 dark:bg-gray-800" : ""}`}>
          <svg class="w-4 h-4 mb-1 text-gray-500 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
          </svg>
          <span class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Recherche</span>
        </Link>

        <Link to="/Suresnes" onClick={() => setNavbarOpen(false)} data-tooltip-target="tooltip-home" className={`inline-flex flex-col items-center justify-center m-1 group rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${location.pathname === "/Suresnes" ? "bg-gray-100 dark:bg-gray-800" : ""}`}>
          <svg class="w-4 h-4 mb-1 text-gray-500 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
          </svg>
          <span class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Horaires</span>
        </Link>

        <Link to="/plans" onClick={() => setNavbarOpen(false)} data-tooltip-target="tooltip-home" className={`inline-flex flex-col items-center justify-center m-1 group rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${location.pathname === "/plans" ? "bg-gray-100 dark:bg-gray-800" : ""}`}>
          <svg class="w-4 h-4 mb-1 text-gray-500 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
            <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"/>
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z"/>
          </svg>
        <span class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Plans</span>
        </Link>

        <Link to="/fav" onClick={() => setNavbarOpen(false)} data-tooltip-target="tooltip-home" className={`inline-flex flex-col items-center justify-center p-1 m-1 group rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 ${location.pathname === "/fav" ? "bg-gray-100 dark:bg-gray-800" : ""}`}>
          <svg class="w-4 h-4 mb-1 text-gray-500 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
            <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z"/>
          </svg>
          <span class="text-xs text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500">Favoris</span>
        </Link>

      </div>
      <div class="w-full">
        <div class="grid max-w-xs grid-cols-3 gap-1  mx-auto my-2 bg-gray-100 rounded-lg dark:bg-gray-600" role="group">
            <button class="px-1 py-1 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg">
                IDF Timing Now
            </button>
            <button class="px-1 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-lg">
                beta
            </button>
            <button class="px-1 py-1 text-xs font-medium text-gray-900 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 rounded-lg">
                v 0.8
            </button>
        </div>
    </div>
    </div>
    </>
  );
}