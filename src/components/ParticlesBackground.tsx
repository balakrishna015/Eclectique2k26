import { useCallback, useEffect, useRef, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

const ParticlesBackground = () => {
  const containerRef = useRef<Container | null>(null);
  const [isReady, setIsReady] = useState(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>(null);
  const lastScrollY = useRef(0);

  // --- 1. PHYSICAL ENGINE SETUP ---
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
    setIsReady(true);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    containerRef.current = container || null;
  }, []);

  // --- 2. SCROLL DISPERSION & COMET TAIL ---
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;

      // COMET TAIL LOGIC:
      // Only trigger "High Speed" if scrolling DOWN
      if (isScrollingDown) {
        const particles = container.particles.array;
        particles.forEach(p => {
          // Force direction to TOP (physically moving up simulates moving down through space)
          // Actually, if we scroll down, content moves up. 
          // To mock "Warp Speed" forward, particles should fly AT us or past us.
          // Let's follow the user's specific instruction: "set direction to 'top', speed to 20"

          // We can't easily change global config on the fly without full refresh,
          // but we can manipulate particle velocity vectors directly for instant feedback.

          p.velocity.x = 0; // standard stream is right, comet is vertical
          p.velocity.y = -20; // Move TOP (negative Y)

          // Manual Trail Effect?
          // tsparticles doesn't allow easy per-particle trail toggling 
          // without updating the entire config options.
          // However, for high performance, velocity hack is best.
          // We will settle for just speed burst, as trail requires a container refresh 
          // which is too heavy for scroll events.
        });
      }

      lastScrollY.current = currentScrollY;

      // Clear existing timeout
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      // Reset after scroll stops
      scrollTimeoutRef.current = setTimeout(() => {
        const particles = container.particles.array;
        particles.forEach(p => {
          // Return to "Liquid Stream" state
          // Base Speed: 0.4
          // Direction: Right (Positive X)
          p.velocity.x = 0.4;
          p.velocity.y = 0;
        });
      }, 150); // Quick debounce
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  // --- CONFIGURATION ---
  // "Liquid Stream" Defaults
  const options = {
    fullScreen: {
      enable: false,
      zIndex: 0
    },
    particles: {
      number: {
        value: 40, // Reduced count for "stream" elegance
        density: {
          enable: true,
          area: 800
        }
      },
      color: {
        value: ["#00f3ff", "#bc13fe"] // Cyan & Purple
      },
      shape: {
        type: "circle"
      },
      opacity: {
        value: 0.6,
        random: false,
        anim: {
          enable: false
        }
      },
      size: {
        value: { min: 2, max: 3 },
        random: true
      },
      move: {
        enable: true,
        speed: 0.4, // Slow, liquid flow
        direction: "right" as const, // Flows Left -> Right
        random: false,
        straight: true, // "Data Stream"
        outModes: "out" as const, // Flows off screen naturally
        trail: {
          enable: true, // Enable trail by default but keep it subtle for "Stream"
          length: 5,
          fillColor: "#000000" // Trail fades to black
        },
        attract: {
          enable: false
        }
      }
    },
    interactivity: {
      detectsOn: "window" as const,
      events: {
        onHover: {
          enable: true,
          mode: "attract" // "Halo" Effect
        },
        onClick: {
          enable: true,
          mode: "push"
        },
        resize: true
      },
      modes: {
        attract: {
          distance: 200,
          duration: 0.4,
          factor: 1, // "Soft" attraction (Lower factor)
          speed: 1,
          maxSpeed: 5,
          easing: "ease-out-quad"
        },
        push: {
          quantity: 4
        }
      }
    },
    detectRetina: true,
    fpsLimit: 120,
  };

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {/* Force re-render if options usually change statically, but we use dynamic physics */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={options}
        className="w-full h-full"
      />
    </div>
  );
};

export default ParticlesBackground;
