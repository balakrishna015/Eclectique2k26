import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#05050a] flex flex-col items-center justify-center relative overflow-hidden text-center px-4">
      {/* Glitch Background Effect */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10"
      >
        <h1 className="text-9xl font-display font-black text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400 tracking-tighter mb-4 relative">
          404
          <span className="absolute inset-0 text-red-500 blur-sm opacity-50 animate-pulse">404</span>
        </h1>

        <div className="w-full h-1 bg-red-600/50 mb-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-red-500 w-1/3 animate-[shimmer_2s_infinite_linear]" />
        </div>

        <h2 className="text-2xl md:text-3xl font-mono text-red-500 mb-8 uppercase tracking-widest font-bold">
          SYSTEM FAILURE: PAGE NOT FOUND
        </h2>

        <p className="text-gray-400 max-w-md mx-auto mb-12 font-mono text-sm leading-relaxed">
          The requested trajectory is invalid. You have stayed too far from the known universe. Return to base immediately.
        </p>

        <Link to="/">
          <button className="relative group px-8 py-4 bg-red-500/10 border border-red-500/50 text-red-500 font-bold tracking-[0.2em] hover:bg-red-500 hover:text-black transition-all duration-300 rounded uppercase overflow-hidden">
            <span className="relative z-10">RETURN TO BASE</span>
            <div className="absolute inset-0 bg-red-500 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </button>
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
