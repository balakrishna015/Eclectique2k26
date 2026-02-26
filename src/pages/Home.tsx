import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import TextReveal from "../components/TextReveal";
import EventModal from "../components/EventModal";
import type { EventData } from "../types";
import ImageWithSkeleton from "../components/ui/ImageWithSkeleton";

// --- FULL DATASET ---
const EVENTS_DATA: EventData[] = [
  // Workshops
  {
    id: 1,
    title: "EV TECHNOLOGY",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072",
    fee: "₹ 700/-",
    teamSize: "Individual",
    time: "Mar 4, 9:00 AM - 5:00 PM",
    description: "An immersive workshop involving the breakdown coverage of Electric Vehicles. Hands-on experience in BMS, Motor Design, and Power Controllers.",
    rules: ["Rules will be explained in the workshop", "Certification on completion"],
    coordinators: [
      { name: "Koppisetti Karthikeya", phone: "+91 86887 85636" },
      { name: "Nakka Keerthana", phone: "+91 93818 85336" }
    ],
    regLink: "https://forms.gle/WE2a9V9gnWWGbfzj7"
  },
  {
    id: 2,
    title: "TABLEAU",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    fee: "₹ 500/-",
    teamSize: "Individual",
    time: "Mar 4, 9:00 AM - 5:00 PM",
    description: "Master the art of Data Visualization. Learn how to connect data sources, create impactful dashboards, and tell stories with data using Tableau.",
    rules: ["Tableau Public must be installed", "Dataset will be provided prior to session"],
    coordinators: [
      { name: "S. B. Karthikeya Sarma", phone: "+91 94915 02203" },
      { name: "Kanda Varalakshmi", phone: "+91 81859 03589" }
    ],
    regLink: "https://forms.gle/wbWZJX9VEMktp1hy5"
  },
  // Events
  {
    id: 3,
    title: "WATT VISION",
    category: "Project Expo",
    image: "https://static.vecteezy.com/system/resources/thumbnails/070/375/490/small/precision-soldering-on-green-circuit-board-close-up-electronic-repair-technology-free-photo.jpg",
    fee: "₹ 150 (1) | ₹ 250 (2) | ₹ 350 (3-4)",
    teamSize: "Max 4 Members",
    time: "Mar 5, 10:00 AM",
    description: "Showcase your innovative projects and ideas to a panel of experts. A platform to display your technical prowess.",
    rules: ["Prototype demonstration is mandatory", "Showcase, Explain, and Demonstrate. Just bring your project to the event and show the judges what it can do!"],
    coordinators: [
      { name: "B. Teja", phone: "+91 83742 30526" },
      { name: "I. Hariharan", phone: "+91 96767 59375" }
    ],
    regLink: "https://forms.gle/d2HWknhhBM9fuPvn8"
  },
  {
    id: 4,
    title: "BRAIN WAVE",
    category: "Quiz",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070",
    fee: "₹ 50/-",
    teamSize: "Individual",
    time: "Mar 5, 11:00 AM",
    description: "Test your knowledge in technical and general trivia. A battle of wits to claim the title of the smartest mind.",
    rules: ["Prelims will be conducted on paper", "Top 6 teams qualify for stage rounds", "Use of mobiles leads to disqualification"],
    coordinators: [
      { name: "K. P. Chaitanya Varma", phone: "+91 93475 88627" },
      { name: "Sheik Aziz", phone: "+91 99083 44734" }
    ],
    regLink: "https://forms.gle/MRzLk7tL9FENZKcX6"
  },
  {
    id: 5,
    title: "TREASURE HUNT",
    category: "Treasure Hunt",
    image: "https://images.stockcake.com/public/7/5/e/75e504f6-f315-43cd-a410-290bf0dfbc79_large/innovative-lightbulb-puzzle-stockcake.jpg",
    fee: "₹ 50 (Solo) | ₹ 200 (Group of 4)",
    teamSize: "1 or 4",
    time: "Mar 5, 2:00 PM",
    description: "Solve riddles, find clues, and race against time. The ultimate treasure hunt awaits you.",
    rules: ["Solve to Move: Finish one puzzle to get the next clue.", "Sabotaging other teams' clues leads to disqualification.", "The first team to present the treasure wins!"],
    coordinators: [
      { name: "A. Manoj Kumar", phone: "+91 99630 13092" },
      { name: "T. Ramya", phone: "" }
    ],
    regLink: "https://forms.gle/uQe6hZi75j54Gwcf9"
  },
  {
    id: 6,
    title: "MIND ARENA",
    category: "Tech Challenge",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070",
    fee: "₹ 50/-",
    teamSize: "Individual",
    time: "Mar 5, 10:00 AM",
    description: "A series of mind-bending technical challenges designed to push your problem-solving skills to the limit.",
    rules: ["1 Room.", "25 Minimum objects in the room.", "30 Seconds to memorize objects.", "60 Seconds to write objects names."],
    coordinators: [
      { name: "V. K. Praneeth Naidu", phone: "+91 63051 81638" },
      { name: "D. Satya Durga", phone: "" }
    ],
    regLink: "https://forms.gle/mFzmAUut1Mq5qw8JA"
  },
  {
    id: 7,
    title: "PIXEL LENS",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000",
    fee: "₹ 50/-",
    teamSize: "Individual",
    time: "Mar 4-5 (All Day)",
    description: "Showcase your unique perspective by posting original photos on our page where the entry with the most genuine likes wins",
    rules: ["Post original photos on our page", "Most genuine likes will win", "No fake or bot likes"],
    coordinators: [
      { name: "Ch. Kuldeep", phone: "+91 63019 58061" },
      { name: "K. Sushmitha", phone: "" }
    ],
    regLink: "https://forms.gle/UTZbdAiutHrHZRtP9"
  },
  {
    id: 8,
    title: "ART SPARK",
    category: "Creative Arts",
    image: "https://images.pexels.com/photos/1646953/pexels-photo-1646953.jpeg?_gl=1*1kj32c7*_ga*Mjk3MDc5NDAzLjE3NzExNzk1MTI.*_ga_8JE65Q40S6*czE3NzExNzk1MTIkbzEkZzEkdDE3NzExNzk1MjgkajQ0JGwwJGgw",
    fee: "₹ 50/-",
    teamSize: "Individual",
    time: "Mar 5, 1:00 PM",
    description: "Bring any form of art—whether it's paintings, sketches, or crafts—to display at the event, where the most creative entry will be the winner",
    rules: ["Bring your art—paintings, sketches, or crafts—to the event", "Set up and display your work in the designated area", "No presentation or explanation is required", "Judges will evaluate and announce the winners"],
    coordinators: [
      { name: "Vakapalili Sanjay", phone: "+91 73966 72320" },
      { name: "Dupana Bhavya", phone: "" }
    ],
    regLink: "https://forms.gle/GRD9pcYu5rts34PE7"
  }
];

const Home = () => {
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleRegister = (link: string) => {
    setIsRedirecting(true);
    setTimeout(() => {
      window.open(link, "_blank");
      setIsRedirecting(false);
    }, 800);
  };

  const workshops = EVENTS_DATA.filter(e => e.id <= 2);
  const events = EVENTS_DATA.filter(e => e.id > 2);

  // Minimalist Card Component
  const EventCard = ({ item }: { item: EventData }) => (
    <div className="group relative h-80 rounded-xl overflow-hidden bg-deep-navy border border-white/10 hover:border-neon-cyan hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all duration-300">

      {/* HUD Corner Brackets */}
      <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-neon-cyan/50 z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-neon-cyan/50 z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-neon-cyan/50 z-10 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-neon-cyan/50 z-10 pointer-events-none" />

      <div className="h-2/3 overflow-hidden relative">
        <ImageWithSkeleton
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
      </div>

      <div className="h-1/3 flex flex-col justify-center items-center relative p-4 bg-white/5 backdrop-blur-md border-t border-white/10">
        <h3 className="flex items-center gap-2 text-xl font-display font-bold text-white mb-3 text-center tracking-wide group-hover:text-neon-cyan transition-colors">
          {/* Pulsing Core Dot */}
          <motion.span
            className="inline-block w-1.5 h-1.5 rounded-full bg-neon-cyan shrink-0"
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          {item.title}
        </h3>

        <div className="flex gap-4">
          <button
            onClick={() => setSelectedEvent(item)}
            className="px-4 py-1.5 border border-neon-cyan text-neon-cyan text-xs font-bold tracking-wider rounded hover:bg-neon-cyan hover:text-black transition-all uppercase"
          >
            Know More
          </button>
          <button
            onClick={() => handleRegister(item.regLink)}
            className="px-4 py-1.5 bg-neon-purple text-white text-xs font-bold tracking-wider rounded hover:bg-white hover:text-neon-purple transition-all uppercase"
          >
            Register
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-transparent overflow-y-auto overflow-x-hidden font-sans">

      {/* ── BLUEPRINT GRID BACKGROUND ─────────────────────────────────────── */}
      <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="blueprintGrid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(0,243,255,1)" strokeWidth="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#blueprintGrid)" opacity="0.03" />
        </svg>
      </div>

      {/* ── FLOATING COORD TEXT (desktop only) ────────────────────────────── */}
      <div
        className="fixed top-1/2 left-3 z-10 pointer-events-none hidden lg:block"
        style={{ transform: "translateY(-50%) rotate(180deg)", writingMode: "vertical-rl" }}
        aria-hidden
      >
        <p className="text-[10px] uppercase tracking-tighter font-mono text-white/25">
          COORD_SYSTEM: 17.68°N · 83.21°E
        </p>
      </div>
      <div
        className="fixed top-1/2 right-3 z-10 pointer-events-none hidden lg:block"
        style={{ transform: "translateY(-50%)", writingMode: "vertical-rl" }}
        aria-hidden
      >
        <p className="text-[10px] uppercase tracking-tighter font-mono text-white/25">
          JNTUGV · EEE DEPT · MAR 04–05 2026
        </p>
      </div>

      {/* HERO SECTION */}
      <div className="relative h-screen w-full flex items-center justify-center overflow-hidden text-white bg-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-deep-navy to-black opacity-80" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />

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

        {/* Glow Orbs */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[120px]"
        />

        {/* Content */}
        <div className="relative z-10 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-neon-cyan tracking-[0.3em] font-medium mb-4 uppercase text-sm md:text-base"
          >
            National Level Technical Symposium
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-9xl font-display font-black mb-6 tracking-tighter text-white"
          >
            ECLECTIQUE
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-neon-purple block md:inline"> 2K26</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center gap-3 mt-4"
          >
            <p className="text-xl md:text-2xl font-light text-gray-300 tracking-wide">JNTU-GV Vizianagaram</p>
            <p className="text-neon-purple font-bold tracking-widest uppercase border border-neon-purple/30 px-6 py-2 rounded-full bg-neon-purple/5">
              March 04 & 05, 2026
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          onClick={() => {
            document.getElementById("workshops")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer group z-20"
          aria-label="Scroll down to explore events"
        >
          <p className="text-white/60 text-xs md:text-sm tracking-widest uppercase font-light group-hover:text-neon-cyan transition-colors duration-300">
            Scroll down to explore  Workshops &amp;  Events
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/50 group-hover:text-neon-cyan transition-colors duration-300"
          >
            <ChevronDown size={22} strokeWidth={1.5} />
          </motion.div>
        </motion.button>
      </div>

      {/* TEXT REVEAL SECTION */}
      <div className="relative z-20 -mt-20">
        <TextReveal />
      </div>

      {/* WORKSHOPS & EVENTS */}
      <div id="workshops" className="py-20 px-6 relative z-10">

        {/* Workshops */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-[2px] w-12 bg-neon-purple"></div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest">WORKSHOPS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {workshops?.map((ws) => <EventCard key={ws.id} item={ws} />)}
          </div>
        </div>

        {/* Events */}
        <div className="max-w-6xl mx-auto mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-[2px] w-12 bg-neon-cyan"></div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white tracking-widest">EVENTS</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {events?.map((ev) => <EventCard key={ev.id} item={ev} />)}
          </div>
        </div>

        {/* ABOUT US - GLASS BLOCK */}
        <div className="max-w-5xl mx-auto mb-12 px-4">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <h2 className="text-3xl font-display font-bold text-white mb-8 tracking-widest uppercase">About Us</h2>
            <div className="w-20 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple mx-auto mb-8 rounded-full"></div>

            <p className="text-gray-300 leading-8 text-lg md:text-xl font-light max-w-3xl mx-auto">
              Eclectique 2K26 is the flagship technical symposium of the Department of Electrical & Electronics Engineering at JNTU-GV. Our mission is to bridge the gap between academic theory and industry innovation through competitive events, hands-on workshops, and expert interactions.
            </p>
            <p className="mt-8 text-neon-cyan font-bold tracking-[0.2em] text-sm uppercase">Join The Revolution</p>
          </div>
        </div>

      </div>

      {/* MODAL */}
      <EventModal
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
        data={selectedEvent}
      />

    </div>
  );
};

export default Home;
