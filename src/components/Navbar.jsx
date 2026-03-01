import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="container mx-auto px-2 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-16 sm:h-18 md:h-20">
          {/* Left - Logo in glassmorphism box */}
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-1.5 sm:px-2 py-1 sm:py-1.5 shadow-lg">
            <img src="/logoimg.png" alt="Logo" className="h-12 w-auto sm:h-14 md:h-16" />
          </div>

          {/* Center - Desktop Navigation Links in glassmorphism box */}
          <div className="hidden lg:flex bg-white/30 backdrop-blur-lg border border-white/20 rounded-full px-6 sm:px-8 md:px-12 py-2 sm:py-2.5 md:py-3 shadow-lg">
            <div className="flex items-center space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-24">
              <Link to="/home" className="text-sm sm:text-base md:text-lg text-black hover:text-blue-600 transition-colors duration-300 font-medium" style={{fontFamily: "'Afacad', sans-serif"}}>
                Home
              </Link>
              <Link to="/services" className="text-sm sm:text-base md:text-lg text-black hover:text-blue-600 transition-colors duration-300 font-medium" style={{fontFamily: "'Afacad', sans-serif"}}>
                Services
              </Link>
              <Link to="/about" className="text-sm sm:text-base md:text-lg text-black hover:text-blue-600 transition-colors duration-300 font-medium" style={{fontFamily: "'Afacad', sans-serif"}}>
                About Us
              </Link>
              <Link to="/contact" className="text-sm sm:text-base md:text-lg text-black hover:text-blue-600 transition-colors duration-300 font-medium" style={{fontFamily: "'Afacad', sans-serif"}}>
                Contact Us
              </Link>
              <Link to="/packages" className="text-sm sm:text-base md:text-lg text-black hover:text-blue-600 transition-colors duration-300 font-medium" style={{fontFamily: "'Afacad', sans-serif"}}>
                Packages
              </Link>
            </div>
          </div>

          {/* Tablet Navigation - Hidden, only hamburger shown */}
          <div className="hidden md:flex lg:hidden">
            {/* Navigation links removed - only hamburger will be visible */}
          </div>

          {/* Right Section */}
          <div className="flex items-center">
            {/* Mobile Hamburger Menu */}
            <div className="lg:hidden">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-3 py-2 sm:px-4 sm:py-2.5 shadow-lg text-black hover:text-blue-600 transition-colors duration-300"
              >
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/>
                </svg>
              </button>
            </div>

            {/* Desktop Booking Button */}
            <Link to="/application" className="hidden lg:flex bg-white/30 backdrop-blur-lg border border-white/20 rounded-full px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 flex items-center space-x-1 sm:space-x-2 hover:bg-white/20 transition-all duration-300 shadow-lg">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
              </svg>
              <span className="text-sm sm:text-base md:text-lg text-black font-medium" style={{fontFamily: "'Afacad', sans-serif"}}>
                Booking
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white/20 backdrop-blur-lg border-t border-white/20 shadow-lg">
          <div className="container mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6">
            <div className="flex flex-col space-y-2 sm:space-y-4">
              <Link to="/home" className="text-base sm:text-lg text-black hover:text-blue-600 transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/10" style={{fontFamily: "'Afacad', sans-serif"}} onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/services" className="text-base sm:text-lg text-black hover:text-blue-600 transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/10" style={{fontFamily: "'Afacad', sans-serif"}} onClick={() => setIsMenuOpen(false)}>
                Services
              </Link>
              <Link to="/about" className="text-base sm:text-lg text-black hover:text-blue-600 transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/10" style={{fontFamily: "'Afacad', sans-serif"}} onClick={() => setIsMenuOpen(false)}>
                About Us
              </Link>
              <Link to="/contact" className="text-base sm:text-lg text-black hover:text-blue-600 transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/10" style={{fontFamily: "'Afacad', sans-serif"}} onClick={() => setIsMenuOpen(false)}>
                Contact Us
              </Link>
              <Link to="/packages" className="text-base sm:text-lg text-black hover:text-blue-600 transition-colors duration-300 font-medium py-2 px-3 rounded-lg hover:bg-white/10" style={{fontFamily: "'Afacad', sans-serif"}} onClick={() => setIsMenuOpen(false)}>
                Packages
              </Link>
              
              {/* Mobile Booking Button */}
              <div className="pt-2 sm:pt-4 border-t border-white/20">
                <Link to="/application" className="w-full bg-white/30 backdrop-blur-lg border border-white/20 rounded-full px-4 py-3 flex items-center justify-center space-x-2 hover:bg-white/20 transition-all duration-300 shadow-lg" onClick={() => setIsMenuOpen(false)}>
                  <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                  </svg>
                  <span className="text-base sm:text-lg text-black font-medium" style={{fontFamily: "'Afacad', sans-serif"}}>
                    Booking
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
