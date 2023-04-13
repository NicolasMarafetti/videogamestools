import type { User } from '@prisma/client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { getDeviceType } from '@/utils/device';
import { logOut } from '@/utils/users-helpers';

import DesktopMenu from './DesktopMenu';

interface HeaderProps {
  user: null | User;
}

export default function Header(props: HeaderProps) {
  const [deviceType, setDeviceType] = useState('desktop');

  const logoToUse =
    deviceType === 'mobile_horizontal'
      ? '/assets/images/logo/logo-full.png'
      : '/assets/images/logo/logo-medium.png';

  const router = useRouter();

  useEffect(() => {
    setDeviceType(getDeviceType());
  });

  const onLogOff = () => {
    logOut(router);
  };

  return (
    <header className=" relative flex h-[11vh] items-center justify-center bg-header-background bg-cover bg-center sm:h-[13vh] xl:relative xl:h-[9.26vh]">
      <Link href="/">
        <img
          className="w-32 cursor-pointer self-center justify-self-center"
          src={logoToUse}
          alt="logo medium"
        />
      </Link>
      {deviceType === 'desktop' && (
        <DesktopMenu logOff={onLogOff} user={props.user} />
      )}
    </header>
  );
}
