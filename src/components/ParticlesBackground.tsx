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
          value: isMobile ? 0 : 20, // DISABLE particles on mobile for 100% FPS, or use very strictly low number
          // Per instruction "turn them off entirely on low-power mobile devices" - setting to 0 or effectively static
          // Let's set to a very low static number if we want aesthetics, or 0 if we want 'Invisibility'.
          // The user said "turn them off entirely" is an option. Let's go with 0 for max performance.
          // Wait, "reduce... or turn them off".
          // Let's try 0.
        },
        color: {
          value: ["#00f3ff", "#bc13fe"],
        },
        shape: {
          type: "circle",
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: !isMobile, // Disable opacity animation on mobile
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
          enable: !isMobile, // Disable links on mobile
          distance: 150,
          color: "#ffffff",
          opacity: 0.2,
          width: 0.5,
        },
        move: {
          enable: !isMobile, // DISABLE MOVEMENT on mobile
          speed: 0.5,
          direction: "none",
          random: false,
          straight: false,
          outModes: "out",
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: {
            enable: !isMobile, // Disable hover calculation on mobile
            mode: "grab",
          },
          resize: {
            enable: true,
            delay: 0.5
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
