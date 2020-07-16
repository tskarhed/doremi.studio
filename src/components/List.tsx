import React, { FC, RefObject, MouseEvent } from 'react';
import { Link } from 'react-router-dom';
import { View } from '../native';
import styles from './List.module.scss';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faMusic, faListUl } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

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
              <Icon icon={type === 'song' ? faMusic : faListUl} />
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
