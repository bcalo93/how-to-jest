export type Request = {
  query: Record<string, string>;
}

export type Response<T = Record<string, number | string | boolean | Date>> = {
  locals: T;
}

type NextFunction = (error?: Error) => void;

export type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;

export enum ParamsType {
  STRING,
  NUMBER,
  BOOLEAN,
  DATE
}

export function normalizeQueryParams(paramsConversion: Record<string, ParamsType>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {

    next();
  }
}
