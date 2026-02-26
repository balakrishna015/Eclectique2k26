import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Team from "./pages/Team";
import Accommodation from "./pages/Accommodation";
import Sponsors from "./pages/Sponsors";
import Gallery from "./pages/Gallery";
import Brochures from "./pages/Brochures";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound";
import WarpLoader from "./components/WarpLoader";
import ParticlesBackground from "./components/ParticlesBackground";
import GlobalErrorBoundary from "./components/GlobalErrorBoundary";

// ── Warp-gated routing ────────────────────────────────────────────────────────
// WarpLoader fires on every route change. Once it signals "arrival", the page
// content fades in. Navbar is hidden behind the warp (z-[9999]) then appears.
const AnimatedRoutes = () => {
  const location = useLocation();
  const [showLoader, setShowLoader] = useState(true);

  // Trigger the warp loader on every pathname change
  useEffect(() => {
    setShowLoader(true);
  }, [location.pathname]);

  return (
    <>
      {/* ── Warp canvas — fires on every route change ───────────────────── */}
      <AnimatePresence>
        {showLoader && (
          <WarpLoader
            key={`warp-${location.pathname}`}
            onComplete={() => setShowLoader(false)}
          />
        )}
      </AnimatePresence>

      {/* ── Page content — fades in after warp deceleration ─────────────── */}
      <motion.div
        key={location.pathname}
        animate={{ opacity: showLoader ? 0 : 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex flex-col min-h-screen"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/events" element={<Events />} />
          <Route path="/team" element={<Team />} />
          <Route path="/stay" element={<Accommodation />} />
          <Route path="/sponsors" element={<Sponsors />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/brochures" element={<Brochures />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </motion.div>
    </>
  );
};

// ── Root app ──────────────────────────────────────────────────────────────────
function App() {
  return (
    <Router>
      <GlobalErrorBoundary>
        <ScrollToTop />
        {/* Base background */}
        <div className="fixed inset-0 bg-[#0a0a0f] -z-10" />
        <ParticlesBackground />
        <div className="relative z-10 bg-transparent min-h-screen text-white font-sans selection:bg-neon-cyan selection:text-deep-navy">
          <Navbar />
          <AnimatedRoutes />
        </div>
      </GlobalErrorBoundary>
    </Router>
  );
}

export default App;
