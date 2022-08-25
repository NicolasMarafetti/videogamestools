import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { Game, Tool } from '@prisma/client';
import Link from 'next/link';
import React from 'react';

import GameRandomTools from '@/components/GameRandomTools';
import { findGameWithId } from '@/utils/games-server';
import { findToolsForGame } from '@/utils/tools-server';

interface SeeGameProps {
  error: string;
  game: Game;
  loading: boolean;
  seeMoreButton: boolean;
  tools: Tool[];
}

export default function SeeGame(props: SeeGameProps) {
  const getTools = () => {
    return true;
  };

  return (
    <div className="flex flex-col items-center" id="game_tools">
      <h1 className="my-10 mx-auto text-xl">
        {props.game ? `${props.game.name}'s tools` : ''}
      </h1>

      {props.game !== null && props.tools && (
        <GameRandomTools game={props.game} tools={props.tools} />
      )}

      {props.error && <p className="text-red-500">{props.error}</p>}

      <div>
        <button
          className="big classic mb-5"
          disabled={!props.seeMoreButton}
          onClick={getTools}
        >
          See more
        </button>
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
