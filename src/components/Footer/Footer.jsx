import React from "react";
import { motion } from "framer-motion";
import {
  Heart,
  MapPin,
  Search,
  Phone,
  Mail,
  Shield,
  Users,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from "lucide-react";

const Footer = ({ isDarkMode }) => {
  // Updated social links as requested
  const socialLinks = [
    {
      name: "Facebook",
      icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
      href: "https://www.facebook.com/ryanrehan.facebook",
      color: "hover:text-blue-500",
    },
    {
      name: "GitHub",
      icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z",
      href: "https://github.com/codeSmith-006",
      color: "hover:text-gray-400",
    },
    {
      name: "LinkedIn",
      icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.3c-.967 0-1.75-.783-1.75-1.75s.783-1.75 1.75-1.75 1.75.783 1.75 1.75-.783 1.75-1.75 1.75zm13.5 10.3h-3v-4.5c0-1.069-.931-1.5-1.5-1.5s-1.5.431-1.5 1.5v4.5h-3v-9h3v1.35c.561-.974 2.157-1.413 3.18-.675 1.037.756 1.32 2.025 1.32 3.825v4.5z",
      href: "https://www.linkedin.com/in/ryanrehan06/",
      color: "hover:text-blue-600",
    },
  ];

  // Updated quick links to match your navbar links
  const quickLinks = [
    { name: "Home", href: "/", icon: MapPin, id: null },
    { name: "Lost & Found Items", href: "/allItems", icon: Search, id: null },
    { name: "Add Lost & Found Item", href: "/addItems", icon: Heart, id: null },
    {
      name: "All Recovered Items",
      href: "/recoveredItems",
      icon: Users,
      id: null,
    },
    { name: "Manage My Items", href: "/myItems", icon: Shield, id: null },
  ];

  // Variants for animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  // Smooth scroll handler for internal links if on homepage and id given
  const handleScroll = (href) => {
    // If href starts with #, scroll to section by id
    if (href.startsWith("#")) {
      const section = document.getElementById(href.substring(1));
      section?.scrollIntoView({ behavior: "smooth" });
    } else {
      // Else navigate to link normally
      window.location.href = href;
    }
  };

  return (
    <footer
      className={`relative overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/20 rounded-full"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: typeof window !== "undefined" ? window.innerHeight + 50 : 800,
            }}
            animate={{
              y: -50,
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
            }}
            transition={{
              duration: Math.random() * 25 + 20,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 15,
            }}
          />
        ))}
      </div>

      {/* Main Footer Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 py-16 relative z-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <motion.div
              className="flex items-center gap-3 mb-6"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                className="w-12 h-12 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Search className="w-6 h-6 text-white" />
              </motion.div>
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
                  LostFinder
                </h2>
                <motion.div
                  className="w-20 h-0.5 bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: 80 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </div>
            </motion.div>

            <motion.p
              className="text-gray-300 text-lg leading-relaxed mb-6 max-w-md"
              variants={itemVariants}
            >
              Helping you reconnect with your lost items — safely and easily.
              Building a community where lost becomes found.
            </motion.p>

            <motion.div
              className="flex items-center gap-4 text-sm text-gray-400"
              variants={itemVariants}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-400" />
                <span>25K+ Happy Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-pink-400" />
                <span>10K+ Items Recovered</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <ChevronRight className="w-5 h-5 text-teal-400" />
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                >
                  <motion.a
                    onClick={(e) => {
                      e.preventDefault();
                      handleScroll(link.href);
                    }}
                    href={link.href}
                    className="flex items-center gap-3 text-gray-300 hover:text-teal-400 transition-all duration-300 cursor-pointer group"
                    whileHover={{ x: 4 }}
                  >
                    <link.icon className="w-4 h-4 text-teal-400/60 group-hover:text-teal-400 transition-colors duration-300" />
                    <span className="group-hover:text-white transition-colors duration-300">
                      {link.name}
                    </span>
                  </motion.a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Social */}
          <motion.div variants={itemVariants}>
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-400" />
              Connect With Us
            </h3>

            <div className="space-y-4 mb-6">
              <motion.div
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <Mail className="w-4 h-4 text-teal-400" />
                <span>ryanrehan.pc@gmail.com</span>
              </motion.div>
              <motion.div
                className="flex items-center gap-3 text-gray-300"
                whileHover={{ x: 4 }}
                transition={{ duration: 0.3 }}
              >
                <Phone className="w-4 h-4 text-teal-400" />
                <span>+8801722414475</span>
              </motion.div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-4 uppercase tracking-wide">
                Follow Our Journey
              </h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-slate-800/50 border border-slate-700/50 rounded-xl flex items-center justify-center ${social.color} transition-all duration-300 hover:bg-slate-700/50 hover:border-slate-600/50 hover:scale-110 hover:shadow-lg`}
                    whileHover={{
                      y: -2,
                      rotate: 5,
                    }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                      <path d={social.icon} />
                    </svg>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-slate-700/50"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.div
              className="flex items-center gap-2 text-gray-400"
              whileHover={{ scale: 1.02 }}
            >
              <span>© {new Date().getFullYear()} LostFinder. Made with</span>
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Heart className="w-4 h-4 text-red-400 fill-current" />
              </motion.div>
              <span>for the community</span>
            </motion.div>

            <motion.div
              className="flex items-center gap-6 text-sm text-gray-400"
              variants={containerVariants}
            >
              {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                (item, index) => (
                  <motion.a
                    key={item}
                    href="#"
                    className="hover:text-teal-400 transition-colors duration-300 flex items-center gap-1"
                    whileHover={{ y: -1 }}
                    variants={itemVariants}
                  >
                    {item}
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </motion.a>
                )
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
    </footer>
  );
};

export default Footer;
