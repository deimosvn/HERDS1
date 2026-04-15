import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TechSpecs from './components/TechSpecs';
import Impact from './components/Impact';
import Team from './components/Team';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-slate antialiased selection:bg-leaf/20 selection:text-forest">
      <Navbar />
      <Hero />
      <Features />
      <TechSpecs />
      <Impact />
      <Team />
      <Contact />
      <Footer />
    </div>
  );
}
