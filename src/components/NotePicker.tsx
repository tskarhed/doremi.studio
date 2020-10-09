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
    <div>
      <view style={wrapper as CSSProperties}>
        <p style={{ color: '#000' } as CSSProperties}>Choose a note to add!</p>
        <div
          style={
            {
              flexDirection: 'row',
              display: 'flex',
              maxHeight: '35%',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'space-around',
              // padding: '15px 0',
            } as CSSProperties
          }
        >
          <div
            style={
              {
                maxHeight: '20px',
                maxWidth: '14px',
                alignItems: 'center',
                color: '#000',
                fontSize: '0.55rem',
              } as CSSProperties
            }
          >
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
            <p>Toggle clef</p>
          </div>
          <div>
            <img src="/bar.svg" alt="/bar.svg" />
            {/* <svg>
              <circle cx={cx} cy={cy} r={r} fill="red" />
            </svg> */}
          </div>
          <div>
            <ActionButton
              inverted
              icon="prev"
              size="sm"
              onClick={() => setClicks(clicks + 1)}
              style={{ position: 'relative' }}
            />
            <ActionButton
              inverted
              icon="next"
              size="sm"
              onClick={() => setClicks(clicks - 1)}
              style={{ position: 'relative' }}
            />
          </div>
        </div>
        <p style={{ color: '#000' } as CSSProperties}>Clicks: {clicks}</p>
        <div
          style={
            {
              flexDirection: 'row',
              display: 'flex',
              maxHeight: '35%',
              width: '50%',
              alignItems: 'center',
              justifyContent: 'space-around',
            } as CSSProperties
          }
        >
          <ActionButton
            inverted
            icon="play"
            size="sm"
            onClick={() => setClicks(clicks - 1)}
            style={{ position: 'relative' }}
          />
          <ActionButton
            inverted
            icon="plus"
            size="sm"
            onClick={() => setClicks(clicks - 1)}
            style={{ position: 'relative' }}
          />
        </div>
      </view>
    </div>
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
  flexDirection: 'column',
  alignItems: 'center',
  alignContent: 'space-between',
  display: 'flex',
  backgroundColor: '#ffffff',
  color: '000000',
  maxWidth: '100%',
  textDecoration: 'none',
  minHeight: '70px',
  margin: '8px 5px',
  padding: '2%',
  borderRadius: '5px',
  boxShadow: '0 2px 5px 0px rgba(0, 0, 0, 0.8)',
  // cursor: 'pointer',
};
