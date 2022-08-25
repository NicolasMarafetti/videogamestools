import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { createGame, saveGameImage } from '@/utils/games-server';

interface RequestExtended extends NextApiRequest {
  body: {
    date_release: string;
    name: string;
  };
  files: any[];
}

const apiRoute = nextConnect<NextApiRequest, NextApiResponse>({
  onError(error, _req, res) {
    res
      .status(501)
      .json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method "${req.method}" Not Allowed` });
  },
});

apiRoute.use(multer().any());

apiRoute.post(async (req: RequestExtended, res: NextApiResponse) => {
  const { name } = req.body;
  const dateRelease = new Date(req.body.date_release);

  const game = await createGame(name, dateRelease);

  // Save images
  req.files.forEach(async (file) => {
    await saveGameImage(game.id, file);
  });

  return res.status(200).end();
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
