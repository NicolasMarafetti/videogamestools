import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React, { useState } from 'react';

interface HomeSearchingResultsProps {
  games: any[];
  tools: any[];
}

interface HomeSearchingResultsState {
  games: any[];
}

export default function HomeSearchingResults(props: HomeSearchingResultsProps) {
  const [state] = useState<HomeSearchingResultsState>({ games: [] });

  const findGameName = (game_id: number) => {
    const { games } = state;

    if (games.length === 0) return '';

    const game = games.find((gameTest) => gameTest.id === game_id);
    return game.name;
  };

  return (
    <div id="home_searching_results">
      <ul>
        {props.games.map((game) => (
          <li key={`game_${game.id}`}>
            <Link href={`/game/${game.id}`}>
              <FontAwesomeIcon icon="gamepad" />
              {game.name}
            </Link>
          </li>
        ))}
        {props.tools.map((tool) => (
          <li key={`tool_${tool.id}`}>
            <Link href={`/tool/${tool.id}`}>
              <FontAwesomeIcon icon="wrench" />
              <div>
                <p>{tool.name}</p>
                <p>{findGameName(tool.game)}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
