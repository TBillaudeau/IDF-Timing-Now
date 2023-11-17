import React, { useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function Plan({ planURL }) {
  const parentDivRef = useRef();

  return (
    <div ref={parentDivRef}>
      {planURL && (
        <Document file={planURL}>
          <Page pageNumber={1} width={parentDivRef.current?.offsetWidth || 0} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      )}
    </div>
  );
}

export default Plan;