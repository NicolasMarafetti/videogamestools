import Cookies from 'universal-cookie';

export function getUserFromCookie() {
  const cookies = new Cookies();

  return cookies.get('user');
}
