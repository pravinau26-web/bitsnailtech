import React from 'react';
import { PageId } from '../types';
import { BitsnailLogo } from './BitsnailLogo';
import { COMPANY_INFO, TELECOM_SERVICES } from '../data/telecomData';
import {
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  Radio,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Building2,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId, serviceId?: string) => void;
  onOpenInquiry: (defaultService?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenInquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNav = (page: PageId) => {
    onNavigate(page);
    scrollToTop();
  };

  return (
    <footer className="bg-[#12281D] text-white pt-16 pb-12 border-t border-[#1C3E2D]" id="corporate-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#234A36]">
          {/* Col 1: Brand & Profile */}
          <div className="lg:col-span-5 space-y-5">
            <div className="bg-white p-3.5 rounded-2xl inline-block border border-[#DCE7E1]">
              <BitsnailLogo
                size="md"
                className="cursor-pointer"
                onClick={() => handleNav('home')}
              />
            </div>

            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed max-w-md">
              Bitsnail Technologies Pvt Ltd delivers innovative, efficient, and cost-effective telecom engineering solutions across India.
              Operating since March 2023, specializing in 4G LTE & 5G network rollouts, RF surveys, and certified field operations.
            </p>

            <div className="flex flex-wrap gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 bg-[#1B3C2C] px-3 py-1.5 rounded-full border border-[#2F6147] text-gray-200">
                <ShieldCheck className="w-4 h-4 text-[#C59B3F]" />
                <span>100% FARM Height Certified</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-[#1B3C2C] px-3 py-1.5 rounded-full border border-[#2F6147] text-gray-200">
                <Radio className="w-4 h-4 text-[#C59B3F]" />
                <span>4G LTE & 5G NR</span>
              </span>
            </div>

            <div className="pt-2 text-xs text-gray-400">
              <span className="font-bold text-[#C59B3F] uppercase tracking-wider block mb-1">
                Strategic Playrole Alliance:
              </span>
              <div className="flex items-center gap-2 text-white font-medium">
                <Building2 className="w-4 h-4 text-[#C59B3F]" />
                <span>Vedang Wireless Teleinfra Pvt Ltd</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C59B3F]">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2B784E]" />
                  <span>Home</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2B784E]" />
                  <span>About Us & Vision</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('services')}
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2B784E]" />
                  <span>6 Telecom Services</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('safety-careers')}
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2B784E]" />
                  <span>Safety Standards & Careers</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className="text-gray-300 hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#2B784E]" />
                  <span>Contact & Inquiry Desk</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Operations Contact */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#C59B3F]">
              Operations Hotline
            </h3>

            <div className="bg-[#193728] p-5 rounded-2xl border border-[#2B573E] space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-[#2B573E] pb-2">
                <span className="text-white font-bold text-sm">{COMPANY_INFO.contactPerson}</span>
                <span className="text-[10px] text-[#C59B3F] font-bold uppercase">Telecom Operations Lead</span>
              </div>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="flex items-center gap-2 text-white hover:text-[#C59B3F] font-bold text-base transition-colors"
              >
                <Phone className="w-4 h-4 text-[#C59B3F]" />
                <span>{COMPANY_INFO.phoneDisplay}</span>
              </a>

              <a
                href={`mailto:${COMPANY_INFO.email}`}
                className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#2B784E]" />
                <span>{COMPANY_INFO.email}</span>
              </a>

              <div className="text-gray-400 text-[11px] pt-1">
                Active Pan-India Circles • Headquartered in Tamil Nadu, India
              </div>
            </div>

            <button
              onClick={() => onOpenInquiry()}
              className="w-full py-3 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Submit Project Inquiry</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#C59B3F]" />
            </button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <div>
            © 2023 - {new Date().getFullYear()} Bitsnail Technologies Pvt Ltd. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">FARM & WAH Certified Operations</span>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="text-[#C59B3F] hover:underline cursor-pointer"
            >
              Back to Top ↑
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
