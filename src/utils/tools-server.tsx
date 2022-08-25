import prisma from 'lib/prisma';

export async function createTool(
  game: string,
  name: string,
  url: string,
  description: string
) {
  return prisma.tool.create({
    data: {
      game,
      name,
      url,
      description,
    },
  });
}

export async function findToolsForGame(gameId: string) {
  const tools = await prisma.tool.findMany({
    where: {
      game: gameId,
    },
  });

  return tools.map((tool) => {
    return {
      ...tool,
      date_created: tool.date_created.toISOString(),
      date_updated: tool.date_updated.toISOString(),
    };
  });
}

export async function searchTools(search: string) {
  return prisma.tool.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
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
}
