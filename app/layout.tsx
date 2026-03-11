import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mushee',
  description: 'Multi-agent AI orchestration demo for decentralized inference infrastructure.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
