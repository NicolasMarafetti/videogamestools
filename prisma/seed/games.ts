import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function createGames() {
  await prisma.game.createMany({
    data: [
      {
        id: '6304f08251c2b04d79d669c3',
        name: 'League of Legends',
        image: 'lol.jpg',
      },
    ],
  });
}
