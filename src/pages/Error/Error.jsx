import React from "react";
// Note: Replace with your router import - using placeholder for demo
const NavLink = ({ to, children, className, ...props }) => (
  <a href={to} className={className} {...props}>
    {children}
  </a>
);

const Error = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-teal-400/30 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}

        {/* Glowing orbs */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-teal-500/10 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="text-center z-10 px-6 max-w-4xl mx-auto">
        {/* Astronaut Image Container */}
        <div className="relative mb-12">
          <div className="relative inline-block">
            {/* Glowing effect behind astronaut */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl transform scale-150 animate-pulse" />

            {/* Main astronaut image */}

            {/* Floating elements around astronaut */}
            <div className="absolute -top-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full animate-ping" />
            <div
              className="absolute top-8 -right-6 w-2 h-2 bg-blue-400 rounded-full animate-ping"
              style={{ animationDelay: "0.5s" }}
            />
            <div
              className="absolute -bottom-2 left-12 w-2 h-2 bg-pink-400 rounded-full animate-ping"
              style={{ animationDelay: "1s" }}
            />
          </div>
        </div>

        {/* 404 Text with Glitch Effect */}
        <div className="mb-6 relative">
          <h1 className="text-8xl md:text-9xl font-black text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text animate-pulse mb-4 relative">
            404
          </h1>

          {/* Glitch overlay effect */}
          <div
            className="absolute inset-0 text-8xl md:text-9xl font-black text-red-500/20 animate-pulse"
            style={{ animationDelay: "0.1s" }}
          >
            404
          </div>
        </div>

        {/* Error Message */}
        <div className="mb-8 space-y-4">
          <h2
            className="text-2xl md:text-4xl font-bold text-white animate-fade-in-up"
            style={{ animationDelay: "0.5s" }}
          >
            Oops! Page Not Found
          </h2>
          <p
            className="text-lg text-gray-300 max-w-md mx-auto animate-fade-in-up leading-relaxed"
            style={{ animationDelay: "0.7s" }}
          >
            Looks like you've ventured into uncharted space! The page you're
            looking for has drifted away into the cosmic void.
          </p>
        </div>

        {/* Action Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
          style={{ animationDelay: "0.9s" }}
        >
          <NavLink
            to="/"
            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25 flex items-center gap-3 min-w-[200px] justify-center"
          >
            <span className="relative z-10">← Back to Home</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </NavLink>

          <button
            onClick={() => window.history.back()}
            className="group relative px-8 py-4 bg-transparent border-2 border-purple-500/50 text-purple-300 font-semibold rounded-full transition-all duration-300 hover:border-purple-400 hover:text-white hover:bg-purple-500/10 flex items-center gap-3 min-w-[200px] justify-center"
          >
            <span>Go Back</span>
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Help Text */}
        <p
          className="text-sm text-gray-500 mt-8 animate-fade-in-up"
          style={{ animationDelay: "1.1s" }}
        >
          If you think this is a mistake, please{" "}
          <NavLink
            to="/contact"
            className="text-purple-400 hover:text-purple-300 underline"
          >
            contact our support team
          </NavLink>
        </p>
      </div>

      {/* Shooting stars animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star"
          style={{ top: "20%", left: "-10px", animationDelay: "2s" }}
        />
        <div
          className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star"
          style={{ top: "60%", left: "-10px", animationDelay: "4s" }}
        />
        <div
          className="absolute w-1 h-1 bg-white rounded-full animate-shooting-star"
          style={{ top: "40%", left: "-10px", animationDelay: "6s" }}
        />
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 1;
          }
          70% {
            opacity: 1;
          }
          100% {
            transform: translateX(calc(100vw + 20px)) translateY(200px);
            opacity: 0;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }

        .animate-shooting-star {
          animation: shooting-star 3s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default Error;
