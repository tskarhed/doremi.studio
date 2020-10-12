import { motion } from 'framer-motion';
import React, { FC, MouseEvent, RefObject } from 'react';
import { Link } from 'react-router-dom';
import { View } from '../native';
import Icon from './Icon';
import styles from './List.module.scss';

interface ListItemProps {
  to: string; // Vars den länkar
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
      <motion.li initial={{ y: 10, opacity: 0 }} variants={animations.listItem}>
        <Link onClick={onClick} ref={ref} to={to} className={styles.wrapper}>
          {type && (
            <View className={styles.type}>
              <Icon icon={type === 'song' ? 'music' : 'list-ul'} />
            </View>
          )}
          <View className={styles.children}>{children}</View>

          {actionComponent && (
            <View className={styles.actionComponent}>{actionComponent}</View>
          )}
        </Link>
      </motion.li>
    );
  }
);

// Should probably type this properly
export const List: FC<any> = ({ children, style, ...restProps }) => {
  return (
    <motion.ul
      style={{ ...style, padding: 0, margin: 0 }}
      variants={animations.list}
      animate="appear"
      {...restProps}
    >
      {children}
    </motion.ul>
  );
};

const animations = {
  list: {
    appear: {
      transition: { staggerChildren: 0.03 },
    },
  },
  listItem: {
    appear: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
  },
};
