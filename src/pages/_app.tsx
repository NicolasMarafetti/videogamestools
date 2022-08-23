import '../styles/global.css';

import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Header from '@/components/Header';
import Menu from '@/components/Menu';

interface AppState {
  menuOpen: boolean;
  user: any;
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [state, setState] = useState<AppState>({
    menuOpen: false,
    user: null,
  });

  const router = useRouter();

  const closeMenu = () => {
    setState({
      ...state,
      menuOpen: false,
    });
  };

  const changePage = (page: string) => {
    closeMenu();

    router.push(page);
  };

  const logOff = () => {
    setState({
      ...state,
      user: null,
    });
  };

  const openMenu = () => {
    setState({
      ...state,
      menuOpen: true,
    });
  };

  return (
    <>
      {state.menuOpen && (
        <Menu
          changePage={changePage}
          closeMenu={closeMenu}
          logOff={logOff}
          user={state.user}
        />
      )}
      <Header onOpenMenu={openMenu} logOff={logOff} user={state.user} />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
