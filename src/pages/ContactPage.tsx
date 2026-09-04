import React, { useState, useEffect } from 'react';
import { PageId, InquiryFormData, FormErrors, StoredInquiry } from '../types';
import { TELECOM_SERVICES, COMPANY_INFO } from '../data/telecomData';
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Radio,
  Building2,
  Trash2,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (page: PageId) => void;
  prefillService?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, prefillService }) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceCategory: prefillService || TELECOM_SERVICES[0].title,
    message: '',
    projectTimeline: '1-2 weeks',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<StoredInquiry | null>(null);
  const [recentInquiries, setRecentInquiries] = useState<StoredInquiry[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('bitsnail_inquiries');
      if (stored) {
        setRecentInquiries(JSON.parse(stored));
      }
    } catch {
      // Safe fallback
    }
  }, [submittedInquiry]);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Please enter your full name (minimum 2 characters)';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address';
    }

    const phoneRegex = /^[0-9+ -]{8,15}$/;
    if (!formData.phone.trim() || !phoneRegex.test(formData.phone.trim().replace(/\s/g, ''))) {
      newErrors.phone = 'Please provide a valid phone number';
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      newErrors.message = 'Please provide project details (minimum 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const generatedId = `BIT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      const newInquiry: StoredInquiry = {
        ...formData,
        id: generatedId,
        timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
        status: 'Received',
        assignedTo: 'Suresh (Telecom Operations Lead)',
      };

      try {
        const existing = JSON.parse(localStorage.getItem('bitsnail_inquiries') || '[]');
        const updated = [newInquiry, ...existing];
        localStorage.setItem('bitsnail_inquiries', JSON.stringify(updated));
        setRecentInquiries(updated);
      } catch {
        // Safe fallback
      }

      setSubmittedInquiry(newInquiry);
      setIsSubmitting(false);
    }, 500);
  };

  const handleClearInquiryHistory = () => {
    localStorage.removeItem('bitsnail_inquiries');
    setRecentInquiries([]);
  };

  return (
    <div className="space-y-12 sm:space-y-16 py-8 bg-[#F3F8F5] min-h-screen">
      {/* 1. Header Inspired by asayinfotech.in/contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 pt-4">
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#163426] tracking-tight">
          Let's <span className="text-[#2B784E]">Connect</span>
        </h1>
        <p className="text-[#4A5D52] text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Have a project in mind? Or just want to say hello? We'd love to hear from you.
        </p>
      </section>

      {/* 2. Main Two-Column Contact Section (asayinfotech.in style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Card 1: Office / Operations Desk */}
            <div className="bg-white rounded-3xl border border-[#DCE7E1] p-6 sm:p-7 shadow-sm space-y-3 transition-all hover:border-[#2B784E]">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3EE] text-[#2B784E] flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#2B784E] uppercase tracking-widest block">
                  CHENNAI & PAN-INDIA OPERATIONS (HQ)
                </span>
                <h3 className="font-bold text-[#163426] text-lg">
                  Bitsnail Technologies Pvt Ltd
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5D52] leading-relaxed">
                  Turnkey telecommunication network services across major Tier-1 and regional circles.
                  Headquartered in Tamil Nadu, India.
                </p>
                <div className="pt-2 text-xs text-[#2B784E] font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#2B784E] animate-ping" />
                  <span>Operations Lead: Suresh</span>
                </div>
              </div>
            </div>

            {/* Card 2: Contact Number */}
            <div className="bg-white rounded-3xl border border-[#DCE7E1] p-6 sm:p-7 shadow-sm space-y-3 transition-all hover:border-[#2B784E]">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3EE] text-[#2B784E] flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#2B784E] uppercase tracking-widest block">
                  CONTACT NUMBER
                </span>
                <a
                  href={`tel:${COMPANY_INFO.phone}`}
                  className="font-bold text-[#163426] hover:text-[#2B784E] text-xl block transition-colors"
                >
                  {COMPANY_INFO.phoneDisplay}
                </a>
                <p className="text-xs text-[#4A5D52]">
                  Direct call coordinator: <strong>Suresh</strong>. Available 24/7 for emergency site support and RF survey mobilization.
                </p>
              </div>
            </div>

            {/* Card 3: Email */}
            <div className="bg-white rounded-3xl border border-[#DCE7E1] p-6 sm:p-7 shadow-sm space-y-3 transition-all hover:border-[#2B784E]">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3EE] text-[#2B784E] flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#2B784E] uppercase tracking-widest block">
                  OFFICIAL EMAIL ADDRESS
                </span>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="font-bold text-[#163426] hover:text-[#2B784E] text-base sm:text-lg block transition-colors"
                >
                  {COMPANY_INFO.email}
                </a>
                <p className="text-xs text-[#4A5D52]">
                  Send tender inquiries, Statements of Work (SOW), parameter tuning requests, or RF audit scopes.
                </p>
              </div>
            </div>

            {/* Card 4: Alliance Playrole */}
            <div className="bg-white rounded-3xl border border-[#DCE7E1] p-6 sm:p-7 shadow-sm space-y-3 transition-all hover:border-[#2B784E]">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF3EE] text-[#C59B3F] flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] font-bold text-[#C59B3F] uppercase tracking-widest block">
                  OUR PLAYROLE / ALLIANCE
                </span>
                <h3 className="font-bold text-[#163426] text-base sm:text-lg">
                  Vedang Wireless Teleinfra Pvt Ltd
                </h3>
                <p className="text-xs text-[#4A5D52]">
                  Strategic telecom execution alliance and deployment partner for leading cellular operators.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Clean Form Container */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#DCE7E1] p-6 sm:p-10 shadow-sm">
            {submittedInquiry ? (
              <div className="text-center py-8 space-y-5">
                <div className="w-16 h-16 bg-[#EAF3EE] text-[#2B784E] rounded-full flex items-center justify-center mx-auto border-2 border-[#2B784E]">
                  <CheckCircle2 className="w-8 h-8 text-[#2B784E]" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl font-bold text-[#163426]">
                    Inquiry Successfully Registered!
                  </h3>
                  <p className="text-xs sm:text-sm text-[#4A5D52] max-w-md mx-auto">
                    Thank you, <strong className="text-[#163426]">{submittedInquiry.fullName}</strong>.
                    Your request has been saved and routed to Operations Lead Suresh.
                  </p>
                </div>

                <div className="bg-[#F4F8F5] border border-[#DCE7E1] p-5 rounded-2xl text-left text-xs text-[#163426] space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-[#E0EBE4] pb-2">
                    <span className="text-gray-500">Tracking Reference:</span>
                    <span className="font-mono font-bold text-[#2B784E]">{submittedInquiry.id}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E0EBE4] pb-2">
                    <span className="text-gray-500">Service:</span>
                    <span className="font-semibold text-right">{submittedInquiry.serviceCategory}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#E0EBE4] pb-2">
                    <span className="text-gray-500">Assigned Desk:</span>
                    <span className="font-medium">{submittedInquiry.assignedTo}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Target Response:</span>
                    <span className="font-bold text-[#2B784E]">Within 2 to 4 Hours</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setSubmittedInquiry(null);
                      setFormData({
                        fullName: '',
                        email: '',
                        phone: '',
                        companyName: '',
                        serviceCategory: TELECOM_SERVICES[0].title,
                        message: '',
                        projectTimeline: '1-2 weeks',
                      });
                    }}
                    className="px-6 py-3 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-full font-bold text-xs uppercase tracking-wider shadow-sm cursor-pointer"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="border-b border-[#E8F1EB] pb-4 mb-2">
                  <span className="text-[11px] font-bold text-[#2B784E] uppercase tracking-widest block">
                    PROJECT INQUIRY DESK
                  </span>
                  <h2 className="font-serif text-2xl font-bold text-[#163426]">
                    Request a Technical Proposal / SOW
                  </h2>
                  <p className="text-xs text-[#4A5D52] mt-1">
                    Fill out the inquiry form below with your RF survey or cellular network requirements.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-[#163426] mb-1.5 uppercase tracking-wider">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => {
                        setFormData({ ...formData, fullName: e.target.value });
                        if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                      }}
                      className={`w-full px-4 py-3 bg-[#F4F8F5] border ${
                        errors.fullName ? 'border-red-500 bg-red-50/50' : 'border-[#D5E3DB]'
                      } rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none transition-all`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.fullName}</span>
                      </p>
                    )}
                  </div>

                  {/* Email Address */}
                  <div>
                    <label className="block text-xs font-bold text-[#163426] mb-1.5 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`w-full px-4 py-3 bg-[#F4F8F5] border ${
                        errors.email ? 'border-red-500 bg-red-50/50' : 'border-[#D5E3DB]'
                      } rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none transition-all`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-[#163426] mb-1.5 uppercase tracking-wider">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => {
                        setFormData({ ...formData, phone: e.target.value });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`w-full px-4 py-3 bg-[#F4F8F5] border ${
                        errors.phone ? 'border-red-500 bg-red-50/50' : 'border-[#D5E3DB]'
                      } rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none transition-all`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Company / Circle */}
                  <div>
                    <label className="block text-xs font-bold text-[#163426] mb-1.5 uppercase tracking-wider">
                      Company / Circle (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Telecom Circle / Infra Co"
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F4F8F5] border border-[#D5E3DB] rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Required Telecom Service */}
                <div>
                  <label className="block text-xs font-bold text-[#163426] mb-1.5 uppercase tracking-wider">
                    Required Telecom Service *
                  </label>
                  <select
                    value={formData.serviceCategory}
                    onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F4F8F5] border border-[#D5E3DB] rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none transition-all"
                  >
                    {TELECOM_SERVICES.map((s) => (
                      <option key={s.id} value={s.title}>
                        {s.title}
                      </option>
                    ))}
                    <option value="General Telecom Turnkey Rollout">
                      General Telecom Turnkey Rollout
                    </option>
                  </select>
                </div>

                {/* Scope Details / Message */}
                <div>
                  <label className="block text-xs font-bold text-[#163426] mb-1.5 uppercase tracking-wider">
                    Scope Details / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about your telecom project, number of sites, circle location, or survey specifications..."
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    className={`w-full px-4 py-3 bg-[#F4F8F5] border ${
                      errors.message ? 'border-red-500 bg-red-50/50' : 'border-[#D5E3DB]'
                    } rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none transition-all resize-none`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.message}</span>
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-xl font-bold text-sm tracking-wider uppercase flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Logging Inquiry...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#C59B3F]" />
                        <span>Send Message / Request SOW</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-[#4A5D52] text-center pt-2">
                  Prefer direct phone contact? Call Operations Lead Suresh at{' '}
                  <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold text-[#2B784E] underline">
                    {COMPANY_INFO.phoneDisplay}
                  </a>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* 3. Inquiries History Log */}
      {recentInquiries.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="bg-white rounded-3xl border border-[#DCE7E1] p-6 sm:p-8 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-[#E8F1EB] pb-3">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#2B784E]" />
                <h3 className="font-bold text-[#163426] text-sm sm:text-base uppercase tracking-wider">
                  Your Submitted Inquiries ({recentInquiries.length})
                </h3>
              </div>
              <button
                onClick={handleClearInquiryHistory}
                className="text-xs text-red-600 hover:text-red-700 flex items-center gap-1 font-semibold cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recentInquiries.map((inq) => (
                <div
                  key={inq.id}
                  className="bg-[#F4F8F5] p-4 rounded-2xl border border-[#DCE7E1] space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#2B784E]">{inq.id}</span>
                    <span className="px-2 py-0.5 rounded-full bg-[#EAF3EE] text-[#163426] font-semibold text-[10px]">
                      {inq.status}
                    </span>
                  </div>
                  <div className="font-semibold text-[#163426]">{inq.serviceCategory}</div>
                  <p className="text-[#4A5D52] line-clamp-2">{inq.message}</p>
                  <div className="text-[10px] text-gray-400 pt-1 border-t border-[#DCE7E1]/50 flex justify-between">
                    <span>{inq.timestamp}</span>
                    <span>Lead: Suresh</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
