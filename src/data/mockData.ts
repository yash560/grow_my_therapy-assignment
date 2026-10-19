import { Therapist, Patient, Session, SoapNote, BillingClaim, PracticeMetrics } from '../types/therapy';

export const mockTherapists: Therapist[] = [
  {
    id: 'th-1',
    name: 'Dr. Evelyn Vance',
    credentials: 'PhD, LPCC-S, BCN',
    title: 'Lead Clinical Psychologist & Neurofeedback Specialist',
    avatar: 'https://images.unsplash.com/photo-1594824813589-9a7071e62f02?auto=format&fit=crop&q=80&w=256',
    specialties: ['Complex Trauma & PTSD', 'High-Functioning Anxiety', 'Executive Burnout', 'Adult ADHD'],
    modalities: ['EMDR & Trauma Recovery', 'Cognitive Behavioral Therapy (CBT)', 'Mindfulness-Based (MBCT)'],
    insurances: ['Blue Cross Blue Shield', 'Aetna', 'UnitedHealthcare / Optum', 'Out-of-Pocket / Sliding Scale'],
    hourlyRate: 195,
    bio: 'Specializing in evidence-based neuro-informed psychotherapy for professionals and individuals processing complex relational trauma. Dedicated to creating an authentic, judgment-free clinical container.',
    yearsExperience: 14,
    rating: 4.98,
    reviewCount: 84,
    availableDays: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
    nextAvailableSlot: 'Tomorrow at 11:00 AM',
    telehealthAvailable: true,
    inPersonAvailable: true,
    location: 'Austin, TX & Telehealth Nationwide'
  },
  {
    id: 'th-2',
    name: 'Marcus Sterling',
    credentials: 'LMFT, CGP',
    title: 'Senior Relationship & Couples Therapist',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=256',
    specialties: ['Couples De-escalation', 'Infidelity Recovery', 'Attachment Insecurity', 'Life Transitions'],
    modalities: ['Emotion-Focused Couples Therapy', 'Psychodynamic Therapy', 'Acceptance & Commitment (ACT)'],
    insurances: ['Aetna', 'Cigna Healthcare', 'Out-of-Pocket / Sliding Scale'],
    hourlyRate: 180,
    bio: 'Helping partners break repetitive negative interaction cycles and cultivate deep emotional attunement. Certified in Emotionally Focused Therapy (EFT).',
    yearsExperience: 11,
    rating: 4.95,
    reviewCount: 67,
    availableDays: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
    nextAvailableSlot: 'Wednesday at 2:00 PM',
    telehealthAvailable: true,
    inPersonAvailable: true,
    location: 'Denver, CO & Telehealth'
  },
  {
    id: 'th-3',
    name: 'Sarah Chen-Morales',
    credentials: 'LCSW, C-DBT',
    title: 'Bicultural Mood & Somatic Psychotherapist',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=256',
    specialties: ['Major Depressive Disorder', 'Intergenerational Cultural Trauma', 'Somatic Regulation', 'Grief & Loss'],
    modalities: ['Mindfulness-Based (MBCT)', 'Cognitive Behavioral Therapy (CBT)', 'Acceptance & Commitment (ACT)'],
    insurances: ['Blue Cross Blue Shield', 'Cigna Healthcare', 'UnitedHealthcare / Optum', 'Medicare'],
    hourlyRate: 165,
    bio: 'Integrating somatic experiencing and dialectical behavioral strategies for lasting affective stabilization and empowering identity reclamation.',
    yearsExperience: 9,
    rating: 4.92,
    reviewCount: 52,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    nextAvailableSlot: 'Friday at 9:30 AM',
    telehealthAvailable: true,
    inPersonAvailable: false,
    location: 'San Francisco, CA (100% Telehealth)'
  }
];

export const mockPatients: Patient[] = [
  {
    id: 'pat-101',
    name: 'Claire Kensington',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256',
    email: 'claire.kensington@example.com',
    phone: '(512) 849-2041',
    age: 32,
    status: 'Active',
    primaryTherapistId: 'th-1',
    primaryTherapistName: 'Dr. Evelyn Vance',
    diagnosisCode: 'F43.12',
    diagnosisName: 'Post-Traumatic Stress Disorder, Chronic',
    intakeDate: '2026-03-14',
    lastSessionDate: '2026-10-14',
    nextSessionDate: '2026-10-21',
    totalSessionsCompleted: 18,
    insurance: 'Blue Cross Blue Shield',
    copayAmount: 30,
    outstandingBalance: 0,
    riskLevel: 'Moderate',
    treatmentGoals: [
      'Reduce SUD score on target memory to <= 2 via EMDR reprocessing',
      'Establish daily bilateral stimulation stabilization habit',
      'Increase sleep quality from 4 to 7 hours without nocturnal panic'
    ],
    emergencyContact: {
      name: 'David Kensington',
      relationship: 'Spouse',
      phone: '(512) 849-3388'
    }
  },
  {
    id: 'pat-102',
    name: 'Julian Montgomery',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256',
    email: 'julian.m@example.com',
    phone: '(303) 714-9922',
    age: 41,
    status: 'Active',
    primaryTherapistId: 'th-2',
    primaryTherapistName: 'Marcus Sterling',
    diagnosisCode: 'Z63.0',
    diagnosisName: 'Problems in Relationship with Spouse or Partner',
    intakeDate: '2026-06-02',
    lastSessionDate: '2026-10-15',
    nextSessionDate: '2026-10-22',
    totalSessionsCompleted: 12,
    insurance: 'Aetna',
    copayAmount: 25,
    outstandingBalance: 50,
    riskLevel: 'Low',
    treatmentGoals: [
      'De-escalate defensive stonewalling during conflict',
      'Express primary vulnerability rather than secondary resentment'
    ],
    emergencyContact: {
      name: 'Elena Vance-Montgomery',
      relationship: 'Partner',
      phone: '(303) 714-9930'
    }
  },
  {
    id: 'pat-103',
    name: 'Maya Linwood',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=256',
    email: 'maya.linwood@example.com',
    phone: '(415) 302-8819',
    age: 27,
    status: 'Active',
    primaryTherapistId: 'th-3',
    primaryTherapistName: 'Sarah Chen-Morales',
    diagnosisCode: 'F33.1',
    diagnosisName: 'Major Depressive Disorder, Recurrent, Moderate',
    intakeDate: '2026-08-10',
    lastSessionDate: '2026-10-18',
    nextSessionDate: '2026-10-25',
    totalSessionsCompleted: 8,
    insurance: 'UnitedHealthcare / Optum',
    copayAmount: 20,
    outstandingBalance: 0,
    riskLevel: 'High (Safety Plan Active)',
    treatmentGoals: [
      'Maintain adherence to Stanley-Brown Safety Plan',
      'Daily 15-minute somatic grounding exercise',
      'Re-engage in 2 weekly social connections'
    ],
    emergencyContact: {
      name: 'Grace Linwood',
      relationship: 'Sister',
      phone: '(415) 302-9900'
    }
  },
  {
    id: 'pat-104',
    name: 'Arthur Pendelton',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=256',
    email: 'a.pendelton@example.com',
    phone: '(512) 402-1144',
    age: 53,
    status: 'Onboarding',
    primaryTherapistId: 'th-1',
    primaryTherapistName: 'Dr. Evelyn Vance',
    diagnosisCode: 'F41.1',
    diagnosisName: 'Generalized Anxiety Disorder',
    intakeDate: '2026-10-18',
    lastSessionDate: 'N/A',
    nextSessionDate: '2026-10-20',
    totalSessionsCompleted: 0,
    insurance: 'Out-of-Pocket / Sliding Scale',
    copayAmount: 165,
    outstandingBalance: 0,
    riskLevel: 'Low',
    treatmentGoals: [
      'Complete initial comprehensive psychiatric intake assessment',
      'Identify cognitive distortions surrounding retirement and financial stress'
    ],
    emergencyContact: {
      name: 'Margaret Pendelton',
      relationship: 'Wife',
      phone: '(512) 402-1145'
    }
  }
];

export const mockSessions: Session[] = [
  {
    id: 'sess-01',
    patientId: 'pat-104',
    patientName: 'Arthur Pendelton',
    therapistId: 'th-1',
    therapistName: 'Dr. Evelyn Vance',
    date: '2026-10-20',
    time: '10:00 AM',
    durationMinutes: 60,
    status: 'Scheduled',
    cptCode: '90791 (Diagnostic Evaluation)',
    sessionType: 'Telehealth Video',
    videoRoomUrl: 'https://meet.growmytherapy.internal/session-90791-ap',
    hasSoapNote: false,
    copayPaid: true,
    fee: 195
  },
  {
    id: 'sess-02',
    patientId: 'pat-101',
    patientName: 'Claire Kensington',
    therapistId: 'th-1',
    therapistName: 'Dr. Evelyn Vance',
    date: '2026-10-21',
    time: '11:30 AM',
    durationMinutes: 53,
    status: 'Scheduled',
    cptCode: '90837 (Individual Psychotherapy 60m)',
    sessionType: 'In-Office Clinical',
    hasSoapNote: false,
    copayPaid: true,
    fee: 195
  },
  {
    id: 'sess-03',
    patientId: 'pat-102',
    patientName: 'Julian Montgomery',
    therapistId: 'th-2',
    therapistName: 'Marcus Sterling',
    date: '2026-10-22',
    time: '02:00 PM',
    durationMinutes: 50,
    status: 'Scheduled',
    cptCode: '90847 (Couples Therapy w/ Patient)',
    sessionType: 'Telehealth Video',
    videoRoomUrl: 'https://meet.growmytherapy.internal/session-90847-jm',
    hasSoapNote: false,
    copayPaid: false,
    fee: 180
  },
  {
    id: 'sess-04',
    patientId: 'pat-103',
    patientName: 'Maya Linwood',
    therapistId: 'th-3',
    therapistName: 'Sarah Chen-Morales',
    date: '2026-10-18',
    time: '01:00 PM',
    durationMinutes: 50,
    status: 'Completed',
    cptCode: '90837 (Individual Psychotherapy 60m)',
    sessionType: 'Telehealth Video',
    videoRoomUrl: 'https://meet.growmytherapy.internal/session-90837-ml',
    hasSoapNote: true,
    copayPaid: true,
    fee: 165
  },
  {
    id: 'sess-05',
    patientId: 'pat-101',
    patientName: 'Claire Kensington',
    therapistId: 'th-1',
    therapistName: 'Dr. Evelyn Vance',
    date: '2026-10-14',
    time: '11:30 AM',
    durationMinutes: 53,
    status: 'Completed',
    cptCode: '90837 (Individual Psychotherapy 60m)',
    sessionType: 'In-Office Clinical',
    hasSoapNote: true,
    copayPaid: true,
    fee: 195
  }
];

export const mockSoapNotes: SoapNote[] = [
  {
    id: 'soap-01',
    sessionId: 'sess-04',
    patientId: 'pat-103',
    patientName: 'Maya Linwood',
    therapistId: 'th-3',
    therapistName: 'Sarah Chen-Morales',
    sessionDate: '2026-10-18',
    cptCode: '90837',
    subjective: 'Client presented on telehealth on time. Endorsed persistent mild lethargy over weekend, rating baseline mood 4/10. Noted accomplishment in completing her resume draft, but reported heightened anticipatory dread regarding interviews.',
    objective: 'Affect was constricted but responsive to humor. Thought process logical, coherent, and goal-directed. Speech normal rate and tone. Grooming intact. No overt motor agitation or psychomotor retardation.',
    assessment: 'Major Depressive Disorder, recurrent moderate. Client is demonstrating incremental behavioral activation gains despite cognitive distortions. Denied active SI/HI intent or plan. Safety plan remains reviewed and verified.',
    plan: '1. Continue weekly 50-minute cognitive reframing.\n2. Client committed to two 15-minute walks before 12 PM.\n3. Resume mindfulness anchor during job search sessions.\n4. Next session booked for Oct 25.',
    riskAssessment: 'Low acute risk. Safety plan in place with sister Grace identified as first-line support contact.',
    isSigned: true,
    signedAt: '2026-10-18T14:02:18Z'
  },
  {
    id: 'soap-02',
    sessionId: 'sess-05',
    patientId: 'pat-101',
    patientName: 'Claire Kensington',
    therapistId: 'th-1',
    therapistName: 'Dr. Evelyn Vance',
    sessionDate: '2026-10-14',
    cptCode: '90837',
    subjective: 'Client arrived for in-office session reporting significant reduction in nocturnal flashbacks following last week EMDR phase 4 session. Reported feeling "more grounded in my body for the first time in years."',
    objective: 'Alert, engaged, and oriented x4. Eye contact sustained and relaxed. Bilateral tapping protocol performed smoothly without abreaction.',
    assessment: 'PTSD symptoms showing meaningful desensitization on index memory. SUD dropped from 7 to 2 during processing.',
    plan: 'Continue Phase 5 installation of positive cognition ("I am safe and capable in the present"). Follow-up on Oct 21.',
    riskAssessment: 'Denies SI/HI. Protective factors robust.',
    isSigned: true,
    signedAt: '2026-10-14T12:35:10Z'
  }
];

export const mockBillingClaims: BillingClaim[] = [
  {
    id: 'claim-901',
    claimNumber: 'CLM-2026-8819',
    patientId: 'pat-101',
    patientName: 'Claire Kensington',
    insuranceName: 'Blue Cross Blue Shield',
    dateOfService: '2026-10-14',
    cptCode: '90837',
    cptDescription: 'Psychotherapy, 60 minutes with patient',
    billedAmount: 195.00,
    allowedAmount: 145.00,
    patientResponsibility: 30.00,
    insurancePaid: 115.00,
    status: 'Paid'
  },
  {
    id: 'claim-902',
    claimNumber: 'CLM-2026-8824',
    patientId: 'pat-102',
    patientName: 'Julian Montgomery',
    insuranceName: 'Aetna',
    dateOfService: '2026-10-15',
    cptCode: '90847',
    cptDescription: 'Family/Couples psychotherapy with patient present',
    billedAmount: 180.00,
    allowedAmount: 135.00,
    patientResponsibility: 25.00,
    insurancePaid: 110.00,
    status: 'Pending'
  },
  {
    id: 'claim-903',
    claimNumber: 'CLM-2026-8830',
    patientId: 'pat-103',
    patientName: 'Maya Linwood',
    insuranceName: 'UnitedHealthcare / Optum',
    dateOfService: '2026-10-18',
    cptCode: '90837',
    cptDescription: 'Psychotherapy, 60 minutes with patient',
    billedAmount: 165.00,
    allowedAmount: 125.00,
    patientResponsibility: 20.00,
    insurancePaid: 105.00,
    status: 'Under Review'
  }
];

export const mockPracticeMetrics: PracticeMetrics = {
  activePatients: 48,
  activePatientsGrowth: 14.2,
  monthlyRevenue: 28450,
  monthlyRevenueGrowth: 18.5,
  utilizationRate: 89.2,
  utilizationRateGrowth: 6.4,
  noShowRate: 2.8,
  noShowRateDelta: -1.4,
  intakeConversionRate: 78.4,
  intakeConversionGrowth: 11.2,
  avgRevenuePerSession: 172.50
};
