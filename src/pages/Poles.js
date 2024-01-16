import { Link } from 'react-router-dom';

function Poles() {
  const URLs = [
    { label: 'Suresnes', url: "/search?line=C01740&stop_area=70829&line=C01390&stop_area=70845&line=C01741&stop_area=70829&line=C01106&stop_area=70823&line=C01196&stop_area=70822&line=C01124&stop_area=70844&line=C01239&stop_area=70823&line=C01240&stop_area=70823" },
    { label: 'Saint Lazare', url: "/search?line=C01740&stop_area=71370&line=C01729&stop_area=73688&line=C01739&stop_area=71370&line=C01384&stop_area=71370" },
    { label: 'Gare Du Nord', url: "/search?line=C01743&stop_area=71410&line=C01728&stop_area=71410&line=C01729&stop_area=478733&line=C01737&stop_area=71410&line=C01738&stop_area=71410&line=C01374&stop_area=71410" },
    { label: 'Neuilly Levallois', url: "/search?line=C01740&stop_area=72073&line=C01371&stop_area=425779&line=C01124&stop_area=71497&line=C01240&stop_area=71379" },
    { label: 'La Defense', url: "/search?line=C01742&stop_area=71517&line=C01740&stop_area=71517&line=C01390&stop_area=71517&line=C01741&stop_area=71517&line=C01371&stop_area=71517" },
    { label: 'Chatelet', url: "/search?line=C01742&stop_area=474151&line=C01743&stop_area=474151&line=C01728&stop_area=474151&line=C01374&stop_area=73794&line=C01377&stop_area=71264&line=C01371&stop_area=71264&line=C01374&stop_area=71264&line=C01381&stop_area=71264" },
    { label: 'Villejuif', url: "/search?line=C01377&stop_area=70143&line=C01201&stop_area=70143&line=C01193&stop_area=415734&line=C01774&stop_area=70143" },
    { label: 'Luxembourg', url: "/search?line=C01390&stop_area=70811&line=C01743&stop_area=71161&line=C01374&stop_area=73618" },
  ];
  
  return (
    <div className="grid grid-cols-1 gap-2 lg:gap-4 m-2">
      <div className="bg-white dark:bg-gray-800 p-4 lg:p-6">
        <h1 className="text-xl font-bold dark:text-white pb-4 lg:pb-6">Gares et stations fréquentées</h1>

        {URLs.map((pole, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 py-2 lg:py-4">
            <Link to={pole.url} className="w-full border-2 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium text-sm px-5 py-2.5 inline-flex items-center dark:text-white">
              <div>
                {pole.label}
              </div>
              <svg className="rtl:rotate-180 w-3.5 h-3.5 ml-auto float-right" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
              </svg>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );

}

export default Poles;