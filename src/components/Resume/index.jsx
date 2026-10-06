import { useEffect, useState } from "react";
import pdf from "../../assets/CV_Christian_Arias_ES.pdf";
import pdfEn from "../../assets/CV_Christian_Arias_EN.pdf";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import 'react-pdf/dist/Page/TextLayer.css';
import "./index.scss";


pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString();

const pageWidth = () => Math.min(820, window.innerWidth - 48);

const Resume = () =>{
  const [numPages, setNumPages] = useState(null);
  const [width, setWidth] = useState(pageWidth);

  useEffect(() => {
    const onResize = () => setWidth(pageWidth());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <section className="section resume-section">
      <h1 className="section-title"><span>cv/</span>Currículum</h1>
      <div className="resume-actions">
        <a className="btn btn-primary" href={pdf} download="CV_Christian_Arias_ES.pdf">
          Descargar CV
        </a>
        <a className="btn btn-outline" href={pdfEn} download="CV_Christian_Arias_EN.pdf">
          Download CV (English)
        </a>
      </div>

      <div className="resume">
        <Document file={pdf} onLoadSuccess={onDocumentLoadSuccess} loading={<p className="resume-loading">Cargando CV…</p>}>
          {Array.from(
            new Array(numPages),
            (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} width={width} />
            ),
          )}
        </Document>
      </div>
    </section>
  );
}

export default Resume;
