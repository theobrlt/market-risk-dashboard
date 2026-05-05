import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Market Risk Dashboard',
  description: 'Real-time financial indicators for systemic risk monitoring',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
