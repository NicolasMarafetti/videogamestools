import type { Game } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

import { createGame, searchGameWithName } from '@/utils/games-server';
import { createTool } from '@/utils/tools-server';

export default async function ApiTool(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const gameName = req.body.game;
  const toolName = req.body.name;
  const toolUrl = req.body.url;
  const toolDescription = req.body.description;

  // Search the game with the name
  let game: Game | null = await searchGameWithName(gameName);

  // No game, we save the game in database
  if (!game) game = await createGame(gameName);

  await createTool(game.id, toolName, toolUrl, toolDescription);

  return res.status(200).end();
}
