import {ImageResponse} from 'next/og';

export const runtime = 'nodejs';
export const alt = 'Prestige Golf Access & Clubshares, Inc.';
export const size = {width: 1200, height: 630};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0b3d2d',
        color: '#f6f2e8',
        padding: '72px 84px',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
        <div
          style={{
            width: 82,
            height: 82,
            border: '1px solid rgba(255,255,255,.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 27,
            letterSpacing: 2,
          }}
        >
          PGA
        </div>
        <div style={{display: 'flex', flexDirection: 'column', fontSize: 22, lineHeight: 1.2}}>
          <b>Prestige</b>
          <span>Golf Access &amp; Clubshares</span>
        </div>
      </div>

      <div style={{display: 'flex', flexDirection: 'column', maxWidth: 900}}>
        <span style={{fontSize: 18, letterSpacing: 4, textTransform: 'uppercase', opacity: 0.7}}>
          Club-share brokerage · Philippines
        </span>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            fontSize: 66,
            lineHeight: 1.02,
            marginTop: 20,
          }}
        >
          <span>Prestige in every membership.</span>
          <span style={{color: '#b8d17e', fontStyle: 'italic'}}>Opportunity in every share.</span>
        </div>
      </div>
    </div>,
    size,
  );
}
