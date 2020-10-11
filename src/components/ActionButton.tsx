import React, { FC, useState, useEffect } from 'react';
import { View } from '../native';
import styles from './ActionButton.module.scss';
import '../theme.module.scss';
import Icon from './Icon';

import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';

interface Props {
  size: 'sm' | 'md' | 'lg' | 'xl';
  onClick: (e: Event) => void;
  onPressAndHold?: Function;
  className?: string;
  style?: Object;
  inverted?: boolean;
  disabled?: boolean;
  disableAnimation?: boolean;
  icon?: FontAwesomeIconProps['icon'];
}

export const ActionButton: FC<React.PropsWithChildren<Props>> = ({
  children,
  onClick,
  size,
  className,
  style,
  inverted,
  disabled = false,
  icon,
  disableAnimation = false,
}) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      if (isAnimating) {
        setIsAnimating(false);
      }
    }, 200);
  }, [isAnimating]);

  return (
    <View
      style={style}
      onClick={(e: Event) => {
        e.preventDefault();
        if (!disabled) {
          setIsAnimating(true);
          onClick(e);
        }
      }}
      className={
        styles.ActionButton +
        ' ' +
        styles[size] +
        ' ' +
        className +
        ' ' +
        (inverted && styles.inverted) +
        ' ' +
        (disabled && styles.disabled) +
        ' ' +
        (!disableAnimation &&
          isAnimating &&
          (inverted ? 'animToInverted' : 'animFromInverted'))
      }
    >
      {icon ? <Icon icon={icon} /> : null}
      {children}
    </View>
  );
};
