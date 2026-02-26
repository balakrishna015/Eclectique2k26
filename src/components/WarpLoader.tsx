import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// ── Star object ───────────────────────────────────────────────────────────────
interface Star {
  x: number;        // normalised –1..1 (3-D plane)
  y: number;
  z: number;        // depth: 1 = far, ~0 = at viewer
  velocity: number; // individual speed multiplier (0.7–1.3)
  cyan: boolean;    // neon-cyan or white
}

const STAR_COUNT = 200;
const BASE_SPEED = 0.025;   // phase-1 cruise speed (z-units per frame)
const DECAY = 0.955;   // phase-2 decay multiplier per frame
const IDLE_THRESHOLD = 0.0008; // speed at which we consider it "arrived"

function makeStar(): Star {
  return {
    x: (Math.random() * 2 - 1) * 0.25,
    y: (Math.random() * 2 - 1) * 0.25,
    z: 0.05 + Math.random() * 0.95,
    velocity: 0.7 + Math.random() * 0.6,
    cyan: Math.random() < 0.28,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
interface Props { onComplete: () => void; }

const WarpLoader = ({ onComplete }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size canvas to viewport
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    // Derived constants (recalculated after resize in tick via canvas.width)
    let stars: Star[] = Array.from({ length: STAR_COUNT }, makeStar);

    // Speed state
    let speed = BASE_SPEED;
    let startTime = 0;
    type Phase = "warp" | "decel" | "arrival";
    let phase: Phase = "warp";

    // ── RAF render loop ───────────────────────────────────────────────────────
    const tick = (ts: number) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;

      const W = canvas.width;
      const H = canvas.height;
      const CX = W / 2;
      const CY = H / 2;
      const FOV = W * 0.5;

      // ── Phase logic ─────────────────────────────────────────────────────
      if (phase === "warp" && elapsed >= 1500) phase = "decel";

      if (phase === "decel") {
        speed *= DECAY;                        // smooth exponential slowdown
        if (speed < IDLE_THRESHOLD) {
          phase = "arrival";
          onComplete();                        // signal parent → fade hero in
          cancelAnimationFrame(rafRef.current);
          return;                             // stop loop
        }
      }

      // ── Draw ────────────────────────────────────────────────────────────
      // Full clear (no trail in decel phase so stars shrink cleanly to dots)
      ctx.fillStyle = "#000000";
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "lighter";

      stars.forEach((star, i) => {
        const starSpeed = speed * star.velocity;
        const prevZ = star.z;
        star.z -= starSpeed;

        // Recycle when too close
        if (star.z <= 0.004) {
          stars[i] = makeStar();
          stars[i].z = 0.90 + Math.random() * 0.1;
          return;
        }

        // 3-D → 2-D projection (current + previous position for streak)
        const scale = FOV / star.z;
        const sx = star.x * scale + CX;
        const sy = star.y * scale + CY;

        const pScale = FOV / prevZ;
        const px = star.x * pScale + CX;
        const py = star.y * pScale + CY;

        if (sx < -5 || sx > W + 5 || sy < -5 || sy > H + 5) return;

        // Brightness (closer = brighter)
        const bright = Math.min(1, (1 - star.z) * 1.6);
        const alpha = Math.min(1, bright);
        const [r, g, b] = star.cyan ? [0, 243, 255] : [255, 255, 255];

        // Streak length based on current speed (long warp → short dot on arrival)
        const trailLen = Math.hypot(sx - px, sy - py);

        // Neon shadowBlur only for fast stars (skip during decel for perf)
        ctx.shadowBlur = (phase === "warp" && star.z < 0.2) ? 6 : 0;
        ctx.shadowColor = star.cyan ? "#00f3ff" : "#ffffff";
        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = star.z < 0.15 ? 1.6 : 0.9;

        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        // Bright tip dot on sufficiently long streaks
        if (trailLen > 1.2) {
          ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, alpha * 1.3)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, star.z < 0.18 ? 1.3 : 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalCompositeOperation = "source-over";
      ctx.shadowBlur = 0;

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [onComplete]);

  return (
    // motion.div so AnimatePresence can play an exit fade
    <motion.div
      key="warp-loader"
      className="fixed inset-0 z-[9999]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full bg-black" />
    </motion.div>
  );
};

export default WarpLoader;
