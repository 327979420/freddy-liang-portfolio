import type { Metadata } from 'next';
import '@fontsource-variable/inter-tight';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource-variable/archivo/wdth.css';
import 'lenis/dist/lenis.css';
import './globals.css';

export const metadata: Metadata = {
  title: 'Freddy Liang — Systems / Clarity / Insight',
  description: 'Selected work in systems, data analysis, and practical problem solving.',
  icons: { icon: '/favicon.svg' },
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `
          if (new URLSearchParams(location.search).get('intro') === 'off' || location.hash) {
            document.documentElement.dataset.intro = 'off';
          }
        ` }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
