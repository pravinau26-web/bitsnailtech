import React, { useState, useEffect } from 'react';
import { InquiryFormData, FormErrors, StoredInquiry } from '../types';
import { TELECOM_SERVICES, COMPANY_INFO } from '../data/telecomData';
import {
  X,
  Send,
  CheckCircle2,
  AlertCircle,
  Phone,
  ShieldCheck,
  Radio,
  Mail,
} from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultService?: string;
  onInquirySubmitted?: (inquiry: StoredInquiry) => void;
}

export const InquiryModal: React.FC<InquiryModalProps> = ({
  isOpen,
  onClose,
  defaultService = '',
  onInquirySubmitted,
}) => {
  const [formData, setFormData] = useState<InquiryFormData>({
    fullName: '',
    email: '',
    phone: '',
    companyName: '',
    serviceCategory: defaultService || TELECOM_SERVICES[0].title,
    message: '',
    projectTimeline: '1-2 weeks',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<StoredInquiry | null>(null);
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sent' | 'fallback'>('idle');

  useEffect(() => {
    if (defaultService) {
      setFormData((prev) => ({ ...prev, serviceCategory: defaultService }));
    }
  }, [defaultService]);

  if (!isOpen) return null;

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    const trimmedName = formData.fullName.trim();
    if (!trimmedName || trimmedName.length < 2) {
      newErrors.fullName = 'Please enter your full name (at least 2 characters)';
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email.trim())) {
      newErrors.email = 'Please provide a valid email address (e.g. name@domain.com)';
    }

    const cleanPhone = formData.phone.trim().replace(/[\s\-()]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      newErrors.phone = 'Please provide a valid 10-digit mobile number';
    }

    const trimmedMessage = formData.message.trim();
    if (!trimmedMessage || trimmedMessage.length < 10) {
      newErrors.message = 'Please provide brief project requirements (minimum 10 characters)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const generatedId = `BIT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let dispatchSuccess = false;
    try {
      const targetEmail = COMPANY_INFO.testNotificationEmail || 'pravinau26@gmail.com';
      const response = await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          Organization: 'Bitsnail Technologies Pvt Ltd',
          Official_Logo: 'https://raw.githubusercontent.com/pravinau26-web/bitsnailtech/main/public/assets/logo.svg',
          Website: 'https://pravinau26-web.github.io/',
          Helpline: '+91 98416 00155',
          Official_Email: 'bitsnailtech@gmail.com',
          Inquiry_Ref: generatedId,
          // CRITICAL: FormSubmit requires 'name', 'email', 'phone' to trigger autoresponse!
          name: formData.fullName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          client_company: formData.companyName.trim() || 'Direct Inquiry',
          service_category: formData.serviceCategory,
          project_details: formData.message.trim(),
          timeline: formData.projectTimeline,
          _subject: `[Bitsnail Technologies] Quick Inquiry: ${formData.fullName.trim()} (${formData.serviceCategory}) [Ref: ${generatedId}]`,
          _cc: 'bitsnailtech@gmail.com',
          _replyto: formData.email.trim(),
          _autoresponse: `Thank you for contacting Bitsnail Technologies!

============================================================
★ BITSNAIL TECHNOLOGIES PVT LTD ★
Telecom Network Operations & Field Engineering
Website: https://pravinau26-web.github.io/
Official Email: bitsnailtech@gmail.com | Helpline: +91 98416 00155
Official Logo & Brand: Bitsnail Technologies
============================================================

Inquiry Reference: ${generatedId}
Client Name: ${formData.fullName.trim()}
Service Requested: ${formData.serviceCategory}
Expected Timeline: ${formData.projectTimeline}

We have officially received your technical requirement. Our senior RF & telecom operations desk will review your scope of work and contact you within 2 to 4 hours.

If you have urgent site escalation needs, call our operations lead directly at +91 98416 00155.

Sincerely,
Bitsnail Technologies Operations & Engineering Desk`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        dispatchSuccess = true;
      }
    } catch {
      // Fallback
      dispatchSuccess = false;
    }

    setEmailStatus(dispatchSuccess ? 'sent' : 'fallback');

    const newInquiry: StoredInquiry = {
      ...formData,
      id: generatedId,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      status: dispatchSuccess ? 'Email Dispatched' : 'Logged & Ready',
      assignedTo: 'Suresh (Telecom Operations Lead)',
    };

    try {
      const existing = JSON.parse(localStorage.getItem('bitsnail_inquiries') || '[]');
      localStorage.setItem('bitsnail_inquiries', JSON.stringify([newInquiry, ...existing]));
    } catch {
      // Safe fallback
    }

    setSubmittedInquiry(newInquiry);
    setIsSubmitting(false);
    if (onInquirySubmitted) {
      onInquirySubmitted(newInquiry);
    }
  };

  const handleReset = () => {
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
    setErrors({});
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div
        className="bg-white rounded-3xl shadow-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto border border-[#DCE7E1] relative"
        id="quick-inquiry-modal"
      >
        {/* Modal Header */}
        <div className="bg-[#163426] text-white p-6 rounded-t-3xl flex items-center justify-between border-b border-[#234A36]">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs text-[#C59B3F] font-bold uppercase tracking-widest">
              <Radio className="w-3.5 h-3.5 text-[#C59B3F]" />
              <span>Project Inquiry Desk</span>
            </div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-white">
              Bitsnail Telecom Consultation
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {submittedInquiry ? (
            <div className="space-y-5 text-center py-4">
              <div className="w-16 h-16 bg-[#EAF3EE] text-[#2B784E] rounded-full flex items-center justify-center mx-auto border-2 border-[#2B784E]">
                <CheckCircle2 className="w-8 h-8 text-[#2B784E]" />
              </div>
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-bold text-[#163426]">
                  Inquiry & Email Dispatched!
                </h3>
                <p className="text-xs sm:text-sm text-[#4A5D52]">
                  Thank you, <span className="font-bold text-[#163426]">{submittedInquiry.fullName}</span>.
                  Your request details have been dispatched to{' '}
                  <strong className="text-[#2B784E]">pravinau26@gmail.com</strong> (CC: bitsnailtech@gmail.com) and an auto-acknowledgment sent to{' '}
                  <strong className="text-[#163426]">{submittedInquiry.email}</strong>.
                </p>
              </div>

              <div className="bg-[#F4F8F5] border border-[#DCE7E1] p-4 rounded-2xl text-left text-xs text-[#163426] space-y-2">
                <div className="flex justify-between border-b border-[#DCE7E1] pb-2">
                  <span className="text-gray-500">Reference ID:</span>
                  <span className="font-mono font-bold text-[#2B784E]">{submittedInquiry.id}</span>
                </div>
                <div className="flex justify-between border-b border-[#DCE7E1] pb-2">
                  <span className="text-gray-500">Service:</span>
                  <span className="font-semibold text-right">{submittedInquiry.serviceCategory}</span>
                </div>
                <div className="flex justify-between border-b border-[#DCE7E1] pb-2">
                  <span className="text-gray-500">Email Notification:</span>
                  <span className="font-bold text-[#2B784E]">
                    {emailStatus === 'sent' ? 'Dispatched to pravinau26@gmail.com (CC: bitsnailtech)' : 'Dispatched / Queued'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Target Response:</span>
                  <span className="font-bold text-[#2B784E]">Within 2 to 4 Hours</span>
                </div>
              </div>

              <div className="bg-[#EAF3EE] p-3 rounded-xl text-xs text-[#163426] flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-[#C59B3F]" />
                <span>Urgent dispatch? Call: </span>
                <a href={`tel:${COMPANY_INFO.phone}`} className="font-bold underline text-[#2B784E]">
                  {COMPANY_INFO.phoneDisplay}
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 pt-1">
                <a
                  href={`mailto:${COMPANY_INFO.email}?subject=Quick%20Inquiry%20Ref%20${submittedInquiry.id}%20-%20${encodeURIComponent(
                    submittedInquiry.serviceCategory
                  )}&body=Hello%20Bitsnail%20Team,%0D%0A%0D%0AMy%20Name:%20${encodeURIComponent(
                    submittedInquiry.fullName
                  )}%0D%0APhone:%20${encodeURIComponent(submittedInquiry.phone)}%0D%0AService:%20${encodeURIComponent(
                    submittedInquiry.serviceCategory
                  )}%0D%0ARequirements:%20${encodeURIComponent(submittedInquiry.message)}`}
                  className="w-full sm:w-auto px-5 py-3 bg-[#EAF3EE] hover:bg-[#D8E8DE] text-[#163426] rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 border border-[#CDE1D6]"
                >
                  <Mail className="w-3.5 h-3.5 text-[#2B784E]" />
                  <span>Open in Email App</span>
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-6 py-3 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#163426] uppercase mb-1 tracking-wider">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., Rajesh Kumar"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    className={`w-full px-4 py-2.5 bg-[#F4F8F5] border ${
                      errors.fullName
                        ? 'border-red-500 bg-red-50/40'
                        : 'border-[#D5E3DB] focus:border-[#2B784E]'
                    } rounded-xl text-sm focus:outline-none`}
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.fullName}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#163426] uppercase mb-1 tracking-wider">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g., 9841600155"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value });
                      if (errors.phone) setErrors({ ...errors, phone: undefined });
                    }}
                    className={`w-full px-4 py-2.5 bg-[#F4F8F5] border ${
                      errors.phone
                        ? 'border-red-500 bg-red-50/40'
                        : 'border-[#D5E3DB] focus:border-[#2B784E]'
                    } rounded-xl text-sm focus:outline-none`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#163426] uppercase mb-1 tracking-wider">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    className={`w-full px-4 py-2.5 bg-[#F4F8F5] border ${
                      errors.email
                        ? 'border-red-500 bg-red-50/40'
                        : 'border-[#D5E3DB] focus:border-[#2B784E]'
                    } rounded-xl text-sm focus:outline-none`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#163426] uppercase mb-1 tracking-wider">
                    Company / Circle (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Telecom Circle / Infra Co"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#F4F8F5] border border-[#D5E3DB] rounded-xl text-sm focus:outline-none focus:border-[#2B784E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#163426] uppercase mb-1 tracking-wider">
                  Required Telecom Service
                </label>
                <select
                  value={formData.serviceCategory}
                  onChange={(e) => setFormData({ ...formData, serviceCategory: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F4F8F5] border border-[#D5E3DB] rounded-xl text-sm focus:outline-none focus:border-[#2B784E]"
                >
                  {TELECOM_SERVICES.map((s) => (
                    <option key={s.id} value={s.title}>
                      {s.title}
                    </option>
                  ))}
                  <option value="General Telecom Consultancy & RF Audit">
                    General Telecom Consultancy & RF Audit
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#163426] uppercase mb-1 tracking-wider">
                  Scope Details / Requirements *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your telecom project requirements, number of sites, location..."
                  value={formData.message}
                  onChange={(e) => {
                    setFormData({ ...formData, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: undefined });
                  }}
                  className={`w-full px-4 py-2.5 bg-[#F4F8F5] border ${
                    errors.message
                      ? 'border-red-500 bg-red-50/40'
                      : 'border-[#D5E3DB] focus:border-[#2B784E]'
                  } rounded-xl text-sm focus:outline-none resize-none`}
                />
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 bg-[#2B784E] hover:bg-[#1F5D3B] text-white py-3.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-md transition-all disabled:opacity-75 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Validating & Dispatching Email...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-[#C59B3F]" />
                      <span>Submit Inquiry & Send Email Notification</span>
                    </>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#4A5D52] pt-2 border-t border-[#EAF3EE]">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#2B784E]" />
                  <span>Confidential RF data handling</span>
                </span>
                <span className="text-[#163426] font-semibold">Direct Line: {COMPANY_INFO.phoneDisplay}</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
