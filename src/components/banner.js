import React, { useState, useEffect } from 'react';

function Banner() {
  const [banner, setBanner] = useState(null);
  const [displayBanner, setDisplayBanner] = useState(true);

  useEffect(() => {
    fetch('https://api-iv.iledefrance-mobilites.fr/banners')
      .then(response => response.json())
      .then(data => {
        setBanner(data[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleDismiss = () => {
    setDisplayBanner(false);
  };

  if (!banner || !displayBanner) {
    return null;
  }

  return (
    <div id="alert-additional-content-1" className="p-4 text-blue-800 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800" role="alert">
      <div className="flex items-center">
        <svg className="flex-shrink-0 w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <h3 className="text-sm xl:text-lg font-medium">{banner.title}</h3>
      </div>
      <div className="mb-2 text-xs xl:text-sm">
        {banner.description}
      </div>
      <div className="flex">
        <a href={banner.link} className="text-white bg-blue -800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="-ml-0.5 mr-2 h-3 w-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
            <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z"/>
          </svg>
          {banner.buttonText}
        </a>
        <button type="button" className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" onClick={handleDismiss} aria-label="Close">
          Dismiss
        </button>
      </div>
    </div>
  );
}

export default Banner;

// import React, { useState, useEffect } from 'react';

// function Banner() {
//   const [banner, setBanner] = useState(null);
//   const [displayBanner, setDisplayBanner] = useState(true);

//   useEffect(() => {
//     fetch('https://api-iv.iledefrance-mobilites.fr/banners')
//       .then(response => response.json())
//       .then(data => setBanner(data[0]))
//       .catch(error => console.log(error));
//   }, []);

//   const handleDismiss = () => setDisplayBanner(false);

//   if (!banner || !displayBanner) return null;

//   return (
//     <div className="p-4 border border-blue-300 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400 dark:border-blue-800">
//       <div className="flex items-center">
//         <h3 className="text-lg font-medium">{banner.title}</h3>
//       </div>
//       <div className="mb-2 text-sm">{banner.description}</div>
//       <div className="flex">
//         <a href={banner.link} className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//           {banner.buttonText}
//         </a>
//         <button type="button" className="text-blue-800 bg-transparent border border-blue-800 hover:bg-blue-900 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-xs px-3 py-1.5 text-center dark:hover:bg-blue-600 dark:border-blue-600 dark:text-blue-400 dark:hover:text-white dark:focus:ring-blue-800" onClick={handleDismiss} aria-label="Close">
//           Dismiss
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Banner;
