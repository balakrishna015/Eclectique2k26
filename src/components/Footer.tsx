import { Link } from "react-router-dom";
import { Instagram, Mail, X as XIcon, Heart, ExternalLink } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      name: "Instagram",
      icon: <Instagram size={20} />,
      url: "https://www.instagram.com/eclectique2k26",
      hoverColor: "hover:text-pink-500 hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
    },
    {
      name: "X (Twitter)",
      icon: <XIcon size={20} />,
      url: "https://x.com/eclectique2k26",
      hoverColor: "hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
    },
    {
      name: "Email",
      icon: <Mail size={20} />,
      url: "mailto:eclectique2k26@gmail.com",
      hoverColor: "hover:text-neon-cyan hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]"
    }
  ];

  return (
    <footer className="w-full bg-[#05050a] border-t border-neon-cyan/20 pt-16 pb-8 px-6 mt-auto relative overflow-hidden">
      {/* Glow Effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-1 bg-gradient-to-r from-transparent via-neon-cyan/50 to-transparent blur-sm" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">

        {/* Brand Column */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
          <h2 className="text-3xl font-display font-bold text-white tracking-tighter">
            ECLECTIQUE <span className="text-neon-cyan">2K26</span>
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
            Department of Electrical & Electronics Engineering<br />
            JNTU-GV, Vizianagaram<br />
            Andhra Pradesh, India
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col items-center justify-start space-y-6">
          <h3 className="text-neon-purple font-bold tracking-widest uppercase text-sm">Quick Links</h3>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm font-medium text-gray-400">
            {['Home', 'Events', 'Team', 'Gallery', 'Stay'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                className="hover:text-neon-cyan transition-colors duration-300 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>
        </div>

        {/* Connect Column */}
        <div className="flex flex-col items-center md:items-end space-y-6">
          <h3 className="text-neon-cyan font-bold tracking-widest uppercase text-sm">Connect With Us</h3>
          <div className="flex gap-6">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.name}
                className={`text-gray-400 transition-all duration-300 transform hover:scale-110 ${social.hoverColor}`}
              >
                {social.icon}
              </a>
            ))}
          </div>
          <a
            href="https://jntugv.edu.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-gray-500 hover:text-white flex items-center gap-1 transition-colors"
          >
            Visit University Website <ExternalLink size={10} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/5 pt-8 text-center">
        <p className="text-gray-600 text-xs flex items-center justify-center gap-1">
          Eclectique 2K26. Made with <Heart size={12} className="text-neon-purple fill-neon-purple animate-pulse" /> by Krishna.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
