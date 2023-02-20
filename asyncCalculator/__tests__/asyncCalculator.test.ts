import AsyncCalculator from "..";

describe('Calculator', () => {
  let calculator: AsyncCalculator;

  beforeEach(() => {
    calculator = new AsyncCalculator();
  });

  describe('sum', () => {
    it('should resolve with the sum of two numbers', async () => {
      expect.assertions(1);
      const result = await calculator.sum(2, 8);
      expect(result).toBe(10);
    });
  });

  describe('subtract', () => {
    it('should resolve with the subtract of two numbers', () => {
      expect.assertions(1);
      return calculator.subtract(10, 8).then((result) => expect(result).toBe(2));
    });
  });

  describe('multiply', () => {
    it('should resolve with the result of multiplying two numbers', async () => {
      expect.assertions(1);
      const result = await calculator.multiply(2, 8);
      expect(result).toBe(16);
    });
  });

  describe('divide', () => {
    it('should resolve with the result of dividing two numbers', async () => {
      expect.assertions(1);
      const result = await calculator.divide(10, 5);
      expect(result).toBe(2);
    });

    it('should throw an error if b is 0', () => {
      expect.assertions(2);
      return calculator.divide(10, 0).catch((error) => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty('message', 'b cannot be 0');
      })
    });
  });
});
