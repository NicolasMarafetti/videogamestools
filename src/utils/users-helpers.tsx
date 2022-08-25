import Cookies from 'universal-cookie';

export function getUserFromCookie() {
  const cookies = new Cookies();

  return cookies.get('user');
}

export function logOut(router: any) {
  const cookies = new Cookies();

  cookies.remove('user');

  router.reload();
}
