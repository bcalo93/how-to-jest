import { normalizeQueryParams, RequestHandler, ParamsType, Request, Response } from "..";

describe('normalizeParams', () => {
  let normalizer: RequestHandler;
  let res: Response<{
    limit?: number,
    last_modification?: Date,
    type?: string,
    is_admin?: boolean,
    unrelatedProp?: string;
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
  });

  describe('number', () => {
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

    it('should normalize a numeric query params as zero if the value is not numeric', (done) => {
      const req: Request = {
        query: {
          limit: 'im not numeric',
        }
      };

      normalizer(req, res, () => {
        expect(res.locals).toHaveProperty('limit', 0);
        done();
      });
    });

  });

  describe('date', () => {
    it('should normalize a date query params', (done) => {
      const testDate ='2023-02-17T20:14:52.422Z';
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
  });

  describe('string', () => {
    it('should leave string query params unchanged pass them to res.locals', (done) => {
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
  });

  describe('boolean', () => {
    it('should normalize boolean query params', (done) => {
      const req: Request = {
        query: {
          is_admin: 'TRUE',
        }
      };

      normalizer(req, res, () => {
        expect(res.locals).toHaveProperty('is_admin', true);
        done();
      });
    });
  });

  it('should leave unmapped query params as strings', (done) => {
    const testString = 'not defined';
    const req: Request = {
      query: {
        not_present: testString
      }
    };

    normalizer(req, res, () => {
      expect(res.locals).toHaveProperty('not_present', testString);
      done();
    });
  });

  it('should transform multiple params', (done) => {
    const testDate ='2022-06-17';
    const testString = 'value';
    const req: Request = {
      query: {
        limit: '30',
        last_modification: testDate,
        is_admin: 'false',
        random: testString
      }
    };

    normalizer(req, res, () => {
      expect(res.locals).toHaveProperty('limit', 30);
      expect(res.locals).toHaveProperty('is_admin', false);
      expect(res.locals).toHaveProperty('random', testString);
      expect(res.locals.last_modification!.getTime()).toBe(new Date(testDate).getTime());
      done();
    });
  });

  it('should keep unrelated and previously set values on locals', (done) => {
    const expectedUnrelatedProp = 'I remain unchanged';
    res.locals.unrelatedProp = expectedUnrelatedProp;
    const req: Request = {
      query: {
        limit: '30',
        is_admin: 'false',
      }
    };

    normalizer(req, res, () => {
      expect(res.locals).toHaveProperty('limit', 30);
      expect(res.locals).toHaveProperty('is_admin', false);
      expect(res.locals).toHaveProperty('unrelatedProp', expectedUnrelatedProp);
      done();
    });
  });
});
