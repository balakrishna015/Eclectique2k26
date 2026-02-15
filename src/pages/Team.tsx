import { motion } from "framer-motion";
import ImageWithSkeleton from "../components/ui/ImageWithSkeleton";

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
import FemalecoordinatorImg from '../assets/Femalecoordinator.jpg.webp';
import ManojramImg from '../assets/Hannahgrace.webp';
import HannahgraceImg from '../assets/Hannahgrace.webp';


// --- DATA ---
type TeamMember = {
  name: string;
  role?: string; // This corresponds to the Gold/Orange text
  image?: string;
  status?: string; // Optional: "To be updated" text if needed
};

type SectionData = {
  title: string;
  members: TeamMember[];
};

const FACULTY_SECTIONS: SectionData[] = [
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

const STUDENT_SECTIONS: SectionData[] = [
  {
    title: "Main Coordinators",
    members: [
      { name: "Yalangi Chery Nischal", role: "Coordinator", image: MaincoordinatorImg },
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
      { name: "Vantaku Hemanth Kumar", role: "Treasurer" },
      { name: "S. Manasa", role: "Treasurer" },
    ]
  },
  {
    title: "Technical Coordinators",
    members: [
      { name: "Yarapathni Balakrishna", role: "Tech Lead" },
      { name: "Mohammad Habibuddin", role: "Tech Lead" },
      { name: "A. Hema", role: "Tech Lead" },
    ]
  },
];

// --- CIRCULAR CARD COMPONENT (Exact Match) ---
const CircularCard = ({ member, index }: { member: TeamMember, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center justify-center p-4"
    >
      {/* CIRCLE CONTAINER */}
      <div className="relative w-48 h-48 md:w-56 md:h-56 mb-3 md:mb-6">
        <div className="absolute inset-0 rounded-full border-2 border-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.3)] overflow-hidden bg-black/50">
          <ImageWithSkeleton
            src={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=111&color=00f3ff&font-size=0.4`}
            alt={member.name}
            className="w-full h-full object-cover object-center grayscale-0"
          />
        </div>
      </div>

      {/* TEXT MATCHING REFERENCE */}
      <div className="text-center mt-4">
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
    <div className="mb-20 w-full flex flex-col items-center">
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

const Team = () => {
  return (
    <div className="min-h-screen pt-32 pb-40 px-4 bg-black font-sans relative overflow-x-hidden">

      {/* HEADER MATCH */}
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

    </div>
  );
};

export default Team;
