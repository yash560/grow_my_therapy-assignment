'use client';

import React, { useState } from 'react';
import { X, UserPlus, CheckCircle2, ShieldCheck } from 'lucide-react';
import { mockTherapists } from '../data/mockData';
import { InsuranceProvider, RiskLevel } from '../types/therapy';

interface NewPatientModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPatientCreated: (name: string) => void;
}

export const NewPatientModal: React.FC<NewPatientModalProps> = ({
  isOpen,
  onClose,
  onPatientCreated
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('29');
  const [diagnosisCode, setDiagnosisCode] = useState('F41.1 (Generalized Anxiety Disorder)');
  const [therapistId, setTherapistId] = useState(mockTherapists[0].id);
  const [insurance, setInsurance] = useState<InsuranceProvider>('Blue Cross Blue Shield');
  const [riskLevel, setRiskLevel] = useState<RiskLevel>('Low');
  const [emergencyContact, setEmergencyContact] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => {
      onPatientCreated(name);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[95vh] overflow-y-auto">
        
        <button
          id="close-new-patient-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                EHR Patient Intake
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Register New Clinical Patient
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Creates a HIPAA-compliant medical record with initial psychiatric diagnosis codes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  id="new-patient-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Jordan Blake"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Age
                </label>
                <input
                  id="new-patient-age"
                  type="number"
                  required
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <input
                  id="new-patient-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jordan@example.com"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Phone
                </label>
                <input
                  id="new-patient-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 019-2831"
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Assigned Clinician
              </label>
              <select
                id="new-patient-clinician"
                value={therapistId}
                onChange={(e) => setTherapistId(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
              >
                {mockTherapists.map((t) => (
                  <option key={t.id} value={t.id}>{t.name} ({t.title})</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Primary ICD-10 Diagnostic Impression
              </label>
              <select
                id="new-patient-diagnosis"
                value={diagnosisCode}
                onChange={(e) => setDiagnosisCode(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
              >
                <option value="F41.1 (Generalized Anxiety Disorder)">F41.1 — Generalized Anxiety Disorder</option>
                <option value="F43.12 (PTSD, Chronic)">F43.12 — Post-Traumatic Stress Disorder (Chronic)</option>
                <option value="F33.1 (Major Depressive Disorder, Recurrent)">F33.1 — Major Depressive Disorder (Recurrent Moderate)</option>
                <option value="Z63.0 (Relationship Distress w/ Partner)">Z63.0 — Relationship Distress w/ Partner</option>
                <option value="F90.0 (ADHD, Inattentive Type)">F90.0 — Attention-Deficit/Hyperactivity Disorder</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Insurance / Payment
                </label>
                <select
                  id="new-patient-insurance"
                  value={insurance}
                  onChange={(e) => setInsurance(e.target.value as any)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Blue Cross Blue Shield">Blue Cross Blue Shield</option>
                  <option value="Aetna">Aetna</option>
                  <option value="Cigna Healthcare">Cigna Healthcare</option>
                  <option value="UnitedHealthcare / Optum">UnitedHealthcare / Optum</option>
                  <option value="Out-of-Pocket / Sliding Scale">Out-of-Pocket / Sliding Scale</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Risk Level
                </label>
                <select
                  id="new-patient-risk"
                  value={riskLevel}
                  onChange={(e) => setRiskLevel(e.target.value as any)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
                >
                  <option value="Low">Low Risk</option>
                  <option value="Moderate">Moderate Risk</option>
                  <option value="High (Safety Plan Active)">High (Safety Plan Required)</option>
                </select>
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Emergency Contact (Name & Phone)
              </label>
              <input
                id="new-patient-emergency"
                type="text"
                required
                value={emergencyContact}
                onChange={(e) => setEmergencyContact(e.target.value)}
                placeholder="e.g. Taylor Blake (Spouse) - (555) 918-2940"
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <button
              id="submit-new-patient-btn"
              type="submit"
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] mt-2"
            >
              Register & Initialize EHR Chart
            </button>
          </form>
        ) : (
          <div className="text-center py-8 space-y-3 animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Patient Intake Chart Created!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {name} has been enrolled in Grow My Therapy clinical directory.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
