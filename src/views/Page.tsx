import { View, Input } from '../native';
import React, { FC, CSSProperties } from 'react';
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
    <View style={styles.body}>
      <img src="/bg_test.jpg" style={styles.backgroundImage as CSSProperties}/>
      <header style={styles.header as CSSProperties} onClick={onHeaderClick}>
        <View style={styles.prefix}>{prefixElement}</View>
        <View style={styles.titleWrapper}>
          {editable ? (
            <Input value={title || ''} />
          ) : (
            <h1 style={styles.title as CSSProperties}>{title}</h1>
          )}
        </View>
        <View style={styles.postfix}>{headerElement}</View>
      </header>

      {children}
    </View>
  );
};

const styles = {
  body: {
    //backgroundColor: theme.primary,
    height: '100vh',
    maxHeight: '100vh',
  },
  header: {
    height: '10vh',
    backgroundColor: theme.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 10,
    position: 'relative',
    boxShadow: "0px 4px 6px black",
  },
  titleWrapper: {
    flexGrow: 1,
    paddingRight: '10px',
    overflow: 'hidden',
    maxWidth: '75%',
  },
  title: {
    fontSize: theme.fontSize,
    marginLeft: '10px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  prefix: {},
  postfix: {
    justifySelf: 'flex-end',
    marginLeft: 'auto',
  },
  backgroundImage: {
      width: "auto",
      maxWidth: "100%",
      height: "100%",
      zIndex: "-1",
      top: "0",
      left: "0",
      position: "absolute",
      filter: "blur(2px) brightness(70%) saturate(88%)",
  },
};
