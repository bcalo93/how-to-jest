import { normalizeQueryParams, RequestHandler, ParamsType, Request, Response } from "..";

describe('normalizeQueryParams', () => {
  let normalizer: RequestHandler;
  let res: Response<{
    limit?: number,
    last_modification?: Date,
    type?: string,
    is_admin?: boolean
  }>;

  beforeAll(() => {
    normalizer = normalizeQueryParams({
      limit: ParamsType.NUMBER,
      last_modification: ParamsType.DATE,
      type: ParamsType.STRING,
      is_admin: ParamsType.BOOLEAN
    });
  });

  beforeEach(() => {
    res = {
      locals: {},
    };
  })

  it('should normalize a numeric query params', (done) => {
    const req: Request = {
      query: {
        limit: '20',
      }
    };

    normalizer(req, res, () => {
      expect(res.locals).toHaveProperty('limit', 20);
      done();
    })
  });

  it('should normalize a date query params', (done) => {
    const testDate ='2023-02-17T20:14:52.422Z'
    const req: Request = {
      query: {
        last_modification: testDate,
      }
    };

    normalizer(req, res, () => {
      expect(res.locals.last_modification!.getTime()).toBe(new Date(testDate).getTime());
      done();
    })
  });

  it('should leave string query params and just pass them to res.locals', (done) => {
    const testType = 'widget';
    const req: Request = {
      query: {
        type: testType,
      }
    };

    normalizer(req, res, () => {
      expect(res.locals).toHaveProperty('type', testType);
      done();
    });
  });

  it('should normalize boolean query params', (done) => {
    const req: Request = {
      query: {
        is_admin: 'true',
      }
    };

    normalizer(req, res, () => {
      expect(res.locals).toHaveProperty('is_admin', true);
      done();
    });
  });
});
