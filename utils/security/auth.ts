import { basicFetch } from '@utils/db/fetch';
import { baseUrl } from '@utils/tools/utils';
import Cookies from 'js-cookie';
import jwt from 'jsonwebtoken';
import { GetServerSidePropsContext, NextApiRequest } from 'next';

interface AuthOptions {
  strict?: boolean;
  decode?: boolean;
}

export class Auth {
  public async pageAuth(req: NextApiRequest) {
    const token = await this.getToken(req);
    const cipher = this.getTokenFromRequest(req);
    if (!token) return false;

    return cipher;
  }

  private getCookie(name: string, value: string) {
    value = `; ${value}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }

  private getTokenFromRequest(req: NextApiRequest) {
    return this.getCookie('jwt', req.headers.cookie);
  }

  public async getToken(req?: NextApiRequest, options: AuthOptions = { strict: true, decode: true }) {
    if (req) {
      const cipher = this.getTokenFromRequest(req);

      if (options.strict) {
        const verified = await this.verify(cipher, req);
        if (!verified) return false;
      }

      return jwt.decode(cipher).toString();
    }

    const cipher = Cookies.get('jwt');

    if (options.strict) {
      const verified = await this.verify(cipher);
      if (!verified) return false;
    }

    return options.decode ? jwt.decode(cipher).toString() : cipher;
  }

  public async createCookie(jsonwebtoken: string, req?: NextApiRequest) {
    Cookies.set('jwt', jsonwebtoken, { expires: 7, path: '/' });

    return Cookies.get('jwt');
  }

  public async verify(cipher: string, req?: NextApiRequest) {
    const data = await basicFetch(`${req ? baseUrl(req) : ''}/api/auth/verify`, { headers: new Headers({ token: cipher }) });

    return data.verified ? true : false;
  }

  public async hasAccess(req?: NextApiRequest) {
    const token = await this.getToken(req);

    return {
      access: token ? true : false,
      token,
    };
  }

  public logout(ctx: GetServerSidePropsContext) {
    if (ctx) {
      ctx.res.setHeader('Set-Cookie', 'jwt=deleted; Max-Age=0; path=/');
      return;
    }

    Cookies.remove('jwt');
  }
}

export default new Auth();
