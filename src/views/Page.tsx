import { View, Input } from '../native';
import React, { FC, CSSProperties, useState } from 'react';
import theme from '../theme.module.scss';
import { useSelector } from 'react-redux';
import { StoreState } from '../state/types';
import { Search } from '../components/Search';

interface PageProps {
  title?: string;
  headerElement?: React.ReactElement;
  prefixElement?: React.ReactElement;
  footer?: React.ReactElement;
  editable?: boolean;
  onHeaderClick?: (e: any) => void;
  onTitleChange?: (newTitle: string) => void;
}

export const Page: FC<React.PropsWithChildren<PageProps>> = ({
  title,
  onTitleChange,
  headerElement,
  children,
  footer,
  editable = true,
  onHeaderClick,
  prefixElement,
}) => {
  const state = useSelector((state: StoreState) => state);
  const [tempTitle, setTempTitle] = useState(title || '');
  return (
    <>
      {state.isSearching && (
        <Search
          isSearching={state.isSearching}
          setlists={state.setlists}
          songs={state.songs}
        />
      )}
      <View style={styles.body} className="wtf">
        <div style={styles.backgroundImage as CSSProperties}></div>
        <header style={styles.header as CSSProperties} onClick={onHeaderClick}>
          <View style={styles.prefix}>{prefixElement}</View>
          <View style={styles.titleWrapper}>
            {editable ? (
              <Input
                onBlur={() => {
                  onTitleChange && onTitleChange(tempTitle);
                }}
                onChange={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  setTempTitle(event.currentTarget.value);
                }}
                value={tempTitle}
              />
            ) : (
              <h1 style={styles.title as CSSProperties}>{title}</h1>
            )}
          </View>
          <View style={styles.postfix}>{headerElement}</View>
        </header>
        <main style={styles.main}>{children}</main>
        <footer>{footer}</footer>
      </View>
    </>
  );
};

const styles = {
  body: {
    height: '100vh',
    maxHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: '10vh',
    backgroundColor: theme.accent,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 10,
    position: 'relative',
    boxShadow: '0px 4px 6px black',
  },
  main: {
    flexGrow: 1,
    overflow: 'auto',
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
    width: '100%',
    maxWidth: '100%',
    height: '100%',
    zIndex: '-1',
    top: '0',
    left: '0',
    position: 'absolute',
    background: 'url(/bg_test.jpg) repeat',
    backgroundAttachment: 'fixed',
    filter: 'blur(5px) brightness(100%) sepia(2%)',
  },
};
