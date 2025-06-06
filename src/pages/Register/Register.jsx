import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import { motion } from "motion/react";
import GradientAnimate from "../../components/GradiantAnimation/GradientAnimation";
import TypeWriter from "../../components/TypeWriter/TypeWriter";

export default function Register() {
  const [passwordError, setPasswordError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const objectData = Object.fromEntries(formData.entries());
    console.log(objectData);

    const password = form.password.value.trim();

    // Password validation
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const isLongEnough = password.length >= 6;

    if (!hasUppercase || !hasLowercase || !isLongEnough) {
      setPasswordError(
        "Password must contain an uppercase letter, a lowercase letter, and be at least 6 characters long."
      );
      return;
    }

    setPasswordError("");

  };

  return (
    <GradientAnimate>
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-0" />

      {/* Top Home Navigation */}
      <div className="absolute top-6 left-6 z-20">
        <Link
          to="/"
          className="text-white text-base font-medium underline hover:text-blue-400"
        >
          ← Home
        </Link>
      </div>

      {/* Form Content */}
      <div className="flex items-center justify-center gap-12 h-full">
        <div className="relative z-10 h-full flex items-center justify-center md:justify-start px-4 md:0">
          <main className="max-w-md w-full bg-transparent backdrop-blur-md p-8 rounded-2xl shadow-xl">
            <p className="text-xs text-[#8B8B8B] font-normal mb-1 tracking-wide">
              START FOR FREE
            </p>
            <h1 className="text-white text-3xl font-semibold mb-2 leading-tight">
              Create your account<span className="text-[#2F8FFF]">.</span>
            </h1>
            <p className="text-[#8B8B8B] text-sm mb-8">
              Already have an account?{" "}
              <motion.div
                className="relative inline-block"
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <NavLink
                  to="/login"
                  className="font-medium text-lg text-[#6ABCE7]"
                >
                  Login
                </NavLink>
                <motion.span
                  className="absolute left-0 bottom-0 h-[2px] bg-[#6ABCE7]"
                  variants={{
                    rest: { width: 0 },
                    hover: { width: "100%" },
                  }}
                  transition={{
                    duration: 0.1,
                    ease: "easeInOut",
                  }}
                ></motion.span>
              </motion.div>
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full bg-transparent py-3 px-4 text-white text-sm placeholder:text-[#8B8B8B] focus:outline-none rounded-lg border-b border-[#2F8FFF]"
                  placeholder="Full Name"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full bg-transparent py-3 px-4 text-white text-sm placeholder:text-[#8B8B8B] focus:outline-none rounded-lg border-b border-[#2F8FFF]"
                  placeholder="Email"
                />
              </div>

              <div>
                <input
                  type="text"
                  name="photoURL"
                  required
                  className="w-full bg-transparent py-3 px-4 text-white text-sm placeholder:text-[#8B8B8B] focus:outline-none rounded-lg border-b border-[#2F8FFF]"
                  placeholder="Photo URL"
                />
              </div>

              <div>
                <div className="relative rounded-lg border border-[#2F8FFF]">
                  <input
                    name="password"
                    type="password"
                    required
                    className="w-full bg-transparent py-3 px-4 text-white text-sm placeholder:text-[#8B8B8B] focus:outline-none rounded-lg"
                    placeholder="Password"
                  />
                  <i
                    className="fas fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8B8B]"
                    role="button"
                  ></i>
                </div>
                {passwordError && (
                  <p className="text-red-400 text-sm mt-1">{passwordError}</p>
                )}
              </div>

              <motion.button
                whileHover={{
                  scale: 1.02,
                }}
                transition={{
                  duration: 0.2,
                }}
                type="submit"
                className="w-full cursor-pointer bg-blue-500 text-white text-sm font-semibold rounded-full py-3 hover:bg-blue-600"
              >
                Register
              </motion.button>
            </form>
          </main>
        </div>

        <div className="relative hidden w-md md:flex flex-col items-center justify-center z-10 h-full px-4 md:0">
          <div className="flex flex-col justify-start">
            <h1 className="text-[#2B7FFF] text-3xl font-bold">
              Welcome to Lost & Found!
            </h1>
            <TypeWriter
              words={[
                "Helping you reconnect with your lost items easily and securely.",
              ]}
            ></TypeWriter>
          </div>
        </div>
      </div>
    </GradientAnimate>
  );
}
