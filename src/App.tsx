import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Accommodation from "./pages/Accommodation";
import Sponsors from "./pages/Sponsors";
import Gallery from "./pages/Gallery";
import Brochure from "./pages/Brochure";
import ScrollToTop from "./components/ScrollToTop";
import PageTransition from "./components/PageTransition";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><Home /></PageTransition>} />
        <Route path="/events" element={<PageTransition><Events /></PageTransition>} />
        <Route path="/team" element={<PageTransition><Team /></PageTransition>} />
        <Route path="/stay" element={<PageTransition><Accommodation /></PageTransition>} />
        <Route path="/sponsors" element={<PageTransition><Sponsors /></PageTransition>} />
        <Route path="/gallery" element={<PageTransition><Gallery /></PageTransition>} />
        <Route path="/brochure" element={<PageTransition><Brochure /></PageTransition>} />
        <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

import ParticlesBackground from "./components/ParticlesBackground";

import GlobalErrorBoundary from "./components/GlobalErrorBoundary";

function App() {
  return (
    <Router>
      <GlobalErrorBoundary>
        <ScrollToTop />
        {/* Base Background */}
        <div className="fixed inset-0 bg-[#0a0a0f] -z-10" />
        <ParticlesBackground />
        <div className="relative z-10 bg-transparent min-h-screen text-white font-sans selection:bg-neon-cyan selection:text-deep-navy flex flex-col">
          <Navbar />
          <div className="flex-grow">
            <AnimatedRoutes />
          </div>
          <Footer />
        </div>
      </GlobalErrorBoundary>
    </Router>
  );
}

export default App;
