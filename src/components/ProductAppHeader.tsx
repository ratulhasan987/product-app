import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../../src/Assets/logo/logo.png'; 
const ProductHeader: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('');


  const handleNavigation = (path: string, item: string) => {
    setActiveNav(item);
    navigate(path);
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`w-full z-50 fixed top-0 left-0 transition-all duration-300 ease-in-out ${
        isScrolled
          ? 'bg-gradient-to-r from-green-200 via-cyan-100 to-cyan-50 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center px-4 py-3 md:px-8 md:py-4 container mx-auto">
        {/* Logo */}
        <div
          onClick={() => handleNavigation('/', 'Products')} // Fix: Added second argument 'Home'
          className="flex items-center cursor-pointer"
        >
          <img
            src={logo}
            alt="ProductApp Logo"
            className="h-12 md:h-16 w-auto"
          />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden lg:flex items-center space-x-8 text-lg font-semibold">
          {/* <button
            onClick={() => handleNavigation('/home', 'Home')}
            className={`${
              activeNav === 'Home'
                ? 'text-yellow-300 border-b-2 border-yellow-300'
                : ''
            } hover:text-yellow-300 transition-all duration-300`}
          >
            Home
          </button> */}
          <button
            onClick={() => handleNavigation('/', 'Products')}
            className={`${
              activeNav === 'Products'
                ? 'text-green-500 border-b-2 border-green-500'
                : ''
            } hover:text-green-500 transition-all duration-300 uppercase`}
          >
            Products
          </button>
          <button
            onClick={() => handleNavigation('/offers', 'Offers')}
            className={`${
              activeNav === 'Offers'
                ? 'text-green-500 border-b-2 border-green-500'
                : ''
            } hover:text-green-500 transition-all duration-300 uppercase`}
          >
            Offers
          </button>
          <button
            onClick={() => handleNavigation('/contact', 'Contact')}
            className={`${
              activeNav === 'Contact'
                ? 'text-green-500 border-b-2 border-green-500'
                : ''
            } hover:text-green-500 transition-all duration-300 uppercase`}
          >
            Contact
          </button>
        </nav>

        {/* Right Side: Language Toggle and Search Bar */}
        <div className="hidden lg:flex items-center space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="p-2 rounded-md bg-white border border-gray-300 text-black placeholder-gray-500 focus:outline-none w-64"
            />
            <FaSearch className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600" />
          </div>
          <button
            onClick={() => handleNavigation('/login', 'Login')}
            className="text-sm py-2 px-4 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300"
          >
            Login
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="text-green-700 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-black bg-opacity-90">
          <ul className="flex flex-col space-y-4 text-gray-300 px-4 py-4">
            {/* <li>
              <button
                onClick={() => handleNavigation('/home', 'Home')}
                className="hover:text-yellow-300 transition-all duration-300"
              >
                Home
              </button>
            </li> */}
            <li>
              <button
                onClick={() => handleNavigation('/', 'Products')}
                className="hover:text-green-500 transition-all duration-300"
              >
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/offers', 'Offers')}
                className="hover:text-green-500 transition-all duration-300"
              >
                Offers
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavigation('/contact', 'Contact')}
                className="hover:text-green-500 transition-all duration-300"
              >
                Contact
              </button>
            </li>

            <li>
              <button
                onClick={() => handleNavigation('/login', 'Login')}
                className="text-sm py-1 px-2 bg-green-500 text-white  rounded-md hover:bg-green-600 w-1/3 text-left"
              >
                Login
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default ProductHeader;
