import { motion } from "framer-motion";
import { Smartphone } from "lucide-react";
import ImageWithSkeleton from "../components/ui/ImageWithSkeleton";

// --- DATA ---
type TeamMember = {
  name: string;
  phone?: string;
  image?: string; // Optional image URL
};

type SectionData = {
  title: string;
  members: TeamMember[];
};

const FACULTY_SECTIONS: SectionData[] = [
  { title: "Chief Patron", members: [{ name: "Prof. V. V. Subbarao" }] },
  { title: "Patron", members: [{ name: "Prof. G. Jaya Suma" }] },
  { title: "Co-Patrons", members: [{ name: "Prof. R. Rajeswararao" }, { name: "Prof. G. J. N. Nagaraju" }] },
  { title: "Chairman", members: [{ name: "Dr. V. S. Vakula" }] },
  { title: "Convenor", members: [{ name: "Dr. K. Srikumar" }] },
  { title: "Faculty Coordinator", members: [{ name: "Dr. A. Padmaja" }] },
];

const STUDENT_SECTIONS: SectionData[] = [
  {
    title: "Main Coordinators",
    members: [
      { name: "Yalangi Chery Nischal", phone: "+91 82477 32637" },
      { name: "G. Gowthami" },
    ]
  },
  {
    title: "Student Coordinators",
    members: [
      { name: "V. Manoj Ram" },
      { name: "P. Hannah Grace" },
    ]
  },
  {
    title: "Treasurers",
    members: [
      { name: "B. Srikanth" },
      { name: "Vantaku Hemanth Kumar" },
      { name: "S. Manasa" },
    ]
  },
  {
    title: "Technical Coordinators",
    members: [
      { name: "Yarapathni Balakrishna" },
      { name: "Mohammad Habibuddin" },
      { name: "A. Hema" },
    ]
  },
];

// --- COMPONENTS ---

const HoloCard = ({ member, role, delay, isFaculty = false }: { member: TeamMember, role: string, delay: number, isFaculty?: boolean }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
      className={`group relative overflow-hidden bg-[#1a1a2e]/40 backdrop-blur-md border border-white/5 rounded-2xl transition-all duration-300 hover:border-neon-cyan/50 hover:bg-[#1a1a2e]/60 flex flex-col items-center
        ${isFaculty ? "p-6 aspect-square" : "aspect-[3/4]"}`}
    >
      {/* Glow Effect on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/0 via-transparent to-neon-purple/0 group-hover:from-neon-cyan/5 group-hover:to-neon-purple/5 transition-colors duration-500" />

      {/* IMAGE SECTION */}
      <ImageWithSkeleton
        src={member.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`}
        alt={member.name}
        className={`relative z-10 flex items-center justify-center overflow-hidden bg-white/5
        ${isFaculty
            ? "w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-white/10 group-hover:border-neon-cyan/50 mb-4"
            : "w-full h-[65%] rounded-t-xl mb-3"
          } transition-all duration-300`}
      />

      {/* TEXT SECTION */}
      <div className="relative z-10 flex flex-col items-center text-center px-2 w-full">
        <h3 className={`text-white font-display font-medium tracking-wide leading-tight group-hover:text-neon-cyan transition-colors duration-300
          ${isFaculty ? "text-xl" : "text-lg md:text-xl"} line-clamp-2`}>
          {member.name}
        </h3>

        <div className="h-[1px] w-12 bg-white/10 my-2 group-hover:bg-neon-cyan/50 transition-colors" />

        <p className="text-neon-cyan text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-1">
          {role}
        </p>

        {member.phone && (
          <div className="flex items-center gap-2 mt-2 px-3 py-1 rounded-full bg-white/5 border border-white/5 group-hover:border-neon-purple/30 transition-colors">
            <Smartphone size={12} className="text-gray-400 group-hover:text-neon-purple" />
            <span className="text-xs text-gray-300 font-mono">{member.phone}</span>
          </div>
        )}
      </div>

      {/* Decorative Corners for Holographic Feel */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-neon-cyan transition-colors" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-neon-cyan transition-colors" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-neon-purple transition-colors" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-neon-purple transition-colors" />
    </motion.div >
  );
};

const Section = ({ title, members, isFaculty = false }: { title: string, members: TeamMember[], isFaculty?: boolean }) => {
  return (
    <div className="mb-20">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="flex items-center gap-4 mb-8 px-2"
      >
        <div className="h-8 w-1 bg-neon-cyan rounded-full" />
        <h2 className="text-2xl md:text-3xl font-display font-bold text-white uppercase tracking-widest">
          {title}
        </h2>
      </motion.div>

      {/* GRID SYSTEM: Strict 2-col on Mobile, 4-col on Laptop */}
      <div className={`grid gap-4 md:gap-6 
        ${isFaculty
          ? "grid-cols-1 md:grid-cols-3 max-w-5xl mx-auto" // Faculty centered with larger cards
          : "grid-cols-2 md:grid-cols-4" // Students: Strict 2x grid on mobile
        }`}>
        {members.map((member, i) => (
          <HoloCard
            key={i}
            member={member}
            role={isFaculty ? title : "Coordinator"}
            delay={i * 0.1}
            isFaculty={isFaculty}
          />
        ))}
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <div className="min-h-screen pt-28 pb-20 px-4 md:px-8 font-sans overflow-x-hidden">

      {/* PAGE HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-20 space-y-4"
      >
        <h1 className="text-5xl md:text-7xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 tracking-tight">
          THE TEAM
        </h1>
        <p className="text-neon-cyan font-mono text-sm tracking-[0.3em] uppercase">
          Architects of Eclectique 2K26
        </p>
      </motion.div>

      {/* 1. FACULTY / PATRONS */}
      <div className="max-w-7xl mx-auto mb-24">
        {FACULTY_SECTIONS.map((section, i) => (
          <Section key={i} title={section.title} members={section.members} isFaculty={true} />
        ))}
      </div>

      {/* 2. CORE TEAM */}
      <div className="max-w-7xl mx-auto relative">
        {/* Divider */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-screen h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12" />

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center text-3xl font-display font-bold text-white/90 mb-16 pt-12 uppercase tracking-[0.2em]"
        >
          Core Committee
        </motion.h2>

        {STUDENT_SECTIONS.map((section, i) => (
          <Section key={i} title={section.title} members={section.members} />
        ))}
      </div>

      <div className="text-center mt-24">
        <p className="text-white/30 font-mono text-xs tracking-widest uppercase">
          ...and the dedicated efforts of our student volunteers.
        </p>
      </div>

    </div>
  );
};

export default Team;
