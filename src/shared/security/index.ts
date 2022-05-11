import { env } from '@/shared/env';
import JWT, { VerifyCallback } from 'jsonwebtoken';

export function createJWT(payload: object, expires = '10d') {
  const token = JWT.sign(payload, env.security.key as string, { expiresIn: expires });
  return token;
}

export function verifyJWT(token: string, callback: VerifyCallback) {
  JWT.verify(token, env.security.key as string, callback);
}
