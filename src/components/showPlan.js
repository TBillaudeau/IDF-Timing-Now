import React, { useState, useEffect, useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString();

function Plan({ planURL }) {
    const [numPages, setNumPages] = useState(null);
    const [width, setWidth] = useState(0); // Define width state here

    const parentDivRef = useRef();

    useEffect(() => {
        if (parentDivRef.current) {
            setWidth(parentDivRef.current.offsetWidth);
        }
    }, [parentDivRef]);

    function onPlanLoadSuccess({ numPages }) {
        setNumPages(numPages);
    }

    return (
        <div ref={parentDivRef}>
            {planURL && (
                console.log(planURL),
                <div>
                    <Document file={planURL} onLoadSuccess={onPlanLoadSuccess}>
                        {Array.from(new Array(numPages), (el, index) => (
                        <Page key={`page_${index + 1}`} pageNumber={index + 1} width={parentDivRef.current ? parentDivRef.current.offsetWidth : 0} renderTextLayer={false} renderAnnotationLayer={false}/>
                        ))}
                    </Document>
                </div>
            )}
        </div>
    );
}

export default Plan;