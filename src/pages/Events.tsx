import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { IndianRupee, Users, Clock, ExternalLink } from "lucide-react";
import ImageWithSkeleton from "../components/ui/ImageWithSkeleton";

gsap.registerPlugin(ScrollTrigger);

// --- DATA ---
const EVENTS = [
  {
    id: 1,
    title: "EV TECHNOLOGY",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?q=80&w=2072",
    description: "An immersive workshop involving the breakdown coverage of Electric Vehicles. Hands-on experience in BMS, Motor Design, and Power Controllers.",
    fee: "₹ 999/-",
    teamSize: "Individual",
    time: "Mar 4, 9:00 AM - 5:00 PM",
    coordinators: [
      { name: "Koppisetti Karthikeya", phone: "+91 86887 85636" },
      { name: "Nakka Keerthana", phone: "+91 93818 85336" }
    ],
    regLink: "https://forms.google.com/ev-workshop"
  },
  {
    id: 2,
    title: "TABLEAU",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070",
    description: "Master the art of Data Visualization. Learn how to connect data sources, create impactful dashboards, and tell stories with data using Tableau.",
    fee: "₹ 499/-",
    teamSize: "Individual",
    time: "Mar 4, 9:00 AM - 5:00 PM",
    coordinators: [
      { name: "S. B. Karthikeya Sarma", phone: "+91 94915 02203" },
      { name: "Kanda Varalakshmi", phone: "+91 81859 03589" }
    ],
    regLink: "https://forms.google.com/tableau"
  },
  {
    id: 3,
    title: "WATT VISION",
    category: "Project Expo",
    image: "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?q=80&w=2069",
    description: "Showcase your innovative projects and ideas to a panel of experts. A platform to display your technical prowess.",
    fee: "₹ 150 (1) | ₹ 250 (2) | ₹ 350 (3-4)",
    teamSize: "Max 4",
    time: "Mar 5, 10:00 AM",
    coordinators: [
      { name: "B. Teja", phone: "+91 83742 30526" },
      { name: "I. Hariharan", phone: "+91 96767 59375" }
    ],
    regLink: "https://forms.google.com/watt-vision"
  },
  {
    id: 4,
    title: "BRAIN WAVE",
    category: "Quiz",
    image: "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=2070",
    description: "Test your knowledge in technical and general trivia. A battle of wits to claim the title of the smartest mind.",
    fee: "₹ 50/-",
    teamSize: "Individual",
    time: "Mar 5, 11:00 AM",
    coordinators: [
      { name: "K. P. Chaitanya Varma", phone: "+91 93475 88627" },
      { name: "Sheik Aziz", phone: "+91 99083 44734" }
    ],
    regLink: "https://forms.google.com/brain-wave"
  },
  {
    id: 5,
    title: "PUZZLE MANIA",
    category: "Treasure Hunt",
    image: "https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2078",
    description: "Solve riddles, find clues, and race against time. The ultimate treasure hunt awaits you.",
    fee: "₹ 50 (Solo) | ₹ 200 (Group of 4)",
    teamSize: "1 or 4",
    time: "Mar 5, 2:00 PM",
    coordinators: [
      { name: "A. Manoj Kumar", phone: "+91 99630 13092" },
      { name: "T. Ramya", phone: "" } // Add phone if available
    ],
    regLink: "https://forms.google.com/puzzle-mania"
  },
  {
    id: 6,
    title: "MIND ARENA",
    category: "Tech Challenge",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070",
    description: "A series of mind-bending technical challenges designed to push your problem-solving skills to the limit.",
    fee: "₹ 50/-",
    teamSize: "Individual",
    time: "Mar 5, 10:00 AM",
    coordinators: [
      { name: "V. K. Praneeth Naidu", phone: "+91 63051 81638" },
      { name: "D. Satya Durga", phone: "" }
    ],
    regLink: "https://forms.google.com/mind-arena"
  },
  {
    id: 7,
    title: "PIXEL LENS",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000",
    description: "Capture the essence of Eclectique. A photography contest to showcase your unique perspective.",
    fee: "₹ 50/-",
    teamSize: "Individual",
    time: "Mar 4-5 (All Day)",
    coordinators: [
      { name: "Ch. Kuldeep", phone: "+91 63019 58061" },
      { name: "K. Sushmitha", phone: "" }
    ],
    regLink: "https://forms.google.com/pixel-lens"
  },
  {
    id: 8,
    title: "ART SPARK",
    category: "Creative Arts",
    image: "https://images.unsplash.com/photo-1460661631630-8947b5d36e0d?q=80&w=2070",
    description: "Unleash your creativity through colors and sketches. A competition for the artist in you.",
    fee: "₹ 50/-",
    teamSize: "Individual",
    time: "Mar 5, 1:00 PM",
    coordinators: [
      { name: "Vakapalili Sanjay", phone: "+91 73966 72320" }, { name: "Dupana Bhavya", phone: "" }
    ],
    regLink: "https://forms.google.com/art-spark"
  }
];

export default function Events() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
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
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-deep-navy/90 z-0" />

              {/* Event Image Card (Left) */}
              <div className="w-1/2 h-[70vh] relative z-10 group overflow-hidden rounded-2xl border border-white/10 glass transition-all duration-500 hover:border-neon-cyan/50">
                <div className="absolute inset-0 bg-deep-navy/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                <ImageWithSkeleton
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
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

                <a
                  href={event.regLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-3 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan font-bold tracking-widest hover:bg-neon-cyan hover:text-deep-navy transition-all duration-300 rounded-sm flex items-center gap-2"
                >
                  REGISTER <ExternalLink size={16} />
                </a>
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
            className="w-full flex flex-col gap-4 rounded-xl overflow-hidden glass border border-white/10 pb-6"
          >
            {/* Mobile Image */}
            <div className="w-full aspect-[3/2] relative overflow-hidden">
              <ImageWithSkeleton
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover"
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

              <a
                href={event.regLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 bg-neon-cyan text-deep-navy font-bold text-center tracking-widest uppercase rounded-sm hover:bg-white transition-colors"
              >
                Register
              </a>
            </div>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
