import { ImageResponse } from 'next/og';

export const alt = 'Thyleads - Outbound for SaaS That Drives Revenue';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background:
            'linear-gradient(135deg, #5F08FF 0%, #3A05A8 60%, #1A0250 100%)',
          color: 'white',
          padding: '80px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 60,
            left: 60,
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 12,
              background: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#5F08FF',
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: '-2px',
            }}
          >
            T
          </div>
        </div>

        <div
          style={{
            fontSize: 132,
            fontWeight: 800,
            letterSpacing: '-6px',
            lineHeight: 1,
            marginBottom: 32,
          }}
        >
          Thyleads
        </div>

        <div
          style={{
            fontSize: 44,
            fontWeight: 500,
            textAlign: 'center',
            maxWidth: 900,
            lineHeight: 1.2,
            opacity: 0.95,
          }}
        >
          Outbound for SaaS That Drives Revenue
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 60,
            right: 60,
            fontSize: 28,
            fontWeight: 600,
            opacity: 0.85,
            letterSpacing: '-0.5px',
          }}
        >
          thyleads.com
        </div>
      </div>
    ),
    { ...size },
  );
}
