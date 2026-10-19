'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { PracticeDashboard } from '../components/PracticeDashboard';
import { CareMatchmaker } from '../components/CareMatchmaker';
import { PatientDirectory } from '../components/PatientDirectory';
import { ClinicalSoapNotes } from '../components/ClinicalSoapNotes';
import { BillingAndClaims } from '../components/BillingAndClaims';
import { TherapistShowcase } from '../components/TherapistShowcase';
import { BookingModal } from '../components/BookingModal';
import { NewPatientModal } from '../components/NewPatientModal';
import { SuperbillModal } from '../components/SuperbillModal';
import { Therapist } from '../types/therapy';
import { CheckCircle2, ShieldCheck, Heart, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isDark, setIsDark] = useState<boolean>(false);
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [preselectedTherapist, setPreselectedTherapist] = useState<Therapist | null>(null);
  const [isNewPatientOpen, setIsNewPatientOpen] = useState<boolean>(false);
  const [isSuperbillOpen, setIsSuperbillOpen] = useState<boolean>(false);
  const [globalToast, setGlobalToast] = useState<string | null>(null);

  // Initialize and persist dark mode
  useEffect(() => {
    const saved = localStorage.getItem('gmt_theme');
    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('gmt_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('gmt_theme', 'light');
      }
      return next;
    });
  };

  const showToast = (msg: string) => {
    setGlobalToast(msg);
    setTimeout(() => setGlobalToast(null), 4000);
  };

  const handleOpenBooking = (therapist?: Therapist | null) => {
    setPreselectedTherapist(therapist || null);
    setIsBookingOpen(true);
  };

  const handleBookingSuccess = (details: { therapist: string; date: string; time: string; format: string }) => {
    showToast(`Appointment confirmed with ${details.therapist} for ${details.date} at ${details.time}!`);
  };

  const handlePatientCreated = (name: string) => {
    showToast(`Patient ${name} registered successfully into EHR directory!`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#090d16] text-slate-900 dark:text-slate-100 transition-colors duration-200">
      
      {/* Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenBooking={() => handleOpenBooking(null)}
      />

      {/* Global Notification Toast */}
      {globalToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-teal-600 text-white shadow-xl shadow-teal-600/30 flex items-center gap-3 animate-fade-in text-xs sm:text-sm font-semibold max-w-md">
          <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
          <span>{globalToast}</span>
        </div>
      )}

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {activeTab === 'dashboard' && (
          <PracticeDashboard
            onOpenBooking={() => handleOpenBooking(null)}
            onOpenNewPatient={() => setIsNewPatientOpen(true)}
            onOpenSoapNote={() => setActiveTab('soap')}
            onOpenSuperbill={() => setIsSuperbillOpen(true)}
            onNavigateTab={(tab) => setActiveTab(tab)}
          />
        )}

        {activeTab === 'matchmaker' && (
          <CareMatchmaker
            onSelectTherapistForBooking={(therapist) => handleOpenBooking(therapist)}
          />
        )}

        {activeTab === 'patients' && (
          <PatientDirectory
            onOpenNewPatient={() => setIsNewPatientOpen(true)}
            onOpenSoapNote={() => setActiveTab('soap')}
          />
        )}

        {activeTab === 'soap' && (
          <ClinicalSoapNotes />
        )}

        {activeTab === 'billing' && (
          <BillingAndClaims
            onOpenSuperbillModal={() => setIsSuperbillOpen(true)}
          />
        )}

        {activeTab === 'showcase' && (
          <TherapistShowcase
            onOpenBooking={() => handleOpenBooking(null)}
          />
        )}

      </main>

      {/* Modals */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedTherapist={preselectedTherapist}
        onBookingSuccess={handleBookingSuccess}
      />

      <NewPatientModal
        isOpen={isNewPatientOpen}
        onClose={() => setIsNewPatientOpen(false)}
        onPatientCreated={handlePatientCreated}
      />

      <SuperbillModal
        isOpen={isSuperbillOpen}
        onClose={() => setIsSuperbillOpen(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 backdrop-blur-sm mt-12 py-8 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 dark:text-white">Grow My Therapy</span>
            <span>•</span>
            <span>Clinical EHR, Telehealth & Practice Scaling Architecture</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
              HIPAA Compliant (45 CFR § 164)
            </span>
            <span>•</span>
            <span>Engineered by <strong>Yash Jain</strong></span>
          </div>
        </div>
      </footer>

    </div>
  );
}
