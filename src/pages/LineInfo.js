import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import Breadcrumb from '../components/breadcrumb';
import SearchBar from '../components/SearchBar2';
import PDFAsImg from '../components/tools/displayPDF';
import TwitterTimeline from '../components/shared/TwitterTimeline';
import HashLoader from "react-spinners/HashLoader";

function LineInfo() {
  const { lineID } = useParams();
  const [lineData, setLineData] = useState(null);
  const [activeTab, setActiveTab] = useState('current');
  const [expandedItemId, setExpandedItemId] = useState(null);

  useEffect(() => {
    const fetchLineData = async () => {
      const response = await fetch(`https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:${lineID}/schedules?it=true`);
      const data = await response.json();
      setLineData(data);
    };

    fetchLineData();
  }, [lineID]);

  const TabButton = ({ label, value }) => (
    <button
      className={`p-1 text-xs font-medium rounded-lg ${activeTab === value ? 'bg-violet-100 text-violet-700 dark:text-violet-700' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}
      onClick={() => setActiveTab(value)}
    >
      {label}
    </button>
  );

  const handleExpandItem = (id) => {
    setExpandedItemId(expandedItemId === id ? null : id);
  };

  const ArrowUp = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
    </svg>
  );

  const ArrowDown = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );

  const renderItem = (item) => (
    <div key={item.id} className="mb-4 border border-gray-300 p-4 rounded-lg">
      <div className="cursor-pointer flex justify-between items-center" onClick={() => handleExpandItem(item.id)}>
        <div className="flex items-center">
          <img src={process.env.PUBLIC_URL + `/images/${lineID}.svg`} alt={lineID} className="h-5 mr-2" />
          <p className="text-sm font-semibold">{item.title}</p>
        </div>
        {(activeTab === 'current' || expandedItemId === item.id) ? <ArrowUp /> : <ArrowDown />}
      </div>

      {(activeTab === 'current' || expandedItemId === item.id) && item.message && (
        <div
          dangerouslySetInnerHTML={{ __html: item.message }}
          className="mt-2 text-sm overflow-y-auto max-h-[30rem]"
        />
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-2 my-2 sm:m-6">
      <Breadcrumb lineID={lineID} />
      <div className="xl:col-span-2 bg-white dark:bg-gray-800 p-4">
        <SearchBar />
      </div>

      <div className="xl:col-span-2">
        <div className="bg-violet-700 p-4 xl:p-6 flex flex-col w-full">
          {lineData ? (
            <div className="flex items-center text-white">
              <svg class="w-5 h-5 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 20">
                <path fill="currentColor" d="M11.045 7.514a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-4.572 3.072L3.857 15.92h7.949l-1.811-3.37-1.61 2.716-1.912-4.679Z" />
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 1v4a1 1 0 0 1-1 1H1m14 12a.97.97 0 0 1-.933 1H1.933A.97.97 0 0 1 1 18V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 5.828 1h8.239A.97.97 0 0 1 15 2v16ZM11.045 7.514a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0ZM3.857 15.92l2.616-5.333 1.912 4.68 1.61-2.717 1.81 3.37H3.858Z" />
              </svg>
              <h2 className="xl:text-xl font-semibold"><a href={lineData.plans[0].link} target="_blank" rel="noopener noreferrer" className="hover:underline">{lineData.plans[0].label}</a></h2>
            </div>
            // <div className="max-w-full">
            //   <PDFAsImg planURL={lineData.plans[0].link} />
            // </div>
          ) : (
            <div class="animate-pulse flex space-x-2 items-center">
              <div class="rounded-full h-5 w-5 bg-gray-200 dark:bg-gray-500"></div>
              <div class="flex-1 space-y-4 py-2">
                <div class="h-2 rounded w-3/4 bg-gray-200 dark:bg-gray-500"></div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className='bg-white dark:bg-gray-800 dark:text-white p-4 xl:p-6 flex flex-col w-full'>
        <div className="grid grid-cols-3 gap-1 mx-auto p-1 rounded-lg border border-gray-300 w-full" role="group">
          <TabButton label="En cours" value="current" />
          <TabButton label="À venir" value="forecast" />
          <TabButton label="Twitter" value="twitter" />
        </div>

        <div className="mt-4">
          {lineData === null ? (
            <div className="flex items-center justify-center">
              <HashLoader size={30} color="#6D28D9" />
            </div>
          ) : (
            <>
              {activeTab === 'current' && (lineData?.currentIT?.length > 0 ? lineData.currentIT.map(renderItem) : renderItem({ title: <div className="flex items-center"><svg className="w-5 h-5 text-green-600 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" /></svg><span>Tout roule</span></div> }))}
              {activeTab === 'forecast' && (lineData?.forecastIT?.length > 0 ? lineData.forecastIT.map(renderItem) : renderItem({ title: <div className="flex items-center"><svg className="w-5 h-5 text-green-600 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20"><path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" /></svg><span>Tout roule</span></div> }))}
              {activeTab === 'twitter' && <TwitterTimeline lineID={lineID} />}
            </>
          )}
        </div>
      </div>

    </div>
  );
}

export default LineInfo;