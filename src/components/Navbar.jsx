import { useState, useEffect } from "react";
import logo from "../images/logo.png";

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const closeMenu = () => setMobileMenuOpen(false);

  const links = [
    { label: "Home", href: "#home" },
    { label: "Courses", href: "#courses" },
    { label: "Gallery", href: "#gallery" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 bg-white transition-all duration-300 ${
        scrolled ? "shadow-md bg-white/95 backdrop-blur-sm" : "shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 md:h-24 flex items-center justify-between gap-4 sm:gap-8">
        <a href="#home" className="flex items-center flex-shrink-0" onClick={closeMenu}>
          <img
            src={logo}
            alt="Gurukula Computer"
            className="h-16 sm:h-14 md:h-24 w-auto transition-all duration-300"
          />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-base font-bold text-slate-600 hover:text-blue-700 border-b-2 border-transparent hover:border-blue-700 pb-1 transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#aicard"
            className="text-base font-bold text-slate-600 hover:text-blue-700 border-b-2 border-transparent hover:border-blue-700 pb-1 transition-all duration-200 flex items-center gap-2"
          >
            AI Card
            <span className="bg-orange-400 text-orange-950 text-xs font-bold px-2 py-0.5 rounded-full leading-none">
              New
            </span>
          </a>
        </nav>

        <div className="hidden md:flex items-center gap-4 flex-shrink-0">
          <a
            href="https://www.yaticorp.com/activate-ai-card"
            target="_blank"
            rel="noreferrer"
            className="text-base font-bold text-blue-700 border-2 border-blue-600 px-5 py-2.5 rounded-xl hover:bg-blue-50 transition"
          >
            Activate AI Card
          </a>
          <a
            href="https://wa.me/916366564639"
            target="_blank"
            rel="noreferrer"
            className="text-base font-bold bg-orange-500 text-white px-5 py-2.5 rounded-xl hover:bg-orange-600 transition shadow"
          >
            Enquire Now
          </a>
        </div>

        <button
          className="md:hidden border border-slate-200 px-3 py-2 rounded-xl text-slate-700 text-lg hover:bg-slate-50 transition"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="border-t bg-white px-4 sm:px-6 py-5 space-y-5 font-bold text-base">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="block text-slate-700 hover:text-blue-700 transition"
            >
              {link.label}
            </a>
          ))}

          <a
            href="https://www.yaticorp.com/AI-Card"
            target="_blank"
            rel="noreferrer"
            onClick={closeMenu}
            className="flex items-center gap-2 text-slate-700 hover:text-blue-700 transition"
          >
            AI Card
            <span className="bg-orange-400 text-orange-950 text-xs font-bold px-2 py-0.5 rounded-full">
              New
            </span>
          </a>

          <div className="pt-3 space-y-3 border-t border-slate-100">
            <a
              href="https://www.yaticorp.com/activate-ai-card"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="block text-center border-2 border-blue-600 text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 transition text-base"
            >
              Activate AI Card
            </a>
            <a
              href="https://wa.me/916366564639"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenu}
              className="block text-center bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 transition text-base"
            >
              WhatsApp Enquiry
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
