import { NextFunction, Request } from 'express';

const TENANT_HEADER = 'x-tenant-id';

export function tenancyMiddleware(req: Request, _, next: NextFunction) {
  const header = req.headers[TENANT_HEADER] as string;
  req.tenantId = header?.toString() ?? null;
  next();
}
