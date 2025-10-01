import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer
      className="w-full"
      style={{
        background: "linear-gradient(90deg, #182232 0%, #4d5156 100%)",
        color: "#ffffff",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-[#dd8725] pt-8">
          <div className="flex flex-col md:flex-row gap-8 w-full md:w-auto justify-between">
            <div>
              <h4 className="font-semibold text-[#dd8725] mb-2 text-lg">Tech Stacks</h4>
              <ul className="list-disc list-inside text-[#ffffffcc] space-y-1">
                <li>Frontend: React, Vite, Tailwind CSS</li>
                <li>Backend: Node.js, Express</li>
                <li>Database: MongoDB</li>
                <li>Cloud Storage: Mongo Atlas, Cloudinary</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#dd8725] mb-2 text-lg">Features</h4>
              <ul className="list-disc list-inside text-[#ffffffcc] space-y-1">
                <li>User Authentication (Signup/Login)</li>
                <li>Quiz Creation & Participation</li>
                <li>Score Tracking</li>
                <li>Responsive Design</li>
                <li>Admin Panel</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-row gap-4 mt-4 md:mt-0">
            <a href="https://x.com/Sarvjyoti4?t=KCMLjR15QwMboLL4wFu6TQ&s=08" target="_blank" rel="noopener noreferrer" className="hover:text-[#dd8725] transition">
              <FaTwitter size={22} />
            </a>
            <a href="https://www.linkedin.com/in/sarvjyoti05/" target="_blank" rel="noopener noreferrer" className="hover:text-[#dd8725] transition">
              <FaLinkedin size={22} />
            </a>
            <a href="https://github.com/RSarvjyoti" target="_blank" rel="noopener noreferrer" className="hover:text-[#dd8725] transition">
              <FaGithub size={22} />
            </a>
          </div>
        </div>
        <div className="mt-8 text-center text-sm text-[#ffffff99]">
          © {new Date().getFullYear()} Quiz App. Created By Sarvjyoti.
        </div>
      </div>
    </footer>
  );
};

export default Footer;