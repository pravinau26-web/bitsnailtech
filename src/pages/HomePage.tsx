import React from 'react';
import { PageId } from '../types';
import {
  TELECOM_SERVICES,
  COMPANY_INFO,
  COMPANY_VISION,
  COMPANY_MISSION,
  COMPANY_VALUES,
} from '../data/telecomData';
import { BitsnailLogo } from '../components/BitsnailLogo';
import {
  Radio,
  Sliders,
  Cpu,
  TrendingUp,
  ShieldAlert,
  FileCheck,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Phone,
  Calendar,
  Building2,
  HardHat,
  Sparkles,
  Zap,
  Target,
  Award,
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: PageId, serviceId?: string) => void;
  onOpenInquiry: (defaultService?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenInquiry }) => {
  const serviceIconMap: Record<string, React.ReactNode> = {
    Radio: <Radio className="w-6 h-6" />,
    Sliders: <Sliders className="w-6 h-6" />,
    Cpu: <Cpu className="w-6 h-6" />,
    TrendingUp: <TrendingUp className="w-6 h-6" />,
    ShieldAlert: <ShieldAlert className="w-6 h-6" />,
    FileCheck: <FileCheck className="w-6 h-6" />,
  };

  return (
    <div className="space-y-16 sm:space-y-24 py-6 bg-[#F3F8F5]">
      {/* 1. Hero Section (asayinfotech.in inspired) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Heading & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF3EE] border border-[#D5E6DC] text-xs font-bold text-[#163426] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#2B784E] animate-pulse" />
              <span>Next-Gen 4G LTE & 5G Telecom Engineering</span>
            </div>

            {/* Headline with Accent Color */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#163426] tracking-tight leading-[1.15]">
              Transforming Networks with{' '}
              <span className="text-[#2B784E]">Digital Intelligence</span> & Precision
            </h1>

            {/* Subtitle */}
            <p className="text-[#4A5D52] text-sm sm:text-base lg:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Bitsnail Technologies Pvt Ltd delivers end-to-end cellular infrastructure services,
              system parameter configuration, RF field surveys, and safety-certified field operations
              across India since March 2023.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => onOpenInquiry()}
                className="w-full sm:w-auto px-8 py-3.5 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-full font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer"
              >
                <span>Inquire Now</span>
                <ArrowRight className="w-4 h-4 text-[#C59B3F]" />
              </button>

              <a
                href={`tel:${COMPANY_INFO.phone}`}
                className="w-full sm:w-auto px-7 py-3.5 bg-white hover:bg-[#EAF3EE] text-[#163426] border border-[#DCE7E1] rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-2xs transition-all cursor-pointer"
              >
                <Phone className="w-4 h-4 text-[#C59B3F]" />
                <span>Call: {COMPANY_INFO.phoneDisplay}</span>
              </a>
            </div>

            {/* Key Trust Signals */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-[#3E5648] font-semibold border-t border-[#DCE7E1]/60">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2B784E]" />
                <span>Active Since March 2023</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2B784E]" />
                <span>4G LTE & 5G Deployed</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#2B784E]" />
                <span>100% FARM Safety Certified</span>
              </div>
            </div>
          </div>

          {/* Right Column: High-Fidelity Emblem & Snapshot Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-[#DCE7E1] p-8 sm:p-10 shadow-lg shadow-emerald-950/5 relative overflow-hidden flex flex-col items-center text-center space-y-6">
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#EAF3EE] rounded-full blur-2xl pointer-events-none" />

              {/* Exact Logo from User's Image 1 */}
              <div className="relative z-10 flex flex-col items-center">
                <BitsnailLogo variant="mark" size="xl" className="scale-110" />
              </div>

              <div className="space-y-2 relative z-10">
                <h3 className="font-serif text-2xl font-bold text-[#163426]">
                  Bitsnail Technologies Pvt Ltd
                </h3>
                <p className="text-xs text-[#4A5D52] max-w-sm">
                  Innovative, efficient, and cost-effective turnkey solutions provider for the cellular telecommunication industry.
                </p>
              </div>

              {/* Quick Spec Pills */}
              <div className="grid grid-cols-2 gap-3 w-full text-left text-xs pt-2">
                <div className="bg-[#F4F8F5] p-3 rounded-2xl border border-[#DCE7E1]">
                  <span className="text-[10px] uppercase font-bold text-[#6B8576] block">Inception</span>
                  <span className="font-bold text-[#163426]">March 2023</span>
                </div>
                <div className="bg-[#F4F8F5] p-3 rounded-2xl border border-[#DCE7E1]">
                  <span className="text-[10px] uppercase font-bold text-[#6B8576] block">Safety OHS</span>
                  <span className="font-bold text-[#2B784E]">FARM Certified</span>
                </div>
                <div className="bg-[#F4F8F5] p-3 rounded-2xl border border-[#DCE7E1]">
                  <span className="text-[10px] uppercase font-bold text-[#6B8576] block">Technologies</span>
                  <span className="font-bold text-[#163426]">4G LTE & 5G NR</span>
                </div>
                <div className="bg-[#F4F8F5] p-3 rounded-2xl border border-[#DCE7E1]">
                  <span className="text-[10px] uppercase font-bold text-[#6B8576] block">Playrole Alliance</span>
                  <span className="font-bold text-[#163426]">Vedang Teleinfra</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Key Metric Numbers Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#DCE7E1] p-6 sm:p-8 shadow-sm">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center divide-y md:divide-y-0 md:divide-x divide-[#EAF3EE]">
            <div className="space-y-1 pt-2 md:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#163426]">
                March 2023
              </div>
              <div className="text-xs font-bold text-[#2B784E] uppercase tracking-wider">
                Operational Inception
              </div>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#163426]">
                4G LTE & 5G
              </div>
              <div className="text-xs font-bold text-[#2B784E] uppercase tracking-wider">
                Current-Gen Deployed
              </div>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#163426]">
                100% WAH
              </div>
              <div className="text-xs font-bold text-[#2B784E] uppercase tracking-wider">
                FARM Safety Certified
              </div>
            </div>

            <div className="space-y-1 pt-4 md:pt-0">
              <div className="font-serif text-3xl sm:text-4xl font-extrabold text-[#163426]">
                6 Core
              </div>
              <div className="text-xs font-bold text-[#2B784E] uppercase tracking-wider">
                Turnkey Telecom Services
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 6 Core Telecom Services (from PDF / User Prompt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-bold text-[#2B784E] uppercase tracking-widest block">
            OUR SERVICES
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163426]">
            Comprehensive Telecom Solutions
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D52]">
            End-to-end engineering excellence from initial field surveys to active 4G/5G baseband optimization.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TELECOM_SERVICES.map((service, index) => (
            <div
              key={service.id}
              className="bg-white hover:bg-[#163426] rounded-3xl border border-[#DCE7E1] hover:border-[#2B784E] p-7 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF3EE] text-[#2B784E] group-hover:bg-[#2B784E] group-hover:text-white flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    {serviceIconMap[service.iconName] || <Radio className="w-6 h-6" />}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#2B784E] bg-[#EAF3EE] group-hover:bg-[#2B784E] group-hover:text-white px-2.5 py-1 rounded-full transition-colors duration-300">
                    0{index + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#163426] group-hover:text-white transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5D52] group-hover:text-[#D1E5DA] leading-relaxed transition-colors duration-300">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAF3EE] group-hover:border-[#24523C] flex items-center justify-between transition-colors duration-300">
                <button
                  onClick={() => onNavigate('services', service.id)}
                  className="text-xs font-bold text-[#2B784E] group-hover:text-[#F0B849] hover:underline flex items-center gap-1 cursor-pointer transition-colors duration-300"
                >
                  <span>View Technical Scope</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenInquiry(service.title)}
                  className="px-3.5 py-1.5 bg-[#EAF3EE] text-[#163426] group-hover:bg-[#2B784E] group-hover:text-white group-hover:hover:bg-[#34925F] rounded-full text-xs font-bold transition-all duration-300 cursor-pointer"
                >
                  Inquire
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Vision, Mission & Values (Exact Text from User Prompt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#DCE7E1] p-8 sm:p-12 shadow-sm space-y-12">
          {/* Top Heading */}
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#2B784E] uppercase tracking-widest block">
              CORPORATE CHARTER
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#163426]">
              Vision, Mission & Foundational Values
            </h2>
          </div>

          {/* Vision & Mission Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-[#F4F8F5] p-8 rounded-3xl border border-[#DCE7E1] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3EE] text-[#2B784E] flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-[#2B784E] uppercase tracking-wider">
                VISION
              </div>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="bg-white px-3 py-1 rounded-full border border-[#DCE7E1] text-[#163426]">⮚ Commitment</span>
                <span className="bg-white px-3 py-1 rounded-full border border-[#DCE7E1] text-[#163426]">⮚ Flexibility</span>
                <span className="bg-white px-3 py-1 rounded-full border border-[#DCE7E1] text-[#163426]">⮚ Customer Satisfaction</span>
              </div>
              <p className="text-sm text-[#3E5648] leading-relaxed italic">
                "{COMPANY_VISION}"
              </p>
            </div>

            {/* Mission */}
            <div className="bg-[#F4F8F5] p-8 rounded-3xl border border-[#DCE7E1] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3EE] text-[#163426] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-[#163426] uppercase tracking-wider">
                MISSION
              </div>
              <p className="text-sm text-[#3E5648] leading-relaxed italic pt-6">
                "{COMPANY_MISSION}"
              </p>
            </div>
          </div>

          {/* Values Row */}
          <div>
            <div className="text-xs font-bold text-[#2B784E] uppercase tracking-widest text-center mb-6">
              OUR VALUES: RELIABILITY • INTEGRITY • PERFECTION
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {COMPANY_VALUES.slice(0, 3).map((val) => (
                <div key={val.title} className="bg-[#F4F8F5] p-6 rounded-2xl border border-[#DCE7E1] space-y-2">
                  <h4 className="font-bold text-[#163426] text-base">{val.title}</h4>
                  <p className="text-xs text-[#4A5D52] leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Operational Health & Safety (OHS) & FARM Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#163426] text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B784E] text-xs font-bold text-white uppercase tracking-wider">
                <HardHat className="w-3.5 h-3.5 text-[#C59B3F]" />
                <span>OPERATIONAL HEALTH AND SAFETY (OHS)</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold">
                100% FARM & WAH Safety Certified Field Operations
              </h3>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-200 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C59B3F] shrink-0 mt-0.5" />
                  <span>
                    <strong>FARM Certification</strong> (Safety Training on Height & Rescue), industry accepted WAH (Work At Height) – All Project Field Teams are certified.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C59B3F] shrink-0 mt-0.5" />
                  <span>
                    FARM Certification is valid across India and overseas & it is compulsory to work in Telecom.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C59B3F] shrink-0 mt-0.5" />
                  <span>
                    Special Focus and Drive for OHS measures ensuring highest level of safety standards and all project engineers are equipped with EN standard PPE kits.
                  </span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <button
                onClick={() => onNavigate('safety-careers')}
                className="w-full py-3.5 bg-[#2B784E] hover:bg-[#1E5D3A] text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer"
              >
                View Safety Policies & Careers
              </button>
              <button
                onClick={() => onOpenInquiry()}
                className="w-full py-3.5 bg-white text-[#163426] hover:bg-gray-100 rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
              >
                Inquire With Operations Desk
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Strategic Alliance / Playrole Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#DCE7E1] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#C59B3F] uppercase tracking-widest block">
              OUR PLAYROLE ALLIANCE
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#163426]">
              Vedang Wireless Teleinfra Pvt Ltd
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5D52] max-w-xl">
              Executing nationwide wireless telecommunications rollouts, parameter optimization, and field support in strategic partnership.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="px-6 py-3 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-full font-bold text-xs tracking-wider uppercase shadow-sm transition-all"
            >
              Call {COMPANY_INFO.phoneDisplay}
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3 bg-[#EAF3EE] hover:bg-[#D5E6DC] text-[#163426] rounded-full font-bold text-xs tracking-wider uppercase transition-all cursor-pointer"
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
