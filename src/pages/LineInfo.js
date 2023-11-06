import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';
import stationsData from '../assets/emplacement-des-gares-idf.json';
import DisruptionInfo from '../components/DisruptionInfo';
import Breadcrumb from '../components/breadcrumb';
import { checkDisruptions } from '../components/Trafic';
import SearchBar from '../components/SearchBar2'
import Plan from '../components/showPlan';

function LineInfo() {
  const { lineID } = useParams();

  const [trainDataA, setTrainDataA] = useState([]);
  const [disruptedLines, setDisruptedLines] = useState([]);
  const [lineData, setLineData] = useState(null);


  useEffect(() => {
    const fetchDisruptions = async () => {
      const { disruptedLines } = await checkDisruptions();
      setDisruptedLines(disruptedLines);
    };

    fetchDisruptions();
  }, []);

  useEffect(() => {
    const fetchLineData = async () => {
      const response = await fetch(`https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:${lineID}/schedules`);
      const data = await response.json();
      setLineData(data);
    };

    fetchLineData();
  }, [lineID]);


  const [trainData, setTrainData] = useState([]);
  const [status, setStatus] = useState('');
  const [activeTab, setActiveTab] = useState('current');

  const handleClick = (tab) => {
      setActiveTab(tab);
  };
  
  const fetchData = async (url) => {
      try {
          const response = await fetch(url);
          const data = await response.json();

          setTrainData(data);
          setStatus(data.errorMessage);
      } catch (error) {
          console.error(error);
      }
  };

  useEffect(() => {
      const url = `https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:${lineID}/schedules`;
      fetchData(url);
  }, [lineID]);
  
  const disruption = disruptedLines.find(ligne => ligne.lineId === 'line:IDFM:' + lineID);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 m-2 sm:m-6">
      <Breadcrumb lineID={lineID} />

      {/* <img src={process.env.PUBLIC_URL + `/images/${transportLogo}${localStorage.theme === 'dark' ? '_LIGHT' : ''}.svg`} alt={transportLogo} className="h-5 lg:h-10 mr-1" /> */}
      <img src={process.env.PUBLIC_URL + `/images/${lineID}.svg`} alt={lineID} className="h-5 lg:h-10 mr-2 lg:mr-4" />

      <div className="xl:col-span-2">
        <SearchBar />
      </div>

      {lineData && (
      <div className="xl:col-span-2">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 xl:p-6 flex flex-col w-full">
          <h2 className="xl:text-xl font-semibold border-1 mr-4"><a href={lineData.plans[0].link} target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-300 hover:underline">{lineData.plans[0].label} 🗺</a></h2>
          <div className="max-w-full mt-4">
            <Plan planURL={lineData.plans[0].link} />
            {/* <Plan planURL={"https://eu.ftp.opendatasoft.com/stif/PlansRegion/Plans/REGION_GF.pdf"} /> */}
          </div>
        </div>
      </div>
      )}

      {/* <Plan planURL={lineData} /> */}
      <DisruptionInfo selectedDisruption={disruption} />
      <div className="bg-white rounded-lg p-6 flex flex-col">
        {lineData && (
          <>
                    
            {/* <div className="mb-4">
              <h3 className="text-md font-medium mb-2">Schedule Documents</h3>
              {lineData.scheduleDocs.map(doc => (
                <a href={doc.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{doc.label}</a>
              ))}
            </div> */}

            {/* <div id="doc-pdf">
              <h3 className="text-md font-medium mb-2">Schedule Documents</h3>
              {lineData.scheduleDocs.map(doc => (
                <div key={doc.label}>
                  <Document file={doc.link} onLoadSuccess={onDocLoadSuccess}>
                    {Array.from(new Array(numPagesDoc), (el, index) => (
                      <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={scaleDoc} renderTextLayer={false} renderAnnotationLayer={false}/>
                    ))}
                  </Document>
                </div>
              ))}
            </div> */}
  <div>
      <div class="w-full inline-flex rounded-md shadow-sm" role="group">
        <button
          type="button"
          class={`w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
            activeTab === 'current' ? 'bg-blue-700 text-white' : ''
          }`}
          onClick={() => handleClick('current')}
        >
          Aujourd'hui
        </button>
        <button
          type="button"
          class={`w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white ${
            activeTab === 'forecast' ? 'bg-blue-700 text-white' : ''
          }`}
          onClick={() => handleClick('forecast')}
        >
          À venir
        </button>
        <button
          type="button"
          class="w-full px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Twitter
        </button>
      </div>

      <div>
        {activeTab === 'current' &&
          trainData.currentIT &&
          trainData.currentIT.map((current) => (
            <>
              <div
                key={current.id}
                className="flex items-center bg-white shadow-md h-8 xl:h-10 p-3 lg:p-4 mb-1"
              >
                <div className="flex-grow overflow-hidden">
                  <h2 className="font-medium text-xs lg:text-sm line-clamp-2">
                    {current.title}
                  </h2>
                </div>
                <div className="ml-1 lg:ml-5 pr-2 text-right">
                  <p className="text-sm lg:text-base font-semibold">
                    {current.impactStartTime} - {current.impactEndTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-6 cursor-pointer">
                <p className="text-sm xl:text-base xl:font-semibold flex grow">
                  {current.title}
                </p>
                <p className="text-xs xl:text-base font-semibold ml-4 xl:mr-4">
                  {' '}
                  {current.impactStartTime}
                </p>
                <p className="text-xs xl:text-base font-semibold ml-4 xl:mr-4">
                  {' '}
                  {current.impactEndTime}
                </p>
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: current.message }}
                className="border border-gray-300 p-4 rounded-lg mt-2 overflow-y-auto max-h-[30rem]"
              />
            </>
          ))}

        {activeTab === 'forecast' &&
          trainData.forecastIT &&
          trainData.forecastIT.map((forecast) => (
            <div
              key={forecast.id}
              className="flex items-center bg-white shadow-md h-8 xl:h-10 p-3 lg:p-4 mb-1"
            >
              <div className="flex-grow overflow-hidden">
                <h2 className="font-medium text-xs lg:text-sm line-clamp-2">
                  {forecast.title}
                </h2>
              </div>
              <div className="ml-1 lg:ml-5 pr-2 text-right">
                <p className="text-sm lg:text-base font-semibold">
                  {forecast.impactStartTime} - {forecast.impactEndTime}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>

          </>
        )}
      </div>
    </div>
  );

}

export default LineInfo;