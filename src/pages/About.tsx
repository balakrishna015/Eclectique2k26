import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Award, Zap, Users, Building, Target, Cpu, User, BookOpen, Quote, ExternalLink } from "lucide-react";

type TabType = "UNIVERSITY" | "DEPARTMENT" | "ACADEMICS" | "RESEARCH" | "ACHIEVEMENTS" | "MEMOIR" | "ECLECTIQUE" | "FACULTY";

interface FacultyMember {
  name: string;
  designation: string;
  role: string;
  specialization?: string;
  image?: string;
}

const TABS: { id: TabType; label: string }[] = [
  { id: "UNIVERSITY", label: "THE UNIVERSITY" },
  { id: "DEPARTMENT", label: "THE DEPARTMENT" },
  { id: "ACADEMICS", label: "ACADEMICS" },
  { id: "RESEARCH", label: "RESEARCH" },
  { id: "ACHIEVEMENTS", label: "ACHIEVEMENTS" },
  { id: "MEMOIR", label: "THE MEMOIR" },
  { id: "ECLECTIQUE", label: "ECLECTIQUE 2K26" },
  { id: "FACULTY", label: "THE FACULTY" }
];

const LEADERSHIP: FacultyMember[] = [
  { name: "Prof. K. Venkata Subbaiah", designation: "Chief Patron", role: "Hon'ble Vice Chancellor, JNTUGV", specialization: "Mechanical Engineering" },
  { name: "Prof. K. Srikumar", designation: "Patron", role: "Principal, JNTUGV CEV" },
  { name: "Dr. V. S. Vakula", designation: "Convenor", role: "Head of the Department, EEE" }
];

const NON_TEACHING_STAFF = [
  { name: "Mr. M. S. Raju", role: "Special Grade Mechanic" },
  { name: "Mr. Ramana", role: "Lab Assistant" },
  { name: "Mr. Satyanarayana", role: "Lab Assistant" }
];

const FacultyCard = ({ member, index }: { member: FacultyMember; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 group hover:scale-[1.02] hover:border-neon-cyan/50 hover:shadow-[0_0_30px_rgba(0,255,255,0.1)] transition-all duration-300 relative overflow-hidden flex flex-col items-center text-center h-full"
  >
    <div className="absolute top-0 right-0 w-24 h-24 bg-neon-cyan/5 rounded-full blur-2xl group-hover:bg-neon-cyan/10 transition-colors" />

    <div className="w-24 h-24 mb-4 rounded-full border-2 border-white/20 p-1 group-hover:border-neon-cyan transition-colors">
      {member.image ? (
        <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full" />
      ) : (
        <div className="w-full h-full bg-deep-navy rounded-full flex items-center justify-center text-neon-cyan relative overflow-hidden">
          <div className="absolute inset-0 bg-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
          <UserPlaceholderSVG />
        </div>
      )}
    </div>

    <div className="mb-2">
      <span className="text-[10px] uppercase tracking-widest text-neon-cyan font-semibold px-2 py-1 rounded bg-neon-cyan/10 mb-2 inline-block">
        {member.designation}
      </span>
    </div>
    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-cyan-300 transition-colors">{member.name}</h3>
    <p className="text-sm text-gray-400 mb-2">{member.role}</p>
    {member.specialization && (
      <p className="text-xs text-gray-500 italic mt-auto">Spcalization: {member.specialization}</p>
    )}

    <div className="w-full mt-4 pt-4 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity flex justify-center">
      <button className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-neon-cyan min-h-[44px] min-w-[44px] hover:text-white transition-colors">
        View Profile <ChevronRight size={14} />
      </button>
    </div>
  </motion.div>
);

const UserPlaceholderSVG = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const About = () => {
  const [activeTab, setActiveTab] = useState<TabType>("UNIVERSITY");

  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-16 bg-white/5 p-2 rounded-2xl backdrop-blur-md border border-white/20 w-fit mx-auto sticky top-[80px] z-20 shadow-2xl">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-4 py-2 text-xs md:text-sm font-bold uppercase tracking-wider rounded-xl transition-colors min-h-[44px] ${activeTab === tab.id ? "text-deep-navy" : "text-gray-400 hover:text-white"
                }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabBadge"
                  className="absolute inset-0 bg-neon-cyan rounded-xl z-0"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.4 }}
            className="w-full pt-32"
          >
            {/* 1. THE UNIVERSITY */}
            {activeTab === "UNIVERSITY" && (
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12 mt-8 scroll-mt-40">
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4"><span className="text-neon-cyan">JNTUGV</span></h2>
                </div>

                {/* Campus Profile & Hierarchy */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                      <Target className="text-neon-cyan" size={24} /> The Campus
                    </h3>
                    <p className="text-gray-300 text-sm leading-relaxed mb-4">
                      Nestled in an 80-acre serene landscape at Dwarapudi, Vizianagaram, the campus provides a tranquil and highly stimulating academic environment.
                      Now a constituent college of JNTU-GV, it is equipped with state-of-the-art laboratories, modern classrooms, and extensive research facilities to foster technical brilliance and innovation.
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                      <Users className="text-neon-purple" size={24} /> Administration
                    </h3>
                    <ul className="space-y-3">
                      <li className="flex items-center gap-3 text-gray-300 text-sm">
                        <div className="w-2 h-2 rounded-full bg-neon-cyan" /> Executive Council
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm pl-4">
                        <div className="w-2 h-2 rounded-full bg-neon-purple" /> Vice Chancellor
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm pl-8">
                        <div className="w-2 h-2 rounded-full bg-[#ff3333]" /> Registrar
                      </li>
                      <li className="flex items-center gap-3 text-gray-300 text-sm pl-12">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" /> Principal
                      </li>
                    </ul>
                  </div>
                </div>

                {/* PG Programmes Offered */}
                <div className="mt-16">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center flex items-center justify-center gap-3">
                    <BookOpen className="text-neon-cyan" size={24} /> PG Programmes Offered
                  </h3>
                  <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-white/5" style={{ scrollbarWidth: 'none' }}>
                    <table className="w-full text-left border-collapse min-w-[800px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-xs bg-black/40">S.No</th>
                          <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-xs bg-black/40">Name of the PG Programme</th>
                          <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-xs bg-black/40">Dept. Offering</th>
                          <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-xs bg-black/40">Duration</th>
                          <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-xs bg-black/40">Year of Starting</th>
                          <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-xs bg-black/40">Intake</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { sno: 1, name: "ADVANCED ELECTRICAL POWER SYSTEM", dept: "EEE", duration: "2 years", year: "2013", intake: "18" },
                          { sno: 2, name: "THERMAL ENGINEERING", dept: "ME", duration: "2 years", year: "2017", intake: "18" },
                          { sno: 3, name: "SYSTEMS AND SIGNAL PROCESSING", dept: "ECE", duration: "2 years", year: "2013", intake: "18" },
                          { sno: 4, name: "COMPUTER SCIENCE AND ENGINEERING", dept: "CSE", duration: "2 years", year: "2009", intake: "18" },
                          { sno: 5, name: "MATERIAL SCIENCE AND TECHNOLOGY", dept: "MET", duration: "2 years", year: "2017", intake: "18" },
                          { sno: 6, name: "INFORMATION TECHNOLOGY", dept: "IT", duration: "2 years", year: "2009", intake: "18" },
                          { sno: 7, name: "DATA SCIENCE", dept: "IT", duration: "2 years", year: "2020", intake: "25" },
                          { sno: 8, name: "MASTERS IN COMPUTER APPLICATIONS", dept: "IT", duration: "3 years", year: "2009", intake: "30" },
                        ].map((prog) => (
                          <tr key={prog.sno} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 text-white text-sm font-bold">{prog.sno}</td>
                            <td className="py-4 px-6 text-white text-sm font-medium">{prog.name}</td>
                            <td className="py-4 px-6 text-gray-300 text-sm font-bold">{prog.dept}</td>
                            <td className="py-4 px-6 text-gray-400 text-sm">{prog.duration}</td>
                            <td className="py-4 px-6 text-gray-400 text-sm font-mono">{prog.year}</td>
                            <td className="py-4 px-6">
                              <span className="bg-neon-purple/20 text-neon-purple text-xs px-2 py-1 rounded font-bold whitespace-nowrap">{prog.intake} Seats</span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-12 text-center">
                  <a
                    href="https://www.jntugv.edu.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 border border-neon-cyan/50 text-neon-cyan font-bold tracking-[0.2em] text-sm uppercase rounded-full hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
                  >
                    Know More <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            )}

            {/* 2. THE DEPARTMENT */}
            {activeTab === "DEPARTMENT" && (
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12 mt-8 scroll-mt-40">
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">EEE: A Center of Excellence</h2>
                  <p className="text-gray-400 text-lg">Forging the future of power systems, control engineering, and green technology.</p>
                </div>

                {/* HOD Message */}
                <div className="mb-12 bg-gradient-to-br from-deep-navy to-black border border-white/10 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
                  <div className="absolute top-4 right-6 opacity-10">
                    <Quote size={120} className="text-neon-cyan" />
                  </div>
                  <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-32 h-32 rounded-full border-2 border-neon-cyan overflow-hidden shrink-0">
                      <img src="https://res.cloudinary.com/dwmx2ujv6/image/upload/f_auto,q_auto/v1771229470/Dr.V.S.Vakula_xjicv3.webp" alt="HOD" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">HOD's Desk</h3>
                      <p className="text-gray-300 italic mb-4 leading-relaxed font-light">
                        "Welcome to the Department of Electrical & Electronics Engineering. We strive to nurture world-class innovators and technically proficient minds equipped to solve global engineering challenges. Our curriculum is deeply rooted in both theoretical rigor and practical excellence."
                      </p>
                      <p className="text-neon-cyan font-bold tracking-widest uppercase text-sm">— Dr. V. S. Vakula</p>
                    </div>
                  </div>
                </div>

                {/* Programs & Intake */}
                <div className="mb-12 w-full overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-white/10">
                        <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-sm bg-white/5 rounded-tl-xl">Programme</th>
                        <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-sm bg-white/5">Specialization</th>
                        <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-sm bg-white/5">Year of Starting</th>
                        <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-sm bg-white/5 rounded-tr-xl">Annual Intake</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6 text-white font-medium">B.Tech</td>
                        <td className="py-4 px-6 text-gray-300">Electrical & Electronics Engineering</td>
                        <td className="py-4 px-6 text-gray-400 font-mono text-sm">2007</td>
                        <td className="py-4 px-6"><span className="bg-neon-cyan/20 text-neon-cyan px-3 py-1 rounded font-bold">60 Seats</span></td>
                      </tr>
                      <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-4 px-6 text-white font-medium">M.Tech</td>
                        <td className="py-4 px-6 text-gray-300">Advanced Electrical Power Systems</td>
                        <td className="py-4 px-6 text-gray-400 font-mono text-sm">2013</td>
                        <td className="py-4 px-6"><span className="bg-neon-purple/20 text-neon-purple px-3 py-1 rounded font-bold">18 Seats</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Vision & Mission */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-neon-cyan/30 transition-colors group">
                    <div className="w-14 h-14 bg-neon-cyan/10 rounded-xl flex items-center justify-center text-neon-cyan mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                      <Target size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Vision</h3>
                    <p className="text-gray-300 leading-relaxed font-light">
                      To be a premier technical department creating globally competent Electrical and Electronics Engineers with a strong foundation in core engineering, possessing a global perspective and robust problem-solving capabilities.
                    </p>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-neon-purple/30 transition-colors group">
                    <div className="w-14 h-14 bg-neon-purple/10 rounded-xl flex items-center justify-center text-neon-purple mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                      <Cpu size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Mission</h3>
                    <ul className="space-y-4 text-gray-300 font-light">
                      <li className="flex items-start gap-3">
                        <ChevronRight size={18} className="text-neon-purple shrink-0 mt-1" />
                        <span className="leading-relaxed"><strong className="text-white block">Supportive Environment</strong> To facilitate students with a supportive environment to acquire basic skills in Science, Engineering & Technology by adopting effective teaching-learning processes.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight size={18} className="text-neon-purple shrink-0 mt-1" />
                        <span className="leading-relaxed"><strong className="text-white block">State-of-the-Art Knowledge</strong> To impart contemporary knowledge in the relevant field to promote research in Electrical and Electronics Engineering.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight size={18} className="text-neon-purple shrink-0 mt-1" />
                        <span className="leading-relaxed"><strong className="text-white block">Professionalism</strong> To imbibe a self-learning attitude, professional ethics, interpersonal skills, and leadership qualities.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight size={18} className="text-neon-purple shrink-0 mt-1" />
                        <span className="leading-relaxed"><strong className="text-white block">Societal Benefit</strong> To emphasize and support industry-institute relationships for producing entrepreneurs who contribute to social and rural benefits.</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 3. ACADEMICS */}
            {activeTab === "ACADEMICS" && (
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12 mt-8 scroll-mt-40">
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Academic <span className="text-neon-cyan">Excellence</span></h2>
                  <p className="text-gray-400 text-lg">Empowering students through modern teaching methodologies and active learning.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <Zap className="text-neon-cyan" size={24} /> Innovation in Learning
                    </h3>
                    <ul className="space-y-4">
                      <li className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-neon-cyan/10 flex items-center justify-center shrink-0 mt-1">
                          <Cpu size={18} className="text-neon-cyan" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold">ICT & Smart Classrooms</h4>
                          <p className="text-gray-400 text-sm">Interactive smart boards and multimedia-driven lectures for enhanced visualization.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-neon-purple/10 flex items-center justify-center shrink-0 mt-1">
                          <Award size={18} className="text-neon-purple" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold">NPTEL / SWAYAM</h4>
                          <p className="text-gray-400 text-sm">Mandatory MOOCs certifications ensuring alignment with global technical standards.</p>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-cyan-400/10 flex items-center justify-center shrink-0 mt-1">
                          <Users size={18} className="text-cyan-400" />
                        </div>
                        <div>
                          <h4 className="text-white font-bold">CLIQUE Club</h4>
                          <p className="text-gray-400 text-sm">Student-driven technical club fostering peer-learning, workshops, and hackathons.</p>
                        </div>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <BookOpen className="text-neon-purple" size={24} /> Teaching Methods
                    </h3>
                    <div className="space-y-6">
                      <div className="border border-white/10 p-4 rounded-xl hover:bg-white/5 transition-colors">
                        <h4 className="text-white font-bold mb-2">Simulation-Based Learning</h4>
                        <p className="text-gray-400 text-sm">Extensive use of MATLAB, Simulink, and Multisim for circuit design and power system analysis.</p>
                      </div>
                      <div className="border border-white/10 p-4 rounded-xl hover:bg-white/5 transition-colors">
                        <h4 className="text-white font-bold mb-2">Hands-On Robotics</h4>
                        <p className="text-gray-400 text-sm">Hardware implementation workshops covering microcontrollers, IoT, and automated control systems.</p>
                      </div>
                      <div className="border border-white/10 p-4 rounded-xl hover:bg-white/5 transition-colors">
                        <h4 className="text-white font-bold mb-2">Project-Based Approach</h4>
                        <p className="text-gray-400 text-sm">Mini-projects mapped to core subjects bridging the gap between theory and industry practice.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 4. RESEARCH */}
            {activeTab === "RESEARCH" && (
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 mt-8 scroll-mt-40">
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Research & <span className="text-neon-purple">Development</span></h2>
                  <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed mt-6">
                    JNTUGV-UCEV strives to inculcate a robust research culture among its students and faculty by encouraging multi-disciplinary research activities aligned with global standards. The <span className="text-neon-cyan font-bold">R&D Cell</span> was established to provide dedicated support and guidance for both academic and sponsored research projects. Our research community boasts numerous peer-reviewed journal publications and patents, with projects sanctioned by prestigious funding agencies such as <span className="text-pink-500 font-bold">UGC, DST, DAE, and NRB</span>.
                  </p>
                </div>



                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                    <Target className="text-neon-cyan" size={24} /> EEE Research Domains
                  </h3>
                  <div className="flex flex-wrap gap-4 justify-center max-w-5xl mx-auto">
                    {[
                      "Large Scale Uncertain Systems",
                      "Order reduction of Large Scale Systems",
                      "Uncertain Systems & Soft Computing Techniques",
                      "Interval Systems & Robust Controllers",
                      "Control Application of Power Systems",
                      "Adaptive Power System Stabilizers",
                      "Power Quality, Smart Grids, and Micro Grids",
                      "Distributed Generation & Automatic Generation Control",
                      "Hybrid Power Systems & Adaptive Controllers"
                    ].map((domain, i) => (
                      <span key={i} className="px-5 py-2.5 bg-white/5 border border-white/10 rounded-full text-sm font-medium text-gray-300 hover:text-white hover:border-neon-cyan hover:bg-neon-cyan/5 transition-all cursor-default shadow-sm hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                        {domain}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Advisory Committee Table */}
                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                    <Users className="text-neon-purple" size={24} /> Research Advisory Committee
                  </h3>
                  <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-white/5" style={{ scrollbarWidth: 'none' }}>
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-xs bg-black/40">Member Name</th>
                          <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-xs bg-black/40">Role</th>
                          <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-xs bg-black/40">Designation</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { name: "The Principal", role: "Chairman", desig: "Executive Head" },
                          { name: "R & D Cell Coordinator", role: "Convener", desig: "R&D Lead" },
                          { name: "The Vice Principal", role: "Member", desig: "Academic Administration" },
                          { name: "Head of EEE Department", role: "Member", desig: "Departmental Representative" },
                          { name: "Head of ME Department", role: "Member", desig: "Departmental Representative" },
                          { name: "Head of ECE Department", role: "Member", desig: "Departmental Representative" },
                          { name: "Head of CSE Department", role: "Member", desig: "Departmental Representative" },
                          { name: "Head of IT Department", role: "Member", desig: "Departmental Representative" },
                          { name: "Head of CE Department", role: "Member", desig: "Departmental Representative" },
                          { name: "Head of BS & HSS Department", role: "Member", desig: "Departmental Representative" },
                        ].map((m, i) => (
                          <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 text-white text-sm font-bold">{m.name}</td>
                            <td className="py-4 px-6 text-neon-cyan text-sm font-bold uppercase tracking-widest">{m.role}</td>
                            <td className="py-4 px-6 text-gray-400 text-sm">{m.desig}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                    <Users className="text-neon-purple" size={24} /> Research Scholars under Supervision
                  </h3>
                  <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-white/5" style={{ scrollbarWidth: 'none' }}>
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="py-4 px-6 text-neon-purple font-bold uppercase tracking-widest text-xs bg-black/40">S.No</th>
                          <th className="py-4 px-6 text-neon-purple font-bold uppercase tracking-widest text-xs bg-black/40">Name of the Scholar</th>
                          <th className="py-4 px-6 text-neon-purple font-bold uppercase tracking-widest text-xs bg-black/40">Roll No</th>
                          <th className="py-4 px-6 text-neon-purple font-bold uppercase tracking-widest text-xs bg-black/40">Area of Research</th>
                          <th className="py-4 px-6 text-neon-purple font-bold uppercase tracking-widest text-xs bg-black/40">Supervisor</th>
                          <th className="py-4 px-6 text-neon-purple font-bold uppercase tracking-widest text-xs bg-black/40">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { sno: 1, name: "Mr. M. Ravindra Babu", roll: "12022P0202", area: "Design and Analysis of Firefly based Power System Stabilizer based on Pseudo Spectrum Analysis", supervisor: "Prof. G. Saraswathi", status: "Awarded in 2019" },
                          { sno: 2, name: "Mr. N. V. A. Ravikumar", roll: "13022P0221", area: "Some Aspects on Large Scale Robust Controllers", supervisor: "Prof. G. Saraswathi", status: "Awarded in 2021" },
                          { sno: 3, name: "P.A. Mohanarao", roll: "13022P0211", area: "Power Quality Issues in a Stand-Alone Micro-grid based on Renewable Energy", supervisor: "Prof. G. Saraswathi", status: "In Process" },
                          { sno: 4, name: "K. Lavanya", roll: "15022P0230", area: "Design and Implementation of a Suitable Controller for Multilevel Inverter Fed PMSM Drive", supervisor: "Prof. G. Saraswathi", status: "In Process" },
                          { sno: 5, name: "V.Rangavalli", roll: "15022P0226", area: "Performance Evaluation of Distribution System Planning to Improve the Efficiency of Micro-grid", supervisor: "Prof. G. Saraswathi", status: "In Process" },
                          { sno: 6, name: "K. Koteswara Rao", roll: "15022P0237", area: "Enhancement of Power System Stability in Renewable Sources of Power Generation Fed to a SG based Power System through a LCC-HVDC Link", supervisor: "Prof. G. Saraswathi", status: "In Process" },
                          { sno: 7, name: "Ravi Teja S", roll: "18022P0203", area: "Development of Low Cost-High Efficiency Multilevel Converter Topologies for High Power Applications", supervisor: "Dr. Y S Kishore Babu", status: "In Progress" },
                          { sno: 8, name: "P.Veera Nagaraju", roll: "18022P0205", area: "Study of Renewable Energy Integration to Grid-Challenges & Solutions", supervisor: "Dr. Y S Kishore Babu", status: "In Progress" },
                          { sno: 9, name: "Sri.T.M.Mohan", roll: "12022P0232", area: "Fuzzy Logic MPPT for Grid Integrated Photovoltaic Systems though H-Bridge Inverter Under Partial Shading Conditions", supervisor: "Dr. V.S. Vakula", status: "Awarded" },
                          { sno: 10, name: "Sri.G.Sandeep", roll: "14022P0216", area: "Power Systems", supervisor: "Dr. V.S. Vakula", status: "In Progress" },
                          { sno: 11, name: "Sri. Rajendra.T", roll: "15022P0220", area: "Power Systems", supervisor: "Dr. V.S. Vakula", status: "In Progress" },
                          { sno: 12, name: "Smt.V.V.Vijetha Inti", roll: "15022P0225", area: "Power Electronic Applications to Power Systems", supervisor: "Dr. V.S. Vakula", status: "In Progress" },
                          { sno: 13, name: "Smt.T.Naga Durga", roll: "15022P0204", area: "Power Quality Improvement", supervisor: "Dr. V.S. Vakula", status: "In Progress" },
                          { sno: 14, name: "Smt.K.Swetha", roll: "15022P0216", area: "Control Applications to Power Systems", supervisor: "Dr. V.S. Vakula", status: "In Progress" }
                        ].map((s) => (
                          <tr key={s.sno} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 text-white text-sm font-bold">{s.sno}</td>
                            <td className="py-4 px-6 text-white text-sm font-medium whitespace-nowrap">{s.name}</td>
                            <td className="py-4 px-6 text-gray-400 text-sm font-mono">{s.roll}</td>
                            <td className="py-4 px-6 text-gray-300 text-sm leading-relaxed max-w-sm">{s.area}</td>
                            <td className="py-4 px-6 text-white text-sm">{s.supervisor}</td>
                            <td className="py-4 px-6">
                              <span className={`text-xs px-2 py-1 rounded font-bold whitespace-nowrap ${s.status.includes('Awarded') ? 'bg-neon-cyan/20 text-neon-cyan' : 'bg-yellow-500/20 text-yellow-500'}`}>
                                {s.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* 5. ACHIEVEMENTS */}
            {activeTab === "ACHIEVEMENTS" && (
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12 mt-8 scroll-mt-40">
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Milestones & <span className="text-neon-cyan">Triumphs</span></h2>
                  <p className="text-gray-400 text-lg">A legacy of excellence built through relentless dedication by staff and students alike.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-cyan-400/30 transition-colors">
                    <div className="w-12 h-12 bg-cyan-400/10 rounded-xl flex items-center justify-center text-cyan-400 mb-6">
                      <Award size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Faculty Achievements</h3>
                    <ul className="space-y-3">
                      <li className="text-gray-300 text-sm leading-relaxed border-l-2 border-cyan-400/50 pl-3">
                        <span className="font-bold text-white block">RUSA Project Grant</span>
                        <strong className="text-white">Dr. V. S. Vakula</strong> led a major RUSA-funded research initiative in advanced power systems.
                      </li>
                      <li className="text-gray-300 text-sm leading-relaxed border-l-2 border-cyan-400/50 pl-3">
                        <span className="font-bold text-white block">Academic Publications</span>
                        Authored key textbooks in core electrical engineering, establishing an academic footprint nationwide.
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-neon-purple/30 transition-colors">
                    <div className="w-12 h-12 bg-neon-purple/10 rounded-xl flex items-center justify-center text-neon-purple mb-6">
                      <Target size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Student Accolades</h3>
                    <ul className="space-y-3">
                      <li className="text-gray-300 text-sm leading-relaxed border-l-2 border-neon-purple/50 pl-3">
                        <span className="font-bold text-white block">Supreme Squaders Trophy</span>
                        Champions in the prestigious inter-college technical and athletic summit.
                      </li>
                      <li className="text-gray-300 text-sm leading-relaxed border-l-2 border-neon-purple/50 pl-3">
                        <span className="font-bold text-white block">Competitive Excellence</span>
                        Consistent top-tier <strong className="text-white">GATE</strong> rankers securing spots in premier IITs and PSUs.
                      </li>
                      <li className="text-gray-300 text-sm leading-relaxed border-l-2 border-neon-purple/50 pl-3">
                        <span className="font-bold text-white block">Industry Experience</span>
                        Multiple core internships at <strong className="text-white">BOLT IoT</strong>, blending hardware with cloud automation.
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl hover:border-pink-500/30 transition-colors">
                    <div className="w-12 h-12 bg-pink-500/10 rounded-xl flex items-center justify-center text-pink-500 mb-6">
                      <Building size={24} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-4">Industry Synergy</h3>
                    <ul className="space-y-3">
                      <li className="text-gray-300 text-sm leading-relaxed border-l-2 border-pink-500/50 pl-3">
                        <span className="font-bold text-white block">MOU with Sarda Metals</span>
                        A landmark Memorandum of Understanding with <strong className="text-white">M/s Sarda Metals & Alloys Ltd</strong> bridging the gap between academic research and heavy industrial application, providing internships and joint research avenues.
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* 6. MEMOIR */}
            {activeTab === "MEMOIR" && (
              <div className="max-w-5xl mx-auto">
                <div className="text-center mb-12 mt-8 scroll-mt-40">
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">The Memoir: <span className="text-neon-purple">Chronicles of EEE</span></h2>
                  <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed mt-6">
                    The official departmental magazine of the Electrical and Electronics Engineering (EEE) department at <span className="text-neon-cyan font-bold">JNTU-GV College of Engineering, Vizianagaram</span>. It serves as a comprehensive platform to showcase the technical achievements, research progress, and creative talents of both students and faculty.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-gradient-to-br from-black to-deep-navy border border-white/10 p-8 rounded-3xl relative overflow-hidden shadow-2xl group hover:border-neon-purple/30 transition-colors">
                    <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neon-purple/20 via-transparent to-transparent pointer-events-none" />
                    <BookOpen size={40} className="text-neon-purple mb-6" />
                    <h3 className="text-2xl font-bold text-white mb-6">Purpose and Theme</h3>
                    <div className="space-y-6">
                      <div className="flex gap-4 items-start">
                        <div className="w-1.5 h-full min-h-[40px] bg-neon-purple rounded-full shrink-0" />
                        <div>
                          <h4 className="text-white font-bold text-lg mb-1">Scientific Tribute</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">The magazine is traditionally dedicated as a tribute to <strong className="text-white">Michael Faraday</strong>, the "Father of Electricity," often released in conjunction with Faraday Memorial Day.</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <div className="w-1.5 h-full min-h-[40px] bg-pink-500 rounded-full shrink-0" />
                        <div>
                          <h4 className="text-white font-bold text-lg mb-1">Creative Bridge</h4>
                          <p className="text-gray-400 text-sm leading-relaxed">It is designed to bridge the gap between rigorous academic excellence and artistic expression, allowing students to share technical articles alongside creative entries.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl h-full flex flex-col justify-center hover:border-neon-cyan/30 transition-colors">
                    <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                      <Award className="text-neon-cyan" size={24} /> Core Content
                    </h3>
                    <ul className="space-y-4 text-gray-300 font-light text-sm">
                      <li className="flex items-start gap-3">
                        <ChevronRight size={16} className="text-neon-cyan shrink-0 mt-0.5" />
                        <span className="leading-relaxed"><strong className="text-white block">Technical Research</strong> Features student-authored articles on cutting-edge technologies such as Graphene Supercapacitors, IoT-based Electricity Theft Minimization, Smart Solar Monitoring, and Wireless Charging.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight size={16} className="text-neon-cyan shrink-0 mt-0.5" />
                        <span className="leading-relaxed"><strong className="text-white block">Academic Milestones</strong> Documents the department's vision to emerge as a center of excellence and its mission to produce industry-ready graduates.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight size={16} className="text-neon-cyan shrink-0 mt-0.5" />
                        <span className="leading-relaxed"><strong className="text-white block">Achievements</strong> Records significant milestones, including MoUs with industries (like M/s Sarda Metals & Alloys Ltd), staff awards, and student successes in competitive exams like GATE.</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <ChevronRight size={16} className="text-neon-cyan shrink-0 mt-0.5" />
                        <span className="leading-relaxed"><strong className="text-white block">Departmental Life</strong> Includes details on the CLIQUE student club, technical symposiums like ECLECTIQUE, and various social and co-curricular activities.</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-3xl">
                  <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 justify-center">
                    <Users className="text-cyan-400" size={24} /> Leadership and Support
                  </h3>
                  <p className="text-gray-400 text-center text-sm mb-8">The publication is a collaborative effort produced under a "hierarchy of support":</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-white/10 p-6 rounded-2xl bg-black/20 text-center">
                      <h4 className="text-white font-bold text-lg mb-2">Institutional Guidance</h4>
                      <p className="text-gray-400 text-sm">Supported by the <strong className="text-cyan-400">College Principal</strong> to ensure an authentic learning experience.</p>
                    </div>
                    <div className="border border-white/10 p-6 rounded-2xl bg-black/20 text-center">
                      <h4 className="text-white font-bold text-lg mb-2">Departmental Motivation</h4>
                      <p className="text-gray-400 text-sm">Driven by the <strong className="text-neon-purple">Head of the Department</strong> and the dedicated <strong className="text-neon-purple">EEE Faculty</strong>, who provide the necessary mentorship and expertise.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 7. ECLECTIQUE */}
            {activeTab === "ECLECTIQUE" && (
              <div className="max-w-5xl mx-auto mt-8 scroll-mt-40">
                <div className="bg-gradient-to-br from-deep-navy to-black border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl mb-12">
                  {/* Decor */}
                  <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neon-cyan/20 via-transparent to-transparent pointer-events-none" />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
                    <div>
                      <span className="text-neon-cyan uppercase tracking-widest text-sm font-bold mb-2 block">The Symposium</span>
                      <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">ECLECTIQUE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple"></span></h2>
                      <p className="text-gray-300 mb-6 leading-relaxed">
                        The prestigious National Level Technical Symposium organized annually by the <strong className="text-white">Department of Electrical and Electronics Engineering</strong> at JNTU-GV College of Engineering, Vizianagaram.
                      </p>

                      <h4 className="text-white font-bold text-lg mb-3 mt-8">The Legacy of Eclectique</h4>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        This symposium serves as a vital platform for students to transition from theoretical core curriculum concepts to real-world applications. It is designed to prepare young engineers for the industry by encouraging them to showcase their latent talents, organizational skills, and technical prowess.
                      </p>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
                        <h4 className="text-neon-cyan font-bold mb-1 flex items-center gap-2"><Target size={16} /> Objective</h4>
                        <p className="text-sm text-gray-300">To bridge the gap between industry requirements and academic learning through competitive events and expert interactions.</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
                        <h4 className="text-neon-purple font-bold mb-1 flex items-center gap-2"><Users size={16} /> Student Leadership</h4>
                        <p className="text-sm text-gray-300">Organized by the student body under the guidance of the Head of the Department and Faculty, fostering leadership and networking opportunities.</p>
                      </div>
                      <div className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition-colors">
                        <h4 className="text-pink-500 font-bold mb-2 flex items-center gap-2"><Zap size={16} /> Core Activities</h4>
                        <ul className="text-sm text-gray-300 space-y-1 list-disc pl-5">
                          <li>Technical Paper & Poster Presentations</li>
                          <li>Project Expos and Electrical Exhibitions</li>
                          <li>Technical Quizzes and Short Film competitions</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-8">
                  <a
                    href="https://jntugvcev.edu.in/department/electronics-electrical-engineering/photo-gallery-2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-neon-cyan/50 text-neon-cyan font-bold tracking-[0.2em] text-sm uppercase rounded-full hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
                  >
                    Gallery & Archives <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            )}

            {/* 8. FACULTY */}
            {activeTab === "FACULTY" && (
              <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12 mt-8 scroll-mt-40">
                  <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Faculty Profiles & <span className="text-neon-cyan">Academic Expertise</span></h2>
                  <p className="text-gray-400 text-lg max-w-4xl mx-auto leading-relaxed mt-6">
                    The Department of Electrical and Electronics Engineering is powered by a team of dedicated educators and researchers. Our faculty members bring a wealth of specialized knowledge from prestigious institutions, ensuring that students receive a well-rounded and industry-relevant education.
                  </p>
                </div>

                <div className="mb-16">
                  <h3 className="text-2xl font-bold text-white mb-8 text-center flex items-center justify-center gap-3">
                    <Users className="text-neon-cyan" size={24} /> Core Faculty Members
                  </h3>
                  <div className="w-full overflow-x-auto rounded-xl border border-white/10 bg-white/5" style={{ scrollbarWidth: 'none' }}>
                    <table className="w-full text-left border-collapse min-w-[1000px]">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-xs bg-black/40">S.No</th>
                          <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-xs bg-black/40">Name</th>
                          <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-xs bg-black/40">Qualification</th>
                          <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-xs bg-black/40">Current Designation</th>
                          <th className="py-4 px-6 text-neon-cyan font-bold uppercase tracking-widest text-xs bg-black/40">Specialization</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { sno: 1, name: "Dr. V.S. Vakula", qual: "Ph.D (JNTUK)", desig: "Assistant Professor & HOD", spec: "Power Systems" },
                          { sno: 2, name: "Dr. A. Padmaja", qual: "Ph.D (JNTUK)", desig: "Assistant Professor", spec: "Power Systems" },
                          { sno: 3, name: "Mr. A. Siva Sankar Naik", qual: "M.Tech (JNTUK)", desig: "Assistant Professor", spec: "Advanced Power Systems" },
                          { sno: 4, name: "Mr. P. Srinivasula Reddy", qual: "M.Tech (JNTUK)", desig: "Assistant Professor", spec: "Advanced Power Systems" },
                          { sno: 5, name: "Mrs. T. Sirisha", qual: "M.Tech (JNTUH)", desig: "Assistant Professor", spec: "Power Electronics" },
                          { sno: 6, name: "Mrs. Y. Chittemma", qual: "M.E (AUCE)", desig: "Assistant Professor", spec: "Power Systems & Automation" },
                          { sno: 7, name: "Mr. Ch. Venkataramana", qual: "M.Tech (JNTUK)", desig: "Assistant Professor", spec: "Power Systems" },
                          { sno: 8, name: "Mr. P. Pavan Kumar", qual: "M.Tech (St Theresa institute)", desig: "Assistant Professor", spec: "Power Electronics & Drives" },
                          { sno: 9, name: "Mr. P. Siva Kumar", qual: "M.Tech (AUCE)", desig: "Assistant Professor", spec: "Power Systems & Automation" },
                          { sno: 10, name: "Mr. V. S. D. Manohar Sahu", qual: "Ph.D (Kalinga Institute)", desig: "Assistant Professor", spec: "Control Systems" },
                          { sno: 11, name: "Mrs. S. Rajitha", qual: "M.Tech (JNTUK)", desig: "Assistant Professor", spec: "Power Systems" },
                        ].map((f) => (
                          <tr key={f.sno} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                            <td className="py-4 px-6 text-white text-sm font-bold">{f.sno}</td>
                            <td className="py-4 px-6 text-white text-sm font-medium whitespace-nowrap">{f.name}</td>
                            <td className="py-4 px-6 text-gray-400 text-sm font-mono">{f.qual}</td>
                            <td className="py-4 px-6 text-neon-cyan text-sm font-bold">{f.desig}</td>
                            <td className="py-4 px-6 text-gray-300 text-sm">{f.spec}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-black to-deep-navy border border-white/10 p-8 rounded-3xl relative overflow-hidden shadow-2xl mb-12 text-center group hover:border-neon-purple/30 transition-colors">
                  <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neon-purple/20 via-transparent to-transparent pointer-events-none" />
                  <h3 className="text-2xl font-bold text-white mb-4">Commitment to Excellence</h3>
                  <p className="text-gray-300 leading-relaxed font-light max-w-3xl mx-auto">
                    Our faculty members are actively engaged in <strong className="text-white">scholarly publications</strong>, including journal articles, books, and conference papers. They play a pivotal role in mentoring students for overall development, molding them to achieve their future goals and ambitions. By adopting <strong className="text-white">innovative teaching processes</strong> and utilizing <strong className="text-white">ICT infrastructure</strong>, they bridge the gap between core curriculum and modern industry requirements.
                  </p>
                </div>

                <div className="text-center">
                  <a
                    href="https://jntugvcev.edu.in/department/electronics-electrical-engineering/staff-list/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-transparent border border-neon-cyan/50 text-neon-cyan font-bold tracking-[0.2em] text-sm uppercase rounded-full hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
                  >
                    View Official Staff Profiles <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

      </div>
    </div>
  );
};

export default About;
