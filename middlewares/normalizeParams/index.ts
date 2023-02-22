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

const paramsTypeHandler: Record<ParamsType, (value: string) => number | boolean | Date | string> = {
  [ParamsType.STRING]: (value: string) => value,
  [ParamsType.NUMBER]: (value: string) => +value || 0,
  [ParamsType.BOOLEAN]: (value: string) => value.toLowerCase() == 'true',
  [ParamsType.DATE]: (value: string) => new Date(value)
}

export function normalizeQueryParams(paramsConversion: Record<string, ParamsType>): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const normalizedParams = Object
      .keys(req.query)
      .reduce((accumulator, currentKey) => {
        const handler = paramsTypeHandler[paramsConversion[currentKey] || ParamsType.STRING];
        return { ...accumulator, [currentKey]: handler(req.query[currentKey]) };
      }, {});

    res.locals = { ...res.locals, ...normalizedParams };
    next();
  }
}
