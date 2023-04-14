export function openMenu(setState: any, state: any) {
  setState({ ...state, menuOpen: true });
}

export function closeMenu(setState: any, state: any) {
  setState({
    ...state,
    menuOpen: false,
  });
}
