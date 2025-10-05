import React from 'react';

const ProgressBar = ({ current, total }) => {
  const pct = Math.max(0, Math.min(1, current / total));
  return (
    <div aria-label="Progress" aria-valuemin={1} aria-valuemax={total} aria-valuenow={current} role="progressbar" style={wrap}>
      <div style={{ ...bar, width: `${pct * 100}%` }} />
    </div>
  );
};

const wrap = { position:'absolute', left: 24, right: 24, bottom: 12, height: 10, background:'rgba(255,255,255,.15)', borderRadius: 8 };
const bar = { height: '100%', background: 'linear-gradient(90deg,#ffea00,#ff7043)', borderRadius: 8 };

export default ProgressBar;


