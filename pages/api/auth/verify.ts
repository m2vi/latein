import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';

const create = async (_: NextApiRequest, res: NextApiResponse) => {
  const jsonwebtoken = _.headers?.token?.toString();

  try {
    const token = jwt.verify(jsonwebtoken, process.env.JWT_SECRET);

    res.status(200).json({ verified: token ? true : false });
  } catch (error) {
    res.status(200).json({ verified: false });
  }
};

export default create;
