import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import TrainInfo from '../components/Timing';
import StationInfo from '../components/Header';
import stationsData from '../assets/emplacement-des-gares-idf.json';
import DisruptionInfo from '../components/DisruptionInfo';
import { checkDisruptions } from '../components/Trafic';
import { Document, Page, pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function LineInfo() {
  const { line } = useParams();

  const [trainDataA, setTrainDataA] = useState([]);
  const [disruptedLines, setDisruptedLines] = useState([]);
  const [lineData, setLineData] = useState(null);
  const [numPagesPlan, setNumPagesPlan] = useState(null);
  const [numPagesDoc, setNumPagesDoc] = useState(null);
  const [scalePlan, setScalePlan] = useState(1);
  const [scaleDoc, setScaleDoc] = useState(1);

  useEffect(() => {
    const fetchDisruptions = async () => {
      const { disruptedLines } = await checkDisruptions();
      setDisruptedLines(disruptedLines);
    };

    fetchDisruptions();
  }, []);

  useEffect(() => {
    const fetchLineData = async () => {
      const response = await fetch(`https://api-iv.iledefrance-mobilites.fr/lines/line:IDFM:${line}/schedules?complete=false`);
      const data = await response.json();
      setLineData(data);
    };

    fetchLineData();
  }, [line]);

  function onPlanLoadSuccess({ numPages }) {
    setNumPagesPlan(numPages);
    setScalePlan(Math.min(1, document.getElementById('plan-pdf').clientWidth / 600));
  }

  function onDocLoadSuccess({ numPages }) {
    setNumPagesDoc(numPages);
    setScaleDoc(Math.min(1, document.getElementById('doc-pdf').clientWidth / 600));
  }

  const disruption = disruptedLines.find(ligne => ligne.lineId === 'line:IDFM:' + line);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 m-2 sm:m-6">
      <DisruptionInfo selectedDisruption={disruption} />

      <div className="bg-white rounded-lg p-6 flex flex-col">
        {lineData && (
          <>
            <div>
              <h3 className="text-md font-medium mb-2">Line Plan</h3>
              {lineData.plans.map(plan => (
                <a href={plan.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{plan.label}</a>
              ))}
            </div>  

            <div id="plan-pdf">
              <h3 className="text-md font-medium mb-2">Line Plan</h3>
              <Document file={lineData.plans[0].link} onLoadSuccess={onPlanLoadSuccess}>
                {Array.from(new Array(numPagesPlan), (el, index) => (
                  <Page key={`page_${index + 1}`} pageNumber={index + 1} scale={scalePlan} renderTextLayer={false} renderAnnotationLayer={false}/>
                ))}
              </Document>
            </div>
                    
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

          </>
        )}
      </div>
    </div>
  );

}

export default LineInfo;