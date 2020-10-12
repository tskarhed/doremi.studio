import { View, Input } from '../native';
import React, { FC, CSSProperties, useState } from 'react';
import theme from '../theme.module.scss';
import { useSelector } from 'react-redux';
import { StoreState } from '../state/types';
import { Search } from '../components/Search';
import { motion } from 'framer-motion';

interface PageProps {
  title?: string;
  headerElement?: React.ReactElement;
  prefixElement?: React.ReactElement;
  footer?: React.ReactElement;
  editable?: boolean;
  onHeaderClick?: (e: any) => void;
  onTitleChange?: (newTitle: string) => void;
  noHeader?: boolean;
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
  noHeader = false,
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
      <motion.div style={styles.body as any} className="wtf">
        <div style={styles.backgroundImage as CSSProperties}></div>
        <header
          style={
            noHeader
              ? (styles.headerLoginView as CSSProperties)
              : (styles.header as CSSProperties)
          }
          onClick={onHeaderClick}
        >
          <View style={styles.prefix}>{prefixElement}</View>
          <motion.div
            variants={animations}
            initial="initial"
            exit="exit"
            animate="enter"
            transition={{ duration: 0.2 }}
            style={styles.titleWrapper}
          >
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
          </motion.div>
          <View style={styles.postfix}>{headerElement}</View>
        </header>
        <main style={styles.main}>{children}</main>
        <footer>{footer}</footer>
      </motion.div>
    </>
  );
};

const animations = {
  enter: {
    opacity: 1,
  },
  initial: {
    opacity: 0,
  },
  exit: {
    opacity: 0,
  },
};

const styles = {
  body: {
    height: '100vh',
    maxHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    height: '4.4rem',
    backgroundColor: theme.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 10,
    position: 'relative',
    boxShadow: '0px 4px 6px black',
    opacity: 1,
  },
  headerLoginView: {
    height: '4.4rem',
    backgroundColor: theme.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    zIndex: 10,
    position: 'relative',
    boxShadow: '0px 4px 6px black',
    opacity: 0,
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
    background:
      'url(https://www.ltu.se/cms_fs/1.160237!/image/Snapsakademien2.jpg_gen/derivatives/landscape_fullwidth_16x9/Snapsakademien2.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
    filter: 'blur(8px) brightness(0.7)',
  },
};
