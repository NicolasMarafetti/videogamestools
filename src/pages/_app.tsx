import '../styles/global.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
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
      <Head>
        <title>Video Games Tools</title>
        <meta
          name="description"
          content="Optimisez votre expérience de jeu avec notre sélection d'outils pour jeux vidéo. Trouvez les meilleurs logiciels pour améliorer vos performances, personnaliser vos réglages, et profiter au maximum de vos jeux préférés. Découvrez nos guides et astuces pour gagner en compétence, et rejoignez une communauté passionnée de joueurs et joueuses. Téléchargez dès maintenant les outils indispensables pour booster votre gameplay !"
        />
      </Head>
      <Header user={user} />
      <Component {...pageProps} />
    </>
  );
};

export default MyApp;
