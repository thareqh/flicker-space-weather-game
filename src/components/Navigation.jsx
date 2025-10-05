import React from 'react';

const Navigation = ({ onNext, onPrev, canNext = true }) => {
  return (
    <div style={wrap}>
      <button aria-label="Previous" onClick={onPrev} style={btn}>&lt;</button>
      <button aria-label="Next" onClick={onNext} disabled={!canNext} style={btn}>&gt;</button>
    </div>
  );
};

const wrap = { position:'absolute', inset: 0, display:'flex', alignItems:'center', justifyContent:'space-between', pointerEvents:'none' };
const btn = { pointerEvents:'auto', background:'linear-gradient(180deg,#ffd54f,#ff7043)', color:'#1b1b1b', border:'none', borderRadius:16, width:64, height:64, fontSize:28, cursor:'pointer', margin:16 };

export default Navigation;


