import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { User } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { getDeviceType } from '@/utils/device';
import { openMenu } from '@/utils/menu-helpers';
import { logOut } from '@/utils/users-helpers';

import DesktopMenu from './DesktopMenu';

interface HeaderProps {
  setState: any;
  state: any;
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

  const onOpenMenu = () => {
    openMenu(props.setState, props.state);
  };

  const onLogOff = () => {
    logOut(router);
  };

  const chooseIcon = () => {
    if (deviceType === 'desktop') {
      return <></>;
    }
    return (
      <FontAwesomeIcon
        className="absolute left-2 w-8"
        icon={faBars}
        onClick={onOpenMenu}
      />
    );
  };

  return (
    <header className="relative flex h-[11vh] items-center justify-center bg-blue sm:h-[13vh] xl:relative xl:h-[9.26vh]">
      {chooseIcon()}
      <img
        className="w-32 self-center justify-self-center sm:w-52"
        src={logoToUse}
        alt="logo medium"
      />
      {deviceType === 'desktop' && (
        <DesktopMenu logOff={onLogOff} user={props.user} />
      )}
    </header>
  );
}
