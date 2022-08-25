import type { Game } from '@prisma/client';
import axios from 'axios';
import type { FormEvent } from 'react';
import React, { useRef, useState } from 'react';

import Autocomplete from '@/components/Autocomplete';
import { getGames } from '@/utils/games-server';

interface AddToolProps {
  games: Game[];
}

interface AddToolState {
  error: string;
  gameName: string;
  loading: boolean;
  success: boolean;
}

export default function AddTool(props: AddToolProps) {
  const [state, setState] = useState<AddToolState>({
    error: '',
    gameName: '',
    loading: false,
    success: false,
  });

  const descriptionField = useRef<HTMLTextAreaElement>(null);
  const nameField = useRef<HTMLInputElement>(null);
  const urlField = useRef<HTMLInputElement>(null);

  const gameNameChanged = (gameName: string) => {
    setState({ ...state, gameName });
  };

  const submitForm = (e: FormEvent) => {
    e.preventDefault();

    setState({
      ...state,
      error: '',
      loading: true,
      success: false,
    });

    const game = state.gameName;
    const name = nameField.current!.value;
    const url = urlField.current!.value;
    const description = descriptionField.current!.value;

    axios
      .post(`/api/tool`, {
        game,
        name,
        url,
        description,
      })
      .then(() => {
        setState({
          ...state,
          error: '',
          loading: false,
          success: true,
        });
      })
      .catch((err) => {
        setState({
          ...state,
          error: err.response.data.message,
          loading: false,
          success: false,
        });
      });
  };

  return (
    <main
      className="my-0 mx-6 xl:flex xl:flex-col xl:items-center"
      id="add_tool"
    >
      <h1 className="my-2 text-center">Add a tool</h1>
      <form
        className="flex flex-col px-4 sm:flex-row sm:flex-wrap sm:items-start sm:justify-between sm:p-0 xl:w-[45vw]"
        onSubmit={submitForm}
      >
        <Autocomplete
          className="mb-5 w-full sm:mb-2 sm:w-[44vw] xl:w-[400px]"
          suggestions={props.games.map((game) => game.name)}
          placeholder="Game"
          onChange={gameNameChanged}
          value={state.gameName}
          required={true}
        />
        <input
          className="mb-5 w-full border border-[#6e6e6e] p-2 sm:mb-2 sm:w-[44vw] xl:w-[400px]"
          type="text"
          name="name"
          placeholder="Name"
          ref={nameField}
          required
        />
        <input
          className="mb-5 w-full border border-[#6e6e6e] p-2 sm:mb-2 sm:w-[44vw] xl:w-[400px]"
          type="text"
          name="url"
          defaultValue="http://"
          ref={urlField}
          required
        />
        <textarea
          className="mb-5 w-full border  border-[#6e6e6e] p-2 sm:mb-2 sm:w-[44vw] xl:mb-10 xl:w-[400px]"
          name="description"
          placeholder="Description"
          ref={descriptionField}
          required
        ></textarea>
        <input
          className="m-auto"
          type="submit"
          value="Validate"
          disabled={state.loading || state.success}
        />
      </form>
      {state.error && <p className="bg-red-500">Error : {state.error}</p>}
      {state.success && (
        <p className="bg-green-500">Your tool has been successfully added</p>
      )}
    </main>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      games: await getGames(),
    },
  };
}
