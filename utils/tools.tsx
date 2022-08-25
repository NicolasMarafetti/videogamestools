import type { Game } from '@prisma/client';
import prisma from 'lib/prisma';

export interface ToolWithGame {
  Game: Game;
  id: string;
  game: string;
  name: string;
  url: string;
  description: string;
  date_created: Date;
  date_updated: Date;
}

export async function getRandomToolsServerSide() {
  const tools = await prisma.tool.findMany({
    select: {
      id: true,
      game: true,
      name: true,
      url: true,
      description: true,
      date_created: true,
      date_updated: true,
      Game: true,
    },
  });

  const toolsParsed = tools.map((tool) => {
    return {
      ...tool,
      date_created: tool.date_created.toISOString(),
      date_updated: tool.date_created.toISOString(),
      Game: {
        ...tool.Game,
        date_release: tool.Game.date_release.toISOString(),
        date_created: tool.Game.date_created.toISOString(),
        date_updated: tool.Game.date_created.toISOString(),
      },
    };
  });

  return toolsParsed;
}

export async function getTool(id: string) {
  const tool = await prisma.tool.findUnique({
    where: { id },
  });

  const toolParsed = tool
    ? {
        ...tool,
        date_created: tool.date_created.toISOString(),
        date_updated: tool.date_created.toISOString(),
      }
    : null;

  return toolParsed;
}

export async function getToolWithGame(id: string) {
  const tool = await prisma.tool.findUnique({
    select: {
      id: true,
      game: true,
      name: true,
      url: true,
      description: true,
      date_created: true,
      date_updated: true,
      Game: true,
    },
    where: { id },
  });

  const toolParsed = tool
    ? {
        ...tool,
        date_created: tool.date_created.toISOString(),
        date_updated: tool.date_created.toISOString(),
        Game: {
          ...tool.Game,
          date_release: tool.Game.date_release.toISOString(),
          date_created: tool.Game.date_created.toISOString(),
          date_updated: tool.Game.date_created.toISOString(),
        },
      }
    : null;

  return toolParsed;
}
