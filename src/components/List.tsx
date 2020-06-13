import React, { FC, RefObject, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { View } from '../native';
import styles from './List.module.scss';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faMusic, faListUl } from '@fortawesome/free-solid-svg-icons';

interface ListItemProps {
  to: string;   // Vars den länkar
  type?: 'song' | 'setlist';
  actionComponent?: React.ReactElement;
  ref?: RefObject<any>;
  onClick?: (event: MouseEvent<any>) => void;
}

export const ListItem: FC<React.PropsWithChildren<
  ListItemProps
>> = React.forwardRef(
  ({ to, children, type, actionComponent, onClick }, ref) => {
    return (
      <Link onClick={onClick} ref={ref} to={to} className={styles.wrapper}>
        {type && (
          <View className={styles.type}>
            <Icon icon={type === 'song' ? faMusic : faListUl} />
          </View>
        )}
        <View className={styles.children}>{children}</View>

        {actionComponent && (
          <View className={styles.actionComponent}>{actionComponent}</View>
        )}
      </Link>
    );
  }
);
