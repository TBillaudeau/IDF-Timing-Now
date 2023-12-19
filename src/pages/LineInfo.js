import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import Breadcrumb from '../components/breadcrumb';
import SearchBar from '../components/SearchBar2';
import PDFAsImg from '../components/tools/displayPDF';

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
      className={`p-2 text-xs font-medium rounded-lg ${activeTab === value ? 'bg-violet-100 text-violet-700 dark:text-violet-700' : 'hover:bg-slate-200 dark:hover:bg-slate-700'}`}
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
        {expandedItemId === item.id ? <ArrowUp /> : <ArrowDown />}
      </div>
      {expandedItemId === item.id && (
        <div
          dangerouslySetInnerHTML={{ __html: item.message }}
          className="mt-2 text-sm overflow-y-auto max-h-[30rem]"
        />
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 m-2 sm:m-6">
      <Breadcrumb lineID={lineID} />
      <div className="xl:col-span-2 bg-white dark:bg-gray-800 p-4">
        <SearchBar />
      </div>


      {lineData && (
        <div className="xl:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-4 xl:p-6 flex flex-col w-full">
            <h2 className="xl:text-xl font-semibold mr-4"><a href={lineData.plans[0].link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 hover:underline">{lineData.plans[0].label}</a></h2>
            <div className="max-w-full mt-4">
              {/* <PDFAsImg planURL={lineData.plans[0].link} /> */}
            </div>
          </div>
        </div>
      )}

      {lineData && 'scheduleDocs' in lineData && (
        <div className="xl:col-span-2">
          <div className="bg-white dark:bg-gray-800 p-4 xl:p-6 flex flex-col w-full">
            <h2 className="xl:text-xl font-semibold mr-4"><a href={lineData.scheduleDocs[0].link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 hover:underline">{lineData.scheduleDocs[0].label}</a></h2>
            <div className="max-w-full mt-4">
              {/* <PDFAsImg planURL={lineData.scheduleDocs[0].link} /> */}
            </div>
          </div>
        </div>
      )}

      <div className='bg-white dark:bg-gray-800 dark:text-white p-4 xl:p-6 flex flex-col w-full'>
        <div className="grid grid-cols-3 gap-1 mx-auto p-1 rounded-lg border border-gray-300 w-full" role="group">
          <TabButton label="En cours" value="current" />
          <TabButton label="À venir" value="forecast" />
          <TabButton label="Twitter" value="twitter" />
        </div>
        <div className="mt-4">
          {activeTab === 'current' && lineData?.currentIT?.map(renderItem)}
          {activeTab === 'forecast' && lineData?.forecastIT?.map(renderItem)}
        </div>
      </div>

    </div>
  );
}

export default LineInfo;