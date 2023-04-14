import type { User } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import { FaBars } from 'react-icons/fa';

import { MenuContext } from '@/context/MenuContext';
import { logOut } from '@/utils/users-helpers';

import DesktopMenu from './DesktopMenu';

interface HeaderProps {
  user: null | User;
}

export default function Header(props: HeaderProps) {
  const router = useRouter();
  const { openMenu } = useContext(MenuContext);

  const onLogOff = () => {
    logOut(router);
  };

  return (
    <header className=" relative flex h-[11vh] items-center justify-center bg-header-background bg-cover bg-center sm:h-[13vh] xl:relative xl:h-[9.26vh]">
      <FaBars
        className="absolute left-5 top-5 h-6 w-6 text-white"
        onClick={openMenu}
      />
      <Link href="/">
        <img
          className="w-32 cursor-pointer self-center justify-self-center"
          src={'/assets/images/logo/logo-full.png'}
          alt="logo medium"
        />
      </Link>
      <DesktopMenu logOff={onLogOff} user={props.user} />
    </header>
  );
}
