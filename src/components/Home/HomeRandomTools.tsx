import React, { useState } from 'react';

import type { ToolObjectWithGame } from '@/interfaces/tools';

import HomeRandomToolItem from './HomeRandomToolItem';

interface HomeRandomToolsProps {
  tools: ToolObjectWithGame[];
}

interface HomeRandomToolsState {
  error: boolean;
  games: any[];
}

export default function HomeRandomTools(props: HomeRandomToolsProps) {
  const [state] = useState<HomeRandomToolsState>({
    error: false,
    games: [],
  });

  return (
    <div
      className="mx-auto max-w-[1100px] sm:w-full xl:flex-1 xl:pl-4"
      id="home_random_tools"
    >
      <h2 className="my-4 mb-6 text-white sm:my-3 xl:mb-14 xl:text-2xl">
        Random Tools
      </h2>
      <div>
        {state.error && <p>Couldn&apos;t get the tools</p>}
        <ul className="flex flex-wrap justify-around p-0 sm:flex-row">
          {props.tools.map((tool) => (
            <HomeRandomToolItem
              key={tool.id}
              id={tool.id}
              name={tool.name}
              description={tool.description}
              game={tool.Game}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}
