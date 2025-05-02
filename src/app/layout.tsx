import '../shared/styles/globals.css';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import React from 'react';

import CssBaseline from '@mui/material/CssBaseline';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';

import ClockProvider from '@/shared/components/clock/Clock';
import { AppThemeProvider } from '@/shared/contexts';

export function generateMetadata(): Metadata {
  console.log('Generating metadata...');
  console.log('NEXT_PUBLIC_APP_TITLE:', process.env.NEXT_PUBLIC_APP_TITLE);
  console.log('NEXT_PUBLIC_APP_DESCRIPTION:', process.env.NEXT_PUBLIC_APP_DESCRIPTION);
  return {
    title: process.env.NEXT_PUBLIC_APP_TITLE,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION,
  };
}

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.className}>
      <AppRouterCacheProvider>
        <body style={{ margin: 0, padding: 0 }}>
          <AppThemeProvider>
            <ClockProvider>
              <React.Fragment>
                <CssBaseline />
                {children}
              </React.Fragment>
            </ClockProvider>
          </AppThemeProvider>
        </body>
      </AppRouterCacheProvider>
    </html>
  );
}
