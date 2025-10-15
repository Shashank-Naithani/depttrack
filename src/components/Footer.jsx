import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-200 py-4 mt-auto">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center text-sm text-gray-600">
          <p>&copy; {currentYear} DeptTrack. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
