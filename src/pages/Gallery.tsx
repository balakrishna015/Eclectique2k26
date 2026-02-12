import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import ImageWithSkeleton from "../components/ui/ImageWithSkeleton";

// --- DATA ---
const GALLERY_IMAGES = [
  { id: 1, src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070", alt: "Tech 1", span: "row-span-1" },
  { id: 2, src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070", alt: "Cyberpunk City", span: "row-span-2" },
  { id: 3, src: "https://images.unsplash.com/photo-1535378437327-66486bd8c445?q=80&w=1920", alt: "Neon Signs", span: "row-span-1" },
  { id: 4, src: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1974", alt: "Abstract AI", span: "row-span-1" },
  { id: 5, src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964", alt: "Fluid Art", span: "row-span-2" },
  { id: 6, src: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070", alt: "Matrix Code", span: "row-span-1" },
  { id: 7, src: "https://images.unsplash.com/photo-1534224039826-c7a0eda0e6b3?q=80&w=2070", alt: "Prism", span: "row-span-2" },
  { id: 8, src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2070", alt: "Retro Tech", span: "row-span-1" },
  { id: 9, src: "https://images.unsplash.com/photo-1504384308090-c54be3852f33?q=80&w=1887", alt: "Neon Tunnel", span: "row-span-1" },
  { id: 10, src: "https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=2070", alt: "Grid", span: "row-span-2" },
];

const Gallery = () => {
  const [focused, setFocused] = useState<number | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // --- SCROLL LOCK FIX ---
  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedId]);

  return (
    <div className="min-h-screen w-full pt-24 px-4 pb-4 flex flex-col relative">

      {/* --- DESKTOP VIEW TITLE --- */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="hidden md:block text-center text-4xl md:text-6xl font-display font-bold text-white mb-8 tracking-widest"
      >
        GALLERY
      </motion.h1>

      {/* --- DESKTOP VIEW (Piano Accordion) --- */}
      <div className="hidden md:flex flex-1 gap-4 w-full max-w-[1600px] mx-auto overflow-hidden h-[80vh]">
        {GALLERY_IMAGES.slice(0, 5).map((img) => (
          <motion.div
            key={img.id}
            onHoverStart={() => setFocused(img.id)}
            onHoverEnd={() => setFocused(null)}
            className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${focused !== null && focused !== img.id ? 'opacity-50 grayscale' : 'opacity-100 grayscale-0'}`}
            style={{
              flex: focused === img.id ? 3 : 1,
            }}
          >
            <ImageWithSkeleton
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <h3 className="text-white text-2xl font-bold font-display uppercase tracking-widest">{img.alt}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- MOBILE VIEW (Masonry + Lightbox) --- */}
      <div className="block md:hidden pb-20">
        <h1 className="text-4xl font-display font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple tracking-widest">
          GALLERY
        </h1>
        {/* Masonry Columns */}
        <div className="columns-2 gap-4 space-y-4">
          {GALLERY_IMAGES.map((image, index) => (
            <motion.div
              key={image.id}
              layoutId={`image-${image.id}`}
              onClick={() => setSelectedId(image.id)}
              className="break-inside-avoid rounded-xl overflow-hidden border border-white/10 shadow-lg relative group"

              // --- CINEMATIC REVEAL ANIMATION ---
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <ImageWithSkeleton
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-active:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* --- LIGHTBOX (Global Overlay) --- */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setSelectedId(null)}
          >
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-6 right-6 text-white/50 hover:text-white bg-white/10 rounded-full p-2 z-[60]"
            >
              <X size={24} />
            </button>

            {GALLERY_IMAGES.find((img) => img.id === selectedId) && (
              <motion.img
                layoutId={`image-${selectedId}`}
                src={GALLERY_IMAGES.find((img) => img.id === selectedId)?.src}
                alt={GALLERY_IMAGES.find((img) => img.id === selectedId)?.alt}
                loading="lazy"
                className="w-full max-h-[85vh] object-contain rounded-lg shadow-2xl shadow-cyan-500/20"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
