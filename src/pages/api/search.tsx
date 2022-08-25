import type { NextApiRequest, NextApiResponse } from 'next';

import { searchGames } from '@/utils/games-server';
import { searchTools } from '@/utils/tools-server';

export default async function Search(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { search } = req.query;

  if (typeof search !== 'string')
    return res.status(400).json({ message: 'Paramètre incorrecte' });

  // Find Games
  const games = await searchGames(search);

  // Find Tools
  const tools = await searchTools(search);

  return res.status(200).json({
    games,
    tools,
  });
}
