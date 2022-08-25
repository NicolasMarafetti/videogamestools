import prisma from 'lib/prisma';

export async function createGame(gameName: string) {
  const game = await prisma.game.create({
    data: {
      name: gameName,
    },
  });

  return game;
}

export async function findGameWithId(id: string) {
  const game = await prisma.game.findUnique({
    where: {
      id,
    },
  });

  return game
    ? {
        ...game,
        date_created: game.date_created.toISOString(),
        date_updated: game.date_updated.toISOString(),
      }
    : null;
}

export async function getGames() {
  const games = await prisma.game.findMany({});

  return games.map((game) => {
    return {
      ...game,
      date_created: game.date_created.toISOString(),
      date_updated: game.date_updated.toISOString(),
    };
  });
}

export async function searchGames(search: string) {
  return prisma.game.findMany({
    where: {
      name: {
        contains: search,
        mode: 'insensitive',
      },
    },
  });
}

export async function searchGameWithName(gameName: string) {
  const game = await prisma.game.findUnique({
    where: {
      name: gameName,
    },
  });

  return game;
}
