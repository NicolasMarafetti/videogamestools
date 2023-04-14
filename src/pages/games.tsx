import type { Game } from '@prisma/client';
import Link from 'next/link';
import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import Header from '@/components/Header';
import Menu from '@/components/Menu';
import type { GameParsed } from '@/interfaces/games';
import { GamesParsedToGames } from '@/utils/game-helpers';
import { getGames } from '@/utils/games-server';

interface GamesProps {
  games: GameParsed[];
}

export default function Games(props: GamesProps) {
  const games: Game[] = GamesParsedToGames(props.games);

  return (
    <div className="flex min-h-screen flex-col bg-black-rgba-dark">
      <Header user={null} />

      <Menu />

      <main className="flex flex-1 justify-center bg-[#13171a]">
        <div className="flex-1 bg-games-left-background bg-cover"></div>
        <div className="max-w-[1400px] px-10 py-5">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl uppercase text-[#626667]">Games</h1>
            <Link href="/game/add">
              <a className="flex h-10 w-44 items-center justify-center rounded-lg bg-black text-[#56dd1c] hover:border-0">
                <AiOutlinePlus className="mr-2 text-[#56dd1c]" />
                <span className="text-[#626667]">Add a game</span>
              </a>
            </Link>
          </div>
          <ul className="flex flex-wrap justify-center">
            {games.map((game) => {
              return (
                <li
                  className="mr-4 mb-8 flex w-52 flex-col items-center duration-500 hover:brightness-125"
                  key={game.id}
                >
                  <Link href={`game/${game.id}`}>
                    <a className="h-full w-full text-white hover:border-0">
                      <div
                        className={`flex h-52 w-52 items-center justify-center rounded-t-lg bg-cover  bg-center text-white`}
                        style={{
                          backgroundImage: `url('${game.imageSource}')`,
                        }}
                      ></div>
                      <p className="rounded-b-lg bg-black pl-2 pt-2 pb-3 text-sm font-bold">
                        {game.name}
                      </p>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="flex-1 bg-games-right-background bg-cover"></div>
      </main>
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
