import { PrismaClient } from '@prisma/client';

import createGames from './seed/games';
import createSupports from './seed/supports';
import createTools from './seed/tools';
import createUsers from './seed/users';

const prisma = new PrismaClient();

async function main() {
  createGames();
  createSupports();
  createTools();
  createUsers();
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    // eslint-disable-next-line no-console
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
