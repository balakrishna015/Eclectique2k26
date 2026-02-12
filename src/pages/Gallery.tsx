import { motion } from "framer-motion";
import { useState } from "react";

const images = [
  { id: 1, src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070", title: "Technology" },
  { id: 2, src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=2070", title: "Crowd" },
  { id: 3, src: "https://images.unsplash.com/photo-1470229722913-7ea0d1974ef1?q=80&w=2074", title: "Lights" },
  { id: 4, src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?q=80&w=2070", title: "Music" },
  { id: 5, src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070", title: "Cyberpunk" },
];

const Gallery = () => {
  const [focused, setFocused] = useState<number | null>(null);

  return (
    <div className="h-screen w-full bg-deep-navy pt-24 px-4 pb-4 flex flex-col">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center text-4xl font-display font-bold text-white mb-8"
      >
        GALLERY
      </motion.h1>

      <div className="flex-1 flex gap-2 md:gap-4 w-full max-w-[1600px] mx-auto overflow-hidden">
        {images.map((img) => (
          <motion.div
            key={img.id}
            onHoverStart={() => setFocused(img.id)}
            onHoverEnd={() => setFocused(null)}
            className={`relative rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out ${focused !== null && focused !== img.id ? 'opacity-50 grayscale' : 'opacity-100 grayscale-0'}`}
            style={{
              flex: focused === img.id ? 3 : 1,
            }}
          >
            <img
              src={img.src}
              alt={img.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
              <h3 className="text-white text-2xl font-bold font-display uppercase tracking-widest">{img.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
