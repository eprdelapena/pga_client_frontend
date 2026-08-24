import {ImageResponse} from 'next/og';

export const runtime = 'edge';
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
        background: '#0b3d2d',
        color: '#f6f2e8',
        padding: '72px 84px',
        position: 'relative',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{position: 'absolute', width: 420, height: 420, border: '1px solid rgba(255,255,255,.18)', borderRadius: 999, right: -60, top: 92}}/>
      <div style={{position: 'absolute', width: 270, height: 270, border: '1px solid rgba(255,255,255,.12)', borderRadius: 999, right: 18, top: 168}}/>
      <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', zIndex: 1}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 18}}>
          <div style={{width: 82, height: 82, border: '1px solid rgba(255,255,255,.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 27, letterSpacing: 2}}>PGA</div>
          <div style={{display: 'flex', flexDirection: 'column', fontSize: 22, lineHeight: 1.2}}><b>Prestige</b><span>Golf Access & Clubshares</span></div>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', maxWidth: 860}}>
          <span style={{fontSize: 18, letterSpacing: 4, textTransform: 'uppercase', opacity: .7}}>Club-share brokerage · Philippines</span>
          <div style={{fontSize: 66, lineHeight: 1.02, marginTop: 20}}>Prestige in every membership.<br/><i style={{color: '#b8d17e'}}>Opportunity in every share.</i></div>
        </div>
      </div>
    </div>,
    size,
  );
}
