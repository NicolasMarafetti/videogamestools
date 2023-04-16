import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

interface DesktopMenuProps {
  logOff: any;
  user: any;
}

export default function DesktopMenu(props: DesktopMenuProps) {
  return (
    <div
      className="absolute inset-y-0 right-10 hidden w-[24vw] justify-between py-3 text-white xl:flex"
      id="desktop_menu"
    >
      <ul className="flex flex-wrap justify-between">
        <li className="px-2">
          <FontAwesomeIcon className="mr-2 inline-block w-4" icon={faUser} />
          {props.user ? props.user.pseudo : 'Not logged'}
        </li>
        <li className="px-2">
          <Link href="/games">
            <a className="text-white">Games</a>
          </Link>
        </li>
        <li className="px-2">
          <Link href="/support">
            <a className="text-white">Support</a>
          </Link>
        </li>
      </ul>
    </div>
  );
}
