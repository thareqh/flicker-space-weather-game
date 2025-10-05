import React from 'react';

const AudioPlayer = ({ src, autoPlay = false, loop = false, onEnded }) => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (autoPlay && ref.current) {
      const p = ref.current.play();
      if (p && p.catch) p.catch(() => {});
    }
  }, [src, autoPlay]);
  return (
    <audio ref={ref} src={src} loop={loop} onEnded={onEnded} aria-hidden="true" />
  );
};

export default AudioPlayer;


