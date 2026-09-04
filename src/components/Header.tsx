import React, { useState } from 'react';
import { PageId } from '../types';
import { BitsnailLogo } from './BitsnailLogo';
import { COMPANY_INFO } from '../data/telecomData';
import {
  Phone,
  Mail,
  Menu,
  X,
  ShieldCheck,
  Radio,
  ArrowRight,
  ChevronRight,
  Sparkles,
} from 'lucide-react';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId, serviceId?: string) => void;
  onOpenInquiry: (defaultService?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenInquiry,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: PageId; label: string; badge?: string }[] = [
    { id: 'home', label: 'HOME' },
    { id: 'about', label: 'ABOUT US' },
    { id: 'services', label: 'SERVICES', badge: '6 Core' },
    { id: 'safety-careers', label: 'CAREERS & SAFETY', badge: 'FARM' },
    { id: 'contact', label: 'CONTACT' },
  ];

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-200">
      {/* Top Corporate Strip (Light Green / Crisp Branding) */}
      <div className="bg-[#EAF3EE] text-[#163426] text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-[#D8E6DE]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 font-medium">
          {/* Left Info Badges */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="inline-flex items-center gap-1.5 text-[#163426] font-semibold">
              <Radio className="w-3.5 h-3.5 text-[#2B784E]" />
              <span>Bitsnail Technologies • Established March 2023</span>
            </span>
            <span className="hidden md:inline-flex items-center gap-1.5 text-[#3D5647]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#2B784E]" />
              <span>FARM Height Safety Certified (WAH)</span>
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-[#667E70]">
              <span>Alliance:</span>
              <strong className="text-[#163426]">Vedang Wireless Teleinfra</strong>
            </span>
          </div>

          {/* Right Direct Links */}
          <div className="flex items-center gap-4 text-xs">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              id="header-phone-link"
              className="inline-flex items-center gap-1.5 text-[#163426] hover:text-[#2B784E] font-bold transition-colors py-0.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#C59B3F]" />
              <span>Call Suresh: {COMPANY_INFO.phoneDisplay}</span>
            </a>
            <span className="text-[#CBDCD2]">|</span>
            <a
              href={`mailto:${COMPANY_INFO.email}`}
              id="header-email-link"
              className="hidden sm:inline-flex items-center gap-1.5 text-[#3D5647] hover:text-[#163426] transition-colors py-0.5"
            >
              <Mail className="w-3.5 h-3.5 text-[#2B784E]" />
              <span>{COMPANY_INFO.email}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Modern Pill Navigation (asayinfotech.in inspired) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="bg-white rounded-2xl sm:rounded-full border border-[#DCE7E1] shadow-md shadow-emerald-950/5 px-4 sm:px-6 py-2.5 flex items-center justify-between">
          {/* Brand Logo */}
          <BitsnailLogo
            size="md"
            className="cursor-pointer py-0.5"
            onClick={() => handleNavClick('home')}
          />

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-xs font-bold tracking-widest uppercase transition-all relative py-1.5 flex items-center gap-1.5 cursor-pointer select-none ${
                    isActive
                      ? 'text-[#2B784E] font-extrabold'
                      : 'text-[#4A5D52] hover:text-[#163426]'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                        isActive
                          ? 'bg-[#2B784E] text-white'
                          : 'bg-[#EAF3EE] text-[#163426]'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#2B784E] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Button & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onOpenInquiry()}
              id="header-consultation-btn"
              className="hidden sm:inline-flex items-center gap-2 bg-[#2B784E] hover:bg-[#1F5D3B] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-full shadow-sm hover:shadow-md transition-all cursor-pointer"
            >
              <span>Request SOW</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#C59B3F]" />
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-menu-toggle"
              className="lg:hidden p-2 rounded-full text-[#163426] hover:bg-[#EAF3EE] transition-colors focus:outline-hidden"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden mx-4 my-1 rounded-2xl bg-white border border-[#DCE7E1] p-4 space-y-1.5 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          {navItems.map((item) => {
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                id={`mobile-nav-${item.id}`}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold tracking-wider uppercase transition-colors ${
                  isActive
                    ? 'bg-[#EAF3EE] text-[#2B784E]'
                    : 'text-[#3B5244] hover:bg-[#F3F8F5] hover:text-[#163426]'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#D8E6DE] text-[#163426] font-bold">
                      {item.badge}
                    </span>
                  )}
                </div>
                <ChevronRight className={`w-4 h-4 ${isActive ? 'text-[#2B784E]' : 'text-gray-400'}`} />
              </button>
            );
          })}

          <div className="pt-3 mt-2 border-t border-[#E8F1EB] space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry();
              }}
              id="mobile-inquiry-btn"
              className="w-full flex items-center justify-center gap-2 bg-[#2B784E] text-white py-3 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm hover:bg-[#1F5D3B]"
            >
              <span>Submit Project Inquiry</span>
              <ArrowRight className="w-4 h-4 text-[#C59B3F]" />
            </button>

            <div className="bg-[#F4F9F6] p-3 rounded-xl text-xs text-[#3D5647] space-y-1.5 border border-[#DCE7E1]">
              <div className="font-bold text-[#163426] flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#C59B3F]" />
                <span>Contact: {COMPANY_INFO.contactPerson} ({COMPANY_INFO.phoneDisplay})</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#2B784E]" />
                <span>{COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
