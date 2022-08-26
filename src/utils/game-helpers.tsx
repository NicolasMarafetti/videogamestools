import type { Game } from '@prisma/client';

import type { GameParsed } from '@/interfaces/games';

export function GamesParsedToGames(gamesParsed: GameParsed[]): Game[] {
  return gamesParsed.map((gameParsed) => {
    return {
      ...gameParsed,
      date_release: new Date(gameParsed.date_release),
      date_created: new Date(gameParsed.date_created),
      date_updated: new Date(gameParsed.date_updated),
    };
  });
}

export function getGameImageSource(gameId: string): string {
  return `/assets/images/games/${gameId}.webp`;
}
