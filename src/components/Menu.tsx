import { useRouter } from 'next/router';
import React, { useEffect, useRef } from 'react';

import { useMenu } from '@/context/MenuContext';

export default function Menu() {
  const menuContentRef = useRef<HTMLDivElement>(null);
  const { closeMenu, menuIsOpen } = useMenu();

  const router = useRouter();

  const handleClickOutside = (event: any) => {
    if (menuContentRef && menuContentRef.current) {
      if (!menuContentRef.current.contains(event.target)) closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return function cleanup() {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const onChangePage = (page: string) => {
    closeMenu();
    router.push(page);
  };

  return (
    <div
      className={`absolute top-0 z-10 h-screen w-screen bg-black-rgba duration-500 ${
        menuIsOpen ? 'left-0' : '-left-full'
      }`}
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
