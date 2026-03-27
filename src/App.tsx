// src/App.tsx
import { useState, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';
import Intro from './features/Home/Intro';

// Lazy-loaded pages
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// 1. IMPORT THE NEW RESOURCES PAGE
const Resources = lazy(() => import('./pages/Resources'));

// New lazy-loaded pages
const Terms = lazy(() => import('./pages/Terms'));
const Privacy = lazy(() => import('./pages/Privacy'));
const FAQs = lazy(() => import('./pages/FAQs'));

const PreEngineeredBuildings = lazy(
  () => import('./features/Services/PreEngineeredBuildings')
);
const StructuralSteelDetailing = lazy(
  () => import('./features/Services/StructuralSteelDetailing')
);
const SteelDesignAnalysis = lazy(
  () => import('./features/Services/SteelDesignAnalysis')
);
const BimConsulting = lazy(
  () => import('./features/Services/BimConsulting')
);

const Projects = lazy(() => import('./features/Home/Projects'));

function App() {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* MAIN APP */}
      <div
        className={`min-h-screen bg-slate-900 transition-opacity duration-700 ${showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
      >
        {/* NAVBAR */}
        <Navbar />

        <ScrollToTop />

        <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />

            {/* 2. ADD THE ROUTE HERE */}
            <Route path="/resources" element={<Resources />} />

            {/* New Routes */}
            <Route path="/terms" element={<Terms />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/faqs" element={<FAQs />} />

            <Route
              path="/projects"
              element={
                <div className="pt-20">
                  <Projects />
                </div>
              }
            />

            {/* Service Sub-pages */}
            <Route path="/services/peb-detailing" element={<PreEngineeredBuildings />} />
            <Route path="/services/structural-steel" element={<StructuralSteelDetailing />} />
            <Route path="/services/steel-design" element={<SteelDesignAnalysis />} />
            <Route path="/services/bim-consulting" element={<BimConsulting />} />
          </Routes>
        </Suspense>
      </div>

      {/* INTRO OVERLAY */}
      {showIntro && <Intro onComplete={() => setShowIntro(false)} />}
    </>
  );
}

export default App;