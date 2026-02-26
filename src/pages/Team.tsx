import { motion } from "framer-motion";
import { useState, useEffect, memo } from "react";
import ImageWithSkeleton from "../components/ui/ImageWithSkeleton";
import Skeleton from "../components/ui/Skeleton";

// --- STUDENT IMAGES ---
import CherrynischalImg from '../assets/Cherrynischal.webp';
import GowthamiImg from '../assets/Gowthami.webp';
import ManojramImg from '../assets/Manojram.webp';
import HannahgraceImg from '../assets/Hannahgrace.png';
import HabibuddhinImg from '../assets/Habibuddhin.webp';
import BhargavImg from '../assets/Bhargav.webp';
import SrikanthImg from '../assets/Srikanth.webp';
import MohanImg from '../assets/Mohanchandra.webp';
import BalakrishnaImg from '../assets/Balakrishna.jpg';
import LaasyaImg from '../assets/Laasya.webp';
import SameeraImg from '../assets/Sameera.webp';


// --- DATA ---
import type { TeamMember, Section } from "../types";

const FACULTY_SECTIONS: Section[] = [
  {
    title: "Chief Patron",
    members: [{
      name: "Prof. V. V. Subbarao", role: "Chief Patron", designation: "Vice Chancellor",
      image: "https://jntugv.edu.in/static/media/vc.1d93f5ebef1ab0a5e73b.png"
    }]
  },
  {
    title: "Patron",
    members: [{
      name: "Prof. G. Jaya Suma", role: "Patron", designation: "Registrar",
      image: "https://drd.jntugv.edu.in/wp-content/uploads/2024/09/Registrar-1.jpg"
    }]
  },
  {
    title: "Co-Patrons",
    members: [
      {
        name: "Dr. K. Chandra Bhushana Rao", role: "Co-Patron", designation: "Principal",
        image: "https://jntugv.edu.in/static/media/dap.63b3d936dee64b3fbae9.jpeg"
      },
      {
        name: "Prof. G. J. N. Nagaraju", role: "Co-Patron", designation: "Vice Principal, JNTUGV",
        image: "https://res.cloudinary.com/dwmx2ujv6/image/upload/f_auto,q_auto/v1771229471/Prof.G.J.Nagaraju_arnau2.webp"
      }
    ]
  },
  {
    title: "Administration",
    members: [
      { name: "Dr. V. S. Vakula", role: "HoD of EEE", designation: "Chairman", image: "https://res.cloudinary.com/dwmx2ujv6/image/upload/f_auto,q_auto/v1771229470/Dr.V.S.Vakula_xjicv3.webp" },
      { name: "Dr. K. Srikumar", role: "Convenor", designation: "Professor, EEE", image: "https://res.cloudinary.com/dwmx2ujv6/image/upload/f_auto,q_auto/v1771229470/Convenor_ndcynb.webp" },
      { name: "Dr. A. Padmaja", role: "Faculty Coordinator", designation: "Asst. Professor, EEE", image: "https://res.cloudinary.com/dwmx2ujv6/image/upload/f_auto,q_auto/v1771229469/Dr.A.Padmaja_rnpdj0.webp" }
    ]
  },
];

const STUDENT_SECTIONS: Section[] = [
  {
    title: "Student Coordinators",
    members: [
      { name: "Y. Chery Nischal", role: "Student Coordinator", designation: "III B.TECH EEE", roll: "23VV1A0260", image: CherrynischalImg },
      { name: "G. Gowthami", role: "Student Coordinator", designation: "III B.TECH EEE", roll: "23VV1A0219", image: GowthamiImg },
      { name: "V. Manoj Ram", role: "Student Coordinator", designation: "III B.TECH EEE", roll: "23VV1A0258", image: ManojramImg },
      { name: "P. Hannah Grace", role: "Student Coordinator", designation: "III B.TECH EEE", roll: "23VV1A0242", image: HannahgraceImg },
    ]
  },
  {
    title: "Treasurer",
    members: [
      { name: "B. Srikanth", role: "Treasurer", designation: "III B.TECH EEE", roll: "23VV1A0208", image: SrikanthImg },
    ]
  },
  {
    title: "Technical Coordinators",
    members: [
      { name: "Y. Balakrishna", role: "Technical Co-Ordinator", designation: "III B.TECH EEE", roll: "23VV1A0263", image: BalakrishnaImg },
      { name: "Md. Habibuddin", role: "Technical Co-Ordinator", designation: "III B.TECH EEE", roll: "23VV1A0232", image: HabibuddhinImg },
    ]
  },
  {
    title: "Cultural Coordinators",
    members: [
      { name: "Rana Bhargav", role: "Cultural Coordinator", designation: "III B.TECH EEE", roll: "23VV1A0243", image: BhargavImg },
      { name: "Sameera Begum", role: "Cultural Coordinator", designation: "III B.TECH EEE", roll: "23VV1A0244", image:SameeraImg },
    ]
  },
  {
    title: "Flashmob Coordinators",
    members: [
      { name: "G. Mohan Chandra", role: "Flashmob Coordinator", designation: "III B.TECH EEE", roll: "23VV1A0217", image: MohanImg },
      { name: "Nujella Laasya", role: "Flashmob Coordinator", designation: "III B.TECH EEE", roll: "23VV1A0236" ,image: LaasyaImg},
    ]
  },
];

// ─────────────────────────────────────────────
// CIRCULAR CARD — memoized, GPU-accelerated
// ─────────────────────────────────────────────
const CircularCard = memo(({ member, index }: { member: TeamMember; index: number }) => {
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  return (
    <motion.div
      initial={isMobile ? { opacity: 0 } : { opacity: 0, y: 24 }}
      whileInView={isMobile ? { opacity: 1 } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "200px" }}
      transition={{
        duration: isMobile ? 0.3 : 0.5,
        delay: isMobile ? 0 : index * 0.06,
        ease: "easeOut",
      }}
      style={{ willChange: "opacity, transform" }}
      className="group flex flex-col items-center justify-start p-3 md:p-5"
    >
      {/* ROLE BADGE */}
      <span className="inline-block text-amber-400 font-mono text-[9px] md:text-[11px] tracking-[0.18em] uppercase font-bold mb-4 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/5">
        {member.role || "MEMBER"}
      </span>

      {/* CIRCLE — glows on hover */}
      <div
        className="relative w-[140px] h-[140px] md:w-[180px] md:h-[180px] mb-4"
        style={{ transform: "translateZ(0)" }}
      >
        {/* Glow ring — animates on group hover */}
        <div className="absolute inset-0 rounded-full bg-neon-cyan/10 scale-110 opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-500" />
        {/* Border + image */}
        <div className="absolute inset-0 rounded-full border-2 border-neon-cyan/60 group-hover:border-neon-cyan shadow-[0_0_18px_rgba(0,243,255,0.2)] group-hover:shadow-[0_0_30px_rgba(0,243,255,0.45)] overflow-hidden bg-zinc-900 transition-all duration-300">
          <ImageWithSkeleton
            src={
              member.image ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=0a0a0a&color=00f3ff&font-size=0.38&bold=true`
            }
            alt={member.name}
            className="w-full h-full object-cover object-center select-none pointer-events-none"
            onContextMenu={(e: React.MouseEvent) => e.preventDefault()}
            draggable="false"
            width={192}
            height={192}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>

      {/* TEXT */}
      <div className="text-center flex flex-col items-center gap-[3px] max-w-[160px] md:max-w-[200px]">
        {/* FIX: break-words instead of whitespace-nowrap — names like "Y. Chery Nischal" were clipped */}
        <h3 className="text-white font-bold text-sm md:text-lg tracking-wide uppercase font-sans break-words leading-tight">
          {member.name}
        </h3>
        {member.designation && (
          <p className="text-gray-400 text-[9px] md:text-[11px] tracking-wider uppercase font-medium mt-[2px]">
            {member.designation}
          </p>
        )}
        {member.roll && (
          <p className="text-neon-cyan/50 text-[8px] md:text-[9px] tracking-widest font-mono mt-[2px]">
            {member.roll}
          </p>
        )}
      </div>
    </motion.div>
  );
});
CircularCard.displayName = "CircularCard";

// ─────────────────────────────────────────────
// SECTION — isolated rendering subtree
// ─────────────────────────────────────────────
const Section = ({
  title,
  members,
  gridClass,
}: {
  title: string;
  members: TeamMember[];
  gridClass?: string;
}) => {
  const defaultGrid =
    "flex flex-row flex-wrap items-center justify-center gap-x-6 gap-y-10 md:gap-16 max-w-6xl w-full px-2 md:px-0";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "150px" }}
      transition={{ duration: 0.4 }}
      className="mb-16 md:mb-24 w-full flex flex-col items-center"
      style={{
        contain: "layout style paint",
        contentVisibility: "auto",
        containIntrinsicSize: "600px",
      }}
    >
      {/* SECTION HEADER */}
      <div className="flex items-center gap-3 md:gap-5 mb-10 md:mb-14 w-full max-w-xl md:max-w-3xl px-4">
        <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-gray-500" />
        <h2 className="text-base md:text-xl font-display text-white uppercase tracking-[0.25em] whitespace-nowrap">
          {title}
        </h2>
        <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent via-gray-600 to-gray-500" />
      </div>

      {/* CARDS */}
      <div className={gridClass ?? defaultGrid}>
        {members.map((member, i) => (
          <CircularCard key={i} member={member} index={i} />
        ))}
      </div>
    </motion.div>
  );
};

// ─────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────
const TeamSkeleton = () => (
  <div className="flex flex-col items-center w-full animate-pulse px-4">
    <div className="w-56 h-10 bg-white/5 rounded-lg mb-4" />
    <div className="w-40 h-5 bg-white/5 rounded mb-24" />
    {[1, 2].map((s) => (
      <div key={s} className="w-full max-w-4xl flex flex-col items-center mb-20">
        <div className="w-36 h-5 bg-white/5 rounded mb-12" />
        <div className="flex justify-center gap-12 flex-wrap">
          {[1, 2].map((c) => (
            <div key={c} className="flex flex-col items-center gap-3">
              <Skeleton className="w-36 h-36 md:w-44 md:h-44 rounded-full" />
              <Skeleton className="w-28 h-4 rounded" />
              <Skeleton className="w-20 h-3 rounded" />
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
);

// ─────────────────────────────────────────────
// DIVIDER between Faculty and Students
// ─────────────────────────────────────────────
const FacultyStudentDivider = () => (
  <div className="w-full max-w-2xl flex items-center gap-4 my-8 mb-20 px-6">
    <div className="flex-1 h-[1px] bg-gradient-to-r from-transparent to-neon-cyan/40" />
    <span className="text-neon-cyan/50 text-[10px] font-mono tracking-[0.3em] uppercase">
      Student Team
    </span>
    <div className="flex-1 h-[1px] bg-gradient-to-l from-transparent to-neon-cyan/40" />
  </div>
);

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
const Team = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen pt-28 pb-40 px-4 bg-black font-sans relative overflow-x-hidden">
      {isLoading ? (
        <TeamSkeleton />
      ) : (
        <>
          {/* PAGE HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center mb-20"
          >
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-3 leading-none">
              <span className="text-white">THE </span>
              <span className="text-neon-cyan">TEAM</span>
            </h1>
            {/* FIX: was &amp; (double-encoded), correct JSX is plain & */}
            <p className="text-gray-500 text-base md:text-lg font-light tracking-widest uppercase">
              Organizing Committee & Coordinators
            </p>
          </motion.div>

          {/* FACULTY */}
          <div className="flex flex-col items-center w-full">
            {FACULTY_SECTIONS.map((section, i) => (
              <Section key={i} title={section.title} members={section.members} />
            ))}
          </div>

          <FacultyStudentDivider />

          {/* STUDENTS */}
          <div className="flex flex-col items-center w-full">
            {STUDENT_SECTIONS.map((section, i) => (
              <Section
                key={i}
                title={section.title}
                members={section.members}
                // Student Coordinators (4 members) → 2×2 on mobile, 4-in-a-row on desktop
                gridClass={
                  section.title === "Student Coordinators"
                    ? "grid grid-cols-2 md:grid-cols-4 gap-x-0 gap-y-10 md:gap-6 w-full max-w-5xl px-0 md:px-4 place-items-center"
                    : undefined
                }
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Team;
