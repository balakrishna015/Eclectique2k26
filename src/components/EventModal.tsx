import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Users, IndianRupee, Phone, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

import type { EventData } from "../types";

export interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: EventData | null;
}

const EventModal = ({ isOpen, onClose, data }: EventModalProps) => {
  const [activeTab, setActiveTab] = useState<"about" | "rules" | "coords">("about");
  const [isRedirecting, setIsRedirecting] = useState(false);

  const handleRegister = (link: string) => {
    setIsRedirecting(true);
    setTimeout(() => {
      window.open(link, "_blank");
      setIsRedirecting(false);
    }, 800);
  };


  // Lock body scroll while modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Redirect Overlay */}
        <AnimatePresence>
          {isRedirecting && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[110] flex items-center justify-center bg-black/95 backdrop-blur-xl"
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

        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/90 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative w-full max-w-3xl bg-[#0a0a0f] border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl shadow-cyan-500/10 flex flex-col max-h-[90vh]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Section */}
          <div className="relative h-64 w-full shrink-0 group">
            <img src={data.image} alt={data.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/60 to-transparent" />

            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 bg-black/50 rounded-full text-white hover:bg-white/20 transition-colors z-20 backdrop-blur-sm border border-white/10"
            >
              <X size={24} />
            </button>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white tracking-tight drop-shadow-lg">{data.title}</h2>
              </div>
              <button
                onClick={() => handleRegister(data.regLink)}
                className="bg-neon-cyan/90 hover:bg-neon-cyan text-deep-navy px-6 py-2 rounded font-bold tracking-wider transition-all flex items-center gap-2 shadow-[0_0_15px_rgba(0,243,255,0.4)] hover:shadow-[0_0_25px_rgba(0,243,255,0.6)]"
              >
                REGISTER NOW <ExternalLink size={16} />
              </button>
            </div>
          </div>

          {/* Grid Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 p-4 shrink-0 bg-white/5 border-b border-white/10">
            <div className="flex flex-col p-3 rounded bg-[#0a0a0f] border border-white/10">
              <div className="flex items-center gap-2 text-neon-purple mb-1">
                <IndianRupee size={18} />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Registration Fee</span>
              </div>
              <span className="text-sm text-white font-medium whitespace-pre-line">{data.fee}</span>
            </div>
            <div className="flex flex-col p-3 rounded bg-[#0a0a0f] border border-white/10">
              <div className="flex items-center gap-2 text-neon-purple mb-1">
                <Users size={18} />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Team Size</span>
              </div>
              <span className="text-sm text-white font-medium">{data.teamSize}</span>
            </div>
            <div className="flex flex-col p-3 rounded bg-[#0a0a0f] border border-white/10">
              <div className="flex items-center gap-2 text-neon-purple mb-1">
                <Calendar size={18} />
                <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Timeline</span>
              </div>
              <span className="text-sm text-white font-medium">{data.time}</span>
            </div>
          </div>

          {/* Tabs & Content */}
          <div className="flex-1 overflow-hidden flex flex-col">
            <div className="flex border-b border-white/10 bg-[#0a0a0f]">
              {(["about", "rules", "coords"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-4 text-sm font-bold uppercase tracking-widest transition-all relative ${activeTab === tab
                    ? "text-neon-cyan bg-white/5"
                    : "text-gray-500 hover:text-gray-300 hover:bg-white/5"
                    }`}
                >
                  {tab === "coords" ? "Coordinators" : tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-neon-cyan shadow-[0_0_10px_#00f3ff]"
                    />
                  )}
                </button>
              ))}
            </div>

            <div className="p-6 overflow-y-auto custom-scrollbar flex-1 bg-[#0a0a0f]">
              <AnimatePresence mode="wait">
                {activeTab === "about" && (
                  <motion.div
                    key="about"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <p className="text-gray-300 leading-7 text-lg">{data.description}</p>
                  </motion.div>
                )}

                {activeTab === "rules" && (
                  <motion.div
                    key="rules"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ul className="space-y-3">
                      {data.rules.map((rule, i) => (
                        <li key={i} className="flex items-start gap-3 text-gray-300">
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-neon-purple shrink-0" />
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )}

                {activeTab === "coords" && (
                  <motion.div
                    key="coords"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {data.coordinators.map((coord, i) => (
                      <div key={i} className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5 hover:border-neon-cyan/50 hover:bg-white/10 transition-all group">
                        <div>
                          <p className="text-white font-bold text-lg">{coord.name}</p>
                          <p className="text-neon-purple text-xs uppercase tracking-wider">Coordinator</p>
                        </div>
                        <a
                          href={`tel:${coord.phone}`}
                          className="p-3 rounded-full bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan hover:text-black transition-colors"
                        >
                          <Phone size={20} />
                        </a>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default EventModal;
