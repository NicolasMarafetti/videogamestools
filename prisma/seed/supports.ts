import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function createSupports() {
  await prisma.support.createMany({
    data: [
      {
        user: '6304f08251c2b04d79d669c4',
        type: 'bug',
        description: "C'est bugué là !!",
      },
      {
        user: null,
        type: 'bug',
        description: "C'est bugué là !!",
      },
    ],
  });
}
