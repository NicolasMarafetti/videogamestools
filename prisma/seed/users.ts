import { PrismaClient } from '@prisma/client';

const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

export default async function createUsers() {
  const alicePassword = 'Alice';
  const alicePasswordEncrypted = await bcrypt.hash(alicePassword, 10);

  const bobPassword = 'Bob';
  const bobPasswordEncrypted = await bcrypt.hash(bobPassword, 10);

  await prisma.user.createMany({
    data: [
      {
        id: '6304f08251c2b04d79d669c4',
        country: 'France',
        pseudo: 'Alice',
        email: 'alice@prisma.io',
        first_name: 'Alice',
        last_name: 'Ecila',
        password: alicePasswordEncrypted,
      },
      {
        country: 'France',
        pseudo: 'Bob',
        email: 'bob@prisma.io',
        first_name: 'Bob',
        last_name: 'Booba',
        password: bobPasswordEncrypted,
      },
    ],
  });
}
