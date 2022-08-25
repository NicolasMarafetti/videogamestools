import type { User } from '@prisma/client';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useRef } from 'react';

import { changePage, closeMenu } from '@/utils/menu-helpers';
import { logOut } from '@/utils/users-helpers';

interface MenuProps {
  setState: any;
  state: any;
  user: null | User;
}

export default function Menu(props: MenuProps) {
  const menuContentRef = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const handleClickOutside = (event: any) => {
    if (menuContentRef && menuContentRef.current) {
      if (!menuContentRef.current.contains(event.target))
        closeMenu(props.setState, props.state);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return function cleanup() {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const onChangePage = (page: string) => {
    changePage(page, props.setState, props.state);
  };

  const onLogOff = () => {
    logOut(router);
  };

  return (
    <div
      className="absolute left-0 top-0 z-10 h-screen w-screen bg-black-rgba"
      id="menu"
    >
      <div
        className="inline-block h-full w-8/12 bg-white sm:w-[40vw]"
        ref={menuContentRef}
      >
        <ul className="m-0 p-4">
          <li className="pb-4 text-sm font-light">
            <button
              className=" border-0 text-sm font-light text-black"
              onClick={() => onChangePage('/')}
            >
              Home
            </button>
          </li>
          <li className="pb-4 text-sm font-light">
            <button
              className=" border-0 text-sm font-light text-black"
              onClick={() => onChangePage('/games')}
            >
              Games List
            </button>
          </li>
          {!props.user ? (
            <Fragment>
              <li className="pb-4 text-sm font-light">
                <button
                  className=" border-0 text-sm font-light text-black"
                  onClick={() => onChangePage('/signin')}
                >
                  Create an account
                </button>
              </li>
              <li className="pb-4 text-sm font-light">
                <button
                  className=" border-0 text-sm font-light text-black"
                  onClick={() => onChangePage('/login')}
                >
                  Log in
                </button>
              </li>
            </Fragment>
          ) : (
            <li className="pb-4 text-sm font-light" onClick={onLogOff}>
              Log off
            </li>
          )}
          <li className="pb-4 text-sm font-light">
            <button
              className=" border-0 text-sm font-light text-black"
              onClick={() => onChangePage('/support')}
            >
              Support
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
