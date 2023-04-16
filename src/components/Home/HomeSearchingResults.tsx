import { faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import type { ToolWithGame } from 'utils/tools';

import GameImage from '../GameImage';

interface HomeSearchingResultsProps {
  games: {
    id: string;
    imageSource: string;
    name: string;
  }[];
  tools: ToolWithGame[];
}

export default function HomeSearchingResults(props: HomeSearchingResultsProps) {
  return (
    <div>
      <ul>
        {props.games.map((game) => (
          <div key={`game_${game.id}`}>
            <div className="mx-3 border-b border-[#282730]"></div>
            <li className="bg-[#191723] p-3" key={`game_${game.id}`}>
              <Link href={`/game/${game.id}`}>
                <a className="flex items-center font-bold text-neutral-500">
                  <div className="mr-5 flex h-20 w-20 items-center border border-black text-white">
                    <GameImage
                      gameImageSource={game.imageSource}
                      gameName={game.name}
                    />
                  </div>
                  <span className="text-white">{game.name}</span>
                </a>
              </Link>
            </li>
          </div>
        ))}
        {props.tools.map((tool) => (
          <div key={`tool_${tool.id}`}>
            <div className="mx-3 border-b border-[#282730]"></div>
            <li className="bg-[#191723] p-3" key={`tool_${tool.id}`}>
              <Link href={`/tool/${tool.id}`}>
                <a className="flex items-center font-bold text-neutral-500">
                  <FontAwesomeIcon
                    className="mr-5 h-20 w-20 border border-black text-white"
                    icon={faWrench}
                  />
                  <div className="flex flex-col justify-center">
                    <p className="m-1 text-white">{tool.name}</p>
                    <p className="m-1 font-light">{tool.Game.name}</p>
                  </div>
                </a>
              </Link>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
}
