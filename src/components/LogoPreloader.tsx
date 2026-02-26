import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ── Types ─────────────────────────────────────────────────────────────────────
interface WarpStar {
  x: number;           // normalised -1..1 in 3-D space
  y: number;
  z: number;           // depth: 1=far, 0=close to viewer
  cyan: boolean;       // neon-cyan or white
}

interface StaticStar {
  sx: number; sy: number;
  size: number;
  baseOpacity: number;
  twinkleSpeed: number;
  twinklePhase: number;
}

// ── Data stream ───────────────────────────────────────────────────────────────
const DATA_STRINGS = [
  "INITIALIZING_CORE...",
  "LOADING_ASSETS...",
  "ESTABLISHING_CONNECTION...",
  "CALIBRATING_SYSTEMS...",
  "RENDERING_INTERFACE...",
  "ALL_SYSTEMS_NOMINAL",
];

const WARP_COUNT = 180;
const STATIC_COUNT = 300;

// ── Helpers ───────────────────────────────────────────────────────────────────
const makeWarpStar = (): WarpStar => ({
  x: (Math.random() * 2 - 1) * 0.08,
  y: (Math.random() * 2 - 1) * 0.08,
  z: 0.05 + Math.random() * 0.95,
  cyan: Math.random() < 0.28,
});

const makeStaticStars = (w: number, h: number): StaticStar[] =>
  Array.from({ length: STATIC_COUNT }, () => ({
    sx: Math.random() * w,
    sy: Math.random() * h,
    size: Math.random() * 0.55 + 0.15,
    baseOpacity: Math.random() * 0.55 + 0.15,
    twinkleSpeed: Math.random() * 0.025 + 0.008,
    twinklePhase: Math.random() * Math.PI * 2,
  }));

// ─────────────────────────────────────────────────────────────────────────────
interface Props { onComplete: () => void; }

const LogoPreloader = ({ onComplete }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const startRef = useRef<number>(0);
  const frameRef = useRef<number>(0);
  const starsRef = useRef<WarpStar[]>([]);
  const staticRef = useRef<StaticStar[]>([]);

  const [dataIndex, setDataIndex] = useState(0);
  const [flashing, setFlashing] = useState(false);

  // Data stream cycle
  useEffect(() => {
    const id = setInterval(() =>
      setDataIndex(i => (i + 1) % DATA_STRINGS.length), 280);
    return () => clearInterval(id);
  }, []);

  // ── Canvas animation ───────────────────────────────────────────────────────
  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    starsRef.current = Array.from({ length: WARP_COUNT }, makeWarpStar);
    staticRef.current = makeStaticStars(canvas.width, canvas.height);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Size canvas to viewport
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      staticRef.current = makeStaticStars(canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);
    initCanvas();

    // ── Main render loop ────────────────────────────────────────────────────
    const tick = (ts: number) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      frameRef.current++;

      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const FOV = w * 0.5;

      // ── Phase timings ──────────────────────────────────────────────────
      // 0–1500 ms : cruise    (speedFactor 0.012)
      // 1500–2000 ms : warp   (speed ramps 0.012 → 0.075)
      // ≥ 2000 ms : flash + done
      if (elapsed >= 2000) {
        setFlashing(true);
        return; // stop loop
      }
      const isCruise = elapsed < 1500;
      let speedFactor = 0.012;
      if (!isCruise) {
        const t = (elapsed - 1500) / 500; // 0..1
        speedFactor = 0.012 + t * t * 0.063; // ease-in ramp
      }

      // ── Background: partial clear for motion blur on streaks ──────────
      ctx.fillStyle = "rgba(0,0,0,0.55)";
      ctx.fillRect(0, 0, w, h);

      // Subtle depth radial gradient at centre
      const radGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.4);
      radGrad.addColorStop(0, "rgba(0,15,25,0.45)");
      radGrad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = radGrad;
      ctx.fillRect(0, 0, w, h);

      // ── Static twinkling stars ─────────────────────────────────────────
      ctx.save();
      ctx.globalCompositeOperation = "source-over";
      staticRef.current.forEach(ss => {
        const tw = 0.5 + 0.5 * Math.sin(
          frameRef.current * ss.twinkleSpeed + ss.twinklePhase
        );
        ctx.fillStyle = `rgba(255,255,255,${ss.baseOpacity * tw})`;
        ctx.beginPath();
        ctx.arc(ss.sx, ss.sy, ss.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.restore();

      // ── Warp stars — lighter composite for glow hotspots ──────────────
      ctx.globalCompositeOperation = "lighter";

      starsRef.current.forEach((star, i) => {
        star.z -= speedFactor;

        // Recycle when too close or off screen
        if (star.z <= 0.01) {
          starsRef.current[i] = makeWarpStar();
          return;
        }

        // Project 3-D → 2-D (current & previous frame)
        const scale = FOV / star.z;
        const sx = star.x * scale + cx;
        const sy = star.y * scale + cy;

        const pz = star.z + speedFactor * 2.8;
        const pScale = FOV / pz;
        const px = star.x * pScale + cx;
        const py = star.y * pScale + cy;

        if (sx < -10 || sx > w + 10 || sy < -10 || sy > h + 10) return;

        // Brightness increases as star approaches (z → 0)
        const bright = Math.min(1, (1 - star.z) * 1.5);

        // ── Chromatic aberration on fastest (z < 0.18) white stars ──────
        if (star.z < 0.18 && !star.cyan) {
          ctx.strokeStyle = `rgba(50,50,255,${bright * 0.45})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath(); ctx.moveTo(px + 1.8, py + 1.8); ctx.lineTo(sx + 1.8, sy + 1.8); ctx.stroke();
          ctx.strokeStyle = `rgba(140,0,255,${bright * 0.3})`;
          ctx.beginPath(); ctx.moveTo(px - 1.2, py - 1.2); ctx.lineTo(sx - 1.2, sy - 1.2); ctx.stroke();
        }

        // Main streak colour
        const [r, g, b] = star.cyan ? [0, 243, 255] : [255, 255, 255];
        const alpha = Math.min(1, bright);

        ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.lineWidth = star.z < 0.15 ? 1.6 : 0.9;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();

        // Bright tip dot
        const trailLen = Math.hypot(sx - px, sy - py);
        if (trailLen > 1.5) {
          ctx.fillStyle = `rgba(${r},${g},${b},${Math.min(1, alpha * 1.4)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, star.z < 0.18 ? 1.3 : 0.65, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      ctx.globalCompositeOperation = "source-over";
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [initCanvas]);

  return (
    <div className="fixed inset-0 z-[9999] bg-black overflow-hidden">

      {/* Canvas — GPU-composited layer */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

      {/* Brand overlay — fades in at ~1s */}
      <motion.div
        className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
      >
        <p className="font-display text-lg md:text-2xl font-black tracking-[0.45em] uppercase drop-shadow-[0_0_12px_rgba(0,243,255,0.8)]">
          <span className="text-white/90">ECLECTIQUE</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple"> 2K26</span>
        </p>
        <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-neon-cyan/60">
          National Level Technical Symposium
        </p>
      </motion.div>

      {/* Data stream — bottom-left */}
      <div className="absolute bottom-8 left-6 md:left-10 font-mono tracking-widest space-y-1 pointer-events-none">
        <motion.p
          key={dataIndex}
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -5 }}
          transition={{ duration: 0.13 }}
          className="text-[10px] text-neon-cyan/70"
        >
          {DATA_STRINGS[dataIndex]}
        </motion.p>
        <p className="text-[9px] text-white/20">ECLECTIQUE_2K26 // v1.0.0</p>
      </div>

      {/* Dept tag — bottom-right */}
      <p className="absolute bottom-8 right-6 md:right-10 font-mono text-[9px] text-white/20 tracking-widest pointer-events-none">
        JNTUGV // EEE DEPT
      </p>

      {/* Flash-to-transparent exit overlay */}
      {flashing && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.38, times: [0, 0.25, 1], ease: "easeOut" }}
          onAnimationComplete={onComplete}
        />
      )}
    </div>
  );
};

export default LogoPreloader;
