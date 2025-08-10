import React, { useContext } from "react";
import { motion } from "motion/react";
import { AuthContext } from "../../context/AuthContext";
import { Calendar, Tag, BookOpen } from "lucide-react";

const articles = [
  {
    id: 1,
    title: "Top 10 Tips to Prevent Losing Your Valuable Items",
    excerpt:
      "Stay organized, label your belongings, and stay vigilant with these expert tips to keep your items safe.",
    author: "Admin",
    date: "2025-05-10",
    tags: ["Prevention", "Tips"],
  },
  {
    id: 2,
    title: "What to Do When You Find a Lost Item",
    excerpt:
      "A step-by-step guide for finders to act responsibly and help reunite lost items with their owners.",
    author: "Admin",
    date: "2025-04-25",
    tags: ["Finder", "Guide"],
  },
  {
    id: 3,
    title: "How to Report Lost Items Effectively",
    excerpt:
      "Create clear and detailed lost item posts that help others identify and return your belongings quickly.",
    author: "Admin",
    date: "2025-04-15",
    tags: ["Reporting", "Lost Items"],
  },
  {
    id: 4,
    title: "Understanding Your Legal Rights Regarding Found Property",
    excerpt:
      "Learn about legal obligations and rights for both finders and owners of lost property in your area.",
    author: "Legal Expert",
    date: "2025-03-30",
    tags: ["Legal", "Rights"],
  },
  {
    id: 5,
    title: "How to Stay Safe When Meeting to Recover Items",
    excerpt:
      "Important safety tips for arranging face-to-face exchanges when reclaiming your lost belongings.",
    author: "Admin",
    date: "2025-03-20",
    tags: ["Safety", "Recovery"],
  },
];

const BlogSectionGrid = () => {
  const { isDarkMode } = useContext(AuthContext);

  return (
    <section
      id="blog-articles"
      className={`relative py-16 px-6 md:px-12 ${
        isDarkMode
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
          : "bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900"
      } text-white`}
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center max-w-3xl mx-auto mb-12 relative z-10"
      >
        <motion.div
          className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-teal-400/10 backdrop-blur-sm rounded-full border border-teal-400/20 mx-auto"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <BookOpen className="w-5 h-5 text-teal-400" />
          <span className="text-teal-300 font-medium text-sm">
            Blog & Articles
          </span>
        </motion.div>

        <motion.h2
          className="text-4xl md:text-5xl font-bold mb-6 flex items-center justify-center gap-4 bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Helpful Tips & Guides
        </motion.h2>

        <motion.p
          className="text-gray-300 text-lg max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Learn how to protect your belongings and help others recover theirs
          with our expert articles.
        </motion.p>

        <div className="w-32 h-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-500 mx-auto mt-6 rounded-full"></div>
      </motion.div>

      {/* Articles Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          visible: {
            transition: { staggerChildren: 0.15 },
          },
          hidden: {},
        }}
      >
        {articles.map((article, idx) => (
          <ArticleCard key={article.id} article={article} index={idx} />
        ))}
      </motion.div>
    </section>
  );
};

const ArticleCard = ({ article, index }) => {
  return (
    <motion.article
      id="blog"
      className="relative bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/90 backdrop-blur-xl border border-slate-600/50 rounded-3xl p-6 shadow-xl hover:shadow-2xl hover:shadow-teal-400/50 hover:border-teal-400/50 transition-all duration-500 cursor-pointer"
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 },
      }}
    >
      <h3 className="text-white text-xl font-semibold mb-3">{article.title}</h3>

      <p className="text-gray-300 text-sm leading-relaxed mb-5 line-clamp-5">
        {article.excerpt}
      </p>

      <div className="flex justify-between text-gray-400 text-xs font-medium">
        <div className="flex items-center gap-1">
          <Calendar className="w-4 h-4 text-teal-400" />
          <time dateTime={article.date}>
            {new Date(article.date).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>

        <div className="flex items-center gap-1">
          <Tag className="w-4 h-4 text-teal-400" />
          {article.tags.join(", ")}
        </div>
      </div>

      <div className="mt-4 text-teal-300 font-semibold text-sm">
        By {article.author}
      </div>
    </motion.article>
  );
};

export default BlogSectionGrid;
