import { motion } from "framer-motion";

// --- DATA ---
const FACULTY_SECTIONS = [
  { title: "Patrons", members: ["To be updated (Male)", "To be updated (Female)"] },
  { title: "Chief Patron", members: ["To be updated"] },
  { title: "Co-Patrons", members: ["To be updated"] },
  { title: "Faculty Advisors", members: ["To be updated (Male)", "To be updated (Female)"] },
  { title: "Conveners", members: ["To be updated (Male)", "To be updated (Female)"] },
  { title: "Co-Conveners", members: ["To be updated (Male)", "To be updated (Female)"] },
];

const STUDENT_SECTIONS = [
  { title: "Main Coordinators", members: ["Yalangi Chery Nischal", "G. Gowthami"] },
  { title: "Student Coordinators", members: ["V. Manoj Ram", "P. Hannah Grace"] },
  { title: "Treasurers", members: ["B. Srikanth", "Vantaku Hemanth Kumar", "S. Manasa"] },
  { title: "Technical Coordinators", members: ["Yarapathni Balakrishna", "Mohammad Habibuddin", "A. Hemalatha"] },
];

const EVENT_COORDINATORS = [
  { title: "Workshop", members: ["Koppisetti Karthikeya", "Suddapalli Bala Karthikeya Sarma", "Nakka Keerthana", "Kanda Varalakshmi"] },
  { title: "Cultural Events", members: ["Bhargav", "Ganesh", "Sameera Begum"] },
  { title: "Flash Mob", members: ["Mohan", "N. Laasya", "S. Devisrri"] },
];

const TeamMemberCard = ({ name, role = "Coordinator", delay, size = "normal" }: { name: string, role?: string, delay: number, size?: "normal" | "large" }) => {
  const isLarge = size === "large";
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, delay }}
      viewport={{ once: true }}
      className={`flex flex-col items-center group ${isLarge ? "mb-6" : "mb-2"}`}
    >
      <div
        className={`rounded-full overflow-hidden border-2 border-white/10 group-hover:border-neon-cyan transition-colors duration-300 relative mb-3 bg-white/5 flex items-center justify-center shadow-lg
        ${isLarge ? "w-40 h-40 md:w-56 md:h-56 border-amber-500/30 group-hover:border-amber-400" : "w-28 h-28 md:w-32 md:h-32"}`}
      >
        {/* Placeholder Avatar logic */}
        <div className={`w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center`}>
          <span className={`font-bold text-white/20 group-hover:text-neon-cyan/50 transition-colors ${isLarge ? "text-5xl" : "text-3xl"}`}>
            {name.charAt(0)}
          </span>
        </div>
      </div>
      <h3 className={`font-display font-bold text-white text-center group-hover:text-neon-cyan transition-colors px-1 w-full leading-tight
        ${isLarge ? "text-xl md:text-2xl" : "text-sm md:text-base"}`}>
        {name}
      </h3>
      <p className={`font-mono font-medium tracking-wide uppercase mt-1 text-center 
        ${isLarge ? "text-amber-500/80 text-sm md:text-base" : "text-gray-400 text-xs"}`}>
        {role}
      </p>
    </motion.div>
  );
};

const SectionTitle = ({ title }: { title: string }) => (
  <motion.div
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="w-full flex items-center justify-center mb-10"
  >
    <div className="h-[1px] w-12 bg-white/20"></div>
    <h2 className="text-xl md:text-2xl font-display font-bold text-white mx-6 uppercase tracking-widest text-center">{title}</h2>
    <div className="h-[1px] w-12 bg-white/20"></div>
  </motion.div>
);

const Section = ({ title, members }: { title: string, members: string[] }) => {
  // Detect if this is a "VIP" section (Patrons/Faculty) to make blocks bigger
  const isLarge = title.includes("Patron") || title.includes("Convener") || title.includes("Faculty") || title.includes("Principal");

  return (
    <div className="mb-16">
      <SectionTitle title={title} />

      {/* RESPONSIVE GRID LOGIC:
          - Mobile: grid-cols-2 (Standard) OR grid-cols-1 (VIP)
          - Desktop: lg:grid-cols-4 (Standard) OR lg:grid-cols-3 (VIP)
      */}
      <div
        className={`grid gap-3 md:gap-6 mx-auto ${isLarge
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-w-5xl justify-items-center"
            : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl justify-items-center"
          }`}
      >
        {members.map((member, i) => (
          <TeamMemberCard
            key={i}
            name={member}
            // If it's a Patron, use the section title as the role. Otherwise "Coordinator".
            role={isLarge ? title : "Coordinator"}
            // Pass size prop to adjust padding/text size inside the card
            size={isLarge ? "large" : "normal"}
            delay={i * 0.05}
          />
        ))}
      </div>
    </div>
  );
};

const Team = () => {
  return (
    <div className="min-h-screen bg-deep-navy pt-24 pb-20 px-4">
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-4xl md:text-6xl font-display font-bold text-center text-white mb-4 tracking-tight"
      >
        THE <span className="text-neon-cyan">TEAM</span>
      </motion.h1>
      <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto px-4 text-lg">Organizing Committee & Coordinators</p>

      {/* 1. FACULTY / PATRONS */}
      <div className="max-w-6xl mx-auto mb-20">
        {FACULTY_SECTIONS.map((section, i) => (
          <Section key={i} title={section.title} members={section.members} />
        ))}
      </div>

      {/* 2. CORE TEAM */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-20">
        <h2 className="text-3xl font-display font-bold text-center text-white mb-16 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple opacity-80">Core Committee</h2>
        {STUDENT_SECTIONS.map((section, i) => (
          <Section key={i} title={section.title} members={section.members} />
        ))}
      </div>

      {/* 3. EVENT COORDINATORS */}
      <div className="max-w-7xl mx-auto border-t border-white/10 pt-20">
        <h2 className="text-3xl font-display font-bold text-center text-white mb-16 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan opacity-80">Event Coordinators</h2>
        {EVENT_COORDINATORS.map((section, i) => (
          <Section key={i} title={section.title} members={section.members} />
        ))}
      </div>

    </div>
  );
};

export default Team;
