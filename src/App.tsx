import React, { useState, useEffect } from 'react';
import { PageId } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InquiryModal } from './components/InquiryModal';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { SafetyCareersPage } from './pages/SafetyCareersPage';
import { ContactPage } from './pages/ContactPage';
import { COMPANY_INFO } from './data/telecomData';
import { Phone, ArrowUp } from 'lucide-react';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [targetServiceId, setTargetServiceId] = useState<string | undefined>(undefined);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [modalDefaultService, setModalDefaultService] = useState<string | undefined>(undefined);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (page: PageId, serviceId?: string) => {
    setCurrentPage(page);
    if (serviceId) {
      setTargetServiceId(serviceId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiryModal = (defaultService?: string) => {
    setModalDefaultService(defaultService);
    setIsInquiryModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F8F5] text-[#163426] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Sticky Header with Asay InfoTech style pill navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenInquiry={handleOpenInquiryModal}
      />

      {/* Main Page Content */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiryModal}
          />
        )}
        {currentPage === 'about' && (
          <AboutPage
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiryModal}
          />
        )}
        {currentPage === 'services' && (
          <ServicesPage
            selectedServiceId={targetServiceId}
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiryModal}
          />
        )}
        {currentPage === 'safety-careers' && (
          <SafetyCareersPage
            onNavigate={handleNavigate}
            onOpenInquiry={handleOpenInquiryModal}
          />
        )}
        {currentPage === 'contact' && (
          <ContactPage
            onNavigate={handleNavigate}
            prefillService={modalDefaultService}
          />
        )}
      </main>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2.5">
        {/* Scroll to Top */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            id="scroll-to-top-btn"
            className="w-11 h-11 rounded-full bg-white text-[#163426] border border-[#DCE7E1] shadow-lg flex items-center justify-center hover:bg-[#EAF3EE] transition-all cursor-pointer"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-5 h-5 text-[#2B784E]" />
          </button>
        )}

        {/* Quick Phone Connect */}
        <a
          href={`tel:${COMPANY_INFO.phone}`}
          id="floating-phone-btn"
          className="px-5 py-3 bg-[#2B784E] hover:bg-[#1F5D3B] text-white rounded-full shadow-xl flex items-center gap-2.5 font-bold text-xs tracking-wider uppercase transition-all active:scale-95 border border-[#409265] cursor-pointer"
          title={`Call Suresh: ${COMPANY_INFO.phoneDisplay}`}
        >
          <Phone className="w-4 h-4 text-[#C59B3F]" />
          <span className="hidden sm:inline">Call Suresh: {COMPANY_INFO.phoneDisplay}</span>
          <span className="sm:hidden">Call {COMPANY_INFO.phoneDisplay}</span>
        </a>
      </div>

      {/* Quick Inquiry Modal */}
      <InquiryModal
        isOpen={isInquiryModalOpen}
        onClose={() => setIsInquiryModalOpen(false)}
        defaultService={modalDefaultService}
      />

      {/* Corporate Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenInquiry={handleOpenInquiryModal}
      />
    </div>
  );
}
