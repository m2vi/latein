import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import { baseUrl } from '@utils/tools/utils';

const decode = async (_: NextApiRequest, res: NextApiResponse) => {
  const token = _.headers?.token?.toString();

  const verified = await fetch(`${baseUrl(_)}/api/auth/verify`, {
    headers: {
      token,
    },
  });

  if (verified) {
    res.status(200).json({ content: jwt.decode(token) });
  } else {
    res.status(401).json({ error: 'BAD TOKEN' });
  }
};

export default decode;
