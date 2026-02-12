import { motion } from "framer-motion";

const sponsors = [
  // Example sponsors structure
  { name: "Sponsor 1", tier: "Title Sponsor", logo: "https://via.placeholder.com/300x150?text=Sponsor+1" },
  { name: "Sponsor 2", tier: "Power Sponsor", logo: "https://via.placeholder.com/300x150?text=Sponsor+2" },
  { name: "Sponsor 3", tier: "Associate Sponsor", logo: "https://via.placeholder.com/300x150?text=Sponsor+3" },
  { name: "Sponsor 4", tier: "Associate Sponsor", logo: "https://via.placeholder.com/300x150?text=Sponsor+4" },
  { name: "Sponsor 5", tier: "Supporting Partner", logo: "https://via.placeholder.com/300x150?text=Sponsor+5" },
  { name: "Sponsor 6", tier: "Supporting Partner", logo: "https://via.placeholder.com/300x150?text=Sponsor+6" },
];

const Sponsors = () => {
  return (
    <div className="min-h-screen pt-24 px-4 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-4">
          OUR <span className="text-neon-cyan text-glow">SPONSORS</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          We are proud to be supported by industry leaders who help make Eclectique 2K26 a reality.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {sponsors.map((sponsor, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative p-8 rounded-xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-neon-cyan/50 transition-all duration-300 flex items-center justify-center h-48"
          >
            <div className="absolute inset-0 bg-neon-cyan/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

            <img
              src={sponsor.logo}
              alt={sponsor.name}
              className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110 relative z-10"
            />

            <div className="absolute bottom-2 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-mono text-neon-purple uppercase tracking-widest">{sponsor.tier}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center mt-20"
      >
        <p className="text-gray-300 mb-6">Interested in sponsoring Eclectique 2K26?</p>
        <button className="px-8 py-3 bg-neon-purple/20 border border-neon-purple/50 text-neon-purple font-bold tracking-wider hover:bg-neon-purple hover:text-white transition-all duration-300 rounded-sm">
          BECOME A SPONSOR
        </button>
      </motion.div>
    </div>
  );
};

export default Sponsors;
