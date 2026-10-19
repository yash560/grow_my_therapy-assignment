'use client';

import React, { useState } from 'react';
import { 
  Users, DollarSign, Activity, TrendingUp, Calendar, Video, Clock, 
  FileText, PlusCircle, CheckCircle2, AlertCircle, ArrowUpRight, ArrowDownRight,
  Sparkles, ExternalLink
} from 'lucide-react';
import { mockPracticeMetrics, mockSessions, mockTherapists } from '../data/mockData';
import { Session } from '../types/therapy';

interface PracticeDashboardProps {
  onOpenBooking: () => void;
  onOpenNewPatient: () => void;
  onOpenSoapNote: (sessionId?: string) => void;
  onOpenSuperbill: () => void;
  onNavigateTab: (tab: string) => void;
}

export const PracticeDashboard: React.FC<PracticeDashboardProps> = ({
  onOpenBooking,
  onOpenNewPatient,
  onOpenSoapNote,
  onOpenSuperbill,
  onNavigateTab
}) => {
  const [horizonFilter, setHorizonFilter] = useState<'today' | 'week' | 'month' | 'all'>('month');
  const [sessions, setSessions] = useState<Session[]>(mockSessions);
  const [activeSessionAlert, setActiveSessionAlert] = useState<string | null>(null);

  // Dynamic multipliers based on filter
  const getMultiplier = () => {
    switch (horizonFilter) {
      case 'today': return 0.05;
      case 'week': return 0.25;
      case 'month': return 1.0;
      case 'all': return 3.4;
    }
  };

  const mult = getMultiplier();
  const revenue = Math.round(mockPracticeMetrics.monthlyRevenue * mult);
  const activePatients = Math.round(mockPracticeMetrics.activePatients * (horizonFilter === 'today' ? 0.2 : horizonFilter === 'week' ? 0.6 : 1.0));

  const handleLaunchVideo = (session: Session) => {
    setActiveSessionAlert(`Launched secure Telehealth room for ${session.patientName} (${session.time}).`);
    setTimeout(() => setActiveSessionAlert(null), 5000);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Top Banner & Horizon Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            Practice Command Center
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
              Live Synchronized
            </span>
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Clinical caseload capacity, patient acquisition conversion, and appointment operations.
          </p>
        </div>

        {/* Multi-horizon Filter */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200 dark:border-slate-700 self-start md:self-auto">
          {(['today', 'week', 'month', 'all'] as const).map((period) => (
            <button
              key={period}
              id={`filter-${period}`}
              onClick={() => setHorizonFilter(period)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg capitalize transition-all duration-150 ${
                horizonFilter === period
                  ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 font-semibold shadow-sm border border-slate-200 dark:border-slate-700'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              {period === 'all' ? 'All Time' : period === 'today' ? 'Today' : `This ${period}`}
            </button>
          ))}
        </div>
      </div>

      {/* Telehealth Room Notice */}
      {activeSessionAlert && (
        <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-800 dark:text-teal-200 flex items-center justify-between text-sm shadow-sm animate-fade-in">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-teal-600 dark:text-teal-400 animate-pulse" />
            <span>{activeSessionAlert}</span>
          </div>
          <button 
            onClick={() => setActiveSessionAlert(null)}
            className="text-xs font-semibold underline text-teal-700 dark:text-teal-300 hover:opacity-80"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        
        {/* Metric 1: Monthly Revenue */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              {horizonFilter === 'today' ? 'Daily Billings' : horizonFilter === 'week' ? 'Weekly Billings' : 'Monthly Billings'}
            </span>
            <div className="p-2.5 rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950 dark:text-teal-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              ${revenue.toLocaleString()}
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
              <span>+{mockPracticeMetrics.monthlyRevenueGrowth}% vs prev. period</span>
            </div>
          </div>
        </div>

        {/* Metric 2: Active Clients */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Active Caseload
            </span>
            <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950 dark:text-indigo-400">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {activePatients} Clients
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
              <span>+{mockPracticeMetrics.activePatientsGrowth}% net growth</span>
            </div>
          </div>
        </div>

        {/* Metric 3: Practice Utilization */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Clinical Utilization
            </span>
            <div className="p-2.5 rounded-xl bg-violet-50 text-violet-600 dark:bg-violet-950 dark:text-violet-400">
              <Activity className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {mockPracticeMetrics.utilizationRate}%
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowUpRight className="w-4 h-4" />
              <span>+{mockPracticeMetrics.utilizationRateGrowth}% booked hours</span>
            </div>
          </div>
        </div>

        {/* Metric 4: Show-up Adherence */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Show-Up Adherence
            </span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3">
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              {(100 - mockPracticeMetrics.noShowRate).toFixed(1)}%
            </div>
            <div className="flex items-center gap-1.5 mt-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <ArrowDownRight className="w-4 h-4" />
              <span>No-shows down {Math.abs(mockPracticeMetrics.noShowRateDelta)}%</span>
            </div>
          </div>
        </div>

      </div>

      {/* Quick Clinical Operations Action Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-teal-500/10 via-indigo-500/10 to-teal-500/5 dark:from-teal-950/40 dark:via-indigo-950/30 dark:to-teal-950/20 border border-teal-200 dark:border-teal-900/60 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-600 dark:bg-teal-500 text-white flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Instant Clinical Actions
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Autonomous EHR routing, SOAP notes, Superbills, and intake assessments.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            id="action-new-patient-btn"
            onClick={onOpenNewPatient}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <PlusCircle className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
            New Patient Intake
          </button>

          <button
            id="action-schedule-session-btn"
            onClick={onOpenBooking}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <Calendar className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            Schedule Session
          </button>

          <button
            id="action-write-soap-btn"
            onClick={() => onOpenSoapNote()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <FileText className="w-3.5 h-3.5 text-violet-600 dark:text-violet-400" />
            Write SOAP Note
          </button>

          <button
            id="action-generate-superbill-btn"
            onClick={onOpenSuperbill}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors shadow-sm"
          >
            <DollarSign className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            Superbill Export
          </button>
        </div>
      </div>

      {/* Main Grid: Upcoming Schedule & Growth Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Schedule & Live Sessions (2 cols) */}
        <div className="lg:col-span-2 p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                Today & Upcoming Clinical Schedule
              </h2>
            </div>
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
              {sessions.length} sessions queued
            </span>
          </div>

          <div className="mt-4 divide-y divide-slate-100 dark:divide-slate-800 space-y-3">
            {sessions.map((sess) => (
              <div 
                key={sess.id}
                className="pt-3 first:pt-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/50 dark:hover:bg-slate-800/40 p-2.5 rounded-xl transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center border border-slate-200 dark:border-slate-700 text-center flex-shrink-0">
                    <span className="text-[10px] font-bold text-teal-600 dark:text-teal-400 uppercase">
                      {sess.date.slice(5)}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {sess.time.split(' ')[0]}
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {sess.patientName}
                      </span>
                      <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        sess.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                      }`}>
                        {sess.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {sess.cptCode} • {sess.therapistName}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {sess.durationMinutes} mins ({sess.sessionType})
                      </span>
                      <span className={sess.copayPaid ? 'text-emerald-600 dark:text-emerald-400 font-medium' : 'text-amber-600 dark:text-amber-400 font-medium'}>
                        {sess.copayPaid ? '✓ Copay Cleared' : '⚠ Copay Pending ($30)'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Session Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {sess.sessionType.includes('Telehealth') && (
                    <button
                      id={`launch-video-${sess.id}`}
                      onClick={() => handleLaunchVideo(sess)}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-sm transition-all"
                    >
                      <Video className="w-3.5 h-3.5" />
                      <span>Start Telehealth</span>
                    </button>
                  )}

                  <button
                    id={`note-session-${sess.id}`}
                    onClick={() => onOpenSoapNote(sess.id)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-semibold transition-all"
                  >
                    <FileText className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    <span>SOAP</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Growth Funnel (1 col) */}
        <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                Intake Growth Funnel
              </h2>
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400">
                78.4% Conversion
              </span>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Performance metrics tracking patient journeys from therapy search to recurring clinical retention.
            </p>

            <div className="mt-5 space-y-4">
              
              {/* Funnel Stage 1 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>1. Website & Directory Visitors</span>
                  <span>1,420 (100%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>

              {/* Funnel Stage 2 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>2. Care Matchmaker Quizzes</span>
                  <span>348 (24.5%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-teal-600 rounded-full" style={{ width: '24.5%' }}></div>
                </div>
              </div>

              {/* Funnel Stage 3 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>3. Free 15-Min Consultations</span>
                  <span>88 (6.2%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-indigo-500 rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>

              {/* Funnel Stage 4 */}
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  <span>4. Retained Active Patients</span>
                  <span>48 (78.4% consult-to-client)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: '8%' }}></div>
                </div>
              </div>

            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => onNavigateTab('matchmaker')}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Test Patient Care Matchmaker</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
