import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function createTools() {
  await prisma.tool.createMany({
    data: [
      {
        game: '6304f08251c2b04d79d669c3',
        name: 'OP.GG',
        url: 'https://euw.op.gg/l=fr',
        description: 'Find the good pick !',
      },
      {
        game: '6304f08251c2b04d79d669c3',
        name: 'Mobalitycs',
        url: 'https://mobalytics.gg/',
        description: 'The ultimate companion',
      },
    ],
  });
}
