import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { IndianRupee, Users, Clock, ExternalLink, FileText } from "lucide-react";
import ImageWithSkeleton from "../components/ui/ImageWithSkeleton";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const EVENTS = [
  {
    id: 1,
    title: "EV TECHNOLOGY",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072&fm=webp",
    description: "An immersive workshop involving the breakdown coverage of Electric Vehicles. Hands-on experience in BMS, Motor Design, and Power Controllers.",
    fee: "₹ 999/-",
    teamSize: "Individual",
    time: "Mar 4, 9:00 AM - 5:00 PM",
    coordinators: [
      { name: "Koppisetti Karthikeya", phone: "+91 86887 85636" },
      { name: "Nakka Keerthana", phone: "+91 93818 85336" }
    ],
    regLink: "https://forms.gle/AgRYxchbP5Y6AA1z9",
    brochureLink: "/brochures/ev-workshop.pdf"
  },
  {
    id: 2,
    title: "TABLEAU",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&fm=webp",
    description: "Master the art of Data Visualization. Learn how to connect data sources, create impactful dashboards, and tell stories with data using Tableau.",
    fee: "₹ 499/-",
    teamSize: "Individual",
    time: "Mar 4, 9:00 AM - 5:00 PM",
    coordinators: [
      { name: "S. B. Karthikeya Sarma", phone: "+91 94915 02203" },
      { name: "Kanda Varalakshmi", phone: "+91 81859 03589" }
    ],
    regLink: "https://forms.gle/wbWZJX9VEMktp1hy5",
    brochureLink: "/brochures/tableau-workshop.pdf"
  },
  {
    id: 3,
    title: "WATT VISION",
    category: "Project Expo",
    image: "https://static.vecteezy.com/system/resources/thumbnails/070/375/490/small/precision-soldering-on-green-circuit-board-close-up-electronic-repair-technology-free-photo.jpg",
    description: "Showcase your innovative projects and ideas to a panel of experts. A platform to display your technical prowess.",
    fee: "₹ 150 (1) | ₹ 250 (2) | ₹ 350 (3-4)",
    teamSize: "Max 4",
    time: "Mar 5, 10:00 AM",
    coordinators: [
      { name: "B. Teja", phone: "+91 83742 30526" },
      { name: "I. Hariharan", phone: "+91 96767 59375" }
    ],
    regLink: "https://forms.gle/d2HWknhhBM9fuPvn8",
    brochureLink: "/brochures/watt-vision.pdf"
  },
  {
    id: 4,
    title: "BRAIN WAVE",
    category: "Quiz",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070&fm=webp",
    description: "Test your knowledge in technical and general trivia. A battle of wits to claim the title of the smartest mind.",
    fee: "₹ 50/-",
    teamSize: "Individual",
    time: "Mar 5, 11:00 AM",
    coordinators: [
      { name: "K. P. Chaitanya Varma", phone: "+91 93475 88627" },
      { name: "Sheik Aziz", phone: "+91 99083 44734" }
    ],
    regLink: "https://forms.gle/MRzLk7tL9FENZKcX6",
    brochureLink: "/brochures/brain-wave.pdf"
  },
  {
    id: 5,
    title: "PUZZLE MANIA",
    category: "Treasure Hunt",
    image: "https://images.stockcake.com/public/7/5/e/75e504f6-f315-43cd-a410-290bf0dfbc79_large/innovative-lightbulb-puzzle-stockcake.jpg",
    description: "Solve riddles, find clues, and race against time. The ultimate treasure hunt awaits you.",
    fee: "₹ 50 (Solo) | ₹ 200 (Group of 4)",
    teamSize: "1 or 4",
    time: "Mar 5, 2:00 PM",
    coordinators: [
      { name: "A. Manoj Kumar", phone: "+91 99630 13092" },
      { name: "T. Ramya", phone: "" } // Add phone if available
    ],
    regLink: "https://forms.gle/uQe6hZi75j54Gwcf9",
    brochureLink: "/brochures/puzzle-mania.pdf"
  },
  {
    id: 6,
    title: "MIND ARENA",
    category: "Tech Challenge",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&fm=webp",
    description: "A series of mind-bending technical challenges designed to push your problem-solving skills to the limit.",
    fee: "₹ 50/-",
    teamSize: "Individual",
    time: "Mar 5, 10:00 AM",
    coordinators: [
      { name: "V. K. Praneeth Naidu", phone: "+91 63051 81638" },
      { name: "D. Satya Durga", phone: "" }
    ],
    regLink: "https://forms.gle/mFzmAUut1Mq5qw8JA",
    brochureLink: "/brochures/mind-arena.pdf"
  },
  {
    id: 7,
    title: "PIXEL LENS",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&fm=webp",
    description: "Capture the essence of Eclectique. A photography contest to showcase your unique perspective.",
    fee: "₹ 50/-",
    teamSize: "Individual",
    time: "Mar 4-5 (All Day)",
    coordinators: [
      { name: "Ch. Kuldeep", phone: "+91 63019 58061" },
      { name: "K. Sushmitha", phone: "" }
    ],
    regLink: "https://forms.gle/UTZbdAiutHrHZRtP9",
    brochureLink: "/brochures/pixel-lens.pdf"
  },
  {
    id: 8,
    title: "ART SPARK",
    category: "Creative Arts",
    image: "https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?_gl=1*1kj32c7*_ga*Mjk3MDc5NDAzLjE3NzExNzk1MTI.*_ga_8JE65Q40S6*czE3NzExNzk1MTIkbzEkZzEkdDE3NzExNzk1MjgkajQ0JGwwJGgw",
    description: "Unleash your creativity through colors and sketches. A competition for the artist in you.",
    fee: "₹ 50/-",
    teamSize: "Individual",
    time: "Mar 5, 1:00 PM",
    coordinators: [
      { name: "Vakapalili Sanjay", phone: "+91 73966 72320" }, { name: "Dupana Bhavya", phone: "" }
    ],
    regLink: "https://forms.gle/GRD9pcYu5rts34PE7",
    brochureLink: "/brochures/art-spark.pdf"
  }
];

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleRegister = (link: string) => {
    setIsRedirecting(true);
    setTimeout(() => {
      window.open(link, "_blank");
      setIsRedirecting(false);
    }, 800);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (window.innerWidth >= 768) {
        gsap.fromTo(
          sectionRef.current,
          {
            translateX: 0,
          },
          {
            translateX: "-700vw", // 8 items = 800vw -> Move 700vw
            ease: "none",
            duration: 1,
            scrollTrigger: {
              trigger: triggerRef.current,
              start: "top top",
              end: "+=6000",
              scrub: 0.6,
              pin: true,
            },
          }
        );
      }
    }, triggerRef); // Scope to triggerRef

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-transparent">

      {/* Redirect Overlay */}
      <AnimatePresence>
        {isRedirecting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
          >
            <div className="flex flex-col items-center gap-6">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 rounded-full border-t-2 border-neon-cyan animate-spin"></div>
                <div className="absolute inset-2 rounded-full border-b-2 border-neon-purple animate-spin-slow"></div>
              </div>
              <p className="text-neon-cyan font-display tracking-widest text-lg animate-pulse">
                REDIRECTING TO SECURE REGISTRATION...
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intro Section (Stick to Top) */}
      <div className="h-screen w-full flex items-center justify-center relative z-10 border-b border-white/10">
        <div className="text-center px-4">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl md:text-8xl font-display font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-cyan mb-4"
          >
            EVENTS
          </motion.h2>
          <p className="text-gray-400 text-xl tracking-wider">Scroll down to explore</p>
          <div className="mt-8 animate-bounce text-neon-cyan">
            ↓
          </div>
        </div>
      </div>

      {/* Desktop Horizontal Scroll */}
      <div ref={triggerRef} className="hidden md:block overflow-hidden">
        <div ref={sectionRef} className="h-screen w-[800vw] flex flex-row relative">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="w-screen h-screen flex flex-row items-center justify-center p-20 border-r border-white/5 relative"
            >
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-transparent z-0" />

              {/* Event Image Card (Left) */}
              <div className="w-1/2 h-[70vh] relative z-10 group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 hover:border-neon-cyan/50">
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <ImageWithSkeleton
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Event Details (Right) */}
              <div className="w-1/2 flex flex-col justify-center items-start pl-16 z-10">
                <span className="text-neon-purple tracking-[0.3em] font-medium text-sm mb-2 uppercase">{event.category}</span>
                <h3 className="text-7xl font-display font-bold text-white mb-6 leading-tight">
                  {event.title}
                </h3>

                {/* INFO ELEMENTS (Inserted Block) */}
                <div className="flex flex-wrap gap-8 mb-8 border-y border-white/10 py-4 w-full max-w-xl">
                  <div className="flex items-center gap-3">
                    <IndianRupee className="text-neon-cyan" size={24} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Fee</p>
                      <p className="text-white font-bold">{event.fee}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="text-neon-cyan" size={24} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Team</p>
                      <p className="text-white font-bold">{event.teamSize}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="text-neon-cyan" size={24} />
                    <div>
                      <p className="text-xs text-gray-500 uppercase tracking-wider">Time</p>
                      <p className="text-white font-bold">{event.time}</p>
                    </div>
                  </div>
                </div>

                <p className="text-gray-300 text-xl font-light leading-relaxed mb-8 max-w-lg">
                  {event.description}
                </p>

                {/* Coordinators */}
                <div className="mb-8">
                  <h4 className="text-neon-cyan text-sm font-bold uppercase tracking-widest mb-2 border-b border-neon-cyan/20 inline-block pb-1">Coordinators</h4>
                  <div className="flex flex-wrap gap-4 mt-2">
                    {event.coordinators.map((coord, idx) => (
                      <span key={idx} className="text-gray-400 font-mono text-sm bg-white/5 px-3 py-1 rounded-sm border border-white/5 hover:border-neon-purple/50 transition-colors">
                        {coord.name} <span className="text-neon-purple/50 text-xs ml-1">({coord.phone})</span>
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleRegister(event.regLink)}
                    className="px-8 py-3 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-bold tracking-widest hover:bg-neon-cyan hover:text-deep-navy transition-all duration-300 rounded-sm flex items-center gap-2"
                  >
                    REGISTER <ExternalLink size={16} />
                  </button>

                  <a
                    href={event.brochureLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 border border-white/10 text-white/60 hover:border-neon-cyan/50 hover:text-neon-cyan transition-all duration-300 text-[10px] tracking-widest uppercase px-4 py-3 rounded-md bg-white/5 backdrop-blur-sm"
                  >
                    <FileText className="w-4 h-4" />
                    <span className="hidden sm:inline">Brochure</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Vertical Stack */}
      <div className="block md:hidden py-10 px-4 flex flex-col gap-12 pb-24">
        {EVENTS.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="w-full flex flex-col gap-4 rounded-xl overflow-hidden bg-white/5 backdrop-blur-md border border-white/10 pb-6"
          >
            {/* Mobile Image */}
            <div className="w-full aspect-[3/2] relative overflow-hidden">
              <ImageWithSkeleton
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-navy via-transparent to-transparent opacity-80" />
            </div>

            {/* Mobile Details */}
            <div className="px-5 flex flex-col">
              <span className="text-neon-purple text-xs tracking-[0.2em] uppercase font-bold mb-1">{event.category}</span>
              <h3 className="text-3xl font-display font-bold text-white mb-3">{event.title}</h3>

              {/* Mobile Info Grid */}
              <div className="flex flex-wrap gap-4 mb-4 text-xs">
                <span className="flex items-center gap-1 text-gray-300"><IndianRupee size={12} className="text-neon-cyan" /> {event.fee}</span>
                <span className="flex items-center gap-1 text-gray-300"><Users size={12} className="text-neon-cyan" /> {event.teamSize}</span>
                <span className="flex items-center gap-1 text-gray-300"><Clock size={12} className="text-neon-cyan" /> {event.time}</span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {event.description}
              </p>

              <div className="mb-6">
                <h4 className="text-neon-cyan/80 text-xs font-bold uppercase tracking-widest mb-2">Coordinators</h4>
                <div className="flex flex-wrap gap-2">
                  {event.coordinators.map((coord, idx) => (
                    <span key={idx} className="text-gray-300 text-xs bg-white/5 px-2 py-1 rounded border border-white/5">
                      {coord.name}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => handleRegister(event.regLink)}
                  className="flex-1 py-3 bg-neon-cyan text-deep-navy font-bold text-center tracking-widest uppercase rounded-sm hover:bg-white transition-colors"
                >
                  Register
                </button>
                <a
                  href={event.brochureLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 flex items-center justify-center gap-2 border border-white/10 text-white/70 hover:bg-white/5 transition-all text-xs tracking-widest uppercase rounded-sm"
                >
                  <FileText className="w-4 h-4" /> Brochure
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
