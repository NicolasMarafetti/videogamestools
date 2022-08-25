import type { NextApiRequest, NextApiResponse } from 'next';

import { saveSupport } from '@/utils/support-server';

export default async function Support(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { user, type, description } = req.body;

  await saveSupport(user, type, description);

  return res.status(200).end();
}
