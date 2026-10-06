import { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Main from './components/Main';

const Resume = lazy(() => import('./components/Resume'));

function App() {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="about" element={<Navigate to="/#sobre-mi" replace />} />
          <Route path="proyectos" element={<Navigate to="/#proyectos" replace />} />
          <Route path="contact" element={<Navigate to="/#contacto" replace />} />
          <Route path="cv" element={
            <Suspense fallback={<p className="section">Cargando CV…</p>}>
              <Resume />
            </Suspense>
          } />
        </Route>
      </Routes>
  )
}

export default App;
