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
      className="absolute inset-y-0 right-10 flex w-[24vw] justify-between py-3 text-white"
      id="desktop_menu"
    >
      <ul className="flex flex-col justify-between p-0">
        <li>
          <FontAwesomeIcon className="mr-2 inline-block w-4" icon={faUser} />
          {props.user ? props.user.pseudo : 'Not logged'}
        </li>
      </ul>
      <ul className="flex flex-col justify-between p-0">
        {!props.user && (
          <li>
            <Link href="/signin">
              <a className="text-white">Sign in</a>
            </Link>
          </li>
        )}
        <li>
          <Link href="/support">
            <a className="text-white">Support</a>
          </Link>
        </li>
      </ul>
      <ul className="flex flex-col justify-between p-0">
        {!props.user && (
          <li>
            <Link href="/login">
              <a className="text-white">Log in</a>
            </Link>
          </li>
        )}
        {props.user && <li onClick={props.logOff}>Log out</li>}
      </ul>
    </div>
  );
}
