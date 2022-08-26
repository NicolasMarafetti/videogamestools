import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';
import path from 'path';

const fs = require('fs');

const { serverRuntimeConfig } = getConfig();

export default async function ImageService(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return new Promise((resolve) => {
    if (!req.query.id) {
      res.status(400).json({ status: 'error', message: 'Query not found' });
      resolve(true);
      return;
    }

    let filePath: string;
    if (typeof req.query.id === 'string') {
      filePath = req.query.id;
    } else {
      filePath = req.query.id.join('/');
    }

    // eslint-disable-next-line no-console
    console.log('filePath', filePath);

    fs.readFile(
      path.join(
        serverRuntimeConfig.PROJECT_ROOT,
        `./public/assets/images/${filePath}`
      ),
      (error: any, file: any) => {
        if (error) {
          res.status(404).json({
            status: 'error',
            message: 'File not found',
          });
          return resolve(true);
        }
        res.status(200).end(file);
        return resolve(true);
      }
    );
  });
}
