import { ImageResponse } from 'next/og';

export const alt = 'AppScout - Verified Free Software & Pro APK Downloads';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0b0f19 0%, #1e1b4b 50%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '60px 70px',
          fontFamily: 'sans-serif',
          color: '#ffffff',
          position: 'relative',
        }}
      >
        {/* Glow Effects */}
        <div
          style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.35) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-100px',
            left: '200px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(6, 182, 212, 0.25) 0%, transparent 70%)',
          }}
        />

        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '18px',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '28px',
            }}
          >
            🚀
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '32px', fontWeight: '900', letterSpacing: '-0.5px' }}>
              AppScout
            </span>
            <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Open Software Index
            </span>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 18px',
              borderRadius: '50px',
              background: 'rgba(99, 102, 241, 0.15)',
              border: '1px solid rgba(99, 102, 241, 0.3)',
              color: '#a5b4fc',
              fontSize: '15px',
              fontWeight: '700',
            }}
          >
            100% Free &amp; Malware-Free Software Directory
          </div>
          <h1
            style={{
              fontSize: '52px',
              fontWeight: '900',
              lineHeight: '1.15',
              letterSpacing: '-1.5px',
              margin: '0',
            }}
          >
            Download Free Pro Apps, Unlocked APKs &amp; Verified Software
          </h1>
          <p
            style={{
              fontSize: '20px',
              color: '#cbd5e1',
              margin: '0',
              lineHeight: '1.4',
            }}
          >
            Curated open-source software, desktop tools, and mobile apps with direct official download mirrors for Windows, Mac, Linux, Android &amp; iOS.
          </p>
        </div>

        {/* Bottom Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingTop: '24px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div style={{ display: 'flex', gap: '24px', fontSize: '16px', color: '#94a3b8', fontWeight: '600' }}>
            <span>• 10,000+ Downloads</span>
            <span>• Official Publisher Mirrors</span>
            <span>• Zero Adware</span>
          </div>
          <div
            style={{
              padding: '10px 22px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '800',
            }}
          >
            appscout.io
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
