import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Skills from './pages/Skills';
import Interests from './pages/Interests';
import Contact from './pages/Contact';
import { Navigation, Footer } from './components';

function App() {
  const footerLinks = [
    { label: 'GitHub', url: 'https://github.com/chenyue' },
    { label: 'LinkedIn', url: 'https://linkedin.com/in/chenyue' },
    { label: 'Email', url: 'mailto:hello@chenyue.dev' },
  ];

  return (
    <Router>
      <div className="min-h-screen bg-background text-text">
        <Navigation />
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/interests" element={<Interests />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </motion.main>
        <Footer links={footerLinks} />
      </div>
    </Router>
  );
}

export default App;
