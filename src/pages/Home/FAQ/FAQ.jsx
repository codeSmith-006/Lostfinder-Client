import React, { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
// import { AuthContext } from "../../context/AuthContext";
import {
  HelpCircle,
  Info,
  Plus,
  Search,
  Shield,
  CheckCircle,
  ChevronDown,
  Sparkles,
  MessageCircle,
  Lock,
  Users,
} from "lucide-react";
import { AuthContext } from "../../../context/AuthContext";

const FAQ = () => {
  const { isDarkMode } = use(AuthContext);
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "How do I add a lost or found item?",
      answer:
        "After logging in, navigate to the 'Add Item' page. Fill out the form with accurate details, including item type, description, location, and date. Submit the form to post your item.",
      icon: Plus,
      color: "from-emerald-400 to-teal-500",
    },
    {
      id: 2,
      question: "How can I claim a found item?",
      answer:
        "View the item details page for the found item and click the 'This is Mine!' button. Fill in the recovery details to initiate the claim process.",
      icon: Search,
      color: "from-blue-400 to-cyan-500",
    },
    {
      id: 3,
      question: "Is my data safe and private?",
      answer:
        "Yes! We use JWT authentication and secure your data on our backend. Only you can manage your posted items.",
      icon: Shield,
      color: "from-purple-400 to-pink-500",
    },
    {
      id: 4,
      question: "What happens when an item is recovered?",
      answer:
        "The item status updates to 'recovered', and the item is moved to your recovered items list. Others will no longer be able to claim it.",
      icon: CheckCircle,
      color: "from-green-400 to-emerald-500",
    },
    {
      id: 5,
      question: "How secure is the communication between users?",
      answer:
        "All communications are encrypted and monitored for safety. We never share personal contact information without explicit consent from both parties.",
      icon: Lock,
      color: "from-orange-400 to-red-500",
    },
    {
      id: 6,
      question: "Can I edit or delete my posted items?",
      answer:
        "Yes, you can edit or delete any items you've posted from your dashboard. Simply go to 'My Items' and use the edit or delete options.",
      icon: Users,
      color: "from-indigo-400 to-purple-500",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className={`relative py-20 overflow-hidden ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/30 rounded-full"
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
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 10,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-teal-400/10 backdrop-blur-sm rounded-full border border-teal-400/20"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <MessageCircle className="w-5 h-5 text-teal-400" />
            <span className="text-teal-300 font-medium text-sm">
              Frequently Asked Questions
            </span>
          </motion.div>

          <motion.h2
            className="text-lg md:2xl  text-center lg:text-3xl md:text-5xl font-bold text-white mb-6 flex items-center justify-center gap-4"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div
              animate={{
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Info className="w-8 h-8 text-yellow-400" />
            </motion.div>

            <span className="bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              How It Works
            </span>

            <motion.div
              animate={{
                bounce: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <HelpCircle className="w-8 h-8 text-pink-500" />
            </motion.div>
          </motion.h2>

          <motion.p
            className="text-gray-300 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Everything you need to know about finding and returning lost items
          </motion.p>

          <div className="w-32 h-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* FAQ Container */}
        <motion.div
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl sm:rounded-3xl p-3 sm:p-6 shadow-2xl max-w-full sm:max-w-3xl mx-auto break-words"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={index}
                isOpen={openIndex === index}
                onToggle={() => toggleFAQ(index)}
              />
            ))}
          </div>
        </motion.div>

        {/* Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-16 text-center"
        >
          <motion.div
            className="bg-gradient-to-r from-teal-500/10 via-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-teal-400/20 rounded-2xl p-8"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-4"
            >
              <Sparkles className="w-12 h-12 text-yellow-400 mx-auto" />
            </motion.div>
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-300 mb-6 max-w-md mx-auto">
              Can't find the answer you're looking for? Our support team is here
              to help you 24/7.
            </p>
            <motion.button
              onClick={() => {
                const email = "ryanrehan.pc@gmail.com";
                const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
                  email
                )}`;
                window.open(gmailUrl, "_blank");
              }}
              className="px-8 py-3 bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-semibold rounded-full hover:from-teal-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-teal-500/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Support
            </motion.button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Individual FAQ Item Component
const FAQItem = ({ faq, index, isOpen, onToggle }) => {
  const IconComponent = faq.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`border border-gray-700 rounded-2xl overflow-hidden transition-all duration-300 ${
        isOpen
          ? "bg-gradient-to-r from-slate-800/80 to-slate-700/60 border-teal-400/40 shadow-lg shadow-teal-400/10"
          : "bg-slate-800/40 hover:bg-slate-800/60 hover:border-gray-600"
      }`}
    >
      <motion.button
        onClick={onToggle}
        className="w-full p-6 text-left focus:outline-none focus:ring-2 focus:ring-teal-400/50 rounded-2xl"
        whileHover={{ x: 4 }}
        transition={{ type: "spring", stiffness: 300 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className={`w-12 h-12 rounded-xl bg-gradient-to-r ${faq.color} flex items-center justify-center shadow-lg`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <IconComponent className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-lg font-semibold text-white group-hover:text-teal-300 transition-colors duration-300">
              {faq.question}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0 ml-4"
          >
            <ChevronDown className="w-5 h-5 text-teal-400" />
          </motion.div>
        </div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="px-6 pb-6"
            >
              <div className="ml-16 text-gray-300 leading-relaxed">
                {faq.answer}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FAQ;
