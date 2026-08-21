import { Facebook, Linkedin, Mail, Instagram, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

// --- CLOUDINARY ACCREDITATION IMAGES ---
const cloudinaryBase = "https://res.cloudinary.com/dqapo8elj/image/upload";

const accreditations = [
  { name: 'DTI', img: `${cloudinaryBase}/DTI.png` },
  { name: 'LGU', img: `${cloudinaryBase}/LGU.png` }
];

export default function Footer() {

  const links = [
    { name: 'Terms & Conditions', path: '/terms' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'FAQs', path: '/faqs' },
  ];

  const socialIcons = [
    { icon: Facebook, href: 'https://Facebook.com' },
    { icon: Instagram, href: 'https://Instagram.com' },
    { icon: Linkedin, href: 'https://LinkedIn.com' },
    { icon: Mail, href: 'mailto:globalbim.ph@gmail.com' },
  ];

  return (
    <footer className="bg-slate-950 text-white border-t border-white/10 font-sans relative overflow-hidden">

      {/* Background Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'linear-gradient(#EAB308 1px, transparent 1px), linear-gradient(90deg, #EAB308 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-20 pb-12 relative z-10">

        {/* TOP SECTION: Grid Layout */}
        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* 1. BRAND */}
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-tight">
              GlobalBIM <span className="text-yellow-500">Engineering</span>
            </h2>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Design & Engineering Hub.<br />
              Where precision ends and innovation begins.
            </p>
          </div>

          {/* 2. INFORMATION LINKS */}
          <div>
            <h3 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-6">Information</h3>
            <ul className="space-y-3">
              {links.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-slate-400 text-sm hover:text-yellow-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. VISIT US */}
          <div>
            <h3 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-6">Visit Us</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                <p className="leading-relaxed">
                  6A T. Bugallon Street,<br />
                  Marikina Heights,<br />
                  Marikina City
                </p>
              </div>
              <div className="flex items-center gap-3 text-slate-400 text-sm">
                <Phone className="w-4 h-4 text-slate-500 shrink-0" />
                <p>(+63) 962 664 0660</p>
              </div>
            </div>
          </div>

          {/* 4. STAY CONNECTED */}
          <div>
            <h3 className="text-xs font-bold text-yellow-500 uppercase tracking-widest mb-6">Stay Connected</h3>
            <div className="flex gap-3">
              {socialIcons.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="w-10 h-10 rounded-full bg-slate-900 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-yellow-600 hover:text-white hover:border-yellow-500 transition-all duration-300"
                >
                  <item.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* SEPARATOR */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12"></div>

        {/* BOTTOM SECTION: Accreditation */}
        <div className="flex flex-col items-center justify-center text-center">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">
            Accredited By
          </span>

          {/* Dynamically mapped images */}
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {accreditations.length > 0 ? (
              accreditations.map((acc, index) => (
                <div key={index} className="group relative">
                  <img
                    src={acc.img}
                    alt={acc.name}
                    // UPDATED CLASS: Removed 'grayscale' and 'opacity-60'. Added hover scale.
                    className="h-12 md:h-16 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ))
            ) : (
              <p className="text-slate-600 text-xs italic">No accreditation images found.</p>
            )}
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="text-center mt-16 text-xs text-slate-600 flex flex-col items-center gap-2">
          <span>&copy; {new Date().getFullYear()} GlobalBIM Engineering Services. All rights reserved.</span>
          <span>
            Powered by{' '}
            <a
              href="https://www.alphaexplora.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500/80 font-medium hover:text-yellow-400 hover:underline transition-colors"
            >
              Alphaexplora Information Technology Services
            </a>
          </span>
        </div>

      </div>
    </footer>
  );
}