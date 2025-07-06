import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-400 py-4 mt-8 ">
      <div className="container mx-auto text-center px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Quiz App. All Rights Reserved.
        </p>
        <p className="text-xs mt-1">
          Designed with <span className="text-red-500">❤</span> using Tailwind CSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
