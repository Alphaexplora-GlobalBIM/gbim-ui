//src/components/Navbar.tsx

import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';
import bimLogo from '../assets/bimlogo.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    {
      name: 'What We Do',
      path: '/services',
      dropdown: [
        { name: 'Pre-Engineered Building Detailing', path: '/services/peb-detailing' },
        { name: 'Structural Steel Detailing', path: '/services/structural-steel' },
        { name: 'Steel Design and Analysis', path: '/services/steel-design' },
        { name: 'BIM Consulting', path: '/services/bim-consulting' }
      ]
    },
    { name: 'About Us', path: '/about' },
    { name: 'Our Work', path: '/projects' },
    // { name: 'Resources', path: '/resources' },
    { name: 'Contact Us', path: '/contact' },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsOpen(false);
    setMobileSubMenuOpen(false);
  }, [location]);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ease-in-out ${scrolled
      ? 'bg-slate-900 shadow-lg py-3 border-b border-white/10' // Changed to slate-900 (Standard Dark Blue)
      : 'bg-transparent py-6 border-transparent'
      }`}>
      <div className="w-full px-6 lg:px-12">
        <div className="flex justify-between items-center h-16">

          {/* --- LEFT: LOGO --- */}
          <Link to="/" className="flex items-center gap-4 group">
            <img
              src={bimLogo}
              alt="Global BIM Logo"
              className="h-12 w-auto object-contain"
            />

            <div className="flex flex-col">
              <div className="text-2xl font-bold uppercase tracking-widest text-white leading-none">
                {/* Changed to yellow-500 (Standard Gold) */}
                <span className="text-yellow-500 group-hover:text-yellow-400 transition-colors duration-300 ease-out">Global</span>BIM
              </div>
              {/* Changed to gray-400 (Standard Silver) */}
              <span className="text-[10px] text-gray-400 uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity duration-300 ease-out">
                Engineering Services
              </span>
            </div>
          </Link>

          {/* --- RIGHT: DESKTOP NAVIGATION --- */}
          <div className="hidden md:flex space-x-6 lg:space-x-10 items-center">
            {navLinks.map((item) => (
              <div key={item.name} className="relative group">

                {/* Main Link */}
                <Link
                  to={item.path}
                  className={`flex items-center gap-1 text-xs lg:text-sm font-bold transition-colors duration-300 ease-out uppercase tracking-widest ${scrolled ? 'text-gray-300 hover:text-yellow-500' : 'text-white/90 hover:text-white'
                    }`}
                >
                  {item.name}
                  {item.dropdown && <ChevronDown size={14} className="mt-[-2px] transition-transform duration-300 ease-out group-hover:rotate-180" />}

                  {/* Underline Animation */}
                  <span className={`absolute -bottom-2 left-0 w-0 h-0.5 transition-[width] duration-300 ease-out group-hover:w-full ${scrolled ? 'bg-yellow-500' : 'bg-white'
                    }`}></span>
                </Link>

                {/* DROPDOWN MENU (Desktop) */}
                {item.dropdown && (
                  <div className="absolute top-full left-0 mt-4 w-72 bg-slate-900 border border-white/10 shadow-xl rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility,transform] duration-500 ease-in-out transform translate-y-4 group-hover:translate-y-0">
                    <div className="py-2">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.name}
                          to={subItem.path}
                          className="block px-4 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-yellow-500 hover:pl-6 transition-all duration-300 ease-out border-b border-white/5 last:border-0"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden transition-colors duration-300 ease-out ${scrolled ? 'text-gray-300 hover:text-yellow-500' : 'text-white hover:text-yellow-400'
              }`}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE MENU DROPDOWN --- */}
      <div className={`md:hidden absolute w-full bg-slate-900 border-b border-white/10 overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[80vh] opacity-100 overflow-y-auto' : 'max-h-0 opacity-0'}`}>
        <div className="px-4 py-4 space-y-1">
          {navLinks.map((item) => (
            <div key={item.name}>
              {item.dropdown ? (
                <div>
                  <div className="flex items-center justify-between w-full hover:bg-white/5 rounded-lg transition-colors duration-300">
                      <Link
                        to="/about"
                        className="flex-1 px-3 py-3 text-base font-medium text-gray-300 hover:text-yellow-500 uppercase tracking-wider transition-colors duration-300 ease-out"
                      >
                        {item.name}
                      </Link>
                      <button
                        onClick={() => setMobileSubMenuOpen(!mobileSubMenuOpen)}
                        className="px-4 py-3 text-gray-300 hover:text-yellow-500 transition-colors"
                      >
                        <ChevronDown size={16} className={`transition-transform duration-300 ease-out ${mobileSubMenuOpen ? 'rotate-180' : ''}`} />
                      </button>
                  </div>

                  <div className={`pl-4 space-y-1 overflow-hidden transition-all duration-500 ease-in-out ${mobileSubMenuOpen ? 'max-h-96 opacity-100 mt-1' : 'max-h-0 opacity-0'}`}>
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.name}
                        to={subItem.path}
                        className="block px-3 py-2 text-sm text-gray-400 hover:text-yellow-500 border-l border-white/10 transition-colors duration-300 ease-out"
                      >
                        {subItem.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  to={item.path}
                  className="block px-3 py-3 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-yellow-500 rounded-lg uppercase tracking-wider transition-all duration-300 ease-out"
                >
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
}