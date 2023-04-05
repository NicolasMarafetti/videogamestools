import { PrismaClient } from '@prisma/client';
import set from 'date-fns/set';

const prisma = new PrismaClient();

export default async function createGames() {
  await prisma.game.createMany({
    data: [
      {
        id: '6304f08251c2b04d79d669c3',
        name: 'League of Legends',
        imageSource:
          'https://logo-marque.com/wp-content/uploads/2020/11/League-of-Legends-Embleme.png',
        date_release: set(new Date(), {
          date: 27,
          month: 10,
          year: 2009,
          hours: 12,
        }),
      },
    ],
  });
}
