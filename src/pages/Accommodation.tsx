import { motion } from "framer-motion";
import ImageWithSkeleton from "../components/ui/ImageWithSkeleton";

const Accommodation = () => {
  const coordinators = [
    { name: "H. Sandeep", role: "Accommodation Coordinator", phone: "+91 77021 72646" },
    { name: "Mohit", role: "Accommodation Coordinator", phone: "+91 90639 03443" },
    { name: "Ch Jyothi", role: "Accommodation (Girls)", phone: "+91 93814 56679" },
    { name: "B Mohini", role: "Accommodation (Girls)", phone: "+91 73867 91690" }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto text-center"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-8 tracking-tight text-glow">
          ACCOMMODATION
        </h1>

        {/* Hero Image */}
        <div className="w-full h-64 md:h-96 bg-gray-800 rounded-2xl mb-12 overflow-hidden relative shadow-2xl border border-white/10">
          <ImageWithSkeleton
            src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?q=80&w=2069"
            alt="Hostel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white/90">COMFORT & CONVENIENCE</h2>
          </div>
        </div>

        {/* Pricing Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="text-left">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              We provide comfortable accommodation for participants coming from distant locations.
              Separate arrangements are available for boys and girls within the university campus or nearby authorized hostels.
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-3 text-neon-cyan">
                <span className="text-xl">✓</span> <span>Secure & Hygiene Environment</span>
              </div>
              <div className="flex items-center gap-3 text-neon-cyan">
                <span className="text-xl">✓</span> <span>24/7 Assistance</span>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-md p-8 rounded-xl border border-neon-cyan/30 relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <svg width="100" height="100" viewBox="0 0 24 24" fill="white"><path d="M2 22v-8h20v8H2zm2-2h16v-4H4v4zm6-12h4v2h-4V8zm0 4h4v2h-4v-2zm-6-8h16v2H4V4z" /></svg>
            </div>
            <h3 className="text-xl font-display font-bold text-white mb-4">TARIFF DETAILS</h3>
            <div className="text-4xl font-bold text-neon-cyan mb-2">₹ 500/- <span className="text-sm text-gray-400 font-normal">(Approx)</span></div>
            <p className="text-neon-purple font-medium uppercase tracking-wider text-sm mb-6">Per Person / For Two Days</p>
            <div className="bg-white/5 p-3 rounded text-sm text-gray-300 mb-6">
              Includes: Stay + Food Implications
            </div>
            <a
              href="https://tinyurl.com/45ku73nr"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-neon-cyan text-deep-navy py-3 rounded font-bold tracking-widest hover:bg-white transition-colors duration-300"
            >
              BOOK ACCOMMODATION
            </a>
          </div>
        </div>

        {/* Coordinators Grid */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12">
          <h2 className="text-2xl font-display font-bold text-white mb-10 uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Accommodation Coordinators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {coordinators.map((coord, i) => (
              <div key={i} className="flex flex-col items-center p-6 bg-deep-navy rounded-lg border border-white/5 hover:border-neon-purple/50 transition-colors group">
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">{coord.name}</h3>
                <p className="text-neon-purple text-xs uppercase tracking-wider font-medium mb-3">{coord.role}</p>
                <a href={`tel:${coord.phone}`} className="text-gray-400 hover:text-white text-sm font-mono border border-white/10 px-3 py-1 rounded-full">{coord.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Accommodation;
