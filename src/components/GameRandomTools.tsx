import type { Game, Tool } from '@prisma/client';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { isMobile } from 'react-device-detect';

import { getGameImageSource } from '@/utils/game-helpers';

interface GameRandomToolsProps {
  game: Game;
  tools: Tool[];
}

export default function GameRandomTools(props: GameRandomToolsProps) {
  const [mobile, setMobile] = useState(true);

  useEffect(() => {
    setMobile(isMobile);
  });

  return (
    <div
      className="mb-4  w-screen  px-[4vw] sm:w-[65vw] sm:p-0 xl:w-[85vw]"
      id="game_random_tools"
    >
      <h3 className="my-2 text-center">Tools</h3>
      <div className="flex flex-wrap justify-around">
        {props.tools.map((tool) => (
          <div
            className="mx-[2vw] mt-0 mb-4 flex w-[26vw] flex-col items-center sm:w-[15vw] xl:mb-20 xl:w-[12vw]"
            key={tool.id}
          >
            <div
              className="h-[26vw] w-[26vw] bg-cover bg-center sm:h-[15vw] sm:w-[15vw] xl:h-[12vw] xl:w-[12vw]"
              style={{
                backgroundImage: `url('${getGameImageSource(props.game.id)}')`,
              }}
            ></div>
            <h2 className="max-w-full overflow-hidden truncate">{tool.name}</h2>
            {!mobile && (
              <p className="xl:mt-0 xl:max-w-full xl:truncate">
                {tool.description}
              </p>
            )}
            <Link href={`/tool/${tool.id}`}>
              <a className="button small classic">See tool</a>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
