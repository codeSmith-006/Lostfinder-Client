import axios from "axios";
import React, { use, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Image,
  FileText,
  Tag,
  User,
  Mail,
  Plus,
  Upload,
  Sparkles,
  Camera,
  Clock,
  CheckCircle,
} from "lucide-react";
import { showToast } from "../../components/Toast/Toast";
import { AuthContext } from "../../context/AuthContext";

const AddItems = () => {
  const [currentDate, selectedDate] = useState(new Date());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const { currentUser, isDarkMode } = use(AuthContext);
  const date = currentDate.toISOString();

  //   handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const form = event.target;
    const formData = new FormData(form);
    const objectData = Object.fromEntries(formData.entries());
    const data = {
      ...objectData,
      date,
    };

    try {
      const response = await axios.post(
        "https://lostfinder-server.vercel.app/items",
        data
      );
      if (response.data?.insertedId) {
        showToast("success", "Item added successfully");
        form.reset();
        selectedDate(new Date());
      }
    } catch (error) {
      console.log("Error from client side for added items: ", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formFields = [
    {
      name: "postType",
      label: "Post Type",
      type: "select",
      icon: Tag,
      options: [
        { value: "", label: "Select..." },
        { value: "lost", label: "Lost" },
        { value: "found", label: "Found" },
      ],
      required: true,
    },
    {
      name: "thumbnail",
      label: "Image Thumbnail URL",
      type: "text",
      icon: Image,
      placeholder: "Enter image URL",
      required: true,
    },
    {
      name: "title",
      label: "Title",
      type: "text",
      icon: FileText,
      placeholder: "Post title",
      required: true,
    },
    {
      name: "description",
      label: "Description",
      type: "textarea",
      icon: FileText,
      placeholder: "Describe the item",
      required: true,
    },
    {
      name: "category",
      label: "Category",
      type: "select",
      icon: Tag,
      options: [
        { value: "", label: "Select Category" },
        { value: "pets", label: "Pets" },
        { value: "documents", label: "Documents" },
        { value: "gadgets", label: "Gadgets" },
        { value: "others", label: "Others" },
      ],
      required: true,
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      icon: MapPin,
      placeholder: "Where was it lost/found?",
      required: true,
    },
  ];

  return (
    <div
      className={` ${
        isDarkMode
          ? "from-slate-900 via-slate-800 to-slate-900"
          : "from-slate-900 via-slate-800 to-blue-900"
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-teal-400/20 rounded-full"
            initial={{
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
              y: -20,
            }}
            animate={{
              y: typeof window !== "undefined" ? window.innerHeight + 20 : 800,
              x:
                Math.random() *
                (typeof window !== "undefined" ? window.innerWidth : 1200),
            }}
            transition={{
              duration: Math.random() * 20 + 15,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <motion.div
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-teal-400/10 backdrop-blur-sm rounded-full border border-teal-400/20"
            whileHover={{ scale: 1.05 }}
          >
            <Plus className="w-5 h-5 text-teal-400" />
            <span className="text-teal-300 font-medium text-sm">
              Create Post
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl font-bold text-white mb-4 flex items-center justify-center gap-4"
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
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </motion.div>

            <span className="bg-gradient-to-r from-white via-teal-200 to-cyan-300 bg-clip-text text-transparent">
              Create New Post
            </span>

            <motion.div
              animate={{
                scale: [1, 1.3, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
            >
              <Upload className="w-8 h-8 text-indigo-400" />
            </motion.div>
          </motion.h1>

          <motion.p
            className="text-gray-300 text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Help reunite lost items with their owners or report found items
          </motion.p>

          <div className="w-32 h-1 bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-500 mx-auto mt-6 rounded-full"></div>
        </motion.div>

        {/* Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/90 backdrop-blur-xl border border-slate-600/50 rounded-3xl p-8 shadow-2xl"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dynamic Form Fields */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {formFields.map((field, index) => (
                <motion.div
                  key={field.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className={`${
                    field.type === "textarea" ? "lg:col-span-2" : ""
                  }`}
                >
                  <label className="block text-sm font-medium mb-2 text-gray-200 flex items-center gap-2">
                    <field.icon className="w-4 h-4 text-teal-400" />
                    {field.label}
                    {field.required && <span className="text-red-400">*</span>}
                  </label>

                  {field.type === "select" ? (
                    <motion.select
                      name={field.name}
                      required={field.required}
                      className="w-full bg-slate-700/50 border border-slate-600 text-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      whileFocus={{ scale: 1.02 }}
                    >
                      {field.options.map((option) => (
                        <option
                          key={option.value}
                          className="text-gray-700 bg-slate-800"
                          value={option.value}
                        >
                          {option.label}
                        </option>
                      ))}
                    </motion.select>
                  ) : field.type === "textarea" ? (
                    <motion.textarea
                      name={field.name}
                      rows="4"
                      required={field.required}
                      placeholder={field.placeholder}
                      className="w-full bg-slate-700/50 border border-slate-600 text-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm resize-none"
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      whileFocus={{ scale: 1.01 }}
                    />
                  ) : (
                    <motion.input
                      name={field.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      required={field.required}
                      className="w-full bg-slate-700/50 border border-slate-600 text-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                      onFocus={() => setFocusedField(field.name)}
                      onBlur={() => setFocusedField(null)}
                      whileFocus={{ scale: 1.02 }}
                    />
                  )}

                  <AnimatePresence>
                    {focusedField === field.name && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute mt-1 text-xs text-teal-300"
                      >
                        {field.placeholder && `💡 ${field.placeholder}`}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>

            {/* Date Picker */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="space-y-2"
            >
              <label className="block text-sm font-medium text-gray-200 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-teal-400" />
                Date Lost or Found <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <DatePicker
                  selected={currentDate}
                  onChange={(date) => selectedDate(date)}
                  placeholderText="Select a date"
                  required
                  dateFormat="yyyy-MM-dd"
                  className="w-full bg-slate-700/50 border border-slate-600 text-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all duration-300 backdrop-blur-sm"
                />
                <Clock className="absolute right-3 top-3 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
              <AnimatePresence>
                {currentDate && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-sm text-teal-300 flex items-center gap-2 bg-teal-900/20 px-3 py-1 rounded-lg"
                  >
                    📅 Selected:{" "}
                    {currentDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-gradient-to-r from-slate-800/40 to-slate-700/40 rounded-2xl border border-slate-600/30"
            >
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200 flex items-center gap-2">
                  <User className="w-4 h-4 text-teal-400" />
                  Your Name <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    value={currentUser?.displayName}
                    type="text"
                    readOnly
                    className="w-full bg-slate-600/30 border border-slate-500/50 text-gray-300 rounded-xl px-4 py-3 cursor-not-allowed"
                  />
                  <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-400" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-200 flex items-center gap-2">
                  <Mail className="w-4 h-4 text-teal-400" />
                  Email <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={currentUser?.email}
                    readOnly
                    className="w-full bg-slate-600/30 border border-slate-500/50 text-gray-300 rounded-xl px-4 py-3 cursor-not-allowed"
                  />
                  <CheckCircle className="absolute right-3 top-3 w-5 h-5 text-green-400" />
                </div>
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="pt-6"
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative overflow-hidden bg-gradient-to-r from-teal-500 via-cyan-500 to-indigo-600 hover:from-teal-600 hover:via-cyan-600 hover:to-indigo-700 transition-all duration-300 text-white font-bold px-8 py-4 rounded-2xl shadow-xl text-lg disabled:opacity-70 disabled:cursor-not-allowed group"
                whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
              >
                <motion.div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div
                      key="submitting"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      Creating Post...
                    </motion.div>
                  ) : (
                    <motion.div
                      key="idle"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="flex items-center justify-center gap-3"
                    >
                      <Plus className="w-5 h-5" />
                      Create Post
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </motion.div>
          </form>
        </motion.div>

        {/* Helper Text */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-center mt-8 text-gray-400 text-sm"
        >
          <p className="flex items-center justify-center gap-2">
            <Sparkles className="w-4 h-4 text-teal-400" />
            Your post will be visible to the community immediately after
            creation
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default AddItems;
