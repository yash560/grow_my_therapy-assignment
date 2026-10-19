'use client';

import React, { useState } from 'react';
import { X, Printer, Download, CheckCircle2, FileText, ShieldCheck } from 'lucide-react';
import { mockPatients, mockTherapists } from '../data/mockData';
import { Patient } from '../types/therapy';

interface SuperbillModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient?: Patient | null;
}

export const SuperbillModal: React.FC<SuperbillModalProps> = ({
  isOpen,
  onClose,
  patient
}) => {
  if (!isOpen) return null;

  const [selectedPatientId, setSelectedPatientId] = useState<string>(
    patient ? patient.id : mockPatients[0].id
  );
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const activePat = mockPatients.find(p => p.id === selectedPatientId) || mockPatients[0];
  const therapist = mockTherapists.find(t => t.name === activePat.primaryTherapistName) || mockTherapists[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[95vh] overflow-y-auto">
        
        <button
          id="close-superbill-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Superbill Document */}
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Official Out-of-Network Medical Receipt
              </span>
              <h2 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                Mental Health Superbill (CMS-1500 Compliant)
              </h2>
            </div>

            {/* Patient Selector */}
            <select
              id="superbill-patient-select"
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
              className="p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium focus:ring-2 focus:ring-teal-500"
            >
              {mockPatients.map((p) => (
                <option key={p.id} value={p.id}>{p.name} ({p.diagnosisCode})</option>
              ))}
            </select>
          </div>

          {/* Printable Statement Sheet */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs text-slate-800 dark:text-slate-200 space-y-5 font-mono">
            
            {/* Practice Header */}
            <div className="flex justify-between items-start border-b border-slate-200 dark:border-slate-700 pb-4 font-sans">
              <div>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                  Grow My Therapy Psychological Services Group
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  100 Congress Avenue, Suite 2000, Austin, TX 78701
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Tel: (512) 800-4321 • billing@growmytherapy.internal
                </p>
              </div>

              <div className="text-right text-[11px] text-slate-500 dark:text-slate-400">
                <div>NPI: <strong>1982847192</strong></div>
                <div>Tax ID (EIN): <strong>84-2918471</strong></div>
                <div>License #: <strong>PSY-28190-TX</strong></div>
              </div>
            </div>

            {/* Patient & Provider Details */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="font-bold text-slate-500 text-[10px] uppercase">Patient Information</div>
                <div className="font-bold text-sm text-slate-900 dark:text-white mt-1">{activePat.name}</div>
                <div>DOB: 1994-06-12 (Age {activePat.age})</div>
                <div>Primary Phone: {activePat.phone}</div>
                <div>Payer: {activePat.insurance}</div>
              </div>

              <div>
                <div className="font-bold text-slate-500 text-[10px] uppercase">Rendering Clinician</div>
                <div className="font-bold text-sm text-slate-900 dark:text-white mt-1">{therapist.name}</div>
                <div>Credentials: {therapist.credentials}</div>
                <div>Specialty: Behavioral Health & Psychotherapy</div>
                <div>Taxonomy Code: 101YM0800X</div>
              </div>
            </div>

            {/* Clinical Diagnosis Section */}
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <span className="font-bold text-[10px] uppercase text-slate-400">Primary Diagnosis Code (ICD-10-CM)</span>
              <div className="font-bold text-xs text-teal-700 dark:text-teal-300 mt-0.5">
                {activePat.diagnosisCode} — {activePat.diagnosisName}
              </div>
            </div>

            {/* Line Items Table */}
            <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
              <table className="w-full text-left text-[11px]">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500 uppercase text-[9px] font-bold">
                  <tr>
                    <th className="py-2 px-3">Date</th>
                    <th className="py-2 px-3">POS</th>
                    <th className="py-2 px-3">CPT Code</th>
                    <th className="py-2 px-3">Description</th>
                    <th className="py-2 px-3 text-right">Fee Charged</th>
                    <th className="py-2 px-3 text-right">Paid</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  <tr>
                    <td className="py-2.5 px-3">2026-10-14</td>
                    <td className="py-2.5 px-3">02 (Telehealth)</td>
                    <td className="py-2.5 px-3 font-bold">90837</td>
                    <td className="py-2.5 px-3">Psychotherapy, 60 mins</td>
                    <td className="py-2.5 px-3 text-right">${therapist.hourlyRate}.00</td>
                    <td className="py-2.5 px-3 text-right font-bold text-emerald-600">${therapist.hourlyRate}.00</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Totals & Attestation */}
            <div className="flex justify-between items-end pt-2">
              <div className="text-[10px] text-slate-500 max-w-sm">
                I attest that the clinical mental health services listed above were rendered by me in accordance with professional ethical standards and state licensure board regulations.
                <div className="mt-2 font-bold text-slate-800 dark:text-slate-200 font-sans">
                  Digitally Certified by {therapist.name}, {therapist.credentials}
                </div>
              </div>

              <div className="text-right">
                <div className="text-xs text-slate-500">Total Patient Paid:</div>
                <div className="text-xl font-black text-slate-900 dark:text-white">${therapist.hourlyRate}.00</div>
                <div className="text-[10px] font-bold text-emerald-600">Balance Due: $0.00 (PAID IN FULL)</div>
              </div>
            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            {downloadSuccess ? (
              <span className="text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4" />
                Superbill PDF generated and downloaded!
              </span>
            ) : <div />}

            <div className="flex items-center gap-2">
              <button
                id="superbill-print-btn"
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Superbill</span>
              </button>

              <button
                id="superbill-download-btn"
                onClick={handleDownloadPdf}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export PDF</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
