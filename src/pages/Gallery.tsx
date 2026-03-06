import { motion } from "framer-motion";
import { useState } from "react";
import ImageWithSkeleton from "../components/ui/ImageWithSkeleton";

// --- DATA ---
import MobileGalleryItem from "../components/MobileGalleryItem";

const GALLERY_IMAGES = [
  { id: 1, src: "../../gallery/Eclectique2k26.webp", alt: "Eclectique2k26", desc: "2026 TECHNICAL SYMPOSIUM", date: "2026.03.04" },
  { id: 2, src: "../../gallery/culturals.png", alt: "CULTURALS", desc: "Stage Performance", date: "2026.03.04" },
  { id: 3, src: "../../gallery/flashmob.jpeg", alt: "FLASHMOB", desc: "Street Energy", date: "2026.03.05" },
  { id: 4, src: "../../gallery/faraday.jpg", alt: "Faraday", desc: "Faraday Memorial", date: "2025.09.22" },
  { id: 5, src: "../../gallery/clique.jpeg", alt: "CLIQUE", desc: "Student Club", date: "2024.10.26"},
  { id: 6, src: "../../gallery/tarang.jpeg", alt: "TARANG", desc: "Waves of Talent", date: "2026.02.13" },
];


const Gallery = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="min-h-screen w-full pt-28 pb-20 px-0 md:px-8 flex flex-col relative z-10">

      {/* HEADER */}
      {/* HEADER - THE VISUAL ARCHIVE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-center mb-16 flex-none px-4"
      >
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter uppercase font-display mb-2 text-white">
          GALLERY
        </h1>
        <p className="text-neon-cyan/80 text-sm md:text-base tracking-[0.4em] uppercase mb-6 font-mono">
          Capturing the Electron Flow of Innovation
        </p>

        {/* Visual Anchor */}
        <div className="h-[1px] w-[20%] bg-neon-cyan/50 mx-auto" />

        {/* Narrative Body */}
        <p className="max-w-2xl mx-auto text-gray-400 font-light leading-relaxed tracking-wide mt-8 px-4 text-justify md:text-center">
          Beyond the circuits and the code lies the raw energy of Eclectique. This gallery is a curated timeline of moments where logic met creativity. From the high-voltage energy of <strong className="text-neon-cyan font-normal">Flashmobs</strong> to the rhythmic precision of <strong className="text-neon-purple font-normal">Tarang</strong>, witness the spectrum of a national symposium in motion. Every frame here is a testament to the spirit of JNTUGV—where tradition is the foundation, and technology is the frontier.
        </p>
      </motion.div>

      {GALLERY_IMAGES.length === 0 ? (
        <div className="flex-grow flex items-center justify-center min-h-[40vh]">
          <div className="text-center p-8 border border-white/10 rounded-2xl bg-white/5 backdrop-blur-sm">
            <h3 className="text-2xl font-display font-bold text-white mb-2">CAPTURING MEMORIES...</h3>
            <p className="text-gray-400 font-mono text-xs tracking-widest uppercase">
              Gallery coming soon
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* --- DESKTOP VIEW (Accordion) --- */}
          <div className="hidden md:flex gap-2 w-full max-w-[1920px] mx-auto h-[600px] flex-grow transition-all duration-500">
            {GALLERY_IMAGES.map((item) => {
              const isActive = activeId === item.id;
              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setActiveId(item.id)}
                  onMouseLeave={() => setActiveId(null)}
                  className={`
                    relative overflow-hidden cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]
                    ${isActive ? "flex-[5] grayscale-0 opacity-100" : "flex-1 grayscale opacity-60 hover:opacity-80"}
                    border border-white/10 rounded-2xl
                  `}
                >
                  {isActive && (
                    <div className="absolute inset-0 z-20 border-2 border-neon-cyan/50 pointer-events-none rounded-2xl shadow-[inset_0_0_20px_rgba(0,243,255,0.2)]" />
                  )}
                  <div className="absolute inset-0 z-0">
                    <ImageWithSkeleton
                      src={item.src}
                      alt={item.alt}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-60"}`} />
                  </div>
                  <div className="absolute inset-0 z-10 p-6 flex flex-col justify-end overflow-hidden">
                    <div
                      className={`
                        absolute bottom-8 left-1/2 -translate-x-1/2 items-center justify-center whitespace-nowrap origin-center transition-all duration-500 delay-100
                        ${isActive ? "opacity-0 rotate-0 scale-90 blur-sm pointer-events-none" : "opacity-100 -rotate-90"}
                      `}
                    >
                      <span className="text-white/70 font-mono text-xs tracking-[0.2em] uppercase">{item.alt}</span>
                    </div>
                    <div className={`
                        flex flex-col gap-1 transition-all duration-500
                        ${isActive ? "translate-y-0 opacity-100 delay-200" : "translate-y-10 opacity-0"} 
                      `}
                    >
                      <h3 className="text-3xl font-display font-bold text-white uppercase tracking-wider leading-none">
                        {item.alt}
                      </h3>
                      <p className="text-neon-cyan font-mono text-xs tracking-widest uppercase">
                        {item.desc} // 0{item.id}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* --- MOBILE VIEW (Horizontal Filmstrip) --- */}
          <div className="md:hidden w-full flex flex-col items-center justify-center flex-grow mt-4">
            <div className="w-full flex overflow-x-auto snap-x snap-mandatory gap-4 px-[7.5vw] py-10 scrollbar-hide">
              {GALLERY_IMAGES.map((item) => (
                <MobileGalleryItem key={item.id} item={item} />
              ))}
            </div>
            {/* Swipe Hint */}
            <div className="text-center mt-4">
              <p className="text-white/30 text-[10px] tracking-[0.3em] uppercase animate-pulse">
                [ SWIPE TO NAVIGATE ]
              </p>
            </div>
          </div>
        </>
      )}

      {/* FOOTER HINT */}
      <div className="text-center mt-8 hidden md:block">
        <p className="text-white/20 font-mono text-[10px] tracking-[0.5em] uppercase">
          [ HOVER TO DECRYPT ]
        </p>
      </div>

    </div>
  );
};

export default Gallery;
