import { View, Input } from '../native';
import React, { FC } from 'react';
import styles from './styles/Page.module.scss';
import theme from '../theme.module.scss';

interface PageProps {
  title?: string;
  headerElement?: React.ReactElement;
  prefixElement?: React.ReactElement;
  editable?: boolean;
  onHeaderClick?: (e: any) => void;
}

export const Page: FC<React.PropsWithChildren<PageProps>> = ({
  title,
  headerElement,
  children,
  editable = true,
  onHeaderClick,
  prefixElement,
}) => {
  return (
    <View className={styles.body}>
      <img src="/bg_test.jpg"/>
      <header onClick={onHeaderClick}>
        {prefixElement}
        {!prefixElement && <View />}
        {editable ? (
          <Input value={title || ''} />
        ) : (
          <h1
            style={{
              fontSize: theme.fontSize,
              margin: 'auto',
              marginLeft: '10px',
            }}
          >
            {title}
          </h1>
        )}
        {headerElement}
        {!headerElement && <View />}
      </header>

      {children}
    </View>
  );
};
