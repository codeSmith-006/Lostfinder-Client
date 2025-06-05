import { motion } from "framer-motion";

const gradientAnimation = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 20,
      ease: "easeInOut",
      repeat: Infinity,
    },
  },
};

export default function GradientAnimate({ children }) {
  return (
    <div className="w-screen h-screen relative overflow-hidden">
      {/* Animated Gradient Light */}
      <motion.div
        variants={gradientAnimation}
        animate="animate"
        className="absolute inset-0 z-20 opacity-40 blur-2xl"
        style={{
          background:
            "linear-gradient(-45deg, #2F8FFF, #1E1E2E,#FF6FD8,#38B6FF,#845EC2,#2F8FFF)",
          backgroundSize: "400% 400%",
        }}
      />

      {/* Static background image + dark overlay */}
      <div
        className="absolute inset-0 z-10 bg-black/60 backdrop-blur-sm"
        style={{
          backgroundImage: `url('https://i.ibb.co/PGzKHYqp/login-background.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Your login or register form content */}
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
}
