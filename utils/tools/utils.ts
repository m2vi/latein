import { GetServerSidePropsContext } from 'next';
import jwt from 'jsonwebtoken';

export const baseUrl = (req: any) => {
  const protocol = req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = req ? `${protocol}://${req.headers.host}` : '';

  return baseUrl;
};

export const hasCookie = (context: GetServerSidePropsContext) => {
  const cookie = context.req.cookies.jwt;

  try {
    if (cookie) {
      return !!jwt.verify(cookie, process.env.JWT_SECRET);
    }

    throw Error();
  } catch (error) {
    return false;
  }
};
