import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ImageWithSkeleton from "./ui/ImageWithSkeleton";

interface GalleryItemProps {
  item: {
    id: number;
    src: string;
    alt: string;
    desc: string;
    date: string;
  };
}

const MobileGalleryItem = ({ item }: GalleryItemProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    axis: "x"
  });

  const scale = useTransform(scrollXProgress, [0, 0.5, 1], [0.85, 1, 0.85]);
  const opacity = useTransform(scrollXProgress, [0, 0.5, 1], [0.4, 1, 0.4]);

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

export default MobileGalleryItem;
