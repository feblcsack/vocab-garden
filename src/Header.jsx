import React from "react";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const Header = ({ user, handleLogout }) => {
  return (
    <div className="bg-[#FFB103] text-white flex flex-wrap justify-between items-center p-4 w-full">
      {/* Left Section: Website Title */}
      <div>
        <img 
          src="/logo.png" 
          alt="logo" 
          className="w-20 sm:w-20 md:w-28" 
          /* Menyesuaikan ukuran logo berdasarkan layar */
        />
      </div>

      {/* Right Section: User Profile and Logout */}
      <div className="flex items-center space-x-2 sm:space-x-4 mt-2 sm:mt-0">
        <span className="text-xs sm:text-sm truncate">{user.displayName}</span>
        <FaUserCircle className="text-2xl sm:text-3xl cursor-pointer" />
        <button
          onClick={handleLogout}
          className="flex items-center space-x-1 sm:space-x-2 text-red-400 hover:text-red-600 transition-colors"
        >
          <FaSignOutAlt className="text-lg sm:text-xl" />
          <span className="text-xs sm:text-sm">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Header;
