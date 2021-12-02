import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const create = async (_: NextApiRequest, res: NextApiResponse) => {
  const token = _.headers?.token?.toString();

  if (token === process.env.KEY) {
    res.status(200).json({ token: jwt.sign(token, process.env.JWT_SECRET) });
  } else {
    res.status(401).json({ error: 'Unauthorized (6261736963)' });
  }
};

export default create;
