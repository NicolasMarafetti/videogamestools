import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';

import Menu from '@/components/Menu';
import { getUserFromCookie } from '@/utils/users-helpers';

interface LoginState {
  error: string;
  loading: boolean;
  menuOpen: boolean;
  success: boolean;
}

const cookies = new Cookies();

export default function Login() {
  const [state, setState] = useState<LoginState>({
    error: '',
    loading: false,
    menuOpen: false,
    success: false,
  });
  const [user, setUser] = useState(null);

  const identifierInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);

  const router = useRouter();

  useEffect(() => {
    setUser(getUserFromCookie());
  }, []);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const identifier = identifierInput.current!.value;
    const password = passwordInput.current!.value;

    axios
      .post(`/api/user/login/`, {
        identifier,
        password,
      })
      .then((response) => {
        const userData = response.data;

        setState({
          ...state,
          error: '',
          success: true,
        });

        cookies.set('user', JSON.stringify(userData));

        window.setTimeout(() => {
          router.push('/');
        }, 2000);
      })
      .catch((response) => {
        const errorMessage =
          typeof response.response === 'undefined'
            ? 'Unknown error'
            : response.response.data.message;

        setState({ ...state, error: errorMessage });
      });
  };

  return (
    <div id="log_in">
      {state.menuOpen && <Menu state={state} setState={setState} user={user} />}
      <main className="flex flex-col px-6 xl:flex-col xl:items-center">
        <h1 className="my-2 text-center">Log In</h1>
        <form className="mb-5 flex flex-col px-5 xl:w-[45vw]" onSubmit={submit}>
          <input
            className="mb-5 w-full border border-[#6e6e6e] p-2 xl:mb-7"
            type="text"
            name="identifier"
            placeholder="Pseudo or Email"
            ref={identifierInput}
          />
          <input
            className="mb-5 w-full border border-[#6e6e6e] p-2 xl:mb-7"
            type="password"
            name="password"
            placeholder="Password"
            ref={passwordInput}
          />
          {state.error && <p className="text-red-500">{state.error}</p>}
          {state.success && (
            <p className="text-green-500">
              Log in successfull, you&apos;ll be redirected
            </p>
          )}
          <input
            className="button-blue self-center xl:mb-7"
            type="submit"
            value="Log In"
            disabled={state.loading || state.success}
          />
        </form>
        <div className="flex flex-col justify-between sm:flex-row xl:w-[45vw] xl:flex-col">
          <Link href="/signin">
            <a className="mb-5 inline-block">Create an account</a>
          </Link>
          <Link href="/forget_password">
            <a className="mb-5 inline-block">Forget your password</a>
          </Link>
        </div>
      </main>
    </div>
  );
}
