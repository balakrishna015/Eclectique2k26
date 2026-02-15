import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const ParticlesBackground = () => {
  const [isWarping, setIsWarping] = useState(false);
  const [showFlash, setShowFlash] = useState(false);
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastScrollY = useRef(0);

  // --- 1. ENGINE INIT ---
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  // --- 2. SCROLL LOGIC ---
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);

      // Trigger Warp if scrolling is significant
      if (delta > 5) {
        // Trigger Flash only on state change from false -> true
        setIsWarping((prev) => {
          if (!prev) {
            setShowFlash(true);
            setTimeout(() => setShowFlash(false), 250); // Sonic Boom duration
            return true;
          }
          return prev;
        });

        // Keep warping true if already warping, just reset debounce
        if (!isWarping) setIsWarping(true);
      }

      lastScrollY.current = currentScrollY;

      // Reset debounce
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      scrollTimeoutRef.current = setTimeout(() => {
        setIsWarping(false);
      }, 300); // Debounce Reset
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []); // Removed isWarping dep to avoid re-binding, using functional update or ref if needed. 
  // Actually, using setIsWarping(prev => ...) is safe. 
  // But to strictly follow "if (isWarping && !prevWarpingValue)" logic inside the handler which is a closure...
  // The handler captures the initial state. I need to be careful.
  // Better approach for the flash: use a useEffect on isWarping.

  // Refined Logic below using useEffect for Flash to be cleaner and avoid closure staleness.

  useEffect(() => {
    if (isWarping) {
      setShowFlash(true);
      const timer = setTimeout(() => setShowFlash(false), 250);
      return () => clearTimeout(timer);
    }
  }, [isWarping]);

  const handleScrollEffect = useCallback(() => {
    const currentScrollY = window.scrollY;
    const delta = Math.abs(currentScrollY - lastScrollY.current);

    if (delta > 5) {
      setIsWarping(true);
    }

    lastScrollY.current = currentScrollY;

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

    scrollTimeoutRef.current = setTimeout(() => {
      setIsWarping(false);
    }, 300);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScrollEffect);
    return () => window.removeEventListener("scroll", handleScrollEffect);
  }, [handleScrollEffect]);


  // --- 3. PHYSICS CONFIGURATION ---
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const options = useMemo(() => {
    return {
      autoPlay: true,
      background: { color: { value: "transparent" } },
      fullScreen: { enable: false, zIndex: 0 },
      detectRetina: true,
      fpsLimit: 120,
      particles: {
        number: {
          value: isMobile ? 30 : 160,
          density: {
            enable: true,
            area: 800,
          },
        },
        color: {
          value: ["#00f3ff", "#bc13fe"], // Cyan & Purple
        },
        shape: {
          type: "circle",
        },
        opacity: {
          // Cruise: 0.15 | Warp: 0.7
          value: isWarping ? 0.7 : 0.15,
          random: false,
          anim: {
            enable: false,
          },
        },
        size: {
          // Cruise: 1-2 | Warp: 0.5-1 (Needles)
          value: isWarping ? { min: 0.5, max: 1 } : { min: 1, max: 2 },
          random: true,
        },
        move: {
          enable: true,
          // Cruise: 0.4 Right | Warp: 35 Top
          speed: isWarping ? 35 : 0.4,
          direction: isWarping ? ("top" as const) : ("right" as const),
          random: false,
          straight: true,
          outModes: "out" as const,
          trail: {
            enable: isWarping, // Only enable in Warp
            length: 12, // Warp Trail
            fillColor: "#000000",
          },
          attract: {
            enable: true,
            rotate: {
              x: 600,
              y: 1200,
            },
          },
        },
      },
      interactivity: {
        detectsOn: "window" as const,
        events: {
          onHover: {
            enable: true,
            mode: "attract",
          },
          resize: true,
        },
        modes: {
          attract: {
            distance: 200,
            duration: 0.4,
            factor: 1,
            easing: "ease-out-quad",
            speed: 1,
            maxSpeed: 5,
          },
        },
      },
    };
  }, [isWarping]);

  return (
    <>
      {/* SONIC BOOM FLASH OVERLAY */}
      <div
        className={`fixed inset-0 z-50 pointer-events-none transition-opacity duration-300 ease-out 
          ${showFlash ? "opacity-100" : "opacity-0"} 
          bg-gradient-radial from-cyan-500/20 via-transparent to-transparent`}
      />

      <div className="fixed inset-0 z-0 pointer-events-none">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={options}
          className="w-full h-full"
        />
      </div>
    </>
  );
};

export default ParticlesBackground;
