import './globals.css';

export const metadata = {
  title: 'AppFinder - Best Free Software & Open Source Desktop Apps Directory',
  description: 'Search thousands of verified open-source tools, free desktop applications, and productivity software with direct links to official download pages. Zero malware, zero adware.',
  keywords: ['free software', 'open source apps', 'desktop software', 'windows apps', 'mac software', 'linux apps', 'getintopc', 'free pc apps'],
  authors: [{ name: 'AppFinder Team' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'AppFinder - Safe & Official Free Software Directory',
    description: 'Discover top free & open-source desktop apps for Windows, macOS, Linux, Android, and iOS.',
    siteName: 'AppFinder',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('appfinder_theme');
                  var isDark = saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (isDark) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="antialiased bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen">
        {children}
      </body>
    </html>
  );
}
