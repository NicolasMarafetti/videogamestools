import multer from 'multer';
import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';

import { createGame } from '@/utils/games-server';

interface RequestExtended extends NextApiRequest {
  body: {
    date_release: string;
    imageSource: string;
    name: string;
  };
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
  try {
    const { imageSource, name } = req.body;
    const dateRelease = new Date(req.body.date_release);

    await createGame(name, imageSource, dateRelease);

    return res.status(200).json({});
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return res.status(500).json({ message: 'Serveur error' });
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};
