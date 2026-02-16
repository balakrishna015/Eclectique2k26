import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

const ParticlesBackground = () => {
  const [init, setInit] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const options: ISourceOptions = useMemo(() => {
    return {
      autoPlay: true,
      background: { color: { value: "transparent" } },
      fullScreen: { enable: false, zIndex: 0 },
      detectRetina: true,
      fpsLimit: 60, // Limit FPS for battery saving
      particles: {
        number: {
          value: isMobile ? 8 : 20, // Reduced by 60% for mobile
          density: {
            enable: true,
            width: 800,
            height: 800,
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
            opacity: { min: 0.1, max: 0.5 },
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
          direction: "none",
          random: false,
          straight: false,
          outModes: "out",
          attract: {
            enable: false,
          },
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: true,
            mode: "grab", // Subtle interaction
          },
          resize: {
            enable: true,
            delay: 0.5
          },
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

  if (!init) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Particles
        id="tsparticles"
        options={options}
        className="w-full h-full"
      />
    </div>
  );
};

export default ParticlesBackground;
