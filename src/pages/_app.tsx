import '../styles/global.css';

import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

import Header from '@/components/Header';
import { getUserFromCookie } from '@/utils/users-helpers';

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserFromCookie());
  }, []);

  return (
    <>
      <Header user={user} />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
