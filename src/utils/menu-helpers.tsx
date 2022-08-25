import router from 'next/router';

export function openMenu(setState: any, state: any) {
  setState({ ...state, menuOpen: true });
}

export function closeMenu(setState: any, state: any) {
  setState({
    ...state,
    menuOpen: false,
  });
}

export function changePage(page: string, setState: any, state: any): void {
  closeMenu(setState, state);

  router.push(page);
}
