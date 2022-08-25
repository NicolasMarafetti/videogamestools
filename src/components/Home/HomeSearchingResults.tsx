import { faGamepad, faWrench } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import type { ToolWithGame } from 'utils/tools';

interface HomeSearchingResultsProps {
  games: any[];
  tools: ToolWithGame[];
}

export default function HomeSearchingResults(props: HomeSearchingResultsProps) {
  return (
    <div id="home_searching_results">
      <ul>
        {props.games.map((game) => (
          <li key={`game_${game.id}`}>
            <Link href={`/game/${game.id}`}>
              <a className="flex items-center font-bold text-neutral-500">
                <FontAwesomeIcon
                  className="mr-5 h-20 w-20 border border-black text-black"
                  icon={faGamepad}
                />
                {game.name}
              </a>
            </Link>
          </li>
        ))}
        {props.tools.map((tool) => (
          <li key={`tool_${tool.id}`}>
            <Link href={`/tool/${tool.id}`}>
              <a className="flex items-center font-bold text-neutral-500">
                <FontAwesomeIcon
                  className="mr-5 h-20 w-20 border border-black text-black"
                  icon={faWrench}
                />
                <div className="flex flex-col justify-center">
                  <p className="m-1">{tool.name}</p>
                  <p className="m-1 font-light">{tool.Game.name}</p>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
