import React, { Fragment, useEffect, useRef } from 'react';

interface MenuProps {
  changePage: any;
  closeMenu: any;
  logOff: any;
  user: any;
}

export default function Menu(props: MenuProps) {
  const menuContentRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: any) => {
    if (menuContentRef && menuContentRef.current) {
      if (!menuContentRef.current.contains(event.target)) props.closeMenu();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return function cleanup() {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

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
              className="border-0 font-light text-black"
              onClick={() => props.changePage('/')}
            >
              Home
            </button>
          </li>
          {!props.user ? (
            <Fragment>
              <li className="pb-4 text-sm font-light">
                <button
                  className="border-0 font-light text-black"
                  onClick={() => props.changePage('/signin')}
                >
                  Create an account
                </button>
              </li>
              <li className="pb-4 text-sm font-light">
                <button
                  className="border-0 font-light text-black"
                  onClick={() => props.changePage('/login')}
                >
                  Log in
                </button>
              </li>
            </Fragment>
          ) : (
            <li onClick={props.logOff}>Log off</li>
          )}
          <li className="pb-4 text-sm font-light">
            <button
              className="border-0 font-light text-black"
              onClick={() => props.changePage('/support')}
            >
              Support
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
