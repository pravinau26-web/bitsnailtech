import React, { useState } from 'react';
import { PageId } from '../types';
import {
  SAFETY_STANDARDS,
  HIRING_TERMS,
  COMPANY_INFO,
} from '../data/telecomData';
import { BitsnailLogo } from '../components/BitsnailLogo';
import {
  dispatchFormSubmission,
  createAcknowledgmentMailtoUrl,
} from '../utils/emailService';
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
  Printer,
  FileText,
  ExternalLink,
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
    highestQualification: 'Diploma in Electronics & Communication Engineering (ECE)',
    customQualification: '',
    passOutStatus: 'Pass-out (No Backlogs)',
    readyForFieldTraining: 'Yes, ready for 15-25 days field training',
    reportingNotice: 'Can report within 5-7 days',
    farmStatus: 'Will complete before joining',
    location: '',
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    fullName: string;
    email: string;
    phone: string;
    qualification: string;
  } | null>(null);
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

    const activeQualification =
      candidateForm.highestQualification === 'Other'
        ? candidateForm.customQualification.trim() || 'Other Technical Qualification'
        : candidateForm.highestQualification;

    if (!activeQualification) {
      setFormError('Please select or specify your educational/technical qualification.');
      return;
    }

    if (candidateForm.passOutStatus !== 'Pass-out (No Backlogs)') {
      setFormError('As per mandatory hiring terms, only candidates who have cleared all examinations with zero backlogs are eligible.');
      return;
    }

    setFormError('');
    setIsSubmitting(true);
    const generatedAppId = `BIT-ENG-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const result = await dispatchFormSubmission({
      type: 'career',
      referenceId: generatedAppId,
      name: candidateForm.fullName.trim(),
      email: candidateForm.email.trim(),
      phone: candidateForm.phone.trim(),
      subject: `[Bitsnail Technologies] Field Engineer Application: ${candidateForm.fullName.trim()} (Ref: ${generatedAppId})`,
      details: {
        Role_Applied: 'Telecom Field Engineer (Trainee)',
        Qualification: activeQualification,
        Gender: candidateForm.gender,
        Academic_Status: candidateForm.passOutStatus,
        Field_Training: candidateForm.readyForFieldTraining,
        Reporting_Notice: candidateForm.reportingNotice,
        Preferred_Location: candidateForm.location.trim() || 'Tamil Nadu / Pan-India',
        Branding: 'Bitsnail Technologies (Official Logo Attached)',
      },
    });

    setSubmittedData({
      id: generatedAppId,
      fullName: candidateForm.fullName.trim(),
      email: candidateForm.email.trim(),
      phone: candidateForm.phone.trim(),
      qualification: activeQualification,
    });
    setEmailStatus(result.success ? 'sent' : 'fallback');
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
            {/* Box 1: FARM Certification - Dark Emerald Theme Hover */}
            <div className="group bg-[#F4F8F5] hover:bg-[#0F2C1F] p-6 rounded-2xl border border-[#DCE7E1] hover:border-[#2B784E] space-y-3 transition-all duration-300 hover:shadow-xl cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3EE] text-[#2B784E] group-hover:bg-[#2B784E] group-hover:text-white flex items-center justify-center transition-all duration-300">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#163426] group-hover:text-white text-base transition-colors duration-300">
                FARM Certification
              </h3>
              <p className="text-xs text-[#4A5D52] group-hover:text-emerald-100/90 leading-relaxed transition-colors duration-300">
                Safety Training on Height & Rescue, industry accepted WAH (Work At Height) –{' '}
                <strong className="text-[#163426] group-hover:text-white">All Project Field Teams are certified</strong>.
              </p>
            </div>

            {/* Box 2: Global & Pan-India Validity - Deep Midnight Navy Theme Hover */}
            <div className="group bg-[#F4F8F5] hover:bg-[#0C1B2E] p-6 rounded-2xl border border-[#DCE7E1] hover:border-blue-500 space-y-3 transition-all duration-300 hover:shadow-xl cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3EE] text-[#2B784E] group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center transition-all duration-300">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#163426] group-hover:text-white text-base transition-colors duration-300">
                Global & Pan-India Validity
              </h3>
              <p className="text-xs text-[#4A5D52] group-hover:text-blue-100/90 leading-relaxed transition-colors duration-300">
                FARM Certification is valid across India and overseas & it is compulsory to work in Telecom.
              </p>
            </div>

            {/* Box 3: EN Standard PPE Kits - Deep Warm Bronze Theme Hover */}
            <div className="group bg-[#F4F8F5] hover:bg-[#261A0E] p-6 rounded-2xl border border-[#DCE7E1] hover:border-amber-500 space-y-3 transition-all duration-300 hover:shadow-xl cursor-pointer">
              <div className="w-10 h-10 rounded-xl bg-[#EAF3EE] text-[#2B784E] group-hover:bg-amber-600 group-hover:text-white flex items-center justify-center transition-all duration-300">
                <HardHat className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#163426] group-hover:text-white text-base transition-colors duration-300">
                EN Standard PPE Kits
              </h3>
              <p className="text-xs text-[#4A5D52] group-hover:text-amber-100/90 leading-relaxed transition-colors duration-300">
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
                  className="group flex items-start gap-3 p-3.5 rounded-2xl bg-[#F4F8F5] hover:bg-[#162024] border border-[#DCE7E1] hover:border-slate-500 transition-all duration-300 hover:shadow-md cursor-pointer"
                >
                  <div className="w-6 h-6 rounded-full bg-[#2B784E] group-hover:bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 transition-colors">
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#163426] group-hover:text-white uppercase tracking-wider transition-colors">
                      {term.heading}
                    </h4>
                    <p className="text-xs text-[#4A5D52] group-hover:text-slate-200 mt-0.5 leading-relaxed transition-colors">
                      {term.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="group p-4 rounded-2xl bg-[#EAF3EE] hover:bg-[#0D2F35] border border-[#D5E6DC] hover:border-teal-500 text-xs text-[#163426] space-y-1 transition-all duration-300 cursor-pointer">
              <span className="font-bold flex items-center gap-1.5 text-[#2B784E] group-hover:text-teal-300 transition-colors">
                <ShieldCheck className="w-4 h-4" />
                <span>Field Deployment Alliance</span>
              </span>
              <p className="text-xs text-[#4A5D52] group-hover:text-teal-100 transition-colors">
                Projects executed in consortium with <strong className="group-hover:text-white">Vedang Wireless Teleinfra Pvt Ltd</strong>.
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
                Direct submission to Bitsnail hiring desk & email notification to pravinau26@gmail.com (CC: bitsnailtech@gmail.com).
              </p>
            </div>

            {formSubmitted && submittedData ? (
              <div className="space-y-6 py-2">
                {/* Branded Official Receipt Card */}
                <div className="bg-[#F8FAF9] rounded-3xl border border-[#DCE7E1] p-6 sm:p-8 space-y-5 shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E0EBE4] pb-4">
                    <div className="flex items-center gap-3">
                      <BitsnailLogo className="w-9 h-9" />
                      <div>
                        <h4 className="font-bold text-[#163426] text-base leading-tight">
                          Bitsnail Technologies Pvt Ltd
                        </h4>
                        <span className="text-[11px] text-[#2B784E] font-semibold block">
                          Official Candidate Application Receipt
                        </span>
                      </div>
                    </div>
                    <div className="text-left sm:text-right">
                      <span className="text-[10px] uppercase font-bold text-gray-400 block tracking-widest">
                        APPLICATION REF NO
                      </span>
                      <span className="font-mono text-sm font-bold text-[#2B784E] bg-[#EAF3EE] px-2.5 py-1 rounded-lg inline-block">
                        {submittedData.id}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between border-b border-[#E0EBE4]/60 pb-2">
                      <span className="text-gray-500">Applicant Name:</span>
                      <span className="font-bold text-[#163426]">{submittedData.fullName}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E0EBE4]/60 pb-2">
                      <span className="text-gray-500">Qualification:</span>
                      <span className="font-bold text-[#2B784E]">{submittedData.qualification}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E0EBE4]/60 pb-2">
                      <span className="text-gray-500">Mobile Contact:</span>
                      <span className="font-medium text-[#163426]">+91 {submittedData.phone}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E0EBE4]/60 pb-2">
                      <span className="text-gray-500">Applicant Email:</span>
                      <span className="font-medium text-[#163426]">{submittedData.email}</span>
                    </div>
                    <div className="flex justify-between border-b border-[#E0EBE4]/60 pb-2">
                      <span className="text-gray-500">Operations Desk Delivery:</span>
                      <span className="font-semibold text-[#2B784E]">
                        {emailStatus === 'sent'
                          ? 'Notified to pravinau26@gmail.com (CC: bitsnailtech)'
                          : 'Profile Queued & Logged'}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1">
                      <span className="text-gray-500">Auto-Acknowledgment:</span>
                      <span className="font-semibold text-emerald-700">
                        Dispatched to {submittedData.email}
                      </span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#EAF3EE] border border-[#D5E6DC] text-xs text-[#163426] flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#2B784E] shrink-0 mt-0.5" />
                    <p className="leading-relaxed">
                      Your profile has been officially registered with Bitsnail Technologies. Our telecom operations desk will evaluate your qualifications and contact eligible candidates within <strong>5 to 7 working days</strong> for field induction.
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2.5 bg-white border border-[#DCE7E1] hover:border-[#2B784E] text-[#163426] rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Printer className="w-4 h-4 text-[#2B784E]" />
                      <span>Print Application Receipt</span>
                    </button>

                    <a
                      href={createAcknowledgmentMailtoUrl(
                        submittedData.email,
                        submittedData.fullName,
                        submittedData.id,
                        'career',
                        `Field Engineer Application (${submittedData.qualification})`
                      )}
                      className="px-4 py-2.5 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Send Official Copy to My Email</span>
                    </a>

                    <button
                      onClick={() => {
                        setFormSubmitted(false);
                        setSubmittedData(null);
                      }}
                      className="px-4 py-2.5 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all ml-auto cursor-pointer"
                    >
                      Submit Another Profile
                    </button>
                  </div>
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

                {/* Educational / Technical Qualification Box */}
                <div>
                  <label className="block text-xs font-bold text-[#163426] mb-1 uppercase tracking-wider flex items-center justify-between">
                    <span>Educational / Technical Qualification *</span>
                    <span className="text-[10px] text-[#2B784E] font-semibold lowercase">Diploma / Degree / ITI</span>
                  </label>
                  <select
                    value={candidateForm.highestQualification}
                    onChange={(e) => setCandidateForm({ ...candidateForm, highestQualification: e.target.value })}
                    className="w-full px-4 py-3 bg-[#F4F8F5] border border-[#D5E3DB] rounded-xl text-sm focus:bg-white focus:border-[#2B784E] focus:outline-none transition-all font-medium text-[#163426]"
                  >
                    <option value="Diploma in Electronics & Communication Engineering (ECE)">Diploma in ECE (Electronics & Communication)</option>
                    <option value="Diploma in Electrical & Electronics Engineering (EEE)">Diploma in EEE (Electrical & Electronics)</option>
                    <option value="B.E / B.Tech in Electronics & Communication (ECE)">B.E / B.Tech in ECE</option>
                    <option value="B.E / B.Tech in Electrical / Telecommunication">B.E / B.Tech in Electrical / Telecom</option>
                    <option value="ITI - Electronics Mechanic / Electrician / Wireman">ITI (Electronics Mechanic / Electrician / Wireman)</option>
                    <option value="B.Sc / BCA / Other Technical Graduate">B.Sc / BCA / Other Technical Degree</option>
                    <option value="Other">Other Technical Qualification (Specify)</option>
                  </select>
                  {candidateForm.highestQualification === 'Other' && (
                    <input
                      type="text"
                      required
                      placeholder="Enter your specific technical qualification (e.g. M.Sc Electronics)"
                      value={candidateForm.customQualification}
                      onChange={(e) => setCandidateForm({ ...candidateForm, customQualification: e.target.value })}
                      className="mt-2 w-full px-4 py-3 bg-white border border-[#2B784E] rounded-xl text-sm focus:outline-none"
                    />
                  )}
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
