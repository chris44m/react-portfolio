import './App.scss';
import { lazy, Suspense } from 'react';
import { Routes,Route } from 'react-router-dom';
import Loader from './components/Loader';
import Layout from './components/Layout';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

const Resume = lazy(() => import('./components/Resume'));

function App() {
  return (
      <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cv" element={
            <Suspense fallback={<Loader />}>
              <Resume />
            </Suspense>
          } />
        </Route>
      </Routes>

      </>
  )
}

export default App;
