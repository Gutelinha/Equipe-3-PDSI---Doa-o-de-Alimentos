import React from 'react';

function ConnectingLines() {
  return (
    <svg 
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    >
      <path
        d="M 50% 30% L 25% 50% M 50% 30% L 75% 50% M 50% 30% L 50% 70%"
        stroke="#D3D3D3"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

export default ConnectingLines;