import type { Game } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import Menu from '@/components/Menu';
import type { GameParsed } from '@/interfaces/games';
import { GamesParsedToGames } from '@/utils/game-helpers';
import { getGames } from '@/utils/games-server';
import { getUserFromCookie } from '@/utils/users-helpers';

interface GamesProps {
  games: GameParsed[];
}

interface GamesState {
  menuOpen: boolean;
}

export default function Games(props: GamesProps) {
  const [state, setState] = useState<GamesState>({
    menuOpen: false,
  });

  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(getUserFromCookie());
  }, []);

  const games: Game[] = GamesParsedToGames(props.games);

  return (
    <div className="min-h-screen bg-black-rgba-dark pt-4">
      {state.menuOpen && <Menu state={state} setState={setState} user={user} />}
      <h1 className="mb-4 text-center text-2xl text-white">Games</h1>
      <Link href="/game/add">
        <a className="button classic mx-auto block">Add a game</a>
      </Link>
      <ul className="flex flex-wrap justify-center">
        {games.map((game) => {
          return (
            <li className="m-5 flex flex-col items-center" key={game.id}>
              <Link href={`game/${game.id}`}>
                <a className=" text-white">
                  <div
                    className={`flex h-28 w-28 items-center justify-center rounded-lg bg-cover  bg-center text-white`}
                    style={{
                      backgroundImage: `url('${game.imageSource}')`,
                    }}
                  ></div>
                  <p className="text-center text-xs">{game.name}</p>
                  <p className="text-center text-xs">
                    {game.date_release.toLocaleDateString()}
                  </p>
                </a>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      games: await getGames(),
    },
  };
}
