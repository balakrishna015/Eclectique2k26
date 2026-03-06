import { motion } from "framer-motion";

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

        {/* Hero Image
        <div className="w-full h-64 md:h-96 bg-gray-800 rounded-2xl mb-12 overflow-hidden relative shadow-2xl border border-white/10">
          <ImageWithSkeleton
            src=""
            alt="Hostel"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white/90">COMFORT & CONVENIENCE</h2>
          </div>
        </div> */}

        {/* Pricing Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <div className="text-left">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              We provide comfortable accommodation for participants coming from distant locations.
              Arrangements such as Food & Stay  are available for boys and girls within the university campus or nearby Campus hostels.
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
            <h3 className="text-xl font-display font-bold text-white mb-5">TARIFF DETAILS</h3>

            {/* Two pricing tiers */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              {/* 1-Day */}
              <div className="flex flex-col items-center p-4 rounded-lg border border-white/10 bg-white/5">
                <span className="text-2xl font-bold text-white mb-1">₹ 300/-</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Per Person</span>
                <span className="mt-2 text-xs text-neon-purple font-semibold uppercase tracking-wider">1 Day</span>
              </div>
              {/* 2-Day — highlighted */}
              <div className="flex flex-col items-center p-4 rounded-lg border border-neon-cyan/50 bg-neon-cyan/5 relative">
                <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[9px] bg-neon-cyan text-black font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap">Full Fest</span>
                <span className="text-2xl font-bold text-neon-cyan mb-1">₹ 500/-</span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">Per Person</span>
                <span className="mt-2 text-xs text-neon-purple font-semibold uppercase tracking-wider">2 Days</span>
              </div>
            </div>
           

            <div className="bg-white/5 p-3 rounded text-sm text-gray-300 mb-6">
              Includes: Stay + Food Implications
            </div>
            
              <div className="block w-full bg-white/10 text-gray-500 py-3 rounded font-bold tracking-widest cursor-not-allowed text-center border border-white/10">
                REGISTRATIONS CLOSED
            </div>
            
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
