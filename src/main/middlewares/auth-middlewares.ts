import { verifyJWT } from '@/shared/security';
import { NextFunction, Request, Response } from 'express';

export function authUserJwtMiddleware(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    return response.status(401).json({ error: 'No token provieded' });
  }

  const parts = authHeader.split(' ');

  if (!(parts.length === 2)) {
    return response.status(401).json({ error: 'Token properties error' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/.test(scheme)) {
    return response.status(401).json({ error: 'Token malformatted' });
  }

  verifyJWT(token, (err: any, decoded: any) => {
    if (err) {
      return response.status(401).json({ error: 'Token invalid' });
    }

    request.userId = decoded.id as string;

    return next();
  });
}
