import axios from 'axios';
import { useRouter } from 'next/router';
import type { FormEvent } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import Header from '@/components/Header';
import Menu from '@/components/Menu';
import { getUserFromCookie } from '@/utils/users-helpers';

interface AddGameState {
  error: string;
  menuOpen: boolean;
}

export default function AddGame() {
  const [state, setState] = useState<AddGameState>({
    error: '',
    menuOpen: false,
  });

  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getUserFromCookie());
  }, []);

  const nameInput = useRef<HTMLInputElement>(null);
  const imageInput = useRef<HTMLInputElement>(null);
  const dateReleaseInput = useRef<HTMLInputElement>(null);

  const router = useRouter();

  const formSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append('name', nameInput.current!.value);
      formData.append('date_release', dateReleaseInput.current!.value);
      formData.append('image', imageInput.current!.files![0]!);

      await axios.post('/api/game/', formData);

      router.push('/games');
    } catch (error) {
      setState({
        ...state,
        error: 'Error during save',
      });
    }
  };

  return (
    <div>
      {state.menuOpen && <Menu state={state} setState={setState} user={user} />}
      <Header state={state} setState={setState} user={user} />
      <main className="px-4">
        <h1 className="my-2 text-center">Add a game</h1>
        <form onSubmit={formSubmit}>
          <div className="my-6">
            <label className="mr-4 inline-block w-24" htmlFor="name">
              Name
            </label>
            <input
              className="border border-black"
              id="name"
              ref={nameInput}
              type="text"
              required
            />
          </div>
          <div className="my-6 flex items-center">
            <label className="mr-4 inline-block w-24" htmlFor="image">
              Image
              <br />
              <span className="text-xs italic">Min width: 1920px</span>
            </label>
            <input id="image" ref={imageInput} type="file" required />
          </div>
          <div className="my-6">
            <label className="mr-4 inline-block w-24" htmlFor="date_release">
              Release date
            </label>
            <input
              className="border border-black"
              id="date_release"
              ref={dateReleaseInput}
              type="date"
              required
            />
          </div>
          {state.error && <p className="text-red-500">{state.error}</p>}
          <input className="my-6 mx-auto block" type="submit" value="Create" />
        </form>
      </main>
    </div>
  );
}
