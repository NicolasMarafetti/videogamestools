import '../styles/global.css';

import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import { getUserFromCookie } from '@/utils/users-helpers';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [user, setUser] = useState(null);

  const onOpenMenu = () => setMenuOpen(true);

  useEffect(() => {
    setUser(getUserFromCookie());
  }, []);

  return (
    <>
      <Header menuOpen={menuOpen} onOpenMenu={onOpenMenu} user={user} />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
