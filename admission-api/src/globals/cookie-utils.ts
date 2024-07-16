import * as process from 'process';
import { FastifyReply, FastifyRequest } from 'fastify';

export class CookieUtils {
  static setSessionToken (reply: FastifyReply, token: string) {
    const sessionTtl = process.env.SESSION_TTL;
    const expires = new Date(Date.now() + parseInt(sessionTtl));

    const oldSessionToken = reply.cookie['session'];
    if (oldSessionToken) {
      reply.clearCookie('session');
    }

    reply.setCookie('session', token, { httpOnly: true, expires, path: '/', sameSite: 'none' });
  }

  static getSessionToken (request: FastifyRequest) {
    return request.cookies['session'];
  }
}