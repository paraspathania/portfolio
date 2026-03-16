import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Education from './sections/Education';
import Certifications from './sections/Certifications';
import Contact from './sections/Contact';
import ScrollProgress from './components/ui/ScrollProgress';
import GlobalSpace from './components/layout/GlobalSpace';

function App() {
  return (
    <div className="bg-transparent min-h-screen text-slate-100 font-sans selection:bg-teal-400/30 selection:text-orange-200">
      {/* Fixed global 3D space theme behind everything */}
      <GlobalSpace />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;


