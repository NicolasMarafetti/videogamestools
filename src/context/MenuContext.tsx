import React, { createContext, useContext, useState } from 'react';

interface IMenuContext {
  closeMenu: () => void;
  menuIsOpen: boolean;
  openMenu: () => void;
}

interface IMenuProviderProps {
  children: React.ReactNode;
}

export const MenuContext = createContext<IMenuContext>({
  closeMenu: () => {},
  menuIsOpen: false,
  openMenu: () => {},
});

export const MenuProvider: React.FC<IMenuProviderProps> = ({
  children,
}: any) => {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const closeMenu = () => setMenuIsOpen(false);
  const openMenu = () => setMenuIsOpen(true);

  return (
    <MenuContext.Provider value={{ menuIsOpen, closeMenu, openMenu }}>
      {children}
    </MenuContext.Provider>
  );
};

export const useMenu = (): IMenuContext => useContext(MenuContext);
