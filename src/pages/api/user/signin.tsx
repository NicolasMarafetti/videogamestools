import type { NextApiRequest, NextApiResponse } from 'next';

import { saveUser } from '@/utils/users-server';

const bcrypt = require('bcrypt');

export default async function signin(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { country, email, firstname, lastname, password, pseudo } = req.body;

    bcrypt
      .hash(password, 10)
      .then(async (hash: string) => {
        const result = await saveUser(
          country,
          pseudo,
          firstname,
          lastname,
          email,
          hash
        );

        return res.status(201).json(result);
      })
      .catch((error: any) => {
        // eslint-disable-next-line no-console
        console.error('Error 1', error);
        res.status(500).json({ message: `Couldn't hash the password` });
      });
  } catch (error) {
    res.status(500).json({ message: `Unknown error during signin` });
  }
}
