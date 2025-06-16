import { Link, NavLink, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { motion } from "motion/react";
import GradientAnimate from "../../components/GradiantAnimation/GradientAnimation";
import TypeWriter from "../../components/TypeWriter/TypeWriter";
import { use, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { showToast } from "../../components/Toast/Toast";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../Auth/Firebase/Firebase.config";

export default function Login() {
  const { accountLogin } = use(AuthContext);
  const [error, setError] = useState("");

  // show password
  const [isVisible, setIsVisible] = useState(false);

  // navigation
  const navigate = useNavigate();

  // handling submit login button
  const handleSubmit = async (event) => {
    event.preventDefault();

    // email
    const email = event.target.email.value;
    const password = event.target.password.value;

    // user login with email and password
    try {
      const userCredential = await accountLogin(email, password);
      if (userCredential?.user) {
        navigate("/");
        showToast("success", "Signed in successfully");
      }
    } catch (err) {
      setError(err);
      showToast("error", `${error}`);
    }
  };

  // handle google login button
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const userCredential = await signInWithPopup(auth, provider);
      if (userCredential?.user) {
        navigate("/");
        showToast("success", "Signed in successfully");
      }
    } catch (error) {
      console.log(error);
    }
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
        <div className="relative flex items-center  z-10 h-full  px-4 md:pl-0">
          <main className="max-w-md w-full bg-transparent backdrop-blur-md p-8 rounded-2xl shadow-xl">
            <p className="text-xs text-[#8B8B8B] font-normal mb-1 tracking-wide">
              WELCOME BACK
            </p>
            <h1 className="text-white text-3xl font-semibold mb-2 leading-tight">
              Login to your account<span className="text-[#2F8FFF]">.</span>
            </h1>
            <p className="text-[#8B8B8B] text-sm mb-8">
              Don’t have an account?{" "}
              <motion.div
                className="relative inline-block"
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <NavLink
                  to="/register"
                  className="font-medium text-lg text-[#6ABCE7]"
                >
                  Register
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
                <label htmlFor="email" className="sr-only">
                  Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full bg-transparent py-3 px-4 text-white text-sm placeholder:text-[#8B8B8B] focus:outline-none rounded-lg border-b border-[#2F8FFF]"
                    placeholder="Email"
                  />
                  <i className="fas fa-envelope absolute right-3 top-1/2 -translate-y-1/2 text-[#8B8B8B]"></i>
                </div>
              </div>

              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <div className="relative rounded-lg border-b border-[#2F8FFF]">
                  <input
                    id="password"
                    name="password"
                    type={`${!isVisible ? 'password' : 'text'}`}
                    className="w-full bg-transparent py-3 px-4 text-white text-sm placeholder:text-[#8B8B8B] focus:outline-none rounded-lg"
                    placeholder="Password"
                  />
                  <i onClick={() => setIsVisible(!isVisible)}
                    className={`fas ${isVisible ? 'fa-eye' : 'fa-eye-slash'} absolute right-4 top-1/2 -translate-y-1/2 text-[#8B8B8B] cursor-pointer`}
                    role="button"
                    tabIndex={0}
                  ></i>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.96 }}
                transition={{ duration: 0.1 }}
                type="submit"
                className="w-full cursor-pointer bg-gradient-to-r from-cyan-500 to-blue-700 text-white text-sm font-semibold rounded-full py-3 shadow-md shadow-cyan-400/20 hover:shadow-lg hover:brightness-110 transition duration-300"
              >
                Login
              </motion.button>

              <div className="text-center text-gray-300 text-sm">OR</div>

              <motion.button
                onClick={handleGoogleLogin}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.1 }}
                type="button"
                className="w-full cursor-pointer flex items-center justify-center gap-3 bg-white text-gray-800 text-sm font-semibold rounded-full py-3 shadow-md hover:shadow-lg hover:bg-gray-100 border border-gray-200 transition-all duration-300"
              >
                <FcGoogle className="text-xl" />
                Continue with Google
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
