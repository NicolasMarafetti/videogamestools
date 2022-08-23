import type { Game } from '@prisma/client';

export interface ToolObjectWithGame {
  id: string;
  game: string;
  name: string;
  url: string;
  description: string;
  date_created: string;
  date_updated: string;
  Game: Game;
}
