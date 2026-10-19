'use client';

import React, { useState } from 'react';
import { 
  FileText, CheckCircle2, Lock, ShieldCheck, Sparkles, Clock, 
  Save, AlertCircle, RefreshCw
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockSoapNotes, mockPatients } from '../data/mockData';
import { SoapNote } from '../types/therapy';

export const ClinicalSoapNotes: React.FC = () => {
  const [notes, setNotes] = useState<SoapNote[]>(mockSoapNotes);
  const [selectedNoteId, setSelectedNoteId] = useState<string>(mockSoapNotes[0].id);

  const activeNote = notes.find(n => n.id === selectedNoteId) || notes[0];

  const [subjective, setSubjective] = useState(activeNote.subjective);
  const [objective, setObjective] = useState(activeNote.objective);
  const [assessment, setAssessment] = useState(activeNote.assessment);
  const [plan, setPlan] = useState(activeNote.plan);
  const [riskAssessment, setRiskAssessment] = useState(activeNote.riskAssessment);
  const [isSigned, setIsSigned] = useState(activeNote.isSigned);
  const [signedAt, setSignedAt] = useState(activeNote.signedAt || '');
  const [saveToast, setSaveToast] = useState<string | null>(null);

  const handleSelectNote = (note: SoapNote) => {
    setSelectedNoteId(note.id);
    setSubjective(note.subjective);
    setObjective(note.objective);
    setAssessment(note.assessment);
    setPlan(note.plan);
    setRiskAssessment(note.riskAssessment);
    setIsSigned(note.isSigned);
    setSignedAt(note.signedAt || '');
  };

  const handleSignAndLock = () => {
    const timestamp = new Date().toISOString();
    setIsSigned(true);
    setSignedAt(timestamp);

    setNotes(prev => prev.map(n => n.id === activeNote.id ? {
      ...n,
      subjective,
      objective,
      assessment,
      plan,
      riskAssessment,
      isSigned: true,
      signedAt: timestamp
    } : n));

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 }
      });
    } catch (e) {}

    setSaveToast(`Clinical Note ${activeNote.id} digitally signed & locked to EHR.`);
    setTimeout(() => setSaveToast(null), 4000);
  };

  const applyTemplate = (type: 'cbt' | 'emdr') => {
    if (isSigned) return;
    if (type === 'cbt') {
      setSubjective('Client presented describing persistent automatic catastrophic thoughts around workplace evaluation. Baseline anxiety rated 6/10.');
      setObjective('Client was cooperative and goal-directed. Speech mildly rapid. Mood congruent with affect. Thought content free of hallucinations or delusions.');
      setAssessment('Generalized Anxiety Disorder. Client engaged actively with Thought Record exercise, recognizing all-or-nothing cognitive distortions.');
      setPlan('1. Client to complete 3 Thought Records before next session.\n2. Practice 4-7-8 diaphragmatic breathing.\n3. Follow up in 7 days.');
      setRiskAssessment('No acute suicidal or homicidal ideation. Protective factors include supportive family.');
    } else {
      setSubjective('Client arrived prepared for Phase 4 EMDR reprocessing on secondary vehicular accident memory. Distress baseline SUD rated 7/10.');
      setObjective('Calm somatic posture. Oriented x4. Rapid bilateral visual stimulation tracked smoothly for 18 passes.');
      setAssessment('PTSD reprocessing showing positive desensitization. SUD lowered to 2/10. Body scan clear of tight chest constriction.');
      setPlan('1. Continue positive installation ("I have agency now").\n2. Light container exercise if distressing intrusive images emerge.\n3. Session scheduled for Oct 21.');
      setRiskAssessment('Low risk. Safety container verified.');
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <FileText className="w-6 h-6 text-teal-600 dark:text-teal-400" />
            Clinical Documentation & SOAP Notes
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Standardized psychiatric and psychotherapy chart notes formatted for insurance audits and clinical handoffs.
          </p>
        </div>

        {saveToast && (
          <div className="px-3 py-1.5 rounded-xl bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 text-xs font-bold border border-teal-300 dark:border-teal-800 animate-fade-in flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{saveToast}</span>
          </div>
        )}
      </div>

      {/* Main Grid: Notes Selector Sidebar + Note Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Column: Note History */}
        <div className="lg:col-span-1 space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
            Clinical Records ({notes.length})
          </h2>

          <div className="space-y-2">
            {notes.map((n) => {
              const isSelected = n.id === selectedNoteId;
              return (
                <div
                  key={n.id}
                  id={`note-item-${n.id}`}
                  onClick={() => handleSelectNote(n)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 shadow-sm'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 dark:text-white">
                      {n.patientName}
                    </span>
                    {n.isSigned ? (
                      <Lock className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
                    ) : (
                      <span className="text-[10px] font-bold text-amber-600">Draft</span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                    {n.sessionDate} • CPT {n.cptCode}
                  </p>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-1 italic">
                    {n.assessment}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: SOAP Note Editor */}
        <div className="lg:col-span-3 p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          
          {/* Note Metadata Banner */}
          <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-base text-slate-900 dark:text-white">
                  Patient: {activeNote.patientName}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold">
                  Date: {activeNote.sessionDate}
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/80 text-teal-700 dark:text-teal-300 font-semibold border border-teal-200 dark:border-teal-800">
                  CPT {activeNote.cptCode}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Supervising Clinician: {activeNote.therapistName}
              </p>
            </div>

            {/* Template Buttons */}
            {!isSigned && (
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400">Insert Template:</span>
                <button
                  id="template-cbt-btn"
                  onClick={() => applyTemplate('cbt')}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  CBT / Anxiety
                </button>
                <button
                  id="template-emdr-btn"
                  onClick={() => applyTemplate('emdr')}
                  className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-colors"
                >
                  EMDR / Trauma
                </button>
              </div>
            )}
          </div>

          {/* S - Subjective */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-teal-600 text-white flex items-center justify-center text-[10px] font-black">
                S
              </span>
              Subjective (Client presentation, self-reported mood, presenting concerns)
            </label>
            <textarea
              id="soap-subjective-input"
              rows={3}
              disabled={isSigned}
              value={subjective}
              onChange={(e) => setSubjective(e.target.value)}
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none disabled:opacity-80"
            />
          </div>

          {/* O - Objective */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-indigo-600 text-white flex items-center justify-center text-[10px] font-black">
                O
              </span>
              Objective (Mental status exam, speech, affect, motor behavior)
            </label>
            <textarea
              id="soap-objective-input"
              rows={3}
              disabled={isSigned}
              value={objective}
              onChange={(e) => setObjective(e.target.value)}
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none disabled:opacity-80"
            />
          </div>

          {/* A - Assessment */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-violet-600 text-white flex items-center justify-center text-[10px] font-black">
                A
              </span>
              Assessment (Clinical evaluation, diagnosis progress, therapeutic response)
            </label>
            <textarea
              id="soap-assessment-input"
              rows={3}
              disabled={isSigned}
              value={assessment}
              onChange={(e) => setAssessment(e.target.value)}
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none disabled:opacity-80"
            />
          </div>

          {/* P - Plan */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-md bg-amber-600 text-white flex items-center justify-center text-[10px] font-black">
                P
              </span>
              Plan (Interventions, assigned behavioral homework, next session date)
            </label>
            <textarea
              id="soap-plan-input"
              rows={3}
              disabled={isSigned}
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full p-3 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none disabled:opacity-80"
            />
          </div>

          {/* Risk Assessment */}
          <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              Risk Assessment & Lethality Screening
            </label>
            <input
              id="soap-risk-input"
              type="text"
              disabled={isSigned}
              value={riskAssessment}
              onChange={(e) => setRiskAssessment(e.target.value)}
              className="w-full p-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none disabled:opacity-80"
            />
          </div>

          {/* Signature & EHR Lock Footer */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
            {isSigned ? (
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <Lock className="w-4 h-4" />
                <span>
                  Signed & Cryptographically Locked by {activeNote.therapistName} ({signedAt ? new Date(signedAt).toLocaleString() : 'Verified'})
                </span>
              </div>
            ) : (
              <div className="text-xs text-slate-400">
                Draft Mode • Unlocked for editing
              </div>
            )}

            {!isSigned && (
              <button
                id="sign-and-lock-btn"
                onClick={handleSignAndLock}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Digitally Sign & Lock Note</span>
              </button>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
