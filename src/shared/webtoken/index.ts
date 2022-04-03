import JWT, { VerifyCallback } from 'jsonwebtoken';
import { env } from '@/shared/env';

type verifyjwtProps = {
  token: string;
  callback: VerifyCallback;
};
export const createJWT = (payload: object, expiresIn = '5d') => {
  const token = JWT.sign(payload, env.securityKey, { expiresIn });
  return token;
};

export const verifyJWT = ({ token, callback }: verifyjwtProps) => {
  JWT.verify(token, env.securityKey, callback);
};
