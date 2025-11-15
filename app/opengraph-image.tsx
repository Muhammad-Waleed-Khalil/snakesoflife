import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Snakes of Life - Expose the Fakes';
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
          background: 'linear-gradient(135deg, #0A0A0A 0%, #1A1A1A 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        {/* Background pattern */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0.1,
            backgroundImage: 'repeating-linear-gradient(45deg, #00FF41 0px, #00FF41 2px, transparent 2px, transparent 10px)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px',
          }}
        >
          <div style={{ fontSize: 120, marginBottom: 20 }}>🐍</div>

          <h1
            style={{
              fontSize: 80,
              fontWeight: 'bold',
              color: '#DC143C',
              marginBottom: 20,
              textShadow: '4px 4px 0 #00FF41, -2px -2px 0 #DC143C',
            }}
          >
            Snakes of Life
          </h1>

          <p
            style={{
              fontSize: 36,
              color: '#00FF41',
              marginBottom: 30,
              fontWeight: 'bold',
            }}
          >
            Expose the Fakes, Embrace the Truth
          </p>

          <p
            style={{
              fontSize: 24,
              color: '#888',
              maxWidth: 800,
            }}
          >
            Anonymous • Encrypted • Cathartic
          </p>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
