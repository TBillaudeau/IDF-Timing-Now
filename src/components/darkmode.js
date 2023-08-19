import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function DarkModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  // localStorage.setItem('color-theme', 'dark');
  console.log(isDarkMode);

  useEffect(() => {
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
    }
  }, []);

  const handleToggleClick = () => {
    setIsDarkMode(!isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('color-theme', 'dark');
    }
  };

  return (
    <button
      id="theme-toggle"
      type="button"
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
      onClick={handleToggleClick}
    >
      <svg
        id="theme-toggle-dark-icon"
        className={isDarkMode ? 'hidden' : 'w-5 h-5'}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
      </svg>
      <svg
        id="theme-toggle-light-icon"
        className={isDarkMode ? 'w-5 h-5' : 'hidden'}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.707-.707a1 1 0 10-1.414 1.414l.707.707zM3 9a1 1 0 100 2H2a1 1 0 100-2h1zm.95 4.536a1 1 0 111.414 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707zM9 18a1 1 0 102 0v1a1 1 0 10-2 0v-1z"
        ></path>
        </svg>
    </button>
    );
}