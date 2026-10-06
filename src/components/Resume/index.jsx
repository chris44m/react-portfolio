import React, { useState } from "react";
import pdf from "../../assets/CV_Christian_Arias_ES.pdf";
import pdfEn from "../../assets/CV_Christian_Arias_EN.pdf";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import 'react-pdf/dist/Page/TextLayer.css';
import "./index.scss";


pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

const Resume = () =>{
    const [numPages, setNumPages] = useState(null);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="resume-section">
      <div className="text-center">
        <a className="download-button" href={pdf} download="CV_Christian_Arias_ES.pdf">
          Descargar CV
        </a>
        <a className="download-button" href={pdfEn} download="CV_Christian_Arias_EN.pdf">
          Download CV (English)
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
        <a className="download-button" href={pdf} download="CV_Christian_Arias_ES.pdf">
          Descargar CV
        </a>
        <a className="download-button" href={pdfEn} download="CV_Christian_Arias_EN.pdf">
          Download CV (English)
        </a>
      </div>
    </div>
  );
}

export default Resume;
