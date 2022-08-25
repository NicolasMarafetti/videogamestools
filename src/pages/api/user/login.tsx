import type { User } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import {
  findUserWithEmail,
  findUserWithPseudo,
  passwordsCorrespond,
} from '@/utils/users-server';

export default async function Login(req: NextApiRequest, res: NextApiResponse) {
  const { identifier, password } = req.body;

  let user: null | User = null;

  user = await findUserWithEmail(identifier);

  if (!user) user = await findUserWithPseudo(identifier);

  if (!user) return res.status(400).json({ message: 'User Not found' });

  if (!(await passwordsCorrespond(password, user.password)))
    return res.status(401).json({ message: 'Incorrect password' });

  return res.status(200).json({ ...user });
}
