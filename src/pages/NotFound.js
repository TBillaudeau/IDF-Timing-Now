import { Link } from "react-router-dom";
import { useEffect } from 'react';

function NotFound() {
    useEffect(() => {
        const handleMouseMove = (event) => {
            const eyes = document.querySelectorAll(".eye");
            eyes.forEach((eye) => {
                const x = (eye.getBoundingClientRect().left) + (eye.clientWidth / 2);
                const y = (eye.getBoundingClientRect().top) + (eye.clientHeight / 2);
                const radian = Math.atan2(event.pageX - x, event.pageY - y);
                const rot = (radian * (180 / Math.PI) * -1) + 270;
                eye.style.transform = `rotate(${rot}deg)`;
            });
        };
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    return (
        <>
            <main className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8 bg-gradient-to-r from-violet-300 to-blue-300 animate-background">
                <div className="text-center">
                    <div className="flex justify-center">
                        <div className="w-24 h-24 bg-white rounded-full p-5">
                            <div className="eye"></div>
                        </div>
                        <div className="w-24 h-24 bg-white rounded-full p-5">
                            <div className="eye"></div>
                        </div>
                    </div>
                    <p className="text-3xl font-extrabold text-violet-700 animate-bounce">404</p>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Oops! This page is out of sight.
                    </h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">
                        Sorry, we couldn’t find the page you’re looking for. Maybe it's playing hide-and-seek?
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/"
                            className="rounded-md bg-violet-700 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Go back home
                        </Link>
                    </div>
                </div>
            </main>
            <style>{`
                .animate-background {
                    animation: backgroundAnimation 10s ease infinite;
                }
                @keyframes backgroundAnimation {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .eye {
                    width: 30px;
                    height: 30px;
                    background: black;
                    border-radius: 50%;
                    position: relative;
                    left: 30%;
                    top: 35%;
                }
            `}</style>
        </>
    );
}

export default NotFound;
