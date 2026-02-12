import { motion } from "framer-motion";

const Brochure = () => {
  return (
    <div className="min-h-screen bg-deep-navy pt-24 pb-20 px-8 flex flex-col items-center justify-center relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-neon-purple/20 rounded-full blur-[150px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="z-10 text-center"
      >
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-8 text-glow">
          BROCHURE
        </h1>

        {/* Brochure Preview (Placeholder) */}
        <div className="w-[300px] md:w-[400px] aspect-[1/1.414] bg-white/5 border border-white/10 rounded-lg shadow-2xl mx-auto mb-12 flex items-center justify-center relative group overflow-hidden glass">
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <span className="text-gray-500 font-mono tracking-widest group-hover:scale-110 transition-transform duration-500">PREVIEW COVER</span>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-10 py-5 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan font-bold text-xl tracking-widest uppercase rounded-sm overflow-hidden"
          onClick={() => alert("Brochure PDF downloading...")}
        >
          <span className="absolute inset-0 bg-neon-cyan translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 group-hover:text-deep-navy transition-colors duration-300 flex items-center gap-3">
            Download PDF
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </span>
          <div className="absolute inset-0 rounded-sm box-shadow-[0_0_25px_rgba(0,243,255,0.6)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Brochure;
