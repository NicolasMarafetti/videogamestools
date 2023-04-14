import type { User } from '@prisma/client';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';

import Menu from '@/components/Menu';
import { countries } from '@/config/countries';
import { getUserFromCookie } from '@/utils/users-helpers';

const cookies = new Cookies();

interface SigninState {
  error: string;
  loading: boolean;
  menuOpen: boolean;
  success: boolean;
}

export default function Signin() {
  const [state, setState] = useState<SigninState>({
    error: '',
    loading: false,
    menuOpen: false,
    success: false,
  });

  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getUserFromCookie());
  }, []);

  const router = useRouter();

  const confirmPassword = useRef<HTMLInputElement>(null);
  const countrySelect = useRef<HTMLSelectElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const pseudo = useRef<HTMLInputElement>(null);
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const email = useRef<HTMLInputElement>(null);

  const userLoggedIn = (newUser: User) => {
    cookies.set('user', JSON.stringify(newUser));
  };

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password.current!.value !== confirmPassword.current!.value) {
      return setState({
        ...state,
        error: `Passwords don't match`,
      });
    }

    setState({ ...state, loading: true });

    axios
      .post(`/api/user/signin`, {
        country: countrySelect.current!.value,
        pseudo: pseudo.current!.value,
        firstname: firstname.current!.value,
        lastname: lastname.current!.value,
        email: email.current!.value,
        password: password.current!.value,
      })
      .then((result) => {
        setState({
          ...state,
          error: '',
          success: true,
        });
        userLoggedIn(result.data);

        window.setTimeout(() => router.push('/'), 2000);

        return true;
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);

        const errorMessage =
          error &&
          error.response &&
          error.response.data &&
          error.response.data.message
            ? error.response.data.message
            : 'Error';

        setState({
          ...state,
          error: errorMessage,
          loading: false,
        });

        return false;
      });

    return true;
  };

  return (
    <div className="sm:flex sm:flex-col xl:items-center" id="sign_in">
      {state.menuOpen && <Menu user={user} />}
      <h1 className="my-2 text-center">Create an account</h1>
      <form className="px-5 xl:w-[45vw]" onSubmit={submit}>
        <div className="flex flex-wrap justify-between xl:max-w-full">
          <select
            className="mb-5 w-full border border-neutral-500 p-2 sm:mb-2 sm:w-[45vw] xl:mb-8 xl:h-auto xl:w-full"
            defaultValue=""
            ref={countrySelect}
            required
          >
            <option value="" disabled>
              Select a country
            </option>
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                {country.name}
              </option>
            ))}
          </select>
          <input
            className="mb-5 w-full border border-neutral-500 p-2 sm:mb-2 sm:w-[45vw] xl:mb-8 xl:h-auto xl:w-full"
            type="text"
            name="pseudo"
            placeholder="Pseudo"
            ref={pseudo}
            required
          />
          <input
            className="mb-5 w-[47%] border border-neutral-500 p-2 sm:mb-2 sm:w-[45vw] xl:mb-8 xl:h-auto xl:w-full"
            type="text"
            name="first_name"
            placeholder="First Name"
            ref={firstname}
            required
          />
          <input
            className="mb-5 w-[47%] border border-neutral-500 p-2 sm:mb-2 sm:w-[45vw] xl:mb-8 xl:h-auto xl:w-full"
            type="text"
            name="last_name"
            placeholder="Last Name"
            ref={lastname}
            required
          />
          <input
            className="mb-5 w-full border border-neutral-500 p-2 sm:mb-2 sm:w-[45vw] xl:mb-8 xl:h-auto xl:w-full"
            type="email"
            name="email"
            placeholder="Email Address"
            ref={email}
            required
          />
          <div className="sm:flex sm:w-full sm:justify-between xl:flex-col">
            <input
              className="mb-5 w-full border border-neutral-500 p-2 sm:mb-2 sm:w-[45vw] xl:mb-8 xl:h-auto xl:w-full"
              type="password"
              name="password"
              placeholder="Password"
              ref={password}
              required
            />
            <input
              className="mb-5 w-full border border-neutral-500 p-2 sm:mb-2 sm:w-[45vw] xl:mb-8 xl:h-auto xl:w-full"
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              ref={confirmPassword}
              required
            />
          </div>
        </div>
        <div className="mb-4 flex w-[325px] self-start pr-10 sm:mb-2 sm:w-auto">
          <input
            className="mr-2"
            id="terms"
            type="checkbox"
            name="terms of service"
            required
          />
          <label className="font-normal" htmlFor="terms">
            I have read and agreed to the
            <Link href="/terms_of_service" target="_blank">
              <a className="font-normal">
                <span> </span>
                <span className="underline">terms of service</span>
              </a>
            </Link>
          </label>
        </div>
        {state.error && <p className="text-red-500 xl:mb-4">{state.error}</p>}
        {state.success && (
          <p className="text-green-500 xl:mb-4">
            Your account has been created. You&apos;ll be redirected
          </p>
        )}
        <input
          className="m-auto block"
          type="submit"
          value="Create account"
          disabled={state.loading}
        />
      </form>
    </div>
  );
}
