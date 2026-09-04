import React from 'react';
import { PageId } from '../types';
import {
  COMPANY_INFO,
  COMPANY_VISION,
  COMPANY_MISSION,
  COMPANY_VALUES,
} from '../data/telecomData';
import { BitsnailLogo } from '../components/BitsnailLogo';
import {
  Calendar,
  Radio,
  Award,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  Cpu,
  Phone,
  Zap,
  Target,
  Building2,
  ShieldCheck,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId, serviceId?: string) => void;
  onOpenInquiry: (defaultService?: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenInquiry }) => {
  return (
    <div className="space-y-16 sm:space-y-20 py-8 bg-[#F3F8F5]">
      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 pt-4">
        <span className="text-xs font-bold text-[#2B784E] uppercase tracking-widest block">
          ABOUT US • BITSNAIL TECHNOLOGIES PVT LTD
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#163426] tracking-tight">
          Pioneering <span className="text-[#2B784E]">Telecom Excellence</span>
        </h1>
        <p className="text-[#4A5D52] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Active since March 2023, delivering innovative, efficient, and cost-effective telecom engineering solutions.
        </p>
      </section>

      {/* 2. Executive Story & Highlights (Direct Text from User Prompt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Detailed Story */}
          <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#4A5D52] leading-relaxed">
            <span className="text-[#2B784E] font-bold text-xs tracking-widest uppercase block">
              OUR JOURNEY & CORE MISSION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#163426] leading-snug">
              Delivering Best Practices to the{' '}
              <span className="text-[#2B784E]">Fastest Growing Wireless Networks</span>
            </h2>
            <p>
              <strong className="text-[#163426]">Bitsnail Technologies Pvt Ltd</strong> has started operations since{' '}
              <strong className="text-[#163426]">March 2023</strong> and it is an innovative, efficient and effective solution
              providing telecom industries with mission to become most preferred company for our customers.
            </p>
            <p>
              Our in-depth understanding of technology and experience helps us to bring best practices to fastest growing wireless technology.
            </p>
            <p>
              Bitsnail Technologies Pvt Ltd has delivered current generation technology services for{' '}
              <strong className="text-[#163426]">4G LTE & 5G</strong> and eager to work with upcoming technologies as well.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#163426] bg-[#EAF3EE] px-4 py-2 rounded-full border border-[#D5E6DC]">
                <Calendar className="w-4 h-4 text-[#2B784E]" />
                <span>Active Since March 2023</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#163426] bg-[#EAF3EE] px-4 py-2 rounded-full border border-[#D5E6DC]">
                <Radio className="w-4 h-4 text-[#2B784E]" />
                <span>4G LTE & 5G Deployed</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#163426] bg-[#EAF3EE] px-4 py-2 rounded-full border border-[#D5E6DC]">
                <Building2 className="w-4 h-4 text-[#C59B3F]" />
                <span>Vedang Wireless Teleinfra Alliance</span>
              </div>
            </div>
          </div>

          {/* Right: Emblem Showcase Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl border border-[#DCE7E1] p-8 shadow-sm space-y-6 text-center">
            <div className="flex justify-center">
              <BitsnailLogo variant="mark" size="lg" className="scale-110" />
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-xl font-bold text-[#163426]">
                Bitsnail Technologies Pvt Ltd
              </h3>
              <p className="text-xs text-[#4A5D52]">
                Official Corporate Identity & Engineering Practice
              </p>
            </div>

            <div className="space-y-3 text-xs text-left pt-2 border-t border-[#EAF3EE]">
              <div className="flex justify-between pb-2 border-b border-[#EAF3EE]">
                <span className="text-gray-500">Established:</span>
                <span className="font-bold text-[#163426]">March 2023</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#EAF3EE]">
                <span className="text-gray-500">Operations Lead:</span>
                <span className="font-bold text-[#163426]">{COMPANY_INFO.contactPerson}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#EAF3EE]">
                <span className="text-gray-500">Contact Number:</span>
                <span className="font-bold text-[#2B784E]">{COMPANY_INFO.phoneDisplay}</span>
              </div>
              <div className="flex justify-between pb-2 border-b border-[#EAF3EE]">
                <span className="text-gray-500">Official Email:</span>
                <span className="font-bold text-[#163426]">{COMPANY_INFO.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Safety Standard:</span>
                <span className="font-bold text-[#2B784E]">100% FARM Certified</span>
              </div>
            </div>

            <button
              onClick={() => onOpenInquiry()}
              className="w-full py-3.5 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Connect with Operations Lead</span>
              <ArrowRight className="w-4 h-4 text-[#C59B3F]" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Vision, Mission & Values (Direct from User Prompt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#DCE7E1] p-8 sm:p-12 shadow-sm space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#2B784E] uppercase tracking-widest block">
              ORGANIZATIONAL PILLARS
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#163426]">
              Vision, Mission & Values
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-[#F4F8F5] p-8 rounded-3xl border border-[#DCE7E1] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3EE] text-[#2B784E] flex items-center justify-center">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#163426]">VISION</h3>
              <div className="flex flex-wrap gap-2 text-xs font-semibold">
                <span className="bg-white px-3 py-1 rounded-full border border-[#DCE7E1] text-[#163426]">⮚ Commitment</span>
                <span className="bg-white px-3 py-1 rounded-full border border-[#DCE7E1] text-[#163426]">⮚ Flexibility</span>
                <span className="bg-white px-3 py-1 rounded-full border border-[#DCE7E1] text-[#163426]">⮚ Customer Satisfaction</span>
              </div>
              <p className="text-sm text-[#3E5648] leading-relaxed italic pt-2">
                "{COMPANY_VISION}"
              </p>
            </div>

            {/* Mission */}
            <div className="bg-[#F4F8F5] p-8 rounded-3xl border border-[#DCE7E1] space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3EE] text-[#163426] flex items-center justify-center">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#163426]">MISSION</h3>
              <p className="text-sm text-[#3E5648] leading-relaxed italic pt-8">
                "{COMPANY_MISSION}"
              </p>
            </div>
          </div>

          {/* Values */}
          <div>
            <div className="text-xs font-bold text-[#2B784E] uppercase tracking-widest text-center mb-6">
              OUR VALUES: RELIABILITY • INTEGRITY • PERFECTION
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {COMPANY_VALUES.map((val, idx) => (
                <div key={val.title} className="bg-[#F4F8F5] p-6 rounded-2xl border border-[#DCE7E1] space-y-2">
                  <div className="w-7 h-7 rounded-full bg-[#EAF3EE] text-[#2B784E] flex items-center justify-center text-xs font-bold">
                    0{idx + 1}
                  </div>
                  <h4 className="font-bold text-[#163426] text-base">{val.title}</h4>
                  <p className="text-xs text-[#4A5D52] leading-relaxed">{val.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Multi-Generation Telecom Capabilities */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#163426] text-white rounded-3xl p-8 sm:p-12 shadow-md space-y-8">
          <div className="max-w-2xl space-y-2">
            <span className="text-xs font-bold text-[#C59B3F] uppercase tracking-wider block">
              ENGINEERING SPECTRUM
            </span>
            <h2 className="font-serif text-3xl font-bold">
              Multi-Generation Wireless Expertise
            </h2>
            <p className="text-xs sm:text-sm text-gray-300">
              Delivering current-generation technology services for 4G LTE & 5G, and eager to work with upcoming technologies as well.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#1E4231] p-6 rounded-2xl border border-[#2B5A43] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C59B3F] uppercase">Current Gen</span>
                <Radio className="w-5 h-5 text-[#C59B3F]" />
              </div>
              <h3 className="font-bold text-white text-lg">4G LTE & VoLTE</h3>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li>• FDD & TDD cellular bands</li>
                <li>• VoLTE parameter tuning & Call Drop reduction</li>
                <li>• Cluster drive tests & Benchmarking</li>
                <li>• Multi-operator base station integration</li>
              </ul>
            </div>

            <div className="bg-[#1E4231] p-6 rounded-2xl border border-[#2B5A43] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C59B3F] uppercase">Current Gen</span>
                <Cpu className="w-5 h-5 text-[#C59B3F]" />
              </div>
              <h3 className="font-bold text-white text-lg">5G New Radio (NR)</h3>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li>• NSA & SA 5G architectures</li>
                <li>• Sub-6 GHz and mmWave spectrum verification</li>
                <li>• Massive MIMO beam pattern alignment</li>
                <li>• gNodeB parameter configuration & commissioning</li>
              </ul>
            </div>

            <div className="bg-[#1E4231] p-6 rounded-2xl border border-[#2B5A43] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#C59B3F] uppercase">Upcoming</span>
                <TrendingUp className="w-5 h-5 text-[#C59B3F]" />
              </div>
              <h3 className="font-bold text-white text-lg">Next-Gen Networks</h3>
              <ul className="space-y-1.5 text-xs text-gray-300">
                <li>• Open-RAN (O-RAN) disaggregated nodes</li>
                <li>• Private 5G for enterprise campuses</li>
                <li>• Telecom IoT sensor telemetry</li>
                <li>• Advanced 6G research and readiness</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Direct Contact Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4">
        <div className="bg-white rounded-3xl border border-[#DCE7E1] p-8 sm:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#163426]">
              Ready to Collaborate with Bitsnail?
            </h3>
            <p className="text-xs sm:text-sm text-[#4A5D52]">
              Connect directly for project scopes, RF surveys, or joint consortiums.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${COMPANY_INFO.phone}`}
              className="px-6 py-3.5 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
            >
              Call {COMPANY_INFO.phoneDisplay}
            </a>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-[#EAF3EE] hover:bg-[#D5E6DC] text-[#163426] rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
            >
              Send Inquiry
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
