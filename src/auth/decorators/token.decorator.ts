import { createParamDecorator, UnauthorizedException } from '@nestjs/common';

export const TokenParam = createParamDecorator((data: string, req) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    throw new UnauthorizedException('Missing token');
  }
  const bearerToken = authHeader.split(' ')[1];
  return bearerToken;
});
