import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef } from "react";
import ImageWithSkeleton from "../components/ui/ImageWithSkeleton";

// --- DATA ---
const GALLERY_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070", alt: "TECH SIGNATURE", desc: "Digital Frontier", date: "2026.01.12" },
  { id: 2, src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070", alt: "CYBER CITY", desc: "Urban Evolution", date: "2026.02.04" },
  { id: 3, src: "https://images.unsplash.com/photo-1535378437327-66486bd8c445?q=80&w=1920", alt: "NEON DREAM", desc: "Light Synthesis", date: "2026.02.10" },
  { id: 4, src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974", alt: "AI LOGIC", desc: "Neural Networks", date: "2026.02.15" },
  { id: 5, src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964", alt: "FLUID DATA", desc: "Stream Process", date: "2026.03.01" },
  { id: 6, src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070", alt: "MATRIX RAIN", desc: "Code Cascade", date: "2026.03.12" },
  { id: 7, src: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?q=80&w=2070", alt: "PRISM CORE", desc: "Optical refraction", date: "2026.03.20" },
  { id: 8, src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070", alt: "RETRO WAVES", desc: "Analog Signal", date: "2026.04.05" },
  { id: 9, src: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=1887", alt: "DATA TUNNEL", desc: "High Velocity", date: "2026.04.18" },
  { id: 10, src: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070", alt: "GRID SYSTEM", desc: "Structure", date: "2026.05.01" },
];

const MobileGalleryItem = ({ item }: { item: typeof GALLERY_IMAGES[0] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    axis: "x"
  });

  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollXProgress, [0, 0.5, 1], [0.4, 1, 0.4]);
  // Removed blur for clarity as requested
  // const filter = useTransform(scrollXProgress, [0, 0.5, 1], ["blur(2px)", "blur(0px)", "blur(2px)"]);

  return (
    <motion.div
      ref={ref}
      style={{ scale, opacity }}
      className="w-[85vw] h-[60vh] flex-shrink-0 snap-center flex items-center justify-center p-2"
    >
      <div className="relative w-full h-full overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)] group bg-black/40 backdrop-blur-sm">

        {/* Image */}
        <div className="absolute inset-0 w-full h-full">
          <ImageWithSkeleton
            src={item.src}
            alt={item.alt}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Elegant Caption Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
          <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-3">
            <div className="flex justify-between items-end">
              <div>
                <h3 className="text-white text-lg font-display font-bold tracking-wider uppercase leading-none mb-1">
                  {item.alt}
                </h3>
                <span className="text-neon-cyan text-[10px] tracking-[0.2em] font-mono">{item.date}</span>
              </div>
              <p className="text-gray-400 text-[9px] tracking-widest uppercase text-right">
                0{item.id}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Gallery = () => {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <div className="min-h-screen w-full pt-28 pb-20 px-0 md:px-8 flex flex-col relative z-10">

      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8 flex-none px-4"
      >
        <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-neon-cyan to-white tracking-tight">
          GALLERY
        </h1>
        <p className="text-neon-cyan/80 font-mono text-sm tracking-[0.3em] uppercase mt-2">
          [ DECLASSIFIED VISUALS ]
        </p>
      </motion.div>

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
                <ImageWithSkeleton src={item.src} alt={item.alt} className="w-full h-full object-cover" />
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
