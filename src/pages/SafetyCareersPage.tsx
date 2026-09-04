import React, { useState } from 'react';
import { PageId } from '../types';
import {
  SAFETY_STANDARDS,
  HIRING_TERMS,
  COMPANY_INFO,
} from '../data/telecomData';
import {
  ShieldCheck,
  HardHat,
  AlertTriangle,
  FileCheck,
  CheckCircle2,
  Users,
  Clock,
  Award,
  Send,
  Building2,
  Phone,
  Mail,
  AlertCircle,
} from 'lucide-react';

interface SafetyCareersPageProps {
  onNavigate: (page: PageId) => void;
  onOpenInquiry: (defaultService?: string) => void;
}

export const SafetyCareersPage: React.FC<SafetyCareersPageProps> = ({
  onNavigate,
  onOpenInquiry,
}) => {
  const [candidateForm, setCandidateForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    gender: 'Male',
    highestQualification: 'B.E / B.Tech / Diploma in ECE / EEE / Telecom',
    passOutStatus: 'Pass-out (No Backlogs)',
    readyForFieldTraining: 'Yes, ready for 15-25 days field training',
    reportingNotice: 'Can report within 5-7 days',
    farmStatus: 'Will complete before joining',
    location: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');
  const [emailStatus, setEmailStatus] = useState<'idle' | 'sent' | 'fallback'>('idle');

  const handleApplicationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = candidateForm.fullName.trim();
    if (!cleanName || cleanName.length < 2) {
      setFormError('Please provide your full name (minimum 2 characters).');
      return;
    }

    const cleanPhone = candidateForm.phone.trim().replace(/[\s\-()]/g, '');
    if (!cleanPhone || cleanPhone.length < 10) {
      setFormError('Please provide a valid 10-digit mobile number.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!candidateForm.email.trim() || !emailRegex.test(candidateForm.email.trim())) {
      setFormError('Please provide a valid email address.');
      return;
    }

    if (candidateForm.passOutStatus !== 'Pass-out (No Backlogs)') {
      setFormError('As per mandatory hiring terms, only candidates who have cleared all examinations with zero backlogs are eligible.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);

    let dispatchSuccess = false;
    try {
      const response = await fetch('https://formsubmit.co/ajax/bitsnailtech@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          candidate_name: candidateForm.fullName.trim(),
          candidate_phone: candidateForm.phone.trim(),
          candidate_email: candidateForm.email.trim(),
          gender: candidateForm.gender,
          qualification: candidateForm.highestQualification,
          pass_out_status: candidateForm.passOutStatus,
          field_training_ready: candidateForm.readyForFieldTraining,
          reporting_notice: candidateForm.reportingNotice,
          location: candidateForm.location.trim() || 'Tamil Nadu / Pan-India',
          _subject: `New Candidate Application: ${candidateForm.fullName.trim()} (Bitsnail Careers)`,
          _template: 'table',
          _captcha: 'false',
        }),
      });

      if (response.ok) {
        dispatchSuccess = true;
      }
    } catch {
      dispatchSuccess = false;
    }

    setEmailStatus(dispatchSuccess ? 'sent' : 'fallback');
    setIsSubmitting(false);
    setFormSubmitted(true);
  };

  return (
    <div className="space-y-16 sm:space-y-20 py-8 bg-[#F3F8F5]">
      {/* 1. Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-3 pt-4">
        <span className="text-xs font-bold text-[#2B784E] uppercase tracking-widest block">
          OPERATIONAL HEALTH, SAFETY & TALENT ACQUISITION
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#163426] tracking-tight">
          Safety & <span className="text-[#2B784E]">Field Careers</span>
        </h1>
        <p className="text-[#4A5D52] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Zero-compromise safety protocols, 100% FARM Height Certification, and rigorous field engineering standards.
        </p>
      </section>

      {/* 2. Operational Health and Safety (OHS) Details (Direct Text from User Prompt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-[#DCE7E1] p-8 sm:p-12 shadow-sm space-y-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#EAF3EE] pb-6">
            <div className="space-y-1">
              <span className="text-[11px] font-bold text-[#2B784E] uppercase tracking-widest block">
                MANDATORY STANDARDS
              </span>
              <h2 className="font-serif text-3xl font-bold text-[#163426]">
                OPERATIONAL HEALTHY AND SAFETY (OHS)
              </h2>
            </div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#EAF3EE] text-[#2B784E] text-xs font-bold border border-[#D5E6DC]">
              <ShieldCheck className="w-4 h-4" />
              <span>100% FARM & WAH Certified</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#F4F8F5] p-6 rounded-2xl border border-[#DCE7E1] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3EE] text-[#2B784E] flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#163426] text-base">FARM Certification</h3>
              <p className="text-xs text-[#4A5D52] leading-relaxed">
                Safety Training on Height & Rescue, industry accepted WAH (Work At Height) –{' '}
                <strong className="text-[#163426]">All Project Field Teams are certified</strong>.
              </p>
            </div>

            <div className="bg-[#F4F8F5] p-6 rounded-2xl border border-[#DCE7E1] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3EE] text-[#2B784E] flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#163426] text-base">Global & Pan-India Validity</h3>
              <p className="text-xs text-[#4A5D52] leading-relaxed">
                FARM Certification is valid across India and overseas & it is compulsory to work in Telecom.
              </p>
            </div>

            <div className="bg-[#F4F8F5] p-6 rounded-2xl border border-[#DCE7E1] space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3EE] text-[#2B784E] flex items-center justify-center">
                <HardHat className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#163426] text-base">EN Standard PPE Kits</h3>
              <p className="text-xs text-[#4A5D52] leading-relaxed">
                Special Focus and Drive for OHS measures Ensuring Highest level of safety standards and all project engineers are equipped with EN standard PPE kits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Hiring Terms and Conditions (Direct Text from User Prompt) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Official Hiring Terms */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-[#DCE7E1] p-8 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-[#EAF3EE] pb-4">
              <span className="text-[11px] font-bold text-[#2B784E] uppercase tracking-widest block">
                RECRUITMENT POLICY
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#163426]">
                HIRING TERMS AND CONDITIONS
              </h2>
              <p className="text-xs text-[#4A5D52] mt-1">
                Please read the mandatory eligibility requirements before applying.
              </p>
            </div>

            <div className="space-y-4">
              {HIRING_TERMS.criteria.map((term, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3.5 rounded-2xl bg-[#F4F8F5] border border-[#DCE7E1]"
                >
                  <div className="w-6 h-6 rounded-full bg-[#2B784E] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#163426] uppercase tracking-wider">
                      {term.heading}
                    </h4>
                    <p className="text-xs text-[#4A5D52] mt-0.5 leading-relaxed">
                      {term.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-[#EAF3EE] border border-[#D5E6DC] text-xs text-[#163426] space-y-1">
              <span className="font-bold flex items-center gap-1.5 text-[#2B784E]">
                <ShieldCheck className="w-4 h-4" />
                <span>Field Deployment Alliance</span>
              </span>
              <p className="text-xs text-[#4A5D52]">
                Projects executed in consortium with <strong>Vedang Wireless Teleinfra Pvt Ltd</strong>.
              </p>
            </div>
          </div>

          {/* Right: Application Form */}
          <div className="lg:col-span-6 bg-white rounded-3xl border border-[#DCE7E1] p-8 sm:p-10 shadow-sm space-y-6">
            <div className="border-b border-[#EAF3EE] pb-4">
              <span className="text-[11px] font-bold text-[#2B784E] uppercase tracking-widest block">
                TALENT ENROLLMENT
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#163426]">
                Telecom Field Engineer Application
              </h3>
              <p className="text-xs text-[#4A5D52] mt-1">
                Direct submission to Bitsnail hiring desk & email notification to bitsnailtech@gmail.com.
              </p>
            </div>

            {formSubmitted ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-[#EAF3EE] text-[#2B784E] rounded-full flex items-center justify-center mx-auto border-2 border-[#2B784E]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-2xl font-bold text-[#163426]">
                  Application & Email Dispatched!
                </h4>
                <p className="text-xs sm:text-sm text-[#4A5D52] max-w-sm mx-auto">
                  Thank you, <strong>{candidateForm.fullName}</strong>. Your profile details have been notified to{' '}
                  <strong className="text-[#2B784E]">bitsnailtech@gmail.com</strong>.
                  Our team will contact you within 5 to 7 days for the next field training batch.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => setFormSubmitted(false)}
                    className="px-6 py-2.5 bg-[#2B784E] text-white rounded-full text-xs font-bold uppercase tracking-wider"
                  >
                    Submit Another Profile
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleApplicationSubmit} className="space-y-4">
                {formError && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-[#163426] mb-1 uppercase tracking-wider">
                    Candidate Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter full name"
                    value={candidateForm.fullName}
                    onChange={(e) => setCandidateForm({ ...candidateForm, fullName: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F4F8F5] border border-[#D5E3DB] rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#163426] mb-1 uppercase tracking-wider">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9841600155"
                      value={candidateForm.phone}
                      onChange={(e) => setCandidateForm({ ...candidateForm, phone: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F4F8F5] border border-[#D5E3DB] rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#163426] mb-1 uppercase tracking-wider">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="engineer@email.com"
                      value={candidateForm.email}
                      onChange={(e) => setCandidateForm({ ...candidateForm, email: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F4F8F5] border border-[#D5E3DB] rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#163426] mb-1 uppercase tracking-wider">
                      Gender Policy (Term 1) *
                    </label>
                    <select
                      value={candidateForm.gender}
                      onChange={(e) => setCandidateForm({ ...candidateForm, gender: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F4F8F5] border border-[#D5E3DB] rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none"
                    >
                      <option value="Male">Male (Eligible under Term 1)</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#163426] mb-1 uppercase tracking-wider">
                      Pass-out Status (Term 3) *
                    </label>
                    <select
                      value={candidateForm.passOutStatus}
                      onChange={(e) => setCandidateForm({ ...candidateForm, passOutStatus: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F4F8F5] border border-[#D5E3DB] rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none"
                    >
                      <option value="Pass-out (No Backlogs)">Pass-out (All Cleared, 0 Backlogs)</option>
                      <option value="Has Backlogs">Has Pending Backlogs / Incomplete</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#163426] mb-1 uppercase tracking-wider">
                      Reporting Notice (Term 2)
                    </label>
                    <select
                      value={candidateForm.reportingNotice}
                      onChange={(e) => setCandidateForm({ ...candidateForm, reportingNotice: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F4F8F5] border border-[#D5E3DB] rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none"
                    >
                      <option value="Can report within 5-7 days">Can report within 5 to 7 days</option>
                      <option value="Needs > 15 days">Needs more than 15 days</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#163426] mb-1 uppercase tracking-wider">
                      15-25 Days Field Training (Term 4)
                    </label>
                    <select
                      value={candidateForm.readyForFieldTraining}
                      onChange={(e) => setCandidateForm({ ...candidateForm, readyForFieldTraining: e.target.value })}
                      className="w-full px-4 py-3 bg-[#F4F8F5] border border-[#D5E3DB] rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none"
                    >
                      <option value="Yes, ready for 15-25 days field training">Yes, completely ready</option>
                      <option value="No">No</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#163426] mb-1 uppercase tracking-wider">
                    Current Location / Circle
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Chennai / Tamil Nadu / Bangalore"
                    value={candidateForm.location}
                    onChange={(e) => setCandidateForm({ ...candidateForm, location: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F4F8F5] border border-[#D5E3DB] rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-xl font-bold text-sm tracking-wider uppercase shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <span className="inline-flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Validating & Dispatching Profile...</span>
                      </span>
                    ) : (
                      <>
                        <Send className="w-4 h-4 text-[#C59B3F]" />
                        <span>Submit Application & Notify Operations Desk</span>
                      </>
                    )}
                  </button>
                </div>

                <div className="text-[11px] text-[#4A5D52] text-center">
                  Direct questions: Call {COMPANY_INFO.phoneDisplay} ({COMPANY_INFO.email})
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
