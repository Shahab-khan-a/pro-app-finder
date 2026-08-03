import './globals.css';

export const metadata = {
  title: 'AppScout - Free APKs, Mods & Premium App Downloads',
  description: 'Find the latest free pro apps, unlocked APKs, modded apps, and direct download links for Android, iOS, Windows, macOS, and Linux. Search top apps like TikTok Live, Wink Video Retouch, Alight Motion, Remini, Lightroom Pro, Truecaller Gold, and Filmora Pro.',
  keywords: ['pro apk', 'free pro apps', 'mod apk', 'apk download', 'apk mirror', 'android apk', 'app scout', 'premium app download', 'apk mods', 'free app store', 'TikTok Live', 'Wink Video Retouch', 'Alight Motion', 'Remini', 'Lightroom Pro', 'Truecaller Gold', 'Filmora Pro'],
  authors: [{ name: 'AppScout' }],
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: 'AppScout - Free APKs, Mods & Premium App Downloads',
    description: 'Browse unlocked APKs, premium app mods, and free pro software with direct download links and app recommendations.',
    siteName: 'AppScout',
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
