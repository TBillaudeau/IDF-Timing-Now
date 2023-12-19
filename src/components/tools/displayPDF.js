import React, { useRef } from 'react';
import { Document, Page } from 'react-pdf';
import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

function PDFAsImg({ planURL }) {
  const parentDivRef = useRef();

  const handleLoadError = () => {
    // Do nothing when the PDF fails to load
  };

  return (
    <div ref={parentDivRef}>
      {planURL && (
        <Document file={planURL} onLoadError={handleLoadError}>
          <Page pageNumber={1} width={parentDivRef.current?.offsetWidth || 0} renderTextLayer={false} renderAnnotationLayer={false} />
        </Document>
      )}
    </div>
  );
}

export default PDFAsImg;