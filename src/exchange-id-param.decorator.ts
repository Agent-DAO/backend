import { Request } from 'express';
import { ExchangeId } from './deployment/deployment.service';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export function extractExchangeId(request: Request, exchangeIdParam?: string): ExchangeId {
  let exchangeId: ExchangeId;

  if (exchangeIdParam) {
    exchangeId = exchangeIdParam as ExchangeId;
  } else {
    const subdomain = request.hostname.split('.')[0];
    exchangeId = subdomain as ExchangeId;
  }

  if (!Object.values(ExchangeId).includes(exchangeId)) {
    throw new Error(`Invalid ExchangeId: ${exchangeId}`);
  }

  return exchangeId;
}

export const ExchangeIdParam = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const exchangeIdParam = ctx.switchToHttp().getRequest().params.exchangeId;
  return extractExchangeId(request, exchangeIdParam);
});
