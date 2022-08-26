import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { Fragment, useState } from 'react';
import type { ToolWithGame } from 'utils/tools';
import { getToolWithGame } from 'utils/tools';

import { getGameImageSource } from '@/utils/game-helpers';

interface SeeToolProps {
  tool: ToolWithGame;
}

interface SeeToolState {
  error: string;
  game: any;
}

export default function SeeTool(props: SeeToolProps) {
  const [state] = useState<SeeToolState>({
    error: '',
    game: null,
  });

  const imageUrl = state.game ? getGameImageSource(state.game.id) : '';

  return (
    <div className="flex flex-col items-center xl:pt-11" id="tool">
      {state.error && <p className="text-red-500">{state.error}</p>}
      {!state.error && props.tool && (
        <Fragment>
          <div
            className="relative h-[100vw] w-screen bg-cover bg-center sm:h-[30vw] sm:w-[30vw]"
            style={{ backgroundImage: `url("${imageUrl}")` }}
          >
            <Link href={props.tool.url} passHref>
              <a
                className="absolute right-0 top-0 flex h-20 w-20 content-center items-center justify-center bg-black sm:h-10 sm:w-10 xl:h-20 xl:w-20"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FontAwesomeIcon
                  className="h-auto w-8/12 text-white"
                  icon={faExternalLinkAlt}
                ></FontAwesomeIcon>
              </a>
            </Link>
          </div>
          <h1 className="text-2xl">{props.tool.name}</h1>
          <p className="ml-4 self-start text-xl sm:m-0 sm:self-center">
            {props.tool.description}
          </p>
        </Fragment>
      )}
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const toolId = context.params!.id as string;

  return {
    props: {
      tool: await getToolWithGame(toolId),
    },
  };
}
