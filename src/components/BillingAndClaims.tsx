'use client';

import React, { useState } from 'react';
import { 
  DollarSign, FileText, CheckCircle2, Clock, AlertCircle, 
  Download, Printer, Sparkles, PlusCircle, ArrowUpRight
} from 'lucide-react';
import { mockBillingClaims, mockPatients } from '../data/mockData';
import { BillingClaim, Patient } from '../types/therapy';

interface BillingAndClaimsProps {
  onOpenSuperbillModal: (patient?: Patient) => void;
}

export const BillingAndClaims: React.FC<BillingAndClaimsProps> = ({
  onOpenSuperbillModal
}) => {
  const [claims, setClaims] = useState<BillingClaim[]>(mockBillingClaims);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Paid' | 'Pending' | 'Under Review'>('All');

  const filteredClaims = claims.filter(c => {
    if (filterStatus === 'All') return true;
    return c.status === filterStatus;
  });

  const totalBilled = claims.reduce((acc, c) => acc + c.billedAmount, 0);
  const totalCollected = claims.reduce((acc, c) => acc + (c.status === 'Paid' ? (c.insurancePaid + c.patientResponsibility) : 0), 0);
  const totalPending = claims.reduce((acc, c) => acc + (c.status !== 'Paid' ? c.allowedAmount : 0), 0);

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <DollarSign className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Billing & Out-of-Network Superbills
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Automated CMS-1500 claim batching, copay settlement, and patient superbills.
          </p>
        </div>

        <button
          id="billing-generate-superbill-btn"
          onClick={() => onOpenSuperbillModal()}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 transition-all self-start sm:self-auto"
        >
          <FileText className="w-4 h-4" />
          <span>Generate Patient Superbill</span>
        </button>
      </div>

      {/* Revenue & Claims Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Total Billed This Month
          </span>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-2">
            ${totalBilled.toFixed(2)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Across 3 major commercial payers & private pay
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Settled Collections (94.2%)
          </span>
          <div className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-2">
            ${totalCollected.toFixed(2)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Copays cleared + EFT payer deposits
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Outstanding In-Flight Claims
          </span>
          <div className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
            ${totalPending.toFixed(2)}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            2 claims awaiting clearinghouse adjudication
          </p>
        </div>

      </div>

      {/* Claims Ledger Table */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-teal-600 dark:text-teal-400" />
            <h2 className="font-bold text-sm text-slate-900 dark:text-white">
              Insurance EDI Claims & Adjudication Ledger
            </h2>
          </div>

          {/* Status Filters */}
          <div className="flex items-center gap-1">
            {(['All', 'Paid', 'Pending', 'Under Review'] as const).map((st) => (
              <button
                key={st}
                id={`claim-filter-${st.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filterStatus === st
                    ? 'bg-teal-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 border-b border-slate-100 dark:border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Claim #</th>
                <th className="py-2.5 px-3">Patient</th>
                <th className="py-2.5 px-3">Insurance Payer</th>
                <th className="py-2.5 px-3">CPT Code</th>
                <th className="py-2.5 px-3">Billed</th>
                <th className="py-2.5 px-3">Allowed</th>
                <th className="py-2.5 px-3">Copay</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredClaims.map((claim) => (
                <tr key={claim.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                    {claim.claimNumber}
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-800 dark:text-slate-200">
                    {claim.patientName}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                    {claim.insuranceName}
                  </td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-semibold text-slate-700 dark:text-slate-300">
                      {claim.cptCode}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    ${claim.billedAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-400">
                    ${claim.allowedAmount.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-emerald-600 dark:text-emerald-400 font-medium">
                    ${claim.patientResponsibility.toFixed(2)}
                  </td>
                  <td className="py-3 px-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                      claim.status === 'Paid'
                        ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                        : claim.status === 'Pending'
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                    }`}>
                      {claim.status === 'Paid' && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                      {claim.status === 'Pending' && <Clock className="w-3 h-3 text-amber-600" />}
                      {claim.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
