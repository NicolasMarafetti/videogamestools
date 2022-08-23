import { faBars, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import { getDeviceType } from '@/utils/device';

import DesktopMenu from './DesktopMenu';

interface HeaderProps {
  logOff: any;
  onOpenMenu: any;
  user: any;
}

export default function Header(props: HeaderProps) {
  const [deviceType, setDeviceType] = useState('desktop');

  const router = useRouter();
  const logoToUse =
    deviceType === 'mobile_horizontal'
      ? '/assets/images/logo/logo-full.png'
      : '/assets/images/logo/logo-medium.png';
  const currentLocation = router.pathname;
  // const menuLogoSize = deviceType === 'mobile_horizontal' ? '3x' : '4x';

  useEffect(() => {
    setDeviceType(getDeviceType());
  });

  const chooseIcon = () => {
    switch (currentLocation) {
      case '/':
        if (deviceType === 'desktop') {
          return <></>;
        }
        return (
          <FontAwesomeIcon
            className="absolute left-2 w-8"
            icon={faBars}
            onClick={props.onOpenMenu}
          />
        );

      case '/forget_password':
        return (
          <Link href="/login">
            <a className="absolute left-2 text-black">
              <FontAwesomeIcon icon="chevron-left" size="2x" />
            </a>
          </Link>
        );
      default:
        return (
          <Link href="/">
            <a className="absolute left-2 text-black">
              <FontAwesomeIcon className="h-auto w-10" icon={faHome} />
            </a>
          </Link>
        );
    }
  };

  return (
    <header className="relative flex h-[11vh] items-center justify-center bg-blue sm:h-[13vh] xl:relative xl:h-[9.26vh]">
      {chooseIcon()}
      <img
        className="w-32 self-center justify-self-center sm:w-52"
        src={logoToUse}
        alt="logo medium"
      />
      {currentLocation === '/' && deviceType === 'desktop' && (
        <DesktopMenu logOff={props.logOff} user={props.user} />
      )}
    </header>
  );
}
