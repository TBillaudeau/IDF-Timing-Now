import React from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function BottomNavbar() {
    const location = useLocation();
    const [navbarOpen, setNavbarOpen] = React.useState(false);

    return (
        <footer className="fixed bottom-0 z-50 w-full -translate-x-1/2 shadow-[0px_-3px_6px_-1px_rgba(0,0,0,0.2)] bg-white border-b-[25px] border-white left-1/2 dark:bg-slate-700 dark:border-slate-700 md:hidden">
            <div class="w-full">
                <div class="grid max-w-xs grid-cols-3 gap-1 mx-auto my-2 bg-slate-100 rounded-lg dark:bg-slate-600" role="group">
                    <button class="px-1 py-1 text-xs font-medium text-slate-900 hover:bg-slate-200 dark:text-white dark:hover:bg-slate-800 rounded-lg">
                        beta
                    </button>
                    <button class="px-1 py-1 text-xs font-medium bg-violet-100 text-violet-700 rounded-lg">
                        IDF RailTime
                    </button>
                    <button class="px-1 py-1 text-xs font-medium text-slate-900 hover:bg-slate-200 dark:text-white dark:hover:bg-slate-800 rounded-lg">
                        v 0.8.7
                    </button>
                </div>
            </div>
            <div className="grid h-full max-w-lg grid-cols-5 mx-auto">
                <Link to="/" onClick={() => setNavbarOpen(false)} data-tooltip-target="tooltip-home" className={`inline-flex flex-col items-center justify-center m-1 group rounded-lg hover:bg-violet-100 dark:hover:bg-slate-800 ${location.pathname === "/" ? "bg-violet-100 dark:bg-violet-100 text-violet-800" : "text-slate-700 dark:text-slate-200"}`}>
                    <svg class="w-4 h-4 mb-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM10 15a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm1-4a1 1 0 0 1-2 0V6a1 1 0 0 1 2 0v5Z" />
                    </svg>
                    <span class="text-xs">Trafic</span>
                </Link>

                <Link to="/research" onClick={() => setNavbarOpen(false)} data-tooltip-target="tooltip-home" className={`inline-flex flex-col items-center justify-center m-1 group rounded-lg hover:bg-violet-100 dark:hover:bg-slate-800 ${location.pathname === "/research" ? "bg-violet-100 dark:bg-violet-100 text-violet-800" : "text-slate-700 dark:text-slate-200"}`}>
                    <svg class="w-4 h-4 mb-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                    </svg>
                    <span class="text-xs">Recherche</span>
                </Link>

                <Link to="/poles" onClick={() => setNavbarOpen(false)} data-tooltip-target="tooltip-home" className={`inline-flex flex-col items-center justify-center m-1 group rounded-lg hover:bg-violet-100 dark:hover:bg-slate-800 ${location.pathname === "/poles" ? "bg-violet-100 dark:bg-violet-100 text-violet-800" : "text-slate-700 dark:text-slate-200"}`}>
                    <svg class="w-4 h-4 mb-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                    </svg>
                    <span class="text-xs">Horaires</span>
                </Link>

                <Link to="/locate" onClick={() => setNavbarOpen(false)} data-tooltip-target="tooltip-home" className={`inline-flex flex-col items-center justify-center m-1 group rounded-lg hover:bg-violet-100 dark:hover:bg-slate-800 ${location.pathname === "/locate" ? "bg-violet-100 dark:bg-violet-100 text-violet-800" : "text-slate-700 dark:text-slate-200"}`}>
                    {/* <svg class="w-4 h-4 mb-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 18">
                        <path fill="currentColor" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 1H2a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z" />
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM7.565 7.423 4.5 14h11.518l-2.516-3.71L11 13 7.565 7.423Z" />
                    </svg> */}
                    <svg class="w-4 h-4 mb-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 20">
                        <path d="M8 0a7.992 7.992 0 0 0-6.583 12.535 1 1 0 0 0 .12.183l.12.146c.112.145.227.285.326.4l5.245 6.374a1 1 0 0 0 1.545-.003l5.092-6.205c.206-.222.4-.455.578-.7l.127-.155a.934.934 0 0 0 .122-.192A8.001 8.001 0 0 0 8 0Zm0 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
                    </svg>
                    <span class="text-xs">Plans</span>
                </Link>

                <Link to="/favorites" onClick={() => setNavbarOpen(false)} data-tooltip-target="tooltip-home" className={`inline-flex flex-col items-center justify-center p-1 m-1 group rounded-lg hover:bg-violet-100 dark:hover:bg-slate-800 ${location.pathname === "/favorites" ? "bg-violet-100 dark:bg-violet-100 text-violet-800" : "text-slate-700 dark:text-slate-200"}`}>
                    <svg class="w-4 h-4 mb-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 14 20">
                        <path d="M13 20a1 1 0 0 1-.64-.231L7 15.3l-5.36 4.469A1 1 0 0 1 0 19V2a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v17a1 1 0 0 1-1 1Z" />
                    </svg>
                    <span class="text-xs">Favoris</span>
                </Link>

            </div>
        </footer>
    );
}