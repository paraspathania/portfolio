import React from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './sections/Hero';
import About from './sections/About';
import Skills from './sections/Skills';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import ScrollProgress from './components/ui/ScrollProgress';
import StarField from './components/ui/StarField';

function App() {
  return (
    <div className="bg-[#0f172a] min-h-screen text-slate-100 font-sans selection:bg-teal-400/30 selection:text-orange-200">
      {/* Fixed star-field behind everything */}
      <StarField />
      <ScrollProgress />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

