import { Metadata } from 'next';

export function generateMetadata(): Metadata {
  console.log('Generating metadata...');
  console.log('NEXT_PUBLIC_APP_TITLE:', process.env.NEXT_PUBLIC_APP_TITLE);
  console.log('NEXT_PUBLIC_APP_DESCRIPTION:', process.env.NEXT_PUBLIC_APP_DESCRIPTION); 
  return {
    title: process.env.NEXT_PUBLIC_APP_TITLE,
    description: process.env.NEXT_PUBLIC_APP_DESCRIPTION
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
