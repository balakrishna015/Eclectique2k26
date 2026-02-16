import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import ImageWithSkeleton from "../components/ui/ImageWithSkeleton";
import Skeleton from "../components/ui/Skeleton";

// --- FACULTY IMAGES ---
import chiefPatronImg from '../assets/chief patron.webp';
import patronImg from '../assets/patron.webp';
import coPatronRajeswararaoImg from '../assets/Prof.R.Rajeswararao.webp';
import coPatronNagarajuImg from '../assets/Prof.G.J.Nagaraju.webp';
import chairmanImg from '../assets/Dr.V.S.Vakula.webp';
import convenorImg from '../assets/Convenor.webp';
// Convenor image missing, will use fallback
import coordinatorImg from '../assets/Dr.A.Padmaja.webp';
import MaincoordinatorImg from '../assets/Cherrynischal.webp';
import FemalecoordinatorImg from '../assets/Gowthami.webp';
import ManojramImg from '../assets/Manojram.webp';
import HannahgraceImg from '../assets/Hannahgrace.png';
import HabibuddhinImg from '../assets/Habibuddhin.webp';


// --- DATA ---
import type { TeamMember, Section } from "../types";

const FACULTY_SECTIONS: Section[] = [
  { title: "Chief Patron", members: [{ name: "Prof. V. V. Subbarao", role: "Chief Patron", image: chiefPatronImg }] },
  { title: "Patron", members: [{ name: "Prof. G. Jaya Suma", role: "Patron", image: patronImg }] },
  {
    title: "Co-Patrons", members: [
      { name: "Prof. R. Rajeswararao", role: "Co-Patron", image: coPatronRajeswararaoImg },
      { name: "Prof. G. J. N. Nagaraju", role: "Co-Patron", image: coPatronNagarajuImg }
    ]
  },
  // Grouped Administration for side-by-side layout
  {
    title: "Administration",
    members: [
      { name: "Dr. V. S. Vakula", role: "Chairman", image: chairmanImg },
      { name: "Dr. K. Srikumar", role: "Convenor", image: convenorImg },
      { name: "Dr. A. Padmaja", role: "Faculty Coordinator", image: coordinatorImg }
    ]
  },
];

const STUDENT_SECTIONS: Section[] = [
  {
    title: "Main Coordinators",
    members: [
      { name: "Y. Chery Nischal", role: "Coordinator", image: MaincoordinatorImg },
      { name: "G. Gowthami", role: "Coordinator", image: FemalecoordinatorImg },
    ]
  },
  {
    title: "Student Coordinators",
    members: [
      { name: "V. Manoj Ram", role: "Coordinator", image: ManojramImg },
      { name: "P. Hannah Grace", role: "Coordinator", image: HannahgraceImg },
    ]
  },
  {
    title: "Treasurers",
    members: [
      { name: "B. Srikanth", role: "Treasurer" },
      { name: "V. Hemanth Kumar", role: "Treasurer" },
      { name: "S. Manasa", role: "Treasurer" },
    ]
  },
  {
    title: "Technical Coordinators",
    members: [
      { name: "Y. Balakrishna", role: "Technical Co-Ordinator" },
      { name: "Md. Habibuddin", role: "Technical Co-Ordinator", image: HabibuddhinImg },
      { name: "A. Hema", role: "Tech Lead" },
    ]
  },
];

// --- CIRCULAR CARD COMPONENT (Optimized) ---
const CircularCard = ({ member, index }: { member: TeamMember, index: number }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px" }}
      transition={{ duration: isMobile ? 0.4 : 0.6, delay: isMobile ? 0 : index * 0.1 }}
      style={{ willChange: "transform" }} // GPU Promotion
      className="flex flex-col items-center justify-center p-4"
    >
      {/* CIRCLE CONTAINER */}
      <div className="relative w-48 h-48 md:w-56 md:h-56 mb-3 md:mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.3)] overflow-hidden bg-black/50">
          <ImageWithSkeleton
            src={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=111&color=00f3ff&font-size=0.4`}
            alt={member.name}
            className="w-full h-full object-cover object-center grayscale-0 select-none pointer-events-none"
            onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
            draggable="false"
            width={224} // Explicit sizing for CLS prevention (max width)
            height={224}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* TEXT MATCHING REFERENCE */}
      <div className="text-center mt-4 relative z-10">
        {/* Name in CYAN */}
        <h3 className="text-neon-cyan font-bold text-xl md:text-2xl tracking-wide uppercase font-sans mb-1 break-words max-w-[140px] md:max-w-none">
          {member.name}
        </h3>

        {/* Role in GOLD/ORANGE */}
        <p className="text-amber-600 font-mono text-[12px] md:text-sm tracking-[0.25em] uppercase font-bold">
          {member.role || "MEMBER"}
        </p>
      </div>
    </motion.div>
  );
};

// --- SECTION COMPONENT ---
const Section = ({ title, members }: { title: string, members: TeamMember[] }) => {
  return (
    <div
      className="mb-20 w-full flex flex-col items-center"
      style={{ contentVisibility: "auto", containIntrinsicSize: "800px" }} // Rendering optimization
    >
      {/* SECTION HEADER: --- PATRONS --- */}
      <div className="flex items-center gap-4 mb-12 opacity-80">
        <div className="h-[1px] w-8 md:w-16 bg-gray-600" />
        <h2 className="text-xl md:text-2xl font-display text-white uppercase tracking-[0.2em]">
          {title}
        </h2>
        <div className="h-[1px] w-8 md:w-16 bg-gray-600" />
      </div>

      {/* GRID - Mobile 2 Columns, Desktop Flex/Grid */}
      <div className="flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-y-12 md:gap-20 max-w-5xl px-4 md:px-0 w-full">
        {members.map((member, i) => (
          <CircularCard key={i} member={member} index={i} />
        ))}
      </div>
    </div>
  );
};

const TeamSkeleton = () => (
  <div className="flex flex-col items-center w-full animate-pulse">
    {/* Fake Header */}
    <div className="w-1/2 h-16 bg-white/5 rounded-lg mb-20" />

    {/* Fake Section 1 */}
    <div className="w-full max-w-5xl flex flex-col items-center mb-20">
      <div className="w-32 h-6 bg-white/5 rounded mb-12" />
      <div className="flex justify-center gap-20">
        <div className="flex flex-col items-center">
          <Skeleton className="w-48 h-48 md:w-56 md:h-56 rounded-full mb-6" />
          <Skeleton className="w-32 h-6 rounded mb-2" />
        </div>
      </div>
    </div>

    {/* Fake Section 2 */}
    <div className="w-full max-w-5xl flex flex-col items-center">
      <div className="w-32 h-6 bg-white/5 rounded mb-12" />
      <div className="flex justify-center gap-20">
        <div className="flex flex-col items-center">
          <Skeleton className="w-48 h-48 md:w-56 md:h-56 rounded-full mb-6" />
          <Skeleton className="w-32 h-6 rounded mb-2" />
        </div>
        <div className="flex flex-col items-center hidden md:flex">
          <Skeleton className="w-56 h-56 rounded-full mb-6" />
          <Skeleton className="w-32 h-6 rounded mb-2" />
        </div>
      </div>
    </div>

  </div>
);

const Team = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate smart load (or wait for real assets if we had a preloader)
    // For now, just a quick timeout to show the "Blueprint" effect
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-40 px-4 bg-black font-sans relative overflow-x-hidden">

      {isLoading ? (
        <TeamSkeleton />
      ) : (
        <>
          {/* ATMOSPHERIC BACKGROUND LAYERS */}
          <div className="fixed inset-0 pointer-events-none z-0">
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]"></div>

            {/* ORB 1 - Top Left */}
            <motion.div
              animate={{
                x: [0, 40, 0],
                y: [0, 20, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-500/10 blur-[120px] rounded-full -z-10"
            />

            {/* ORB 2 - Bottom Right */}
            <motion.div
              animate={{
                x: [0, 40, 0],
                y: [0, 20, 0]
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full -z-10"
            />
          </div>
          {/* MATCHINGHEADER */}
          <div className="text-center mb-20">
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-2">
              <span className="text-white">THE</span> <span className="text-neon-cyan">TEAM</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl font-light">
              Organizing Committee & Coordinators
            </p>
          </div>

          <div className="flex flex-col items-center w-full">
            {/* Faculty */}
            {FACULTY_SECTIONS.map((section, i) => (
              <Section key={i} title={section.title} members={section.members} />
            ))}

            {/* Divider (Optional, if implied by spacing) */}
            <div className="h-20" />

            {/* Students */}
            {STUDENT_SECTIONS.map((section, i) => (
              <Section key={i} title={section.title} members={section.members} />
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default Team;
