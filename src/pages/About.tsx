import { motion } from "framer-motion";
import { ChevronRight, Zap, Users, Target, Cpu, Quote, ExternalLink } from "lucide-react";
import jntugvLogo from "../assets/jntugv-logo.png";
import culturalClubLogo from "../assets/culturalclub.png";
import cliqueLogo from "../assets/T-Shirt LOGO .png";
import eclectiqueLogo from "../assets/Eclectique_logo.webp";

const About = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-neon-purple/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">

        {/* ABOUT US - HERO BLOCK */}
        <div className="max-w-5xl mx-auto mb-16 px-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
            {/* Ambient glow orbs */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            {/* ── HEADER ──────────────────────────────────── */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-3xl font-display font-bold text-white mb-4 tracking-widest uppercase"
            >
              About Us
            </motion.h2>

            {/* Department name */}
            <motion.h3
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-2xl font-bold mb-1 tracking-wide leading-tight text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-cyan-300"
            >
              Department of Electrical and Electronics Engineering
            </motion.h3>

            {/* University name */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="text-gray-400 text-sm md:text-base font-bold tracking-wide mb-6"
            >
              Jawaharlal Nehru Technological University Gurajada Vizianagaram
            </motion.p>

            <div className="w-20 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mb-10 rounded-full" />

            {/* ── BRAND WALL (FOUR-LOGO GRID) ────────────────── */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1 }
                }
              }}
              initial="hidden"
              animate="show"
              className="bg-white/5 backdrop-blur-xl border-[0.5px] border-white/10 rounded-2xl p-8 mb-12 max-w-3xl mx-auto"
            >
              <p className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-mono mb-8 text-center">POWERED BY</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 items-center justify-items-center">

                {/* 1 — JNTUGV */}
                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="flex flex-col items-center gap-3 w-full">
                  <div className="aspect-square w-full max-w-[5rem] md:max-w-[6rem] bg-white rounded-xl p-3 flex items-center justify-center">
                    <img
                      src={jntugvLogo}
                      alt="JNTUGV Official Logo"
                      className="w-full h-full object-contain"
                      style={{ filter: "drop-shadow(0 0 8px rgba(0, 255, 255, 0.3))" }}
                      onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0.25"; }}
                    />
                  </div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-mono text-center">JNTUGV</p>
                </motion.div>

                {/* 2 — Eclectique 2K26 */}
                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="flex flex-col items-center gap-3 w-full">
                  <div className="aspect-square w-full max-w-[5rem] md:max-w-[6rem] bg-white rounded-xl p-3 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                    <img
                      src={eclectiqueLogo}
                      alt="Eclectique 2K26 Logo"
                      className="w-full h-full object-contain"
                      style={{ filter: "drop-shadow(0 0 8px rgba(168,85,247,0.4))" }}
                    />
                  </div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-mono text-center">Eclectique</p>
                </motion.div>

                {/* 3 — Clique */}
                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="flex flex-col items-center gap-3 w-full">
                  <div className="aspect-square w-full max-w-[5rem] md:max-w-[6rem] bg-white rounded-xl p-3 flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                    <img
                      src={cliqueLogo}
                      alt="Clique – Technical Club"
                      className="w-full h-full object-contain rounded-xl"
                      style={{ filter: "drop-shadow(0 0 8px rgba(0,255,255,0.3))" }}
                    />
                  </div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-mono text-center">Clique</p>
                </motion.div>

                {/* 4 — Cultural Club */}
                <motion.div variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="flex flex-col items-center gap-3 w-full">
                  <div className="aspect-square w-full max-w-[5rem] md:max-w-[6rem] bg-white rounded-xl p-3 flex items-center justify-center">
                    <img
                      src={culturalClubLogo}
                      alt="Cultural Club"
                      className="w-full h-full object-contain rounded-xl"
                      style={{ filter: "drop-shadow(0 0 8px rgba(168,85,247,0.4))" }}
                    />
                  </div>
                  <p className="text-[9px] text-gray-500 uppercase tracking-[0.2em] font-mono text-center">Cultural Club</p>
                </motion.div>

              </div>
            </motion.div>

            {/* ── CALL TO ACTION ─────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block mt-4"
            >

            </motion.div>
          </div>
        </div>

        <div className="w-full pt-16">
          <div className="max-w-5xl mx-auto space-y-24">

            {/* 1. THE COLLEGE */}
            <div id="university" className="scroll-mt-32">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4"><span className="text-neon-cyan">JNTUGV</span></h2>
              </div>

              {/* Campus Profile */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 p-6 md:p-10 rounded-2xl w-full">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center justify-center gap-3">
                  <Target className="text-neon-cyan" size={28} /> The Campus
                </h3>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 text-justify hidden md:block">
                  The JNTU GV College of Engineering Vizianagaram has been established during September 2007 with five Under Graduate Engineering Courses Viz., B.Tech. In EEE, ECE, CSE, ME, and IT as a constituent college of erstwhile JNTU, Hyderabad. Infrastructure development works Phase I was sanctioned by Govt. to a tune of 28.10 Crores and commenced the construction work in March, 2008 at Dwarapudi, Vizianagaram with an Academic Block, Boys Hostel and Girls Hostel. In the year 2008 (20.08.2008) JNTU Kakinada has been established as a separate University with this campus as constituent college and shifted to own campus at Dwarapudi, Vizianagaram during June,2009. This College has been elevated as a separate university JNTU-GV in 2022.
                </p>
                <p className="text-gray-300 text-sm leading-relaxed mb-8 text-center md:hidden">
                  Established in 2007 and elevated to a separate university in 2022, JNTU-GV CEV is a premier engineering institution equipped with state-of-the-art infrastructure to foster technical excellence and innovation.
                </p>
                <div className="text-center">
                  <a
                    href="https://jntugvcev.edu.in/know-ucev/about-ucev-2/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 border border-neon-cyan/50 text-neon-cyan font-bold tracking-[0.2em] text-sm uppercase rounded-full hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
                  >
                    Know More About College <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
            {/* 2. THE DEPARTMENT */}
            <div id="department" className="scroll-mt-32">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">THE DEPARTMENT</h2>
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
                  <div className="text-center md:text-left">
                    <h3 className="text-xl font-bold text-white mb-2">HOD's Desk</h3>
                    <p className="text-gray-300 italic mb-4 leading-relaxed font-light hidden md:block">
                      "Welcome to the Department of Electrical & Electronics Engineering, JNTU-GV CEV headed by Dr. V. S. Vakula. Our department offers UG & PG to students seeking a challenging environment to pursue academics. The department has adequate teaching faculty having varied fields of specialization in Electrical Engineering. The faculty is engaged in active research in the areas of Power System Optimization, Adaptive Power System Stabilizers, Hybrid Power Systems, Power Electronic Drives, and Large Scale Uncertain Systems."
                    </p>
                    <p className="text-gray-300 italic mb-4 leading-relaxed font-light hidden md:block">
                      "The key objective of the department is to strive hard to make the future EEE graduates meet modern industry needs. Our department offers UG (with an intake of 60) & PG in Advanced Power systems (with an intake of 25) courses to students seeking a challenging environment to pursue academics. The department has well equipped laboratories to provide necessary and sufficient practical knowledge to the students and encourages them towards innovative research and development ideas. Experts from the industry are periodically invited for lectures and demonstrations to the students on the latest advances in the field of electrical engineering. Students are encouraged to undertake projects in the areas of Power System planning, operations and control, Power Electronics, Electrical Machines, renewable energy technologies etc., and also they are motivated to take up industry based projects. Students are given exposure to real time field experience by industrial/field visits."
                    </p>

                    <p className="text-gray-300 italic mb-4 leading-relaxed font-light md:hidden text-sm">
                      "Welcome to the EEE Department. We strive to make future graduates meet modern industry needs through innovative research, well-equipped labs, and expert industry interactions. Our goal is to nurture technically proficient minds equipped to solve global engineering challenges."
                    </p>

                    <p className="text-neon-cyan font-bold tracking-widest uppercase text-sm">— Dr. V. S. Vakula</p>
                  </div>
                </div>
              </div>

              {/* Vision & Mission */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-neon-cyan/30 transition-colors group">
                  <div className="w-14 h-14 bg-neon-cyan/10 rounded-xl flex items-center justify-center text-neon-cyan mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                    <Target size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Vision</h3>
                  <p className="text-gray-300 leading-relaxed font-light">
                    To emerge as a center of excellence in education, research and technological services in the field of Electrical & Electronics Engineering to meet the growing needs of society.
                  </p>
                </div>

                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-8 rounded-2xl hover:border-neon-purple/30 transition-colors group">
                  <div className="w-14 h-14 bg-neon-purple/10 rounded-xl flex items-center justify-center text-neon-purple mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                    <Cpu size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">Mission</h3>
                  <div className="text-gray-300 font-light mb-4">
                    The mission of the undergraduate program in Electrical and Electronics Engineering is
                  </div>
                  <ul className="space-y-4 text-gray-300 font-light">
                    <li className="flex items-start gap-3">
                      <ChevronRight size={18} className="text-neon-purple shrink-0 mt-1" />
                      <span className="leading-relaxed">To facilitate the students with a supportive environment to acquire the basic skills in Science, Engineering & Technology by adopting effective teaching learning processes.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={18} className="text-neon-purple shrink-0 mt-1" />
                      <span className="leading-relaxed">To impart the state-of-the-art knowledge in the relevant field to promote research in Electrical and Electronics Engineering.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={18} className="text-neon-purple shrink-0 mt-1" />
                      <span className="leading-relaxed">To imbibe self-learning attitude, professional ethics, interpersonal & leadership skills.</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight size={18} className="text-neon-purple shrink-0 mt-1" />
                      <span className="leading-relaxed">To emphasize and support industry institute relationship for producing entrepreneurs to contribute for social and rural benefits.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a
              href="https://jntugvcev.edu.in/department/electronics-electrical-engineering/hods-desk/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-white/5 border border-neon-cyan/50 text-neon-cyan font-bold tracking-[0.2em] text-sm uppercase rounded-full hover:bg-neon-cyan/10 hover:shadow-[0_0_20px_rgba(0,255,255,0.3)] transition-all"
            >
              Know More About Department <ExternalLink size={16} />
            </a>
          </div>
        </div>

        {/* 3. ECLECTIQUE */}
        <div id="eclectique" className="scroll-mt-32">
          <div className="bg-gradient-to-br from-deep-navy to-black border border-white/10 p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl mb-12">
            {/* Decor */}
            <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-neon-cyan/20 via-transparent to-transparent pointer-events-none" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
              <div className="text-center md:text-left">
                <span className="text-neon-cyan uppercase tracking-widest text-sm font-bold mb-2 block">The Symposium</span>
                <h2 className="text-4xl md:text-5xl font-display font-black text-white mb-6">ECLECTIQUE <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple"></span></h2>

                <p className="text-gray-300 mb-6 leading-relaxed hidden md:block">
                  The prestigious National Level Technical Symposium organized annually by the <strong className="text-white">Department of Electrical and Electronics Engineering</strong> at JNTU-GV College of Engineering, Vizianagaram.
                </p>
                <p className="text-gray-300 mb-6 leading-relaxed text-sm md:hidden">
                  The National Level Technical Symposium by the <strong className="text-white">EEE Department</strong> at JNTU-GV CEV.
                </p>

                <h4 className="text-white font-bold text-lg mb-3 mt-8 hidden md:block">The Legacy of Eclectique</h4>
                <p className="text-gray-400 text-sm leading-relaxed mb-6 hidden md:block">
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
      </div>
    </div>
  );
};

export default About;
