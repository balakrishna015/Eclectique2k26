import { useRef } from "react";
import { useScroll, motion, useTransform, MotionValue } from "framer-motion";

const Word = ({ word, index, total, scrollYProgress }: { word: string, index: number, total: number, scrollYProgress: MotionValue<number> }) => {
  const start = index / total;
  const opacity = useTransform(scrollYProgress, (latest: number) => {
    return latest > start ? 1 : 0.1;
  });

  return (
    <motion.span
      style={{ opacity }}
      className="relative transition-opacity duration-75 text-white"
    >
      {word}
    </motion.span>
  );
};

const TextReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Adjusted offset for faster, earlier highlighting while reading
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "start 0.2"],
    axis: "y"
  });

  const text = "Eclectique 2K26 is a convergence of intellect and innovation. It is not just a technical symposium; it is a celebration of engineering excellence, creativity, and the relentless pursuit of knowledge. Join us as we explore the future of technology.";
  const words = text.split(" ");

  return (
    <div ref={containerRef} className="relative z-10 min-h-[40vh] flex items-center justify-center py-24 px-6">
      <p className="text-2xl md:text-4xl font-display font-medium text-center leading-relaxed max-w-5xl mx-auto flex flex-wrap justify-center gap-x-3 gap-y-2">
        {words.map((word, i) => (
          <Word
            key={i}
            word={word}
            index={i}
            total={words.length}
            scrollYProgress={scrollYProgress}
          />
        ))}
      </p>
    </div>
  );
};

export default TextReveal;
