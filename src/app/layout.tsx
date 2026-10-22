import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://grow-my-therapy-black-one.vercel.app'),
  title: 'Grow My Therapy — Clinical EHR, Telehealth & Practice Scaling Platform',
  description:
    'Enterprise clinical EHR, intelligent patient care matchmaker, HIPAA-compliant patient intake, SOAP notes, billing, and therapist practice scaling suite. Powered by TheWebVale.',
  keywords: [
    'Grow My Therapy',
    'Clinical EHR',
    'Therapist Practice Management',
    'Mental Health Intake',
    'SOAP Notes Charting',
    'Superbill Generator',
    'HIPAA Compliant',
    'TheWebVale',
    'Next.js 15',
  ],
  authors: [{ name: 'Grow My Therapy & TheWebVale' }],
  creator: 'TheWebVale',
  publisher: 'Grow My Therapy',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://grow-my-therapy-black-one.vercel.app',
    siteName: 'Grow My Therapy',
    title: 'Grow My Therapy — Clinical Care & Practice Scaling Platform | Powered by TheWebVale',
    description:
      'HIPAA-compliant clinical care matchmaker, electronic health records, SOAP notes, and CMS-1500 superbill generation for mental health practitioners.',
    images: [
      {
        url: 'https://grow-my-therapy-black-one.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Grow My Therapy Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Grow My Therapy — EHR & Patient Care Platform | Powered by TheWebVale',
    description:
      'Clinical intake, modality matchmaker, and practice management suite for mental health professionals. Powered by TheWebVale.',
    images: ['https://grow-my-therapy-black-one.vercel.app/og-image.png'],
    creator: '@TheWebVale',
  },
  alternates: {
    canonical: 'https://grow-my-therapy-black-one.vercel.app',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🌿</text></svg>" />
      </head>
      <body className="antialiased min-h-screen bg-[#f8fafc] dark:bg-[#090d16] text-[#0f172a] dark:text-[#f8fafc]">
        {children}
      </body>
    </html>
  );
}
