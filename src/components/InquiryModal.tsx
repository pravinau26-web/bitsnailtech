import React, { useState, useEffect } from 'react';
import { InquiryFormData, FormErrors, StoredInquiry } from '../types';
import { TELECOM_SERVICES, COMPANY_INFO } from '../data/telecomData';
import {
  dispatchFormSubmission,
  createAcknowledgmentMailtoUrl,
} from '../utils/emailService';
import { BitsnailLogo } from './BitsnailLogo';
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

    const result = await dispatchFormSubmission({
      type: 'inquiry',
      referenceId: generatedId,
      name: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: `[Bitsnail Technologies] Quick Inquiry: ${formData.fullName.trim()} (${formData.serviceCategory}) [Ref: ${generatedId}]`,
      message: formData.message.trim(),
      details: {
        Client_Company: formData.companyName.trim() || 'Direct Inquiry',
        Service_Category: formData.serviceCategory,
        Project_Timeline: formData.projectTimeline,
        Branding: 'Bitsnail Technologies (Official Logo Attached)',
      },
    });

    setEmailStatus(result.success ? 'sent' : 'fallback');

    const newInquiry: StoredInquiry = {
      ...formData,
      id: generatedId,
      timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      status: result.success ? 'Email Dispatched' : 'Logged & Ready',
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
            <div className="space-y-4 text-center py-2">
              <div className="flex justify-center mb-1">
                <BitsnailLogo height={48} />
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EAF3EE] text-[#2B784E] text-xs font-bold uppercase tracking-wider">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#2B784E]" />
                  <span>Inquiry Registered</span>
                </div>
                <h3 className="font-serif text-xl font-bold text-[#163426]">
                  Bitsnail Inquiry Acknowledgment
                </h3>
                <p className="text-xs text-[#4A5D52]">
                  Thank you, <span className="font-bold text-[#163426]">{submittedInquiry.fullName}</span>.
                  Your request details have been dispatched with official Bitsnail branding.
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
                  <span className="text-gray-500">Official Brand / Logo:</span>
                  <span className="font-bold text-[#2B784E]">Attached (Bitsnail Technologies)</span>
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
                  href={createAcknowledgmentMailtoUrl(
                    submittedInquiry.email,
                    submittedInquiry.fullName,
                    submittedInquiry.id,
                    'inquiry',
                    `${submittedInquiry.serviceCategory} (${submittedInquiry.companyName || 'Direct Inquiry'})`
                  )}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-full font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Copy to My Email</span>
                </a>

                <button
                  onClick={handleReset}
                  className="w-full sm:w-auto px-5 py-2.5 bg-white hover:bg-[#F4F8F5] text-[#163426] border border-[#DCE7E1] rounded-full font-bold text-xs uppercase tracking-wider transition-all cursor-pointer"
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
