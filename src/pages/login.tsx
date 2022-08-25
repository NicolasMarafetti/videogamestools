import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import React, { useRef, useState } from 'react';
import Cookies from 'universal-cookie';

interface LoginState {
  error: string;
  loading: boolean;
  success: boolean;
}

const cookies = new Cookies();

export default function Login() {
  const [state, setState] = useState<LoginState>({
    error: '',
    loading: false,
    success: false,
  });

  const identifierInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const staySignedInInput = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const identifier = identifierInput.current!.value;
    const password = passwordInput.current!.value;
    const staySignedIn = staySignedInInput.current!.checked;

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

        if (staySignedIn) cookies.set('user', JSON.stringify(userData));

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
    <div className="flex flex-col px-6 xl:flex-col xl:items-center" id="log_in">
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
        <div className="self-start">
          <input
            className="mr-2 mb-5 xl:mb-7"
            type="checkbox"
            id="staySignedIn"
            ref={staySignedInInput}
          />
          <label htmlFor="staySignedIn">Stay signed in</label>
        </div>
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
    </div>
  );
}
