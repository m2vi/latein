import { NextApiRequest, NextApiResponse } from 'next';
import withProtection from '@utils/db/protection';
import { toJSON } from '@utils/html/json';
import { lektionen, repetitiones } from '@utils/latein/tools';
import { fetchWithCache } from '@utils/db/fetch';

export const data = async (_: NextApiRequest, res: NextApiResponse) => {
  const { access } = await withProtection(_, res);
  if (!access) return;

  const html = await fetchWithCache(process.env.PAGE_URL);
  const json = toJSON(html);

  res.status(200).json({
    lektionen: lektionen(json),
    repetitiones: repetitiones(json),
  });
};

export default data;
