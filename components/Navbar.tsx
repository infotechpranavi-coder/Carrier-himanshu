"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Mail, ChevronDown, Menu, X, MapPin } from 'lucide-react';
import { NAV_ITEMS } from '@/lib/constants';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Top Bar */}
      {!isScrolled && (
        <div className="text-white py-1.5 px-4 hidden lg:block bg-transparent border-b border-white/10">
          <div className="container mx-auto flex justify-between items-center text-sm font-medium">
            <div className="flex items-center space-x-6">
              <a href="tel:+911234567890" className="flex items-center hover:text-white/80 transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                +91 1234567890
              </a>
              <a href="mailto:info@mscitizen.com" className="flex items-center hover:text-white/80 transition-colors">
                <Mail className="w-4 h-4 mr-2" />
                info@mscitizen.com
              </a>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/tracking" className="hover:text-white/80 transition-colors">Track Shipment</Link>
              <Link href="/dashboard" className="hover:text-white/80 transition-colors">Dashboard</Link>
              <Link href="/careers" className="hover:text-white/80 transition-colors">Careers</Link>
              <Link href="/contact" className="hover:text-white/80 transition-colors">Support</Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Nav */}
      <nav className={cn(
        "transition-all duration-300 px-4",
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-black/5 py-2" : "bg-transparent py-3 lg:py-0"
      )}>
        <div className="container mx-auto flex justify-between items-center min-h-0">
          {/* Logo */}
          <Link href="/" className={cn("relative z-50", !isScrolled && "mt-1 lg:mt-2")}>
            <div className={cn(
              "relative transition-all duration-300",
              isScrolled ? "h-10 w-32" : "h-12 w-36 lg:h-14 lg:w-40"
            )}>
              {!isScrolled && (
                <div className="absolute left-1/2 top-[58%] h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-xl" />
              )}
              <Image 
                src="/MS Citizen logo.png" 
                alt="MS Citizen Logo" 
                fill 
                sizes="(max-width: 1024px) 128px, 160px"
                className={cn(
                  "object-contain relative z-10 transition-all duration-300 origin-center",
                  isScrolled ? "scale-[0.88]" : "scale-[0.82]",
                  !isScrolled && "translate-y-1"
                )}
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center space-x-8">
            {NAV_ITEMS.map((item) => (
              <li 
                key={item.label} 
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link 
                  href={item.href}
                  className={cn(
                    "flex items-center text-sm font-bold uppercase tracking-wider transition-colors hover:text-primary-red relative",
                    isScrolled ? "py-2.5" : "py-5",
                    isScrolled
                      ? (pathname.startsWith(item.href) && item.href !== '/' ? "text-primary-red" : "text-near-black")
                      : (pathname.startsWith(item.href) && item.href !== '/' ? "text-primary-red" : "text-white")
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="w-4 h-4 ml-1" />}
                  
                  {/* Underline Animation */}
                  <span className={cn(
                    "absolute left-0 h-0.5 bg-primary-red transition-all duration-300",
                    isScrolled ? "bottom-1.5" : "bottom-3",
                    pathname === item.href ? "w-full" : "w-0 group-hover:w-full"
                  )} />
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.children && activeDropdown === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute top-full left-0 w-64 bg-card-bg border-l-4 border-primary-red shadow-2xl overflow-hidden"
                    >
                      <ul className="py-2">
                        {item.children.map((child) => (
                          <li key={child.label}>
                            <Link 
                              href={child.href}
                              className="block px-6 py-3 text-sm font-semibold hover:bg-near-black hover:text-primary-red transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>

        

          {/* Mobile Menu Toggle */}
          <button 
            className={cn("lg:hidden p-2 transition-colors", isScrolled ? "text-near-black" : "text-white")}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-0 bg-near-black z-40 flex flex-col lg:hidden"
          >
            <div className="flex justify-between items-center p-6 border-b border-white/10">
              <div className="h-10 w-28 relative flex items-center justify-center">
                <div className="relative h-full w-full scale-[0.88] origin-center">
                  <Image src="/MS Citizen logo.png" alt="Logo" fill sizes="112px" className="object-contain" />
                </div>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <div key={item.label} className="space-y-2">
                  <Link 
                    href={item.href}
                    className="text-2xl font-bold uppercase tracking-tight block"
                    onClick={() => !item.children && setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="pl-4 space-y-2 border-l border-primary-red">
                      {item.children.map((child) => (
                        <Link 
                          key={child.label}
                          href={child.href}
                          className="text-lg text-light-gray block"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-6 bg-card-bg space-y-4">
              <Link 
                href="/tracking" 
                className="w-full py-4 border-2 border-primary-red text-primary-red text-center font-bold block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Track Shipment
              </Link>
              <Link 
                href="/contact" 
                className="w-full py-4 bg-primary-red text-white text-center font-bold block"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
