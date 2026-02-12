import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-deep-navy text-white">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-deep-navy to-black opacity-80" />
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

      {/* Animated Glow Orbs */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px]"
      />
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[120px]"
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-neon-cyan tracking-[0.2em] font-medium mb-4 uppercase"
        >
          National Level Technical Symposium
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-2 tracking-tighter"
        >
          <span className="text-white text-glow">ECLECTIQUE</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple text-glow-purple">2K26</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center gap-2 mt-6"
        >
          <p className="text-xl md:text-2xl font-light text-gray-300">
            JNTU-GV Vizianagaram
          </p>
          <p className="text-lg text-neon-purple font-semibold tracking-wide border border-neon-purple/30 px-4 py-1 rounded-full bg-neon-purple/5 backdrop-blur-sm">
            March 04 & 05, 2026
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12"
        >
          <button
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="relative px-8 py-4 bg-transparent group overflow-hidden rounded-md border border-neon-cyan/50 text-neon-cyan font-bold tracking-wider hover:text-deep-navy transition-colors duration-300 cursor-pointer"
          >
            <span className="absolute inset-0 w-full h-full bg-neon-cyan/0 group-hover:bg-neon-cyan transition-all duration-300 ease-out"></span>
            <span className="relative z-10">REGISTER NOW</span>
            <div className="absolute inset-0 rounded-md box-shadow-[0_0_20px_rgba(0,243,255,0.4)] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 cursor-pointer"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-neon-cyan to-transparent"></div>
      </motion.div>

    </div>
  );
};

export default HeroSection;
