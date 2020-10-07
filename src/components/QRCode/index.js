import React from 'react';
import { useQRCode } from 'react-hook-qrcode';

export default function QRCode({ code = '' }) {
  const [inputRef] = useQRCode({
    text: code,
    options: {
      level: 'M',
      margin: 7,
      scale: 1,
      width: 200,
    },
  });
  
  return <canvas ref={inputRef} />;
};