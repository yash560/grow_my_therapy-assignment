'use client';

import React, { useState } from 'react';
import { 
  Sparkles, CheckCircle2, ShieldCheck, Heart, UserCheck, Star, 
  Clock, MapPin, Calendar, ArrowRight, ArrowLeft, Filter
} from 'lucide-react';
import { mockTherapists } from '../data/mockData';
import { Therapist } from '../types/therapy';

interface CareMatchmakerProps {
  onSelectTherapistForBooking: (therapist: Therapist) => void;
}

export const CareMatchmaker: React.FC<CareMatchmakerProps> = ({
  onSelectTherapistForBooking
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedFocus, setSelectedFocus] = useState<string>('Complex Trauma & PTSD');
  const [selectedModality, setSelectedModality] = useState<string>('EMDR & Trauma Recovery');
  const [selectedInsurance, setSelectedInsurance] = useState<string>('Blue Cross Blue Shield');
  const [selectedFormat, setSelectedFormat] = useState<'Telehealth' | 'In-Person' | 'Any'>('Telehealth');

  const focusOptions = [
    { id: 'Complex Trauma & PTSD', label: 'Complex Trauma & PTSD', icon: '🛡️', desc: 'Somatic processing, EMDR, flashbacks, and childhood trauma.' },
    { id: 'High-Functioning Anxiety', label: 'Anxiety & Panic Attacks', icon: '⚡', desc: 'Overthinking, social anxiety, phobias, and nervous system regulation.' },
    { id: 'Major Depressive Disorder', label: 'Depression & Mood Cycles', icon: '🌧️', desc: 'Persistent low energy, apathy, anhedonia, and life transitions.' },
    { id: 'Couples De-escalation', label: 'Couples & Relationship Conflict', icon: '🤝', desc: 'Communication breakdown, infidelity, attachment patterns.' },
    { id: 'Executive Burnout', label: 'Executive & Founder Burnout', icon: '💼', desc: 'High-pressure performance fatigue and work-life uncoupling.' },
    { id: 'Adult ADHD', label: 'Adult ADHD & Neurodivergence', icon: '🧠', desc: 'Executive dysfunction, sensory overload, and emotional dysregulation.' },
  ];

  const modalityOptions = [
    { id: 'EMDR & Trauma Recovery', label: 'EMDR & Bilateral Desensitization', tag: 'Fast-Track Trauma' },
    { id: 'Cognitive Behavioral Therapy (CBT)', label: 'Cognitive Behavioral Therapy (CBT)', tag: 'Structured & Practical' },
    { id: 'Mindfulness-Based (MBCT)', label: 'Mindfulness-Based Somatics', tag: 'Body & Nervous System' },
    { id: 'Emotion-Focused Couples Therapy', label: 'Emotion-Focused Therapy (EFT)', tag: 'Relational Attunement' },
    { id: 'Acceptance & Commitment (ACT)', label: 'Acceptance & Commitment (ACT)', tag: 'Values-Aligned Living' },
  ];

  const insuranceOptions = [
    'Blue Cross Blue Shield',
    'Aetna',
    'Cigna Healthcare',
    'UnitedHealthcare / Optum',
    'Medicare',
    'Out-of-Pocket / Sliding Scale'
  ];

  // Calculate dynamic match scores
  const getTherapistMatch = (t: Therapist) => {
    let score = 75;
    if (t.specialties.some(s => s.toLowerCase().includes(selectedFocus.toLowerCase().slice(0, 5)))) score += 12;
    if (t.modalities.some(m => m.includes(selectedModality))) score += 8;
    if (t.insurances.includes(selectedInsurance as any)) score += 5;
    return Math.min(score, 99);
  };

  const sortedTherapists = [...mockTherapists].sort((a, b) => getTherapistMatch(b) - getTherapistMatch(a));

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950 text-teal-700 dark:text-teal-300 text-xs font-semibold border border-teal-200 dark:border-teal-800">
          <Sparkles className="w-3.5 h-3.5 text-teal-600 dark:text-teal-400" />
          Intelligent Clinical Care Matchmaker
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Find Your Ideal Clinical Therapist Match
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          An evidence-based matching engine pairing your clinical goals, preferred therapeutic modalities, and insurance in under 60 seconds.
        </p>
      </div>

      {/* 4-Step Progress Indicator */}
      <div className="max-w-xl mx-auto">
        <div className="flex items-center justify-between text-xs font-bold text-slate-500 dark:text-slate-400 mb-2">
          <span>Step {currentStep} of 4: {
            currentStep === 1 ? 'Primary Focus' :
            currentStep === 2 ? 'Therapy Modality' :
            currentStep === 3 ? 'Insurance & Payment' : 'Session Format & Matching'
          }</span>
          <span className="text-teal-600 dark:text-teal-400">{currentStep * 25}% Completed</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
          <div 
            className="h-full bg-teal-600 dark:bg-teal-500 transition-all duration-300 rounded-full"
            style={{ width: `${currentStep * 25}%` }}
          />
        </div>
      </div>

      {/* Wizard Step Content */}
      <div className="max-w-3xl mx-auto p-6 sm:p-8 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
        
        {/* Step 1: Reason / Symptoms */}
        {currentStep === 1 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              What is bringing you to therapy at this time?
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select the primary area of focus you wish to address with your therapist.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {focusOptions.map((opt) => {
                const isSelected = selectedFocus === opt.id;
                return (
                  <div
                    key={opt.id}
                    onClick={() => setSelectedFocus(opt.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/40 dark:border-teal-400 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-2xl">{opt.icon}</span>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                    </div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white mt-2">
                      {opt.label}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {opt.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Modality */}
        {currentStep === 2 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Do you have a preferred therapeutic methodology?
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select an evidence-based clinical modality or choose CBT if you are unsure.
            </p>

            <div className="space-y-3 mt-4">
              {modalityOptions.map((mod) => {
                const isSelected = selectedModality === mod.id;
                return (
                  <div
                    key={mod.id}
                    onClick={() => setSelectedModality(mod.id)}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 dark:border-teal-400'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        {mod.label}
                        <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {mod.tag}
                        </span>
                      </div>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-teal-600 dark:text-teal-400" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Insurance & Financial */}
        {currentStep === 3 && (
          <div className="space-y-4 animate-fade-in">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              How do you plan to cover therapy sessions?
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              We verify in-network coverage in real-time or supply Superbills for out-of-network reimbursement.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
              {insuranceOptions.map((ins) => {
                const isSelected = selectedInsurance === ins;
                return (
                  <div
                    key={ins}
                    onClick={() => setSelectedInsurance(ins)}
                    className={`p-4 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                      isSelected
                        ? 'border-teal-500 bg-teal-50/60 dark:bg-teal-950/40 dark:border-teal-400'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/40'
                    }`}
                  >
                    <span className="font-semibold text-sm text-slate-900 dark:text-white">
                      {ins}
                    </span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-teal-600 dark:text-teal-400" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 4: Session Format & Results */}
        {currentStep === 4 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Preferred Session Format
              </h2>
              <div className="flex gap-3 mt-3">
                {(['Telehealth', 'In-Person', 'Any'] as const).map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
                      selectedFormat === fmt
                        ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                        : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {fmt === 'Telehealth' ? '💻 Telehealth Video' : fmt === 'In-Person' ? '🏢 In-Office Clinical' : '✨ Either Format'}
                  </button>
                ))}
              </div>
            </div>

            {/* Matched Licensed Therapists */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  Your Top Therapist Matches
                </h3>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Ranked by clinical compatibility
                </span>
              </div>

              <div className="space-y-4">
                {sortedTherapists.map((therapist) => {
                  const matchPercent = getTherapistMatch(therapist);
                  return (
                    <div 
                      key={therapist.id}
                      className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 hover:border-teal-500/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={therapist.avatar}
                          alt={therapist.name}
                          className="w-14 h-14 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-extrabold text-base text-slate-900 dark:text-white">
                              {therapist.name}
                            </span>
                            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                              {therapist.credentials}
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-300 text-[11px] font-bold border border-teal-300 dark:border-teal-800">
                              {matchPercent}% Match
                            </span>
                          </div>

                          <p className="text-xs font-medium text-teal-700 dark:text-teal-300 mt-0.5">
                            {therapist.title}
                          </p>

                          <div className="flex items-center gap-3 mt-2 text-xs text-slate-500 dark:text-slate-400 flex-wrap">
                            <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                              <Star className="w-3.5 h-3.5 fill-current" />
                              {therapist.rating} ({therapist.reviewCount} reviews)
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {therapist.nextAvailableSlot}
                            </span>
                            <span>•</span>
                            <span className="font-bold text-slate-900 dark:text-white">
                              ${therapist.hourlyRate}/session
                            </span>
                          </div>

                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                            {therapist.bio}
                          </p>
                        </div>
                      </div>

                      {/* Action */}
                      <button
                        id={`match-book-${therapist.id}`}
                        onClick={() => onSelectTherapistForBooking(therapist)}
                        className="self-end sm:self-center px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md shadow-teal-600/20 whitespace-nowrap transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      >
                        Book with {therapist.name.split(' ')[1] || therapist.name}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800 mt-6">
          {currentStep > 1 ? (
            <button
              id="matchmaker-prev-btn"
              onClick={() => setCurrentStep(prev => prev - 1)}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </button>
          ) : <div />}

          {currentStep < 4 ? (
            <button
              id="matchmaker-next-btn"
              onClick={() => setCurrentStep(prev => prev + 1)}
              className="flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-all"
            >
              Next Step
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              id="matchmaker-restart-btn"
              onClick={() => setCurrentStep(1)}
              className="text-xs font-semibold text-teal-600 dark:text-teal-400 hover:underline"
            >
              Restart Quiz
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
