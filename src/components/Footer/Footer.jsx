import { FaFacebookF, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[linear-gradient(to_right,_#021C33,_#013F58,_#001D35)] text-base-content py-10 px-6">
      <div className="max-w-7xl mx-auto text-white justify-center grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Branding */}
        <div className="flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-primary">LostFinder</h2>
          <p className="mt-2 text-sm">
            Helping you reconnect with your lost items — safely and easily.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col justify-center items-start md:items-center">
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1">
            <li><a className="link link-hover">Home</a></li>
            <li><a className="link link-hover">Report Lost</a></li>
            <li><a className="link link-hover">Report Found</a></li>
            <li><a className="link link-hover">Contact</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="flex flex-col justify-center items-start md:items-center">
          <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <a href="#" className="hover:text-blue-600 transition">
              <FaFacebookF />
            </a>
            <a href="#" className="hover:text-sky-500 transition">
              <FaTwitter />
            </a>
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram />
            </a>
            <a href="#" className="hover:text-gray-700 transition">
              <FaGithub />
            </a>
          </div>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} LostFinder. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
