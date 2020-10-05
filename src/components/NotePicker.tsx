import React, { FC, CSSProperties, ChangeEvent, useState } from 'react';
import { View } from '../native';
import theme from '../theme.module.scss';
import { ActionButton } from './ActionButton';

export const NotePicker = () => {
  const note = 'A';

  const [isGClef, setisGClef] = useState(false);
  const [clicks, setClicks] = useState(0);
  const cx = 20;
  const cy = 20;
  const r = 5;
  return (
    <view style={wrapper as CSSProperties}>
      <div style={{ maxHeight: '35%', width: '35%' }}>
        {isGClef ? (
          <img
            src="/G-clef.svg"
            alt="G-clef"
            // style={{ height: '20%', width: '20%' }}
            onClick={() => setisGClef(!isGClef)}
          />
        ) : (
          <img
            src="/F-clef.svg"
            alt="F-clef"
            // style={{ height: '20%', width: '20%' }}
            onClick={() => setisGClef(!isGClef)}
          />
        )}
      </div>
      <img src="/bar.svg" alt="/bar.svg" />
      <p>Clicks: {clicks}</p>

      <ActionButton
        inverted
        icon="plus"
        size="sm"
        onClick={() => setClicks(clicks + 1)}
        style={{ position: 'relative' }}
      />
      <ActionButton
        inverted
        icon="play"
        size="sm"
        onClick={() => setClicks(clicks - 1)}
        style={{ position: 'relative' }}
      />
      <svg
        style={
          {
            position: 'relative',
            top: -5 * clicks,
            left: 0,
            zIndex: 10,
          } as CSSProperties
        }
      >
        <circle cx={cx} cy={cy} r={r} fill="red" />
      </svg>
    </view>
  );
};

// Skapa style här
const noteAddLayout = {
  textAlign: 'center',
  textShadow: '0 0 5px black',
  padding: '10% 10%',
  fontSize: '1.3rem',
  whiteSpace: 'pre-wrap',
  height: '100%',
  width: '100%',
  boxSizing: 'border-box',
  zIndex: 0,
  backgroundColor: 'white',
};

const wrapper = {
  display: 'flex',
  backgroundColor: '#ffffff',
  color: '000000',
  maxWidth: '100%',
  textDecoration: 'none',
  minHeight: '70px',
  margin: '8px 5px',
  padding: '2px 10px',
  borderRadius: '5px',
  boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.8)',
  // cursor: 'pointer',
};
