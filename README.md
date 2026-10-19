# 🌿 Grow My Therapy — Practice Growth, Clinical Intake & Therapist Management Platform

> **Clinical EHR, Intelligent Care Matchmaker, and Practice Scaling Architecture for Mental Health Professionals**  
> *Engineered for Grow My Therapy (Front End Development Technical Showcase) by Yash Jain.*

[![Next.js 15](https://img.shields.io/badge/Next.js-15.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![HIPAA Compliant](https://img.shields.io/badge/Security-HIPAA_Secured-teal?style=for-the-badge&logo=shield)](https://www.hhs.gov/hipaa/)

---

## 🌟 Executive Overview

**Grow My Therapy** is an end-to-end clinical operations and patient acquisition web platform tailored specifically for private-practice therapists, counselors, psychologists, and group clinics. It bridges the gap between high-converting client discovery and comprehensive clinical practice management:

1. **Intelligent Care Matchmaker & Clinical Intake Wizard**: A 4-step evidence-based questionnaire evaluating presenting concerns (Trauma/PTSD, Anxiety, Depression, Relationship Distress, ADHD), preferred therapeutic modalities (EMDR, CBT, Somatic/MBCT, Couples EFT), and insurance plans (Blue Cross, Aetna, Cigna, Optum, Sliding Scale) to compute instant percentage compatibility matches.
2. **Practice Command Center**: Executive KPI analytics with multi-horizon period filtering (Today, This Week, This Month, All Time) tracking Active Clients, Monthly Revenue ($28,450 +18.5%), Clinical Utilization (89.2%), Show-Up Adherence (97.2%), and an end-to-end Intake Growth Funnel.
3. **Patient Clinical Directory**: Searchable, filterable client registry with ICD-10 psychiatric diagnostic codes, crisis safety plan flags, treatment plan goals, and emergency contact protocols.
4. **Clinical SOAP Documentation Engine**: Standardized EHR charting (Subjective, Objective, Assessment, Plan, Risk Assessment) with rapid diagnostic templates and cryptographic digital signature locking.
5. **Billing, Claims & Superbill Export Suite**: In-flight insurance claims ledger and CMS-1500 compliant Out-of-Network Superbill generator with provider NPI (1982847192), Tax ID, and instant PDF print export.
6. **Public Practitioner Growth Showcase**: High-converting therapist landing page preview demonstrating Grow My Therapy's marketing and client booking engine.

---

## 🛠️ Architecture & Tech Stack

- **Framework**: Next.js 15 (App Router, Turbopack ready)
- **UI Runtime**: React 19 (Server & Client Components)
- **Styling**: Tailwind CSS v4 with custom `@custom-variant dark (&:where(.dark, .dark *));`
- **Type Safety**: TypeScript 5.0 (Strict mode, zero `any` shortcuts)
- **Icons**: Lucide React
- **Micro-Interactions**: Canvas Confetti for appointment & chart completion
- **Testing**: Automated Headless Chromium Playwright QA Suite

---

## 🧪 Automated Verification & Testing

The platform was deterministically verified using an automated Playwright headless Chromium QA test:
- **Light & Dark Mode**: Toggles theme, asserts computed body background contrast (`rgb(248, 250, 252)` vs `rgb(9, 13, 22)`), and captures multi-theme regression screenshots.
- **Form & Flow Verification**: Tests 4-step Care Matchmaker progression, client search, dossier modal, SOAP note templates, Superbill export, and instant booking modal.
- **Zero Runtime Errors**: 0 console warnings or uncaught exceptions detected across all flows.

---

## 🚀 Getting Started

```bash
# Clone repository
git clone git@github-yash560:yash560/grow_my_therapy-assignment.git
cd grow_my_therapy-assignment

# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
npm run start
```

---

## 👤 Author
**Yash Jain** — Founder & Technical Architect  
*TheWebVale / Brane OS* • [GitHub](https://github.com/yash560)
