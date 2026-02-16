import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Events", path: "/events" },
    { name: "Team", path: "/team" },
    { name: "Stay", path: "/stay" },
    // { name: "Sponsors", path: "/sponsors" },
    { name: "Gallery", path: "/gallery" },
    { name: "Brochure", path: "/brochures" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 w-full z-50 bg-[#0a0a0f]/80 backdrop-blur-lg border-b border-white/5 py-4 transition-all duration-300"
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-white tracking-wider flex items-center gap-2" onClick={closeMenu}>
            <span className="text-neon-cyan">ECLECTIQUE</span> <span className="text-neon-purple">2K26</span>
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  to={link.path}
                  className={`relative font-medium text-sm tracking-wide transition-colors duration-300 uppercase ${location.pathname === link.path
                    ? "text-neon-cyan"
                    : "text-gray-300 hover:text-white"
                    }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-neon-cyan shadow-[0_0_10px_#00f3ff]"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none z-50 relative pointer-events-auto">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center md:hidden"
          >
            <ul className="flex flex-col space-y-8 text-center">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={closeMenu}
                    className={`text-3xl font-bold uppercase tracking-wider ${location.pathname === link.path ? "text-neon-cyan" : "text-white"
                      }`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
