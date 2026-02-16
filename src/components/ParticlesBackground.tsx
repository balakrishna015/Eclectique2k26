import { useCallback, useEffect, useMemo, useState } from "react";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import type { Engine } from "tsparticles-engine";

const ParticlesBackground = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

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
      fpsLimit: 60, // Limit FPS for battery saving
      particles: {
        number: {
          value: isMobile ? 10 : 20, // Minimal count
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
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 0.5,
            opacity_min: 0.1,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 3 },
          random: true,
        },
        links: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.2,
          width: 0.5, // Thin lines
        },
        move: {
          enable: true,
          speed: 0.5, // Slow drift
          direction: "none" as const,
          random: false,
          straight: false,
          outModes: "out" as const,
          attract: {
            enable: false,
          },
        },
      },
      interactivity: {
        detectsOn: "window" as const,
        events: {
          onHover: {
            enable: true,
            mode: "grab", // Subtle interaction
          },
          resize: true,
        },
        modes: {
          grab: {
            distance: 140,
            links: {
              opacity: 0.5,
            },
          },
        },
      },
    };
  }, [isMobile]);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={options}
        className="w-full h-full"
      />
    </div>
  );
};

export default ParticlesBackground;
