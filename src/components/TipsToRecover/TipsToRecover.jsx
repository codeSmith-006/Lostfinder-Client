import {
  FaSearch,
  FaUndo,
  FaCamera,
  FaClipboardList,
  FaShieldAlt,
  FaHandshake,
} from "react-icons/fa";
import { motion } from "framer-motion";

const TipsToRecover = () => {
  const tips = [
    {
      title: "Act Fast",
      description:
        "Report your lost item immediately to increase recovery chances.",
      icon: <FaSearch className="text-blue-500 text-3xl" />,
    },
    {
      title: "Retrace Your Steps",
      description:
        "Think of the last place you saw it and revisit those areas.",
      icon: <FaUndo className="text-green-500 text-3xl" />,
    },
    {
      title: "Add Clear Details",
      description: "Include specific details and upload a photo if possible.",
      icon: <FaCamera className="text-purple-500 text-3xl" />,
    },
    {
      title: "Report It",
      description: "Post found items so the rightful owner can identify them.",
      icon: <FaClipboardList className="text-orange-500 text-3xl" />,
    },
    {
      title: "Protect Privacy",
      description:
        "Use our platform to communicate and avoid sharing personal info.",
      icon: <FaShieldAlt className="text-red-500 text-3xl" />,
    },
    {
      title: "Meet Safely",
      description: "Arrange returns in public places for safety.",
      icon: <FaHandshake className="text-teal-500 text-3xl" />,
    },
  ];

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto text-center">
        {/* Section Title */}
        <motion.h2
          className="text-4xl font-bold text-gray-800 mb-4"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Tips to Recover Lost Items
        </motion.h2>

        {/* Section Subheading */}
        <motion.p
          className="text-gray-600 max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Quick, practical advice to help you find what’s missing — or safely
          return what you’ve found.
        </motion.p>

        {/* Tips Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {tips.map((tip, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-md rounded-xl p-6 text-left border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition transform"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="mb-4">{tip.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {tip.title}
              </h3>
              <p className="text-gray-600">{tip.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TipsToRecover;
