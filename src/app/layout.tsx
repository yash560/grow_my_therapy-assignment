import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Grow My Therapy — Practice Growth, Clinical Intake & Therapist Management Platform',
  description: 'Enterprise EHR, clinical care matchmaker, HIPAA-compliant patient intake, SOAP notes, billing, and therapist practice scaling suite.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen bg-[#f8fafc] dark:bg-[#090d16] text-[#0f172a] dark:text-[#f8fafc]">
        {children}
      </body>
    </html>
  );
}
