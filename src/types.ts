export type PageId = 'home' | 'about' | 'services' | 'safety-careers' | 'contact';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  keyTools: string[];
  category: 'survey' | 'config' | 'implementation' | 'optimization' | 'maintenance' | 'audit';
}

export interface InquiryFormData {
  fullName: string;
  email: string;
  phone: string;
  companyName: string;
  serviceCategory: string;
  message: string;
  projectTimeline: 'immediate' | '1-2 weeks' | '1 month' | 'planning';
}

export interface StoredInquiry extends InquiryFormData {
  id: string;
  timestamp: string;
  status: 'Received' | 'In Review' | 'Assigned to Field Lead';
  assignedTo: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  message?: string;
  serviceCategory?: string;
}

export interface CareerApplicationData {
  applicantName: string;
  email: string;
  phone: string;
  qualification: string;
  hasBacklogs: 'no' | 'yes';
  willingToUndergoFarmTraining: 'yes' | 'no';
  experienceYears: string;
  notes: string;
}
