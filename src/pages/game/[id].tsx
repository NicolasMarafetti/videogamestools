import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Game, Tool } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import GameRandomTools from '@/components/GameRandomTools';
import Header from '@/components/Header';
import Menu from '@/components/Menu';
import { getGameImageSource } from '@/utils/game-helpers';
import { findGameWithId } from '@/utils/games-server';
import { findToolsForGame } from '@/utils/tools-server';
import { getUserFromCookie } from '@/utils/users-helpers';

interface SeeGameProps {
  error: string;
  game: Game;
  loading: boolean;
  seeMoreButton: boolean;
  tools: Tool[];
}

export default function SeeGame(props: SeeGameProps) {
  const [state, setState] = useState({
    menuOpen: false,
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(getUserFromCookie());
  }, []);

  const dateRelease = new Date(props.game.date_release);

  return (
    <div className="flex flex-col items-center bg-black pb-4" id="game_tools">
      <div className="flex h-screen w-full flex-col">
        {state.menuOpen && (
          <Menu state={state} setState={setState} user={user} />
        )}
        <Header state={state} setState={setState} user={user} />
        <div
          className="relative mt-4 flex flex-1 items-start justify-center bg-contain bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${getGameImageSource(props.game.id)}')`,
          }}
        >
          <h1 className="mt-4 inline-block bg-black-rgba px-4 py-2 text-4xl text-white">
            {props.game ? `${props.game.name}` : ''}
          </h1>
          <h2 className="absolute bottom-10 left-10 bg-black-rgba-dark text-xl italic text-white">
            Sorti le {dateRelease.getDate()}/{dateRelease.getMonth()}/
            {dateRelease.getFullYear()}
          </h2>
        </div>
      </div>

      {props.game !== null && props.tools && (
        <GameRandomTools game={props.game} tools={props.tools} />
      )}

      {props.error && <p className="text-red-500">{props.error}</p>}

      <div>
        <Link href="/add_tool">
          <a className="button classic big flex items-center justify-center">
            <div className="mr-2 flex h-5 w-5 items-center justify-center rounded-full border border-black">
              <FontAwesomeIcon className="h-3 w-3" icon={faPlus} />
            </div>
            Suggest a tool
          </a>
        </Link>
      </div>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const id = context.params!.id as string;

  return {
    props: {
      game: await findGameWithId(id),
      tools: await findToolsForGame(id),
    },
  };
}
