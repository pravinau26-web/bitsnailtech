import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { TELECOM_SERVICES, COMPANY_INFO } from '../data/telecomData';
import {
  Radio,
  Sliders,
  Cpu,
  TrendingUp,
  ShieldAlert,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  Phone,
  Filter,
  Check,
} from 'lucide-react';

interface ServicesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenInquiry: (defaultService?: string) => void;
  selectedServiceId?: string;
}

export const ServicesPage: React.FC<ServicesPageProps> = ({
  onNavigate,
  onOpenInquiry,
  selectedServiceId,
}) => {
  const [activeService, setActiveService] = useState<string>(
    selectedServiceId || TELECOM_SERVICES[0].id
  );

  useEffect(() => {
    if (selectedServiceId) {
      setActiveService(selectedServiceId);
      const el = document.getElementById(`service-card-${selectedServiceId}`);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [selectedServiceId]);

  const serviceIconMap: Record<string, React.ReactNode> = {
    Radio: <Radio className="w-6 h-6" />,
    Sliders: <Sliders className="w-6 h-6" />,
    Cpu: <Cpu className="w-6 h-6" />,
    TrendingUp: <TrendingUp className="w-6 h-6" />,
    ShieldAlert: <ShieldAlert className="w-6 h-6" />,
    FileCheck: <FileCheck className="w-6 h-6" />,
  };

  const currentActiveServiceObj =
    TELECOM_SERVICES.find((s) => s.id === activeService) || TELECOM_SERVICES[0];

  return (
    <div className="space-y-16 sm:space-y-20 py-8 bg-[#F3F8F5]">
      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 pt-4">
        <span className="text-xs font-bold text-[#2B784E] uppercase tracking-widest block">
          TURNKEY TELECOMMUNICATIONS PORTFOLIO
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#163426] tracking-tight">
          Specialized <span className="text-[#2B784E]">Telecom Services</span>
        </h1>
        <p className="text-[#4A5D52] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          From nationwide RF field surveys and 4G/5G system configurations to certified implementation and 24/7 fault troubleshooting.
        </p>
      </section>

      {/* 2. Interactive Service Selector & Detailed Focus Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#DCE7E1] p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-wrap gap-2 justify-center">
            {TELECOM_SERVICES.map((s, idx) => {
              const isActive = activeService === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setActiveService(s.id)}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#2B784E] text-white shadow-sm'
                      : 'bg-[#F4F8F5] text-[#163426] hover:bg-[#EAF3EE] border border-[#DCE7E1]'
                  }`}
                >
                  <span>0{idx + 1}.</span>
                  <span>{s.title}</span>
                </button>
              );
            })}
          </div>

          {/* Active Highlight Panel */}
          <div className="bg-[#F4F8F5] rounded-2xl border border-[#DCE7E1] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#DCE7E1]">
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#2B784E] uppercase tracking-widest block">
                  ACTIVE TECHNICAL FOCUS
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#163426]">
                  {currentActiveServiceObj.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenInquiry(currentActiveServiceObj.title)}
                  className="px-6 py-2.5 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>Inquire for this Service</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C59B3F]" />
                </button>
              </div>
            </div>

            <p className="text-sm text-[#3E5648] leading-relaxed">
              {currentActiveServiceObj.fullDesc}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#163426] uppercase tracking-wider">
                  Key Scope Deliverables
                </h4>
                <ul className="space-y-2 text-xs text-[#4A5D52]">
                  {currentActiveServiceObj.deliverables.map((del, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#2B784E] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#163426] uppercase tracking-wider">
                  Technical Parameters & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {currentActiveServiceObj.keyTools.map((tool, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full bg-white border border-[#DCE7E1] text-[#163426] text-xs font-semibold"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. All 6 Services Detailed Cards (asayinfotech.in style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="border-b border-[#DCE7E1] pb-4">
          <h2 className="font-serif text-3xl font-bold text-[#163426]">
            All 6 Core Telecom Capabilities
          </h2>
          <p className="text-xs sm:text-sm text-[#4A5D52] mt-1">
            Complete turnkey solutions with verified FARM Height Safety Certified field staff.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TELECOM_SERVICES.map((s, index) => (
            <div
              key={s.id}
              id={`service-card-${s.id}`}
              className={`bg-white hover:bg-[#163426] rounded-3xl border ${
                activeService === s.id
                  ? 'border-[#2B784E] ring-2 ring-[#2B784E]/20'
                  : 'border-[#DCE7E1] hover:border-[#2B784E]'
              } p-7 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between group cursor-pointer`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-[#EAF3EE] text-[#2B784E] group-hover:bg-[#2B784E] group-hover:text-white flex items-center justify-center group-hover:scale-110 transition-all duration-300">
                    {serviceIconMap[s.iconName]}
                  </div>
                  <span className="font-mono text-xs font-bold text-[#2B784E] bg-[#EAF3EE] group-hover:bg-[#2B784E] group-hover:text-white px-2.5 py-1 rounded-full transition-colors duration-300">
                    0{index + 1}
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#163426] group-hover:text-white transition-colors duration-300">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5D52] group-hover:text-[#D1E5DA] leading-relaxed transition-colors duration-300">
                    {s.shortDesc}
                  </p>
                </div>

                <div className="space-y-1.5 pt-2 border-t border-[#EAF3EE] group-hover:border-[#24523C] transition-colors duration-300">
                  <span className="text-[10px] font-bold text-[#2B784E] group-hover:text-[#F0B849] uppercase tracking-wider block transition-colors duration-300">
                    Core Focus Points:
                  </span>
                  <ul className="space-y-1 text-xs text-[#3E5648] group-hover:text-[#C5DDD0] transition-colors duration-300">
                    {s.deliverables.slice(0, 3).map((d, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-[#2B784E] group-hover:text-[#F0B849] font-bold mt-0.5">•</span>
                        <span className="line-clamp-1">{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#EAF3EE] group-hover:border-[#24523C] flex items-center justify-between transition-colors duration-300">
                <button
                  onClick={() => setActiveService(s.id)}
                  className="text-xs font-bold text-[#2B784E] group-hover:text-[#F0B849] hover:underline flex items-center gap-1 cursor-pointer transition-colors duration-300"
                >
                  <span>Select & Inspect</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onOpenInquiry(s.title)}
                  className="px-4 py-1.5 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-full text-xs font-bold shadow-xs transition-all cursor-pointer"
                >
                  Inquire Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. OHS Safety Standard Assurance */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#163426] text-white rounded-3xl p-8 sm:p-10 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2B784E] text-xs font-bold text-white uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C59B3F]" />
              <span>SAFETY COMPLIANCE</span>
            </div>
            <h3 className="font-serif text-2xl font-bold">
              100% FARM Certified Engineers on Every Site
            </h3>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              All project field teams are Work at Height (WAH) certified and equipped with EN standard PPE kits before site deployment.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('safety-careers')}
              className="px-6 py-3 bg-[#2B784E] hover:bg-[#1E5D3A] text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer"
            >
              Review Safety Terms
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
