'use client';

import React, { useState } from 'react';
import { 
  X, Calendar, Clock, Video, Building, CheckCircle2, User, 
  DollarSign, Sparkles
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { mockTherapists } from '../data/mockData';
import { Therapist } from '../types/therapy';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedTherapist?: Therapist | null;
  onBookingSuccess: (details: { therapist: string; date: string; time: string; format: string }) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedTherapist,
  onBookingSuccess
}) => {
  if (!isOpen) return null;

  const [selectedTherapistId, setSelectedTherapistId] = useState<string>(
    preselectedTherapist ? preselectedTherapist.id : mockTherapists[0].id
  );
  const [selectedDate, setSelectedDate] = useState<string>('2026-10-22');
  const [selectedTime, setSelectedTime] = useState<string>('11:00 AM');
  const [sessionFormat, setSessionFormat] = useState<'Telehealth Video' | 'In-Office Clinical'>('Telehealth Video');
  const [clientName, setClientName] = useState<string>('Yash Jain');
  const [clientEmail, setClientEmail] = useState<string>('yash@thewebvale.com');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookedSuccess, setBookedSuccess] = useState<boolean>(false);

  const therapist = mockTherapists.find(t => t.id === selectedTherapistId) || mockTherapists[0];

  const availableSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '01:30 PM', '02:30 PM', '04:00 PM'
  ];

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setBookedSuccess(true);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.7 }
        });
      } catch (err) {}

      onBookingSuccess({
        therapist: therapist.name,
        date: selectedDate,
        time: selectedTime,
        format: sessionFormat
      });
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative max-h-[95vh] overflow-y-auto">
        
        <button
          id="close-booking-modal-btn"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!bookedSuccess ? (
          <form onSubmit={handleConfirmBooking} className="space-y-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
                Direct Clinical Scheduling
              </span>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                Book Clinical Therapy Session
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                HIPAA-compliant calendar reservation with automated video room generation.
              </p>
            </div>

            {/* Select Clinician */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Select Licensed Therapist
              </label>
              <select
                id="booking-therapist-select"
                value={selectedTherapistId}
                onChange={(e) => setSelectedTherapistId(e.target.value)}
                className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                {mockTherapists.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.credentials}) — ${t.hourlyRate}/session
                  </option>
                ))}
              </select>
            </div>

            {/* Format: Video vs In-Office */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Session Modality
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSessionFormat('Telehealth Video')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    sessionFormat === 'Telehealth Video'
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  Telehealth Video
                </button>
                <button
                  type="button"
                  onClick={() => setSessionFormat('In-Office Clinical')}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                    sessionFormat === 'In-Office Clinical'
                      ? 'bg-teal-600 text-white border-teal-600 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  In-Office Clinical
                </button>
              </div>
            </div>

            {/* Date & Time Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Appointment Date
                </label>
                <input
                  id="booking-date-input"
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Select Time Slot
                </label>
                <select
                  id="booking-time-select"
                  value={selectedTime}
                  onChange={(e) => setSelectedTime(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  {availableSlots.map((slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Client Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Full Name
                </label>
                <input
                  id="booking-name-input"
                  type="text"
                  required
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  Email Address
                </label>
                <input
                  id="booking-email-input"
                  type="email"
                  required
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Standard Intake Rate:</span>
              <span className="font-extrabold text-slate-900 dark:text-white">
                ${therapist.hourlyRate}.00 (Copay or Self-Pay)
              </span>
            </div>

            <button
              id="confirm-booking-btn"
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-70"
            >
              {isSubmitting ? 'Confirming Appointment...' : 'Confirm Appointment Reservation'}
            </button>
          </form>
        ) : (
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Appointment Successfully Confirmed!
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed">
              Your session with <strong>{therapist.name}</strong> has been secured for <strong>{selectedDate} at {selectedTime}</strong> ({sessionFormat}).
            </p>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 text-left space-y-1">
              <div><strong>Client:</strong> {clientName} ({clientEmail})</div>
              <div><strong>Video Link:</strong> Generated automatically 15m prior to session</div>
              <div><strong>Confirmation:</strong> Dispatched to client & clinician calendar</div>
            </div>

            <button
              id="booking-finish-btn"
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-teal-600 text-white text-xs font-bold hover:bg-teal-700 transition-colors"
            >
              Back to Practice Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
