import prisma from 'lib/prisma';
import sharp from 'sharp';

const sizeOf = require('image-size');

export async function createGame(gameName: string, dateRelease: Date) {
  const game = await prisma.game.create({
    data: {
      name: gameName,
      date_release: dateRelease,
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
        date_release: game.date_release.toISOString(),
        date_created: game.date_created.toISOString(),
        date_updated: game.date_updated.toISOString(),
      }
    : null;
}

export async function getGames() {
  const games = await prisma.game.findMany({
    orderBy: {
      date_release: 'desc',
    },
  });

  return games.map((game) => {
    return {
      ...game,
      date_release: game.date_release.toISOString(),
      date_created: game.date_created.toISOString(),
      date_updated: game.date_updated.toISOString(),
    };
  });
}

export async function saveGameImage(id: string, file: any) {
  return new Promise((resolve) => {
    const fileName = `${id}.webp`;
    const imageDimensions: { height: number; width: number } = sizeOf(
      file.buffer
    );

    const newWidth: number =
      imageDimensions.width > 1920 ? 1920 : imageDimensions.width;
    const newHeight: number = Math.round(
      imageDimensions.height / (imageDimensions.width / newWidth)
    );

    sharp(file.buffer)
      .resize(newWidth, newHeight)
      .toFile(`public/assets/images/games/${fileName}`)
      .then(() => {
        resolve(true);
      })
      .catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Error uploading the game image for game id : ', id);
        // eslint-disable-next-line no-console
        console.error('err', err);

        throw new Error(`Error uploading the image for game id :  ${id}`);
      });
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
