export type Modality = 
  | 'Cognitive Behavioral Therapy (CBT)'
  | 'EMDR & Trauma Recovery'
  | 'Psychodynamic Therapy'
  | 'Mindfulness-Based (MBCT)'
  | 'Acceptance & Commitment (ACT)'
  | 'Emotion-Focused Couples Therapy';

export type InsuranceProvider = 
  | 'Blue Cross Blue Shield'
  | 'Aetna'
  | 'Cigna Healthcare'
  | 'UnitedHealthcare / Optum'
  | 'Medicare'
  | 'Out-of-Pocket / Sliding Scale';

export type SessionStatus = 'Scheduled' | 'Completed' | 'No-Show' | 'Cancelled';

export type PatientStatus = 'Active' | 'Onboarding' | 'Completed' | 'Paused';

export type RiskLevel = 'Low' | 'Moderate' | 'High (Safety Plan Active)';

export interface Therapist {
  id: string;
  name: string;
  credentials: string; // e.g. "PhD, LMFT, LPCC"
  title: string;
  avatar: string;
  specialties: string[];
  modalities: Modality[];
  insurances: InsuranceProvider[];
  hourlyRate: number;
  bio: string;
  yearsExperience: number;
  rating: number;
  reviewCount: number;
  availableDays: string[];
  nextAvailableSlot: string;
  telehealthAvailable: boolean;
  inPersonAvailable: boolean;
  location: string;
}

export interface Patient {
  id: string;
  name: string;
  avatar: string;
  email: string;
  phone: string;
  age: number;
  status: PatientStatus;
  primaryTherapistId: string;
  primaryTherapistName: string;
  diagnosisCode: string;
  diagnosisName: string;
  intakeDate: string;
  lastSessionDate: string;
  nextSessionDate: string;
  totalSessionsCompleted: number;
  insurance: InsuranceProvider;
  copayAmount: number;
  outstandingBalance: number;
  riskLevel: RiskLevel;
  treatmentGoals: string[];
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
  };
}

export interface Session {
  id: string;
  patientId: string;
  patientName: string;
  therapistId: string;
  therapistName: string;
  date: string; // YYYY-MM-DD
  time: string; // e.g. "10:00 AM"
  durationMinutes: number;
  status: SessionStatus;
  cptCode: string; // e.g. "90837"
  sessionType: 'Telehealth Video' | 'In-Office Clinical' | 'Phone Check-in';
  videoRoomUrl?: string;
  hasSoapNote: boolean;
  copayPaid: boolean;
  fee: number;
}

export interface SoapNote {
  id: string;
  sessionId: string;
  patientId: string;
  patientName: string;
  therapistId: string;
  therapistName: string;
  sessionDate: string;
  cptCode: string;
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
  riskAssessment: string;
  isSigned: boolean;
  signedAt?: string;
}

export interface BillingClaim {
  id: string;
  claimNumber: string;
  patientId: string;
  patientName: string;
  insuranceName: InsuranceProvider;
  dateOfService: string;
  cptCode: string;
  cptDescription: string;
  billedAmount: number;
  allowedAmount: number;
  patientResponsibility: number;
  insurancePaid: number;
  status: 'Paid' | 'Pending' | 'Under Review' | 'Denied';
}

export interface PracticeMetrics {
  activePatients: number;
  activePatientsGrowth: number;
  monthlyRevenue: number;
  monthlyRevenueGrowth: number;
  utilizationRate: number;
  utilizationRateGrowth: number;
  noShowRate: number;
  noShowRateDelta: number;
  intakeConversionRate: number;
  intakeConversionGrowth: number;
  avgRevenuePerSession: number;
}
