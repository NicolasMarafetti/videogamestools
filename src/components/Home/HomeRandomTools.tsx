import error from 'next/error';
import React, { useState } from 'react';

import HomeRandomToolItem from './HomeRandomToolItem';

interface HomeRandomToolsState {
  error: boolean;
  games: any[];
  tools: any[];
}

export default function HomeRandomTools() {
  const [state] = useState<HomeRandomToolsState>({
    error: false,
    games: [],
    tools: [],
  });

  return (
    <div id="home_random_tools">
      <h2>Random Tools</h2>
      <div>
        {error && <p>Couldn&apos;t get the tools</p>}
        <ul>
          {state.tools.map((tool) => (
            <HomeRandomToolItem
              key={tool.id}
              id={tool.id}
              name={tool.name}
              description={tool.description}
              game={state.games.find((game) => game.id === tool.game)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
