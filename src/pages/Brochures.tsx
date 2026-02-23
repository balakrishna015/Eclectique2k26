import { motion } from "framer-motion";
import { Download, ExternalLink } from "lucide-react";
import ImageWithSkeleton from "../components/ui/ImageWithSkeleton";

// --- DATA ---
const BROCHURES = [
  {
    id: 0,
    title: "MAIN BROCHURE",
    category: "Official Guide",
    image: "../../brochures/Main-brochure.webp", // Ensure this image exists
    link: "../../brochures/Main-brochure.webp",
    isMain: true
  },
  {
    id: 1,
    title: "EV TECHNOLOGY",
    category: "Workshop",
    image: "../../brochures/ev-workshop.webp",
    link: "../../brochures/ev-workshop.webp"
  },
  {
    id: 2,
    title: "TABLEAU",
    category: "Workshop",
    image: "../../brochures/tableau-workshop.webp",
    link: "../../brochures/tableau-workshop.webp"
  },
  {
    id: 3,
    title: "WATT VISION",
    category: "Project Expo",
    image: "../../brochures/wattvision.webp",
    link: "../../brochures/wattvision.webp"
  },
  {
    id: 4,
    title: "BRAIN WAVE",
    category: "Quiz",
    image: "../../brochures/Brainwave.webp",
    link: "../../brochures/Brainwave.webp"
  },
  {
    id: 5,
    title: "Treasure Hunt",
    category: "Treasure Hunt",
    image: "../../brochures/TreasureHunt.webp",
    link: "../../brochures/puzzle-mania.webp"
  },
  {
    id: 6,
    title: "MIND ARENA",
    category: "Tech Challenge",
    image: "../../brochures/Mindarena.webp",
    link: "../../brochures/Mindarena.webp"
  },
  {
    id: 7,
    title: "PIXEL LENS",
    category: "Photography",
    image: "../../brochures/Pixel-lens.webp",
    link: "../../brochures/Pixel-lens.webp"
  },
  {
    id: 8,
    title: "ART SPARK",
    category: "Creative Arts",
    image: "../../brochures/Artspark.webp",
    link: "../../brochures/Artspark.webp"
  }
];

const Brochures = () => {
  return (
    <div className="min-h-screen pt-32 pb-20 px-4 md:px-8 bg-black relative z-10">

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-cyan/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-neon-purple/5 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">

        {/* HEADER */}
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-display font-bold text-white mb-4 tracking-wider"
          >
            THE <span className="text-neon-cyan">BROCHURES</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg max-w-2xl mx-auto font-light"
          >
            Digital blueprints and technical directives for Eclectique 2K26.
          </motion.p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BROCHURES.map((item, index) => (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`
                group relative aspect-[3/4] overflow-hidden rounded-xl border border-white/10 bg-white/5 cursor-pointer
                hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(0,243,255,0.2)] transition-all duration-500
                ${item.isMain ? "border-neon-cyan/30 shadow-[0_0_15px_rgba(0,243,255,0.1)]" : ""}
              `}
            >
              {/* Image */}
              <div className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105">
                <ImageWithSkeleton
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
              </div>

              {/* Technical Metadata Overlay (Slide Up) */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black/80 backdrop-blur-md border-t border-neon-cyan/30 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 flex flex-col items-start z-20">
                <h3 className="text-xl font-display font-bold text-neon-cyan tracking-wider mb-1">
                  {item.title}
                </h3>
                <span className="text-xs text-gray-400 font-mono uppercase tracking-widest mb-2">
                  {item.category}
                </span>
                <div className="flex items-center gap-2 text-white/80 text-[10px] uppercase tracking-[0.2em]">
                  <ExternalLink size={12} />
                  Click to Enlarge
                </div>
              </div>

              {/* Static Label (Visible when not hovering, fades out on hover) */}
              <div className="absolute bottom-4 left-4 group-hover:opacity-0 transition-opacity duration-300 z-10">
                <h3 className="text-lg font-display font-bold text-white tracking-wider drop-shadow-lg">
                  {item.title}
                </h3>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <Download className="text-neon-cyan" size={20} />
              </div>

            </motion.a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Brochures;
