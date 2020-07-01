import { View, Input } from '../native';
import React, { FC, CSSProperties } from 'react';
import theme from '../theme.module.scss';
import { useSelector } from 'react-redux';
import { StoreState } from '../state/types';
import { Search } from '../components/Search';

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
  const state = useSelector((state: StoreState) => state);

  return (
    <>
      {state.isSearching && (
        <Search
          isSearching={state.isSearching}
          setlists={state.setlists}
          songs={state.songs}
        />
      )}
      <View style={styles.body}>
        
        <div style={styles.backgroundImage as CSSProperties}>
          
        </div>
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
    </>
  );
};

const styles = {
  body: {
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
      width: "100%",
      maxWidth: "100%",
      height: "100%",
      zIndex: "-1",
      top: "0",
      left: "0",
      position: "absolute",
      background: "url(/bg_test.jpg) repeat",
      filter: "blur(5px) brightness(100%) sepia(2%)",
  },
};
