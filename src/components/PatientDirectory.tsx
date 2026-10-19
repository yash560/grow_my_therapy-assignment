'use client';

import React, { useState } from 'react';
import { 
  Users, Search, Filter, ShieldAlert, Phone, Mail, Calendar, 
  CheckCircle2, AlertTriangle, FileText, PlusCircle, X
} from 'lucide-react';
import { mockPatients } from '../data/mockData';
import { Patient } from '../types/therapy';

interface PatientDirectoryProps {
  onOpenNewPatient: () => void;
  onOpenSoapNote: (sessionId?: string) => void;
}

export const PatientDirectory: React.FC<PatientDirectoryProps> = ({
  onOpenNewPatient,
  onOpenSoapNote
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active' | 'Onboarding' | 'High Risk'>('All');
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = mockPatients.filter(p => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.diagnosisName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.diagnosisCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.primaryTherapistName.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (!matchesSearch) return false;
    if (statusFilter === 'All') return true;
    if (statusFilter === 'Active') return p.status === 'Active';
    if (statusFilter === 'Onboarding') return p.status === 'Onboarding';
    if (statusFilter === 'High Risk') return p.riskLevel.includes('High');
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Patient Clinical Directory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            HIPAA-secured roster of active client charts, diagnosis classifications, and risk tracking.
          </p>
        </div>

        <button
          id="dir-add-patient-btn"
          onClick={onOpenNewPatient}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 transition-all self-start sm:self-auto"
        >
          <PlusCircle className="w-4 h-4" />
          <span>New Patient Intake</span>
        </button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        
        {/* Search Bar */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            id="patient-search-input"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search patients by name, ICD-10 diagnosis code, or clinician..."
            className="w-full pl-10 pr-4 py-2 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Active', 'Onboarding', 'High Risk'] as const).map((status) => (
            <button
              key={status}
              id={`patient-filter-${status.toLowerCase().replace(/\s+/g, '-')}`}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                statusFilter === status
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Patient Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPatients.map((patient) => {
          const isHighRisk = patient.riskLevel.includes('High');
          return (
            <div
              key={patient.id}
              className={`p-5 rounded-2xl border transition-all bg-white dark:bg-slate-900 shadow-sm hover:shadow-md ${
                isHighRisk 
                  ? 'border-amber-300 dark:border-amber-700/60 bg-amber-50/10 dark:bg-amber-950/10' 
                  : 'border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {patient.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Age {patient.age} • {patient.phone}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    patient.status === 'Active'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                  }`}>
                    {patient.status}
                  </span>
                  {isHighRisk && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 dark:border-rose-800">
                      <ShieldAlert className="w-3 h-3 text-rose-600 dark:text-rose-400" />
                      Safety Plan Active
                    </span>
                  )}
                </div>
              </div>

              {/* Clinical Details */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Primary Clinician:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {patient.primaryTherapistName}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">ICD-10 Diagnosis:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {patient.diagnosisCode} ({patient.diagnosisName})
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Sessions Attended:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {patient.totalSessionsCompleted} completed
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400">Insurance & Balance:</span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {patient.insurance} • {patient.outstandingBalance > 0 ? (
                      <span className="text-amber-600 dark:text-amber-400">${patient.outstandingBalance} due</span>
                    ) : (
                      <span className="text-emerald-600 dark:text-emerald-400">Cleared</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-2">
                <button
                  id={`view-patient-${patient.id}`}
                  onClick={() => setSelectedPatient(patient)}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                >
                  Clinical Dossier
                </button>
                <button
                  id={`soap-patient-${patient.id}`}
                  onClick={() => onOpenSoapNote()}
                  className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  New SOAP Note
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Patient Clinical Dossier Drawer / Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            
            <button
              id="close-dossier-btn"
              onClick={() => setSelectedPatient(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={selectedPatient.avatar}
                alt={selectedPatient.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-teal-500"
              />
              <div>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                  {selectedPatient.name}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Patient ID: {selectedPatient.id} • Intake Date: {selectedPatient.intakeDate}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                    {selectedPatient.diagnosisCode} - {selectedPatient.diagnosisName}
                  </span>
                </div>
              </div>
            </div>

            {/* Treatment Goals Section */}
            <div className="mt-6 space-y-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Active Clinical Treatment Goals
              </h3>
              <div className="space-y-2">
                {selectedPatient.treatmentGoals.map((goal, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400 flex-shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact & Safety Protocols */}
            <div className="mt-6 p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60">
              <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                Emergency Contact & Crisis Protocol
              </h4>
              <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">
                Name: {selectedPatient.emergencyContact.name} ({selectedPatient.emergencyContact.relationship}) • Phone: {selectedPatient.emergencyContact.phone}
              </p>
              <p className="text-[11px] text-amber-700/80 dark:text-amber-400/80 mt-1">
                Risk Classification: {selectedPatient.riskLevel}. National Crisis Hotline (988) integrated into patient portal header.
              </p>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setSelectedPatient(null)}
                className="px-5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300"
              >
                Close Dossier
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
