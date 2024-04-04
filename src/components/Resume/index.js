import React, { useState } from "react";
import pdf from "../../assets/CV2024-ChristianARIAS.pdf";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import 'react-pdf/dist/Page/TextLayer.css';
import "./index.scss";


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

const Resume = () =>{
    const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="resume-section">
      <div className="text-center">
        <a className="download-button" href={pdf} download="CV-Christian-Arias.pdf">
          Descargar CV
        </a>
      </div>

      <div className="resume">
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(
            new Array(numPages),
            (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ),
          )}
        </Document>
      </div>

      <div className="text-center">
        <a className="download-button" href={pdf} download="CV-Christian-Arias.pdf">
          Descargar CV
        </a>
      </div>
    </div>
  );
}

export default Resume;
